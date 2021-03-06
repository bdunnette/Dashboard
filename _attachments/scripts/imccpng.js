(function () {
    'use strict';
    /*jshint browser:true, devel:true, jquery:true*/
    /*globals google:false, d3:false, angular:false, crossfilter:false, dc:false*/

    var toType = function(obj) {
        return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    };

    var arrayIntersection = function (a, b) {
        return a.filter(function (el) {
            if (b.indexOf(el) === -1) return false;
            else return true;
        });
    };

    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    /* App Initialization */

    var imccp = angular.module("imccp", ["ngResource"]);

    /* Configure the App */

    imccp.config(function ($routeProvider) {
        var sessionResolver = {
            "currentSession" : ["Session", "$q", function (Session, $q) {
                return Session.getSession().then(function (session) {
                    if (!session || !session.userCtx || !session.userCtx.name) {
                        return $q.reject("Must be logged in to do that.");
                    } else {
                        return session;
                    }
                });
            }]
        };
        $routeProvider.when("/", {templateUrl : "templates/main/home.html"}).
            when("/patients", {
                "controller" : "PatientController",
                "templateUrl" : "templates/main/patients.html",
                "resolve" : sessionResolver
            }).
            when("/patients/:patientDocId", {
                "controller" : "PatientController",
                "templateUrl" : "templates/main/patients.html",
                "resolve" : sessionResolver
            }).
            when("/dashboard", {
                "controller" : "DashboardController",
                "templateUrl" : "templates/main/dashboard.html",
                "resolve" : sessionResolver
            }).
            when("/profile", {
                "controller" : "ProfileController",
                "templateUrl" : "templates/main/profile.html",
                "resolve" : sessionResolver
            }).
            when("/admin", {
                "controller" : "AdminController",
                "templateUrl" : "templates/main/admin.html",
                "resolve" : sessionResolver
            });
            //otherwise({redirectTo:"/"});
    });

    /* Services */

    imccp.factory("Session", function ($http, $resource, $rootScope, $location, Clinics) {
        var currentSession, sessionService, sessionURL = "../../../_session";
        sessionService = {
            login : function login (username, password, callback) {
                return $http.post(sessionURL, {name:username, password:password})
                    .then(sessionService.getSession);
            },
            logout : function logout () {
                currentSession = null;
                $rootScope.$broadcast("logout");
                return $http({method : "DELETE", url : sessionURL});
            },
            getSession : function getSession() {
                return $http.get(sessionURL)
                    .then(function (response) {
                        if (response.data.userCtx.name) {
                            var session, userClinics;
                            if (!currentSession) $rootScope.$broadcast("login");
                            currentSession = session = response.data;
                            userClinics = arrayIntersection(session.userCtx.roles, Clinics.list());
                            if (session.userCtx.roles.indexOf("_admin") !== -1) {
                                session.userCtx.admin = true;
                            }
                            if (session.userCtx.roles.indexOf("dashboard") !== -1) {
                                session.userCtx.dashboard = true;
                            }
                            if (userClinics.length > 0) {
                                session.userCtx.clinic = userClinics[0];
                            }
                            return session;
                        } else if (currentSession) {
                            currentSession = null;
                            $rootScope.$broadcast("logout");
                        }
                    });
            }
        };
        return sessionService;
    });

    imccp.factory("User", function ($resource) {
        return $resource('../../../_users/:id', {"id":"@id"}, {
            "put" : { method : "PUT"},
            "list" : { method : "GET", params : {"id":"_all_docs"}}
        });
    });

    imccp.factory("Record", function ($resource) {
        return $resource("_list/authorize/:view", {"include_docs" : false, "view" : "@view"}, {
            getAll : {
                method : "GET",
                params : {
                    "view" : "stats",
                    "descending" : true
                }
            }
        });
    });

    imccp.factory("Clinics", function ($http) {
        var clinics = [];
        clinics = ["Breast", "Gi", "Gyn Onc", "Head And Neck", "Liver", "Lymp And Leuk", "Neuro Onc", "Thoracic", "Urology", "Pastoral"];
        return {
            list : function () {
                return clinics;
            }
        };
    });

    imccp.factory("Autofiller", function ($http, $resource) {
        return {
            getTerms : function getTerms (options) {
                var term = options.term;
                options.startkey = '"'+term+'"';
                options.endkey = '"'+term+"\u9999"+'"';
                options.group = true;
                options.limit = 8;
                return $http.get("_view/autofill_"+options.field, {"params" : options});
            }
        };
    });

    imccp.factory("Patient", function ($resource, Record, $filter, $http) {
        var Patient, patientNames, patientMRNS, dateFields;

        dateFields = ["tdysdate", "dtrefer", "medrecdt", "attmpdt", "actualdt", "offerdt", "accptdt", "surgdt", "mdoncdt", "radondt", "plsurdt", "bmtdt", "dentdt", "othdt", "dtltrfwd"];

        Patient = $resource("../../:id", {"id":"@id"}, {"put" : { method : "PUT"}});

        Patient.listByName = function listByName (name) {
            return Record.get({
                "startkey" : '"'+name+'"',
                "endkey" : '"'+name+"\u9999"+'"',
                "view" : "patient_names",
                "limit" : 25
            });
        };

        Patient.listByMRN = function listByMRN (mrn) {
            return Record.get({
                "startkey" : '"'+mrn+'"',
                "endkey" : '"'+mrn+"\u9999"+'"',
                "view" : "medrecs",
                "limit" : 25
            });
        };

        Patient.listDeleted = function deleted () {
            return $http.get("_view/deleted", {
                "params" : {
                    "descending" : true,
                    "include_docs" : true
                }
            });
        };

        Patient.lookup = function lookup (mrn) {
            if (!mrn) return;
            return $http.get("../../../patientLookup", {
                "params" : {
                    "mrn" : mrn
                }
            }).then(function (response) {
                return new Patient({
                    ptfstnm : response.data.firstname.toProperCase(),
                    ptlstnm : response.data.lastname.toProperCase(),
                    ptaddy : response.data.city.toProperCase() + ", " + response.data.state,
                    medrec : response.data.mrn
                });
            });
        };

        Patient.parseDates = function parseDates (patient) {
            dateFields.forEach( function (field) {

            });
        };

        Patient.formatDates = function formatDates (patient) {
            dateFields.forEach( function (field) {
                patient[field] = $filter('date')(patient[field], "MM-dd-yyyy");
            });
        };

        return Patient;
    });

    imccp.filter("clinicFilter", function () {
        return function (data, clinicName) {
            if (data && clinicName) {
                var regex;
                if (toType(clinicName) === "array") clinicName = clinicName.join("|");
                regex = new RegExp("^"+clinicName, "i");
                return data.filter(function (row) {
                    return row.doc.clinic.match(regex);
                });
            }
            else return data;
        };
    });

    /* Controllers */

    imccp.controller("NavController", function ($scope, $rootScope, Session) {
        $scope.navbar = "";
        $scope.updateNav = function updateNav() {
            $scope.navbar = "";
            var user, roles, session;
            session = Session.getSession().then(function (session) {
                if (session) {
                    user = session.userCtx;
                    roles = user && user.roles;
                    if (!roles) {
                        $scope.navbar = "";
                        return;
                    }
                    if (user.admin) {
                        $scope.navbar = "templates/navbars/admin.html";
                    } else if (user.dashboard) {
                        $scope.navbar = "templates/navbars/dashboard.html";
                    } else if (user.clinic) {
                        $scope.navbar = "templates/navbars/nurse.html";
                    }
                }
            });
        };
        $scope.$on("updateNav", $scope.updateNav);
        $rootScope.$on("updateNav", $scope.updateNav);
        $rootScope.$on("logout", $scope.updateNav);
        $rootScope.$on("login", $scope.updateNav);
    });

    imccp.controller("AdminController", function ($scope, currentSession) {
    });

    imccp.controller("UserController", function ($scope, User, Clinics) {

        var response = User.list(function () {
            $scope.users = response.rows.map(function (row) {
                if (row.id !== "_design/_auth") {
                    row.name = row.id.slice(17);
                    return row;
                }
            }).filter(function (row) {
                if (row) return row;
            });
        });

        $scope.clinics = Clinics.list();

        $scope.updatePassword = function updatePassword () {
            var user = new User($scope.user);
            user.password = $scope.password;
            user.$put({id : user._id}, function () {
                $scope.updateUserModel();
            });
        };

        $scope.updateRoles = function updateRoles () {
            var updatedRoles = [], user;
            if ($scope.dashboard) updatedRoles.push("dashboard");
            updatedRoles.push($scope.clinic);
            $scope.user.roles = updatedRoles.concat($scope.user.roles.filter(function (role) {
                if ($scope.clinics.indexOf(role) === -1 && role !== "dashboard") return role;
            }));
            user = new User($scope.user);
            user.$put({id : user._id}, function () {
                $scope.$emit("alert", {
                    "message" : "User Saved",
                    "type" : "success"
                });
                $scope.updateUserModel();
            }, function (response) {
                $scope.$emit("alert", {
                    "message" : "Unable to save user:" + response.data.reason,
                    "type" : "error"
                });
            });
        };

        $scope.updateUserModel = function updateUserModel () {
            $scope.user = User.get({ "id" : $scope.selected.id}, function () {
                $scope.dashboard = ($scope.user.roles.indexOf("dashboard") !== -1);
                $scope.clinic = (function () {
                    return $scope.clinics.filter(function (clinic) {
                        return $scope.user.roles.indexOf(clinic) !== -1 ? clinic : null;
                    })[0];
                })();
            });
        };
    });

    imccp.controller("ProfileController", function ($scope, User, Session) {
        $scope.updatePassword = function updatePassword() {
            User.get({ id: "org.couchdb.user:"+$scope.session.userCtx.name }, function (user) {
                user.password = $scope.password;
                user.$put({ id: "org.couchdb.user:"+$scope.session.userCtx.name }, function () {
                    $scope.$emit("alert", {
                        "message" : "Password Updated. Please log in with your new password.",
                        "type" : "success"
                    });
                    Session.logout();
                });
            });
        };
        $scope.session = Session.getSession().then(function (session) { return $scope.session = session;});
    });

    imccp.controller("DashboardController", function ($scope, Record, currentSession, $window) {
        var currentOffset, batchSize, total;

        batchSize = 1500;
        currentOffset = 0;

        $scope.percentage = 1;
        $scope.message = "Loading records...";

        $scope.getMore = function () {
            var records = Record.getAll({limit: batchSize, skip: currentOffset}, function () {
                records = records.rows;
                currentOffset += batchSize;
                $scope.percentage = currentOffset/total * 100;
                records.forEach(function (r) { r.date = new Date(r.key); });
                $scope.dmf.add(records);
                if (records.length >= batchSize) {
                    $scope.getMore();
                } else {
                    $scope.message = "All records loaded";
                 // Refocusing forces the chart to re-size the bars.
                    $scope.dateChart.x().domain(d3.extent($scope.visitsByDate.all(), function (d) { return d.key; }));
                    $scope.dateChart.focus($scope.dateChart.x().domain());
                    dc.redrawAll("overviewCharts");
                }
            });
        };

        // Get Initial Records
        $scope.records = Record.getAll({limit: 3*batchSize}, function () {
            total = $scope.records.total_rows;
            $scope.records = $scope.records.rows;
            currentOffset = 3*batchSize;
            $scope.percentage = currentOffset/total * 100;
             var dateFormat = d3.time.format("%m/%d/%Y");
            var paddedExtent = function paddedExtent(array, accessor, padding) {
                var extent = d3.extent(array, accessor);
                extent[0] -= padding;
                extent[1] += padding;
                return extent;
            };
            $scope.records.forEach(function (r) { r.date = new Date(r.key); });

            $scope.dmf = crossfilter($scope.records);
            $scope.all = $scope.dmf.groupAll();
            $scope.byClinic = $scope.dmf.dimension(function (d) {return d.value.clinic;});
            $scope.visitsByClinic = $scope.byClinic.group().reduceCount();
            $scope.byreferralToAppointment = $scope.dmf.dimension(function (d) {
                return d.value.referral_to_appointment < 60 ? d.value.referral_to_appointment : 60;
            });
            $scope.visitsByreferralToAppointment = $scope.byreferralToAppointment.group().reduceCount();
            $scope.byDate = $scope.dmf.dimension(function (d) { return d3.time.month(d.date); });
            $scope.visitsByDate = $scope.byDate.group().reduceCount();
            $scope.byInsurance = $scope.dmf.dimension(function (d) { return d.value.insurance_status; });
            $scope.visitsByInsurance = $scope.byInsurance.group().reduceCount();
            $scope.byCounty = $scope.dmf.dimension(function (d) { return d.value.county; });
            $scope.visitsByCounty = $scope.byCounty.group().reduceCount();
            $scope.byTrials = $scope.dmf.dimension(function (d) { return d.value.clinical_trial_enrollments; });
            $scope.visitsByTrials = $scope.byTrials.group().reduceCount();

            // Data Table View
            $scope.dataTable = dc.dataTable("#overview-data-table", "overviewCharts")
                .dimension($scope.byClinic)
                .group(function (d) {return d.value.clinic;})
                .size(100)
                .columns([
                    function (d) {return d.value.opername;},
                    function (d) {return d.value.clinic;},
                    function (d) {return dateFormat(d.date);},
                    function (d) {return d.value.referral_to_appointment;},
                    function (d) {return d.value.clinical_trial_enrollments;},
                    function (d) {
                        return "<a target=\"_blank\" href=\"#/patients/"+d.id+"\" class=\"btn btn-mini\">View</a>";
                    }
                ]);

            // Data Count View
            $scope.dataCount = dc.dataCount("#overview-data-count", "overviewCharts")
                .dimension($scope.dmf)
                .group($scope.all);

            // Clinic Counts View
            $scope.clinicChart = dc.pieChart("#overview-clinic-chart", "overviewCharts")
                .width(220).height(220)
                .colors(d3.scale.category10().range())
                .radius(100)
                .innerRadius(30)
                .minAngleForLabel(0.25)
                .dimension($scope.byClinic)
                .group($scope.visitsByClinic)
                .turnOnControls().filterAll();

            // Insurance Counts View
            $scope.insuranceChart = dc.pieChart("#overview-insurance-chart", "overviewCharts")
                .width(220).height(220)
                .colors(d3.scale.category10().range())
                .radius(100)
                .innerRadius(30)
                .minAngleForLabel(0.25)
                .dimension($scope.byInsurance)
                .group($scope.visitsByInsurance)
                .turnOnControls().filterAll();

            // Lag Bar Chart
            var lagx = d3.scale.linear(); //.domain(d3.extent($scope.visitsByreferralToAppointment.all(), function (d) { return d.key; }));
            $scope.referralToAppointmentChart = dc.barChart("#overview-lag-chart", "overviewCharts")
                .width(440).height(220)
                .dimension($scope.byreferralToAppointment)
                .group($scope.visitsByreferralToAppointment)
                .x(lagx)
                .elasticX(true)
                .xAxisPadding(5)
                .elasticY(true)
                .filterAll()
                .renderlet( function (chart) {
                    var g = chart.g();
                    g.attr("transform", "translate(10)");
                });
            $scope.lagChartReset = function lagChartReset () {
                $scope.referralToAppointmentChart.filterAll();
                $scope.redraw();
            };

            // Visits by Date
            var datex = d3.time.scale().domain(d3.extent($scope.visitsByDate.all(), function (d) { return d.key; }));
            $scope.dateChart = dc.barChart("#overview-date-chart", "overviewCharts")
                .width(1170).height(220)
                .dimension($scope.byDate)
                .group($scope.visitsByDate)
                .centerBar(true)
                .x(datex)
                .elasticX(true)
                .xAxisPadding(35)
                .xUnits(d3.time.months)
                .elasticY(true)
                .filterAll();
            $scope.dateChartReset = function dateChartReset () {
                $scope.dateChart.filterAll();
                $scope.redraw();
            };

            $scope.redraw = function redraw () {
                dc.redrawAll("overviewCharts");
            };

            dc.renderlet( function () {
                d3.selectAll(".dc-table-row").on("click", function (d) {
                    $scope.$broadcast("UpdateModalRecord", d);
                    $("#recordModal").modal('show');
                });
            });

            dc.renderAll("overviewCharts");

            $scope.trialFiltered = false;

            $scope.filterByTrials = function filterByTrials() {
                if ($scope.trialFiltered) {
                    $scope.trialFiltered = false;
                    $scope.byTrials.filterAll();
                } else {
                    $scope.trialFiltered = true;
                    $scope.byTrials.filter(1);
                }
                $scope.redraw();
            };

            $scope.getMore(); // Get the next batch of records
        });
    });

    imccp.controller("recordModal", function ($scope) {
        $scope.$on("UpdateModalRecord", function (event, record) {
            $scope.$apply(function () {$scope.record = record;});
        });
    });

    imccp.controller("DeletedPatientsController", function ($scope, Patient) {
        $scope.deletedPatients = {};
        Patient.listDeleted().then(function (response) {
            $scope.deletedPatients = response.data;
        });
    });

    imccp.controller("PatientController", function ($scope, $routeParams, $window, Clinics, Patient, Session, currentSession) {
        var errorHandler = function errorHandler(response) {
            $scope.$emit("alert", {
                "message" : response.data.reason,
                "type" : "error"
            });
        };

        $scope.clinics = Clinics.list();
        $scope.user = currentSession.userCtx;

        $scope.updatePatientList = function updatePatientList() {
            if (!$scope.queryterm) return;
            if ($scope.queryterm.match(/^[0-9]+$/)) {
                $scope.patients = Patient.listByMRN($scope.queryterm);
            }
            else {
                $scope.patients = Patient.listByName($scope.queryterm);
            }
        };

        $scope.newPatient = function newPatient() {
            if ($scope.lookupterm) {
                $scope.patient = {};
                Patient.lookup($scope.queryterm).then(function (pt) {
                    angular.extend($scope.patient, pt);
                });
            } else {
                $scope.patient = new Patient();
            }
            $scope.patient.type = "data_management_form";
            $scope.patient.datadate = (new Date()).toISOString();
            $scope.patient.opername = $scope.user.name;
            $scope.patient.clinic = $scope.user.clinic;
        };

        if ($routeParams.patientDocId) {
            $scope.patient = Patient.get({"id":$routeParams.patientDocId}, function () {
                Patient.formatDates($scope.patient);
            });
        } else {
            $scope.newPatient();
        }

        $scope.savePatient = function savePatient(successMessage) {
            $scope.patient.$save( function () {
                $scope.$emit("alert", {
                    "message" : successMessage || "Patient Record Saved",
                    "type" : "success"
                });
                $scope.patient.$get();
            }, errorHandler);
        };

        $scope.deletePatient = function deletePatient() {
            $scope.patient.deleted = (new Date()).toISOString();
            $scope.savePatient("Patient Record Deleted");
        };

        $scope.undeletePatient = function undeletePatient() {
            $scope.patient.deleted = null;
            $scope.savePatient("Patient Record Restored");
        };

        $scope.scrollTop = function scrollTop() {
            $window.scrollTo(0,0);
        };
    });

    /* Directives */

    imccp.directive("datefield", function () {
        return {
            restrict : "A",
            require : "?ngModel",
            link : function ($scope, $element, attributes, controller) {
                $element.datepicker({
                    format : "mm-dd-yyyy"
                }).on("changeDate", function (ev) {
                    var date = ev.date;
                    if (controller) {
                        $scope.$apply(function () {
                            controller.$setViewValue(date);
                        });
                    }
                    $element.datepicker('hide');
                });
            }
        };
    });

    imccp.directive("entersaretabs", function () {
        return {
            restrict : "A",
            link : function ($scope, element) {
                $('input, select, textarea', element).bind('keydown', function(e) {
                    var self, form, focusable, next;

                    self = $(this);
                    form = self.parents('form:eq(0)');

                    if (e.keyCode == 13) {
                        e.preventDefault();
                        focusable = form.find('input,a,select,button,textarea').filter(':visible');
                        next = focusable.eq(focusable.index(this)+1);
                        if (next.length) {
                                next.focus();
                        } else {
                                form.submit();
                        }
                    }
                });
            }
        };
    });

    imccp.directive("autofill", function (Autofiller) {
        return {
            restrict : "A",
            require : "?ngModel",
            link : function ($scope, $element, $attributes, controller) {
                var field = $attributes.ngModel.split(".")[1];
                $element.typeahead({
                    source : function (query, process) {
                        Autofiller.getTerms({
                            "field" : field,
                            "term" : query
                        }).then(function (results) {
                            var rows = results && results.data && results.data.rows;
                            process(rows.map(function (row) {
                                return row.key;
                            }));
                        });
                    },
                    updater : function (value) {
                        if (controller) {
                            $scope.$apply(function () {
                                controller.$setViewValue(value);
                            });
                        } return value;
                    }
                });
            }
        };
    });

    imccp.directive("account", function (Session, User) {
        return {
            restrict : "E",
            replace : true,
            scope : true,
            transclude : false,
            link : function ( $scope, element, attributes, controller) {

                var errorHandler = function errorHandler(response) {
                    $scope.$emit("alert", {
                        "message" : response.data.reason,
                        "type" : "error"
                    });
                };

                $scope.login = function login(name, password) {
                    Session.login(name || this.name, password || this.password)
                        .then(function (session) {
                            $scope.session = session;
                        }, errorHandler);
                };

                $scope.logout = function logout() {
                    Session.logout().then(function () {
                        $scope.session = {};
                    });
                };

                $scope.signup = function signup() {
                    var user, username, password;
                    username = this.name;
                    password = this.password;
                    user = new User({
                        name : username,
                        password : password,
                        id : "org.couchdb.user:"+username,
                        roles : [],
                        type : "user"
                    });
                    user.$put(function () {
                        $scope.login(username, password);
                    }, errorHandler);
                };

                Session.getSession().then(function (session) {
                    $scope.session = session;
                });

                var updateUi = function (session) {
                    var user = session && session.userCtx;
                    if (user && user.name !== null) {
                        $scope.template = "templates/account/loggedIn.html";
                    } else {
                        $scope.template = "templates/account/loggedOut.html";
                    }
                };

                $scope.$watch("session", updateUi);
                $scope.$on("login", updateUi);
                $scope.$on("logout", updateUi);
            },
            template : [
                "<div ng-include=\"template\"></div>"
            ].join("")
        };
    });

    imccp.directive("alerts", function () {
        return {
            "restrict" : "E",
            replace : true,
            transclude : false,
            link : function ($scope, $element, attributes) {
                var toaster;
                toaster = function (type, message, duration) {
                    var alert;
                    duration = duration || 2000;
                    alert = $("<div></div>").addClass("alert").addClass("alert-"+type).hide();
                    alert.append(
                        $("<div></div>").addClass("container").text(message)
                    );
                    $element.append(alert);
                    alert.fadeIn("slow");
                    setTimeout(function () {
                        alert.fadeOut("slow", function () {
                            $(this).remove();
                        });
                    }, duration);
                };
                $scope.$on("alert", function (e, options) {
                    toaster(options.type, options.message, options.duration);
                });
            },
            template : "<div class=\"alerts\"></div>"
        };
    });

    imccp.directive("progressBar", function ($window) {
        return {
            restrict: "E",
            scope: {
                message: "=",
                percentage: "="
            },
            template: '<div class="progress"><div class="bar" style="width: {{ percentage }}%">{{ message }}</div></div>'
        };
    });

})();
