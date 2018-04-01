(function() {

  var serverReport = document.querySelector( '.view-stub__label' );

  function createNewEvent( evt, elem, data ) {
    var newEvent = new CustomEvent( evt, {
      cancelable: true,
      detail: data
    });
    elem.dispatchEvent( newEvent );
  };

  window.store = {
    handlerAction: function( action ) {
      logging( 'Store получил Action', action );
      switch( action.name ) {
        case 'data-input':
          if (action.data) {
            new Promise( function( resolve, reject ) {
              logging('Store отправляет данные на сервер');
              try {
                var result = server.sendToServer(action.data);
              } catch (err) {
                reject( new Error( 'Ошибка при получении данных сервером' ) );
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
              createNewEvent( 'change', serverReport, report );
            })
            .catch( function( err ) {
              logging( err );
            });

          } else {
            logging( 'Action, полученный Store, содержит некоректные данные' );
          }
          break;
        default:
          logging( 'Store не содержит инструкций для этого события' );
      }
    }
  };

})();
