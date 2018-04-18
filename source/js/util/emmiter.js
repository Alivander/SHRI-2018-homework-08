var eventEmitter = ( function() {
  var events = {};

  function on( eventName, handler ) {
    if (!events[ eventName ]) {
      events[ eventName ] = [];
    }
    events[ eventName ].push( handler );
    return this;
  };

  function off( eventName, handler ) {
    events[ eventName ] = events[ eventName ].filter( function( value ) {
      return value !== handler;
    });
    return this;
  };

  function emit( eventName ) {
    if ( events[ eventName ] ) {
      events[ eventName ].forEach( function( handler ) {
        handler();
      });
    } else {
      console.info( 'eventEmitter не содержит обработчиков для этого события' );
    }
  };

  return {
    on: on,
    off: off,
    emit: emit
  };
})();
