var eventEmitter = ( function() {
  var events = {};

  function on( eventName, handler ) {
    console.info( 'eventEmitter регистрирует handler для события', eventName );
    if (!events[ eventName ]) {
      events[ eventName ] = [];
    }
    events[ eventName ].push( handler );
    return this;
  };

  function off( eventName, handler ) {
    console.info( 'eventEmitter удаляет handler для события', eventName )
    events[ eventName ] = events[ eventName ].filter( function( value ) {
      return value !== handler;
    });
    return this;
  };

  function emit( eventName ) {
    console.info( 'eventEmitter генерирует событие', eventName )
    if ( events[ eventName ] ) {
      events[ eventName ].forEach( function( handler ) {
        handler();
      });
    } else {
      console.log( 'eventEmitter не содержит обработчиков для этого события' );
    }
  };

  return {
    on: on,
    off: off,
    emit: emit
  };
})();
