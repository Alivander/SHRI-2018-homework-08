var Store = (function() {

  var dataBase = {};

  console.info( 'Store запрашивает базу данных с сервера' );
  server.queryBaseToServer()
    .then( function( base ) {
      dataBase = base;
    })
    .catch( function( err ) {
      console.error( err );
    });

  console.info( 'Store регистрирует callback в Dispatcher' );
  Dispatcher.register( function( action ) {
      Store.handlerAction( action );
  });

  function handlerAction( action ) {
    console.info( 'Store получил Action', action );
    var instraction = reducer( action );
    if ( instraction.data ) {

      console.info( 'Store сохраняет данные во внутренней базе', action.data );
      if (dataBase[ instraction.name ] !== undefined) {
        dataBase[ instraction.name ].push( instraction.data );
      } else {
        dataBase[ instraction.name ] = [ instraction.data ];
      }

      if ( instraction.notServer ) {
        console.info( 'Store сообщает что изменился' );
        eventEmitter.emit('storeChanged');
      } else {
        console.info( 'Store отправляет данные на сервер', instraction.data );
        server.sendToServer( action )
          .then( function( result ) {
            console.info( 'Store обрабатывает ответ сервера', result );
            if (dataBase[ result.type ] !== undefined) {
              dataBase[ result.type ].push( result.data );
            } else {
              dataBase[ result.type ] = [ result.data ];
            }
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

      console.log('dataBase', dataBase);

    } else {
      console.error( 'Action, полученный Store, содержит некоректные данные' );
    }
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
