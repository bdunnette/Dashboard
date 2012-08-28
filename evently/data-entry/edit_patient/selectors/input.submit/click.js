function(){
  var db = $$(this).app.db;
  $.couch.session({success : function(session){
    var username = session.userCtx.name,
        form,
        fs,
        fo;
    if(!username){
      alert("Please log in before submitting data");
      return;
    }
    $(".datepicker").each(function(i){
      var value;
      value = $(this).val().match(/^[0-9]{2}-[0-9]{2}-[0-9]{4}/) ? $(this).datepicker('getDate').toISOString() : $(this).val();
      $(this).val(value);
    });

    form = $('form.dmf');
    fs=form.serializeArray();
    fo={};
    for(field in fs){fo[fs[field].name] = fs[field].value};
    fo['type'] = 'data_management_form';
    fo['opername'] = username;
    if (!fo._id){
      delete fo._id;
      delete fo._rev;
    }

    db.saveDoc(fo, {success : function(doc){
      alert("Patient Submitted");
    }});
  }});
}
