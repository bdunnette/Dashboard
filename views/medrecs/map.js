function(doc){
  if (doc.type==="data_management_form"){
    var value = { name : doc.ptlstnm+", "+doc.ptfstnm, medrec: doc.medrec, clinic : doc.clinic};
    emit(doc.medrec, value);
  }
}