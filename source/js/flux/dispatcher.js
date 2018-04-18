var Dispatcher = ( function() {
  callbacks = [];

  function register( callback ) {
    console.info( 'Получение Dispatcher нового callback' );
    callbacks.push( callback );
  }

  function dispatch( action ) {
    console.info( 'Получение Dispatcher нового Action' );
    callbacks.forEach(function ( callback ) {
      callback( action );
    })
  }

  return {
    register: register,
    dispatch: dispatch
  }

})();
