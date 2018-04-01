var dispatcher = {
  dispatch: function( action ) {
    logging( 'Получение Dispatcher нового Action' );

    logging( 'Вызов обработчика Actione из Store' );
    store.handlerAction( action );
  }
};

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

  var handlerChange = {
    'input': function( action ) {
      logging( 'Store отправляет данные на сервер', action.data );
      return server.sendToServer( action.data )
        .then( function( result ) {
          logging( 'Store запрашивает данные с сервера' );
          return server.queryToServer( 'report' );
        })
        .then( function ( report ) {
          logging( 'Store вызывает событие изменения' );
          createNewEvent( 'change', interfaceBlocks.serverLog, report );
        })
        .catch( function( err ) {
          logging( err );
        })
    }
  }

  window.store = {
    handlerAction: function( action ) {
      logging( 'Store получил Action', action );
      if ( action.data ) {
        if ( handlerChange[ action.name ] ) {
          logging( 'Store обрабатывает полученное событие' );
          handlerChange[ action.name ]( action );
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

  serverReport.addEventListener( 'change', function( evt ) {
    evt.preventDefault();
    logging( 'View реагирует на изменение' );

    logging( 'View перерисовывает блок с новыми данными' );
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BhdGNoZXIuanMiLCJzZXJ2ZXIuanMiLCJzdG9yZS5qcyIsInZpZXcuanMiLCJ1dGlsL2xvZ2dpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcGF0Y2hlciA9IHtcbiAgZGlzcGF0Y2g6IGZ1bmN0aW9uKCBhY3Rpb24gKSB7XG4gICAgbG9nZ2luZyggJ9Cf0L7Qu9GD0YfQtdC90LjQtSBEaXNwYXRjaGVyINC90L7QstC+0LPQviBBY3Rpb24nICk7XG5cbiAgICBsb2dnaW5nKCAn0JLRi9C30L7QsiDQvtCx0YDQsNCx0L7RgtGH0LjQutCwIEFjdGlvbmUg0LjQtyBTdG9yZScgKTtcbiAgICBzdG9yZS5oYW5kbGVyQWN0aW9uKCBhY3Rpb24gKTtcbiAgfVxufTtcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIGRhdGFCYXNlID0ge1xuICAgIHJlcG9ydDogW11cbiAgfTtcblxuICB3aW5kb3cuc2VydmVyID0ge1xuICAgIHNlbmRUb1NlcnZlcjogZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICBsb2dnaW5nKCAn0KHQtdGA0LLQtdGAINC/0YDQuNC90Y/QuyDQtNCw0L3QvdGL0LUg0L7RgiBTdG9yZScsIGRhdGEgKTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSggZnVuY3Rpb24oIHJlc29sdmUsIHJlamVjdCApIHtcbiAgICAgICAgaWYgKCBkYXRhICkge1xuICAgICAgICAgIGRhdGFCYXNlLnJlcG9ydC5wdXNoKCBkYXRhICk7XG4gICAgICAgICAgcmVzb2x2ZSggdHJ1ZSApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdCggbG9nZ2luZyggJ9Ce0YjQuNCx0LrQsCDQsiDQtNCw0L3QvdGL0YUsINC+0YLQv9GA0LDQstC70LXQvdGL0YUg0YHQtdGA0LLQtdGA0YMnICkpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgcXVlcnlUb1NlcnZlcjogZnVuY3Rpb24gKCBkYXRhICkge1xuICAgICAgbG9nZ2luZyggJ9Ce0YLQv9GA0LDQstC60LAg0LTQsNC90L3Ri9GFIGMg0YHQtdGA0LLQtdGA0LAg0LIgU3RvcmUnICk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoIGZ1bmN0aW9uKCByZXNvbHZlLCByZWplY3QgKSB7XG4gICAgICAgIGlmICggZGF0YSApIHtcbiAgICAgICAgICByZXNvbHZlKCBkYXRhQmFzZVsgZGF0YSBdICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVqZWN0KCBsb2dnaW5nKCAn0J7RgtC/0YDQsNCy0LrQsCDQtNCw0L3QvdGL0YUg0YEg0YHQtdGA0LLQtdGA0LAg0L3QtSDRg9C00LDQu9Cw0YHRjCcgKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9O1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcblxuICB2YXIgaW50ZXJmYWNlQmxvY2tzID0ge1xuICAgIHNlcnZlckxvZzogZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy52aWV3LXN0dWJfX2xhYmVsJyApXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOZXdFdmVudCggZXZ0LCBlbGVtLCBkYXRhICkge1xuICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudCggZXZ0LCB7XG4gICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgZGV0YWlsOiBkYXRhXG4gICAgfSk7XG4gICAgZWxlbS5kaXNwYXRjaEV2ZW50KCBuZXdFdmVudCApO1xuICB9O1xuXG4gIHZhciBoYW5kbGVyQ2hhbmdlID0ge1xuICAgICdpbnB1dCc6IGZ1bmN0aW9uKCBhY3Rpb24gKSB7XG4gICAgICBsb2dnaW5nKCAnU3RvcmUg0L7RgtC/0YDQsNCy0LvRj9C10YIg0LTQsNC90L3Ri9C1INC90LAg0YHQtdGA0LLQtdGAJywgYWN0aW9uLmRhdGEgKTtcbiAgICAgIHJldHVybiBzZXJ2ZXIuc2VuZFRvU2VydmVyKCBhY3Rpb24uZGF0YSApXG4gICAgICAgIC50aGVuKCBmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGxvZ2dpbmcoICdTdG9yZSDQt9Cw0L/RgNCw0YjQuNCy0LDQtdGCINC00LDQvdC90YvQtSDRgSDRgdC10YDQstC10YDQsCcgKTtcbiAgICAgICAgICByZXR1cm4gc2VydmVyLnF1ZXJ5VG9TZXJ2ZXIoICdyZXBvcnQnICk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCBmdW5jdGlvbiAoIHJlcG9ydCApIHtcbiAgICAgICAgICBsb2dnaW5nKCAnU3RvcmUg0LLRi9C30YvQstCw0LXRgiDRgdC+0LHRi9GC0LjQtSDQuNC30LzQtdC90LXQvdC40Y8nICk7XG4gICAgICAgICAgY3JlYXRlTmV3RXZlbnQoICdjaGFuZ2UnLCBpbnRlcmZhY2VCbG9ja3Muc2VydmVyTG9nLCByZXBvcnQgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCBmdW5jdGlvbiggZXJyICkge1xuICAgICAgICAgIGxvZ2dpbmcoIGVyciApO1xuICAgICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHdpbmRvdy5zdG9yZSA9IHtcbiAgICBoYW5kbGVyQWN0aW9uOiBmdW5jdGlvbiggYWN0aW9uICkge1xuICAgICAgbG9nZ2luZyggJ1N0b3JlINC/0L7Qu9GD0YfQuNC7IEFjdGlvbicsIGFjdGlvbiApO1xuICAgICAgaWYgKCBhY3Rpb24uZGF0YSApIHtcbiAgICAgICAgaWYgKCBoYW5kbGVyQ2hhbmdlWyBhY3Rpb24ubmFtZSBdICkge1xuICAgICAgICAgIGxvZ2dpbmcoICdTdG9yZSDQvtCx0YDQsNCx0LDRgtGL0LLQsNC10YIg0L/QvtC70YPRh9C10L3QvdC+0LUg0YHQvtCx0YvRgtC40LUnICk7XG4gICAgICAgICAgaGFuZGxlckNoYW5nZVsgYWN0aW9uLm5hbWUgXSggYWN0aW9uICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nZ2luZyggJ1N0b3JlINC90LUg0YHQvtC00LXRgNC20LjRgiDQuNC90YHRgtGA0YPQutGG0LjQuSDQtNC70Y8g0Y3RgtC+0LPQviDRgdC+0LHRi9GC0LjRjycgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nZ2luZyggJ0FjdGlvbiwg0L/QvtC70YPRh9C10L3QvdGL0LkgU3RvcmUsINGB0L7QtNC10YDQttC40YIg0L3QtdC60L7RgNC10LrRgtC90YvQtSDQtNCw0L3QvdGL0LUnICk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuXG4gIHZhciB2aWV3U3R1YiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcudmlldy1zdHViJyApO1xuICB2YXIgaW5wdXQgPSB2aWV3U3R1Yi5xdWVyeVNlbGVjdG9yKCAnLnZpZXctc3R1Yl9faW5wdXQnICk7XG4gIHZhciBidXR0b24gPSB2aWV3U3R1Yi5xdWVyeVNlbGVjdG9yKCAnLnZpZXctc3R1Yl9fYXBwbHknICk7XG4gIHZhciBzZXJ2ZXJSZXBvcnQgPSB2aWV3U3R1Yi5xdWVyeVNlbGVjdG9yKCAnLnZpZXctc3R1Yl9fbGFiZWwnICk7XG5cbiAgZnVuY3Rpb24gQWN0aW9uKCBuYW1lLCBkYXRhICkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfTtcblxuICB2YXIgcmVuZGVyID0ge1xuICAgIHJlcG9ydDogZnVuY3Rpb24gKCByZXBvcnRMaXN0ICkge1xuICAgICAgdmFyIHJlcG9ydEJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgICByZXBvcnRMaXN0LmZvckVhY2goZnVuY3Rpb24oIGl0ZW0gKSB7XG4gICAgICAgIHZhciByZXBvcnRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2RpdicgKTtcblxuICAgICAgICByZXBvcnRJdGVtLnRleHRDb250ZW50ID0gaXRlbTtcbiAgICAgICAgcmVwb3J0QmxvY2suYXBwZW5kQ2hpbGQoIHJlcG9ydEl0ZW0gKTtcbiAgICAgIH0pO1xuXG4gICAgICBzZXJ2ZXJSZXBvcnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICBzZXJ2ZXJSZXBvcnQuYXBwZW5kQ2hpbGQoIHJlcG9ydEJsb2NrICk7XG4gICAgfSxcbiAgICBpbnB1dDogZnVuY3Rpb24oKSB7XG4gICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfTtcblxuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgZnVuY3Rpb24oIGV2dCApIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciB2YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgIHZhciBuZXdBY3Rpb24gPSBuZXcgQWN0aW9uKCAnaW5wdXQnLCB2YWx1ZSApO1xuICAgIGxvZ2dpbmcoICfQodC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviBBY3Rpb24g0LIgVmlldycsIG5ld0FjdGlvbiApO1xuXG4gICAgbG9nZ2luZyggJ9Cf0LXRgNC10LTQsNGH0LAg0L3QvtCy0L7Qs9C+IEFjdGlvbiDQuNC3IFZpZXcg0LIgRGlzcGF0Y2hlcicgKTtcbiAgICBkaXNwYXRjaGVyLmRpc3BhdGNoKCBuZXdBY3Rpb24gKTtcblxuICAgIHJlbmRlci5pbnB1dCgpO1xuICB9KTtcblxuICBzZXJ2ZXJSZXBvcnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NoYW5nZScsIGZ1bmN0aW9uKCBldnQgKSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbG9nZ2luZyggJ1ZpZXcg0YDQtdCw0LPQuNGA0YPQtdGCINC90LAg0LjQt9C80LXQvdC10L3QuNC1JyApO1xuXG4gICAgbG9nZ2luZyggJ1ZpZXcg0L/QtdGA0LXRgNC40YHQvtCy0YvQstCw0LXRgiDQsdC70L7QuiDRgSDQvdC+0LLRi9C80Lgg0LTQsNC90L3Ri9C80LgnICk7XG4gICAgcmVuZGVyLnJlcG9ydCggZXZ0LmRldGFpbCApO1xuICB9KTtcblxufSkoKTtcbiIsInZhciBsb2dnaW5nID0gZnVuY3Rpb24oIG1lc3NhZ2UsIG9iamVjdCApIHtcblxuICB2YXIgcGFnZUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcubG9nJyApO1xuICB2YXIgbmV3TG9nSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cbiAgaWYgKCBvYmplY3QgKSB7XG4gICAgbmV3TG9nSXRlbS50ZXh0Q29udGVudCA9IG1lc3NhZ2UgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkoIG9iamVjdCApO1xuICAgIGNvbnNvbGUubG9nKCBtZXNzYWdlLCBvYmplY3QgKTtcbiAgfSBlbHNlIHtcbiAgICBuZXdMb2dJdGVtLmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgY29uc29sZS5sb2coIG1lc3NhZ2UgKTtcbiAgfVxuICBwYWdlTG9nLmFwcGVuZENoaWxkKCBuZXdMb2dJdGVtICk7XG59O1xuIl19
