function reducer( action ) {
  var instruction;
  
  switch ( action.name ) {
    case 'input':
      instruction = action;
      break;
    case 'log':
      instruction = {
        name: action.name,
        data: action.data,
        notServer: true
      };
      break;
    default:
      instruction = action;
  }

  return instruction;
};
