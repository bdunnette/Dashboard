function(doc){
    if(doc.type === "data_management_form"){
        var extract_visit_date,
            visit_date;
        extract_visit_date = require("views/lib/extract_visit_date").extract_visit_date;
        visit_date = extract_visit_date(doc);
        key = [
            doc.clinic,
            visit_date.year,
            visit_date.quarter,
            visit_date.month
        ];
        value = {
            "values" : [1],
            "labels" : {
                "key_labels" : ["clinic", "year", "quarter", "month"],
                "value_labels" : ["number of visits"]
            }
        };
        emit(key, value);
    }
}


