function(doc){if(doc.type === 'data_management_form' && !doc.deleted && doc.mdoncloc){emit(doc.mdoncloc, null);}}
