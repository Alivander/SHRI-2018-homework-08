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
        reject( logging( 'Ошибка в данных, отправленых серверу' ));
      }
    })
  };

  function queryBaseToServer() {
    logging( 'Отправка базы данных c сервера в Store' );
    return new Promise( function( resolve, reject ) {
      if ( dataBase ) {
        resolve( dataBase );
      } else {
        reject( logging( 'Отправка данных с сервера не удалась' ));
      }
    })
  }

  return {
    sendToServer: sendToServer,
    queryBaseToServer: queryBaseToServer
  }
})();
