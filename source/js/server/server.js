var server = (function() {
  var dataBase = {};

  function sendToServer( action ) {
    return new Promise( function( resolve, reject ) {
      if ( action.data ) {
        if (!dataBase[ action.name ]) {
          dataBase[ action.name ] = [];
        }
        dataBase[ action.name ].push( action.data );
        resolve( {
          type: 'report',
          data: 'Сервер получил данные: ' + action.data
        });
      } else {
        reject( console.error( 'Ошибка в данных, отправленых серверу' ));
      }
    })
  };

  function queryBaseToServer() {
    console.info( 'Отправка базы данных c сервера в Store' );
    return new Promise( function( resolve, reject ) {
      if ( dataBase ) {
        resolve( dataBase );
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
