function(head, req){
  var rows = [],
      row,
      user = req.userCtx,
      has_permission = function(row){
        if(user.roles.indexOf("_admin") || row.opername === user.name){
          return true;
        }
        return false;
      };

  provides('json', function(){
    var response = {};
    while(row = getRow()){
      if(has_permission(row)){
        rows.push(row);
      }
    }
    response.total_rows = rows.length;
    response.rows = rows;
    send(JSON.stringify(response));
  });
}
