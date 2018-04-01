(function() {
  var dataBase = {
    report: []
  };

  window.server = {
    sendToServer: function( data ) {
        logging( 'Сервер получил данные от Store', data );

        if ( data ) {
          dataBase.report.push( data );
          return true;
        } else {
          throw new Error( 'Ошибка в данных, отправленых серверу' );
        }
    },
    queryToServer: function ( data ) {
      logging( 'Отправка данных c сервера в Store' );
      return dataBase[ data ];
    }
  };
})();
