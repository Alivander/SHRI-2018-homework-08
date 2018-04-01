(function() {
  var dataBase = {
    report: []
  };

  window.server = {
    sendToServer: function( data ) {
      logging( 'Сервер принял данные от Store', data );
      return new Promise( function( resolve, reject ) {
        if ( data ) {
          dataBase.report.push( data );
          resolve( true );
        } else {
          reject( logging( 'Ошибка в данных, отправленых серверу' ));
        }
      })
    },
    queryToServer: function ( data ) {
      logging( 'Отправка данных c сервера в Store' );
      return new Promise( function( resolve, reject ) {
        if ( data ) {
          resolve( dataBase[ data ] );
        } else {
          reject( logging( 'Отправка данных с сервера не удалась' ));
        }
      })
    }
  };
})();
