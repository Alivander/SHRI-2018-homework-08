(function() {

  var serverLog = document.querySelector( '.view-stub__label' );

  function createNewEvent( evt, elem, data ) {
    var newEvent = new CustomEvent( evt, {
      cancelable: true,
      detail: data
    });
    elem.dispatchEvent( newEvent );
  };

  var handlerChange = {
    'data-input': new Promise( function( resolve, reject ) {
        logging('Store отправляет данные на сервер');
        try {
          var result = server.sendToServer(action.data);
        } catch (err) {
          reject( new Error( 'Ошибка при отправке данных серверу' ) );
        };
        resolve( result );
      })
      .then( function( result ) {
        logging( 'Store запрашивает данные с сервера' );
        if (result) {
          return server.queryToServer( 'report' );
        }
      })
      .then( function ( report ) {
        logging( 'Store вызывает событие изменения' );
        createNewEvent( 'change', serverLog, report );
      })
      .catch( function( err ) {
        logging( err );
      })
  }

  window.store = {
    handlerAction: function( action ) {
      logging( 'Store получил Action', action );
      if ( action.data ) {
        if ( handlerChange[ action.name ] ) {
          logging( 'Store обрабатывает полученное событие' );
          handlerChange[ action.name ]();
        } else {
          logging( 'Store не содержит инструкций для этого события' );
        }
      } else {
        logging( 'Action, полученный Store, содержит некоректные данные' );
      }
    }
  };

})();
