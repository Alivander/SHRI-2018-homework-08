var Store = (function() {

  var dataBase = {};

  console.info( 'Store запрашивает базу данных с сервера' );
  server.queryBaseToServer()
    .then( function( base ) {
      dataBase = base;
    })
    .catch( function( err ) {
      consol.log( err );
    });

  console.info( 'Store регистрирует callback в Dispatcher' );
  Dispatcher.register( function( action ) {
      Store.handlerAction( action );
  });

  function handlerAction( action ) {
    console.info( 'Store получил Action', action );
    if ( action.data ) {
      handlerData( action );
    } else {
      console.error( 'Action, полученный Store, содержит некоректные данные' );
    }
  }

  function handlerData( action ) {
    console.info( 'Store сохраняет данные во внутренней базе', action.data );
    if (!dataBase[ action.name ]) {
      dataBase[ action.name ] = [];
    }
    dataBase[ action.name ].push( action.data );

    console.info( 'Store отправляет данные на сервер', action.data );
    server.sendToServer( action )
      .then( function( result ) {
        console.info( 'Store обрабатывает ответ сервера', result );
        if (!dataBase[ result.type ]) {
          dataBase[ result.type ] = [];
        }
        dataBase[ result.type ].push( result.data );
        return true;
      })
      .then( function( succesfully ) {
        if ( succesfully ) {
          console.info( 'Store сообщает что изменился' );
          eventEmitter.emit('storeChanged');
        }
      })
      .catch( function( err ) {
        console.error( err );
      });
  }

  function getData( dataName ) {
    if ( dataBase[ dataName ] ) {
      return dataBase[ dataName ];
    } else {
      console.error( 'Для события "' + dataName + '" в Store нет данных' );
    }
  }

  return {
    handlerAction: handlerAction,
    getData: getData
  };

})();
