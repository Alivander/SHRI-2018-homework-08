var dispatcher = {
  dispatch: function( action ) {
    logging( 'Получение Dispatcher нового Action' );

    logging( 'Вызов обработчика Actione из Store' );
    store.handlerAction(action);
  }
};

(function() {
  var dataBase = {
    report: []
  };

  window.server = {
    sendToServer: function( data ) {
      logging( 'Сервер принял данные от Store', data );

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

(function() {

  var interfaceBlocks = {
    serverLog: document.querySelector( '.view-stub__label' )
  }

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
      if ( action.data ) {
        if ( 'input' ) {
          logging( 'Store обрабатывает полученное событие' );
          new Promise( function( resolve, reject ) {
            logging('Store отправляет данные на сервер');
            try {
              var result = server.sendToServer( action.data );
            } catch ( err ) {
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
            createNewEvent( 'change', interfaceBlocks.serverLog, report );
          })
          .catch( function( err ) {
            logging( err );
          })
        } else {
          logging( 'Store не содержит инструкций для этого события' );
        }
      } else {
        logging( 'Action, полученный Store, содержит некоректные данные' );
      }
    }
  };

})();

(function() {

  var viewStub = document.querySelector( '.view-stub' );
  var input = viewStub.querySelector( '.view-stub__input' );
  var button = viewStub.querySelector( '.view-stub__apply' );
  var serverReport = viewStub.querySelector( '.view-stub__label' );

  function Action( name, data ) {
    this.name = name;
    this.data = data;
  };

  var render = {
    report: function ( reportList ) {
      var reportBlock = document.createDocumentFragment();

      reportList.forEach(function( item ) {
        var reportItem = document.createElement( 'div' );

        reportItem.textContent = item;
        reportBlock.appendChild( reportItem );
      });

      serverReport.innerHTML = '';
      serverReport.appendChild( reportBlock );
    },
    input: function() {
      input.value = '';
    }
  };

  button.addEventListener( 'click', function( evt ) {
    evt.preventDefault();

    var value = input.value;
    var newAction = new Action( 'input', value );
    logging( 'Создание нового Action в View', newAction );

    logging( 'Передача нового Action из View в Dispatcher' );
    dispatcher.dispatch( newAction );

    render.input();
  });

  serverReport.addEventListener('change', function( evt ) {
    evt.preventDefault();
    logging('View реагирует на изменение');

    logging('View перерисовывает блок с новыми данными');
    render.report( evt.detail );
  });

})();

var logging = function( message, object ) {

  var pageLog = document.querySelector( '.log' );
  var newLogItem = document.createElement( 'div' );

  if ( object ) {
    newLogItem.textContent = message + ': ' + JSON.stringify( object );
    console.log( message, object );
  } else {
    newLogItem.innerHTML = message;
    console.log( message );
  }
  pageLog.appendChild( newLogItem );
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BhdGNoZXIuanMiLCJzZXJ2ZXIuanMiLCJzdG9yZS5qcyIsInZpZXcuanMiLCJ1dGlsL2xvZ2dpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3BhdGNoZXIgPSB7XG4gIGRpc3BhdGNoOiBmdW5jdGlvbiggYWN0aW9uICkge1xuICAgIGxvZ2dpbmcoICfQn9C+0LvRg9GH0LXQvdC40LUgRGlzcGF0Y2hlciDQvdC+0LLQvtCz0L4gQWN0aW9uJyApO1xuXG4gICAgbG9nZ2luZyggJ9CS0YvQt9C+0LIg0L7QsdGA0LDQsdC+0YLRh9C40LrQsCBBY3Rpb25lINC40LcgU3RvcmUnICk7XG4gICAgc3RvcmUuaGFuZGxlckFjdGlvbihhY3Rpb24pO1xuICB9XG59O1xuIiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgZGF0YUJhc2UgPSB7XG4gICAgcmVwb3J0OiBbXVxuICB9O1xuXG4gIHdpbmRvdy5zZXJ2ZXIgPSB7XG4gICAgc2VuZFRvU2VydmVyOiBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgIGxvZ2dpbmcoICfQodC10YDQstC10YAg0L/RgNC40L3Rj9C7INC00LDQvdC90YvQtSDQvtGCIFN0b3JlJywgZGF0YSApO1xuXG4gICAgICBpZiAoIGRhdGEgKSB7XG4gICAgICAgIGRhdGFCYXNlLnJlcG9ydC5wdXNoKCBkYXRhICk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAn0J7RiNC40LHQutCwINCyINC00LDQvdC90YvRhSwg0L7RgtC/0YDQsNCy0LvQtdC90YvRhSDRgdC10YDQstC10YDRgycgKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHF1ZXJ5VG9TZXJ2ZXI6IGZ1bmN0aW9uICggZGF0YSApIHtcbiAgICAgIGxvZ2dpbmcoICfQntGC0L/RgNCw0LLQutCwINC00LDQvdC90YvRhSBjINGB0LXRgNCy0LXRgNCwINCyIFN0b3JlJyApO1xuICAgICAgcmV0dXJuIGRhdGFCYXNlWyBkYXRhIF07XG4gICAgfVxuICB9O1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcblxuICB2YXIgaW50ZXJmYWNlQmxvY2tzID0ge1xuICAgIHNlcnZlckxvZzogZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy52aWV3LXN0dWJfX2xhYmVsJyApXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOZXdFdmVudCggZXZ0LCBlbGVtLCBkYXRhICkge1xuICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudCggZXZ0LCB7XG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgZGV0YWlsOiBkYXRhXG4gICAgfSk7XG4gICAgZWxlbS5kaXNwYXRjaEV2ZW50KCBuZXdFdmVudCApO1xuICB9O1xuXG4gIHdpbmRvdy5zdG9yZSA9IHtcbiAgICBoYW5kbGVyQWN0aW9uOiBmdW5jdGlvbiggYWN0aW9uICkge1xuICAgICAgbG9nZ2luZyggJ1N0b3JlINC/0L7Qu9GD0YfQuNC7IEFjdGlvbicsIGFjdGlvbiApO1xuICAgICAgaWYgKCBhY3Rpb24uZGF0YSApIHtcbiAgICAgICAgaWYgKCAnaW5wdXQnICkge1xuICAgICAgICAgIGxvZ2dpbmcoICdTdG9yZSDQvtCx0YDQsNCx0LDRgtGL0LLQsNC10YIg0L/QvtC70YPRh9C10L3QvdC+0LUg0YHQvtCx0YvRgtC40LUnICk7XG4gICAgICAgICAgbmV3IFByb21pc2UoIGZ1bmN0aW9uKCByZXNvbHZlLCByZWplY3QgKSB7XG4gICAgICAgICAgICBsb2dnaW5nKCdTdG9yZSDQvtGC0L/RgNCw0LLQu9GP0LXRgiDQtNCw0L3QvdGL0LUg0L3QsCDRgdC10YDQstC10YAnKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHZhciByZXN1bHQgPSBzZXJ2ZXIuc2VuZFRvU2VydmVyKCBhY3Rpb24uZGF0YSApO1xuICAgICAgICAgICAgfSBjYXRjaCAoIGVyciApIHtcbiAgICAgICAgICAgICAgcmVqZWN0KCBuZXcgRXJyb3IoICfQntGI0LjQsdC60LAg0L/RgNC4INC+0YLQv9GA0LDQstC60LUg0LTQsNC90L3Ri9GFINGB0LXRgNCy0LXRgNGDJyApICk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVzb2x2ZSggcmVzdWx0ICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbiggZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICAgIGxvZ2dpbmcoICdTdG9yZSDQt9Cw0L/RgNCw0YjQuNCy0LDQtdGCINC00LDQvdC90YvQtSDRgSDRgdC10YDQstC10YDQsCcgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlcnZlci5xdWVyeVRvU2VydmVyKCAncmVwb3J0JyApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oIGZ1bmN0aW9uICggcmVwb3J0ICkge1xuICAgICAgICAgICAgbG9nZ2luZyggJ1N0b3JlINCy0YvQt9GL0LLQsNC10YIg0YHQvtCx0YvRgtC40LUg0LjQt9C80LXQvdC10L3QuNGPJyApO1xuICAgICAgICAgICAgY3JlYXRlTmV3RXZlbnQoICdjaGFuZ2UnLCBpbnRlcmZhY2VCbG9ja3Muc2VydmVyTG9nLCByZXBvcnQgKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCggZnVuY3Rpb24oIGVyciApIHtcbiAgICAgICAgICAgIGxvZ2dpbmcoIGVyciApO1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nZ2luZyggJ1N0b3JlINC90LUg0YHQvtC00LXRgNC20LjRgiDQuNC90YHRgtGA0YPQutGG0LjQuSDQtNC70Y8g0Y3RgtC+0LPQviDRgdC+0LHRi9GC0LjRjycgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nZ2luZyggJ0FjdGlvbiwg0L/QvtC70YPRh9C10L3QvdGL0LkgU3RvcmUsINGB0L7QtNC10YDQttC40YIg0L3QtdC60L7RgNC10LrRgtC90YvQtSDQtNCw0L3QvdGL0LUnICk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG4gIHZhciB2aWV3U3R1YiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcudmlldy1zdHViJyApO1xuICB2YXIgaW5wdXQgPSB2aWV3U3R1Yi5xdWVyeVNlbGVjdG9yKCAnLnZpZXctc3R1Yl9faW5wdXQnICk7XG4gIHZhciBidXR0b24gPSB2aWV3U3R1Yi5xdWVyeVNlbGVjdG9yKCAnLnZpZXctc3R1Yl9fYXBwbHknICk7XG4gIHZhciBzZXJ2ZXJSZXBvcnQgPSB2aWV3U3R1Yi5xdWVyeVNlbGVjdG9yKCAnLnZpZXctc3R1Yl9fbGFiZWwnICk7XG5cbiAgZnVuY3Rpb24gQWN0aW9uKCBuYW1lLCBkYXRhICkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfTtcblxuICB2YXIgcmVuZGVyID0ge1xuICAgIHJlcG9ydDogZnVuY3Rpb24gKCByZXBvcnRMaXN0ICkge1xuICAgICAgdmFyIHJlcG9ydEJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICByZXBvcnRMaXN0LmZvckVhY2goZnVuY3Rpb24oIGl0ZW0gKSB7XG4gICAgICAgIHZhciByZXBvcnRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblxuICAgICAgICByZXBvcnRJdGVtLnRleHRDb250ZW50ID0gaXRlbTtcbiAgICAgICAgcmVwb3J0QmxvY2suYXBwZW5kQ2hpbGQoIHJlcG9ydEl0ZW0gKTtcbiAgICAgIH0pO1xuXG4gICAgICBzZXJ2ZXJSZXBvcnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICBzZXJ2ZXJSZXBvcnQuYXBwZW5kQ2hpbGQoIHJlcG9ydEJsb2NrICk7XG4gICAgfSxcbiAgICBpbnB1dDogZnVuY3Rpb24oKSB7XG4gICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfTtcblxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZnVuY3Rpb24oIGV2dCApIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgIHZhciBuZXdBY3Rpb24gPSBuZXcgQWN0aW9uKCAnaW5wdXQnLCB2YWx1ZSApO1xuICAgIGxvZ2dpbmcoICfQodC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviBBY3Rpb24g0LIgVmlldycsIG5ld0FjdGlvbiApO1xuXG4gICAgbG9nZ2luZyggJ9Cf0LXRgNC10LTQsNGH0LAg0L3QvtCy0L7Qs9C+IEFjdGlvbiDQuNC3IFZpZXcg0LIgRGlzcGF0Y2hlcicgKTtcbiAgICBkaXNwYXRjaGVyLmRpc3BhdGNoKCBuZXdBY3Rpb24gKTtcblxuICAgIHJlbmRlci5pbnB1dCgpO1xuICB9KTtcblxuICBzZXJ2ZXJSZXBvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oIGV2dCApIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsb2dnaW5nKCdWaWV3INGA0LXQsNCz0LjRgNGD0LXRgiDQvdCwINC40LfQvNC10L3QtdC90LjQtScpO1xuXG4gICAgbG9nZ2luZygnVmlldyDQv9C10YDQtdGA0LjRgdC+0LLRi9Cy0LDQtdGCINCx0LvQvtC6INGBINC90L7QstGL0LzQuCDQtNCw0L3QvdGL0LzQuCcpO1xuICAgIHJlbmRlci5yZXBvcnQoIGV2dC5kZXRhaWwgKTtcbiAgfSk7XG5cbn0pKCk7XG4iLCJ2YXIgbG9nZ2luZyA9IGZ1bmN0aW9uKCBtZXNzYWdlLCBvYmplY3QgKSB7XG5cbiAgdmFyIHBhZ2VMb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmxvZycgKTtcbiAgdmFyIG5ld0xvZ0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXG4gIGlmICggb2JqZWN0ICkge1xuICAgIG5ld0xvZ0l0ZW0udGV4dENvbnRlbnQgPSBtZXNzYWdlICsgJzogJyArIEpTT04uc3RyaW5naWZ5KCBvYmplY3QgKTtcbiAgICBjb25zb2xlLmxvZyggbWVzc2FnZSwgb2JqZWN0ICk7XG4gIH0gZWxzZSB7XG4gICAgbmV3TG9nSXRlbS5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIGNvbnNvbGUubG9nKCBtZXNzYWdlICk7XG4gIH1cbiAgcGFnZUxvZy5hcHBlbmRDaGlsZCggbmV3TG9nSXRlbSApO1xufTtcbiJdfQ==
