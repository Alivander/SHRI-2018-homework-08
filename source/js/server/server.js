var server = (function() {
  var serverDataBase = {};

  function sendToServer( action ) {
    return new Promise( function( resolve, reject ) {
      if ( action.data ) {
        if (serverDataBase[ action.name ] !== undefined) {
          serverDataBase[ action.name ].push( action.data );
        } else {
          serverDataBase[ action.name ] = [ action.data ];
        }
        console.log('serverDataBase', serverDataBase);
        resolve({
          type: 'report',
          data: ('Сервер получил данные: ' + action.data)
        });
      } else {
        reject( console.error( 'Ошибка в данных, отправленых серверу' ));
      }
    })
  };

  function queryBaseToServer() {
    console.info( 'Отправка базы данных c сервера в Store' );
    return new Promise( function( resolve, reject ) {
      if ( serverDataBase ) {
        resolve( serverDataBase );
      } else {
        reject( console.error( 'Отправка данных с сервера не удалась' ));
      }
    })
  }

  return {
    sendToServer: sendToServer,
    queryBaseToServer: queryBaseToServer
  }
})();
