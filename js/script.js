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
    var newAction = new Action( 'data-input', value );
    logging( 'Создание нового Action в View', newAction );

    render.input();

    logging( 'Передача нового Action из View в Dispatcher' );
    dispatcher.dispatch( newAction );
  });

  serverReport.addEventListener('change', function( evt ) {
    evt.preventDefault();
    logging('View реагирует на изменение');

    logging('View перерисовывает блок с новыми данными');
    render.report( evt.detail );
  });





// componentDidMount: function() {
//     store.bind( 'change', this.listChanged );
// },
//
// componentWillUnmount: function() {
//     store.unbind( 'change', this.listChanged );
// },

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BhdGNoZXIuanMiLCJzZXJ2ZXIuanMiLCJzdG9yZS5qcyIsInZpZXcuanMiLCJ1dGlsL2xvZ2dpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwYXRjaGVyID0ge1xuICBkaXNwYXRjaDogZnVuY3Rpb24oIGFjdGlvbiApIHtcbiAgICBsb2dnaW5nKCAn0J/QvtC70YPRh9C10L3QuNC1IERpc3BhdGNoZXIg0L3QvtCy0L7Qs9C+IEFjdGlvbicgKTtcblxuICAgIGxvZ2dpbmcoICfQktGL0LfQvtCyINC+0LHRgNCw0LHQvtGC0YfQuNC60LAgQWN0aW9uZSDQuNC3IFN0b3JlJyApO1xuICAgIHN0b3JlLmhhbmRsZXJBY3Rpb24oYWN0aW9uKTtcbiAgfVxufTtcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIGRhdGFCYXNlID0ge1xuICAgIHJlcG9ydDogW11cbiAgfTtcblxuICB3aW5kb3cuc2VydmVyID0ge1xuICAgIHNlbmRUb1NlcnZlcjogZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICBsb2dnaW5nKCAn0KHQtdGA0LLQtdGAINC/0L7Qu9GD0YfQuNC7INC00LDQvdC90YvQtSDQvtGCIFN0b3JlJywgZGF0YSApO1xuXG4gICAgICBpZiAoIGRhdGEgKSB7XG4gICAgICAgIGRhdGFCYXNlLnJlcG9ydC5wdXNoKCBkYXRhICk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAn0J7RiNC40LHQutCwINCyINC00LDQvdC90YvRhSwg0L7RgtC/0YDQsNCy0LvQtdC90YvRhSDRgdC10YDQstC10YDRgycgKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHF1ZXJ5VG9TZXJ2ZXI6IGZ1bmN0aW9uICggZGF0YSApIHtcbiAgICAgIGxvZ2dpbmcoICfQntGC0L/RgNCw0LLQutCwINC00LDQvdC90YvRhSBjINGB0LXRgNCy0LXRgNCwINCyIFN0b3JlJyApO1xuICAgICAgcmV0dXJuIGRhdGFCYXNlWyBkYXRhIF07XG4gICAgfVxuICB9O1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcblxuICB2YXIgc2VydmVyTG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy52aWV3LXN0dWJfX2xhYmVsJyApO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5ld0V2ZW50KCBldnQsIGVsZW0sIGRhdGEgKSB7XG4gICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCBldnQsIHtcbiAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICBkZXRhaWw6IGRhdGFcbiAgICB9KTtcbiAgICBlbGVtLmRpc3BhdGNoRXZlbnQoIG5ld0V2ZW50ICk7XG4gIH07XG5cbiAgdmFyIGhhbmRsZXJDaGFuZ2UgPSB7XG4gICAgJ2RhdGEtaW5wdXQnOiBuZXcgUHJvbWlzZSggZnVuY3Rpb24oIHJlc29sdmUsIHJlamVjdCApIHtcbiAgICAgICAgbG9nZ2luZygnU3RvcmUg0L7RgtC/0YDQsNCy0LvRj9C10YIg0LTQsNC90L3Ri9C1INC90LAg0YHQtdGA0LLQtdGAJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHNlcnZlci5zZW5kVG9TZXJ2ZXIoYWN0aW9uLmRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoIG5ldyBFcnJvciggJ9Ce0YjQuNCx0LrQsCDQv9GA0Lgg0L7RgtC/0YDQsNCy0LrQtSDQtNCw0L3QvdGL0YUg0YHQtdGA0LLQtdGA0YMnICkgKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVzb2x2ZSggcmVzdWx0ICk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oIGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgIGxvZ2dpbmcoICdTdG9yZSDQt9Cw0L/RgNCw0YjQuNCy0LDQtdGCINC00LDQvdC90YvQtSDRgSDRgdC10YDQstC10YDQsCcgKTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBzZXJ2ZXIucXVlcnlUb1NlcnZlciggJ3JlcG9ydCcgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKCBmdW5jdGlvbiAoIHJlcG9ydCApIHtcbiAgICAgICAgbG9nZ2luZyggJ1N0b3JlINCy0YvQt9GL0LLQsNC10YIg0YHQvtCx0YvRgtC40LUg0LjQt9C80LXQvdC10L3QuNGPJyApO1xuICAgICAgICBjcmVhdGVOZXdFdmVudCggJ2NoYW5nZScsIHNlcnZlckxvZywgcmVwb3J0ICk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKCBmdW5jdGlvbiggZXJyICkge1xuICAgICAgICBsb2dnaW5nKCBlcnIgKTtcbiAgICAgIH0pXG4gIH1cblxuICB3aW5kb3cuc3RvcmUgPSB7XG4gICAgaGFuZGxlckFjdGlvbjogZnVuY3Rpb24oIGFjdGlvbiApIHtcbiAgICAgIGxvZ2dpbmcoICdTdG9yZSDQv9C+0LvRg9GH0LjQuyBBY3Rpb24nLCBhY3Rpb24gKTtcbiAgICAgIGlmICggYWN0aW9uLmRhdGEgKSB7XG4gICAgICAgIGlmICggaGFuZGxlckNoYW5nZVsgYWN0aW9uLm5hbWUgXSApIHtcbiAgICAgICAgICBsb2dnaW5nKCAnU3RvcmUg0L7QsdGA0LDQsdCw0YLRi9Cy0LDQtdGCINC/0L7Qu9GD0YfQtdC90L3QvtC1INGB0L7QsdGL0YLQuNC1JyApO1xuICAgICAgICAgIGhhbmRsZXJDaGFuZ2VbIGFjdGlvbi5uYW1lIF0oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dnaW5nKCAnU3RvcmUg0L3QtSDRgdC+0LTQtdGA0LbQuNGCINC40L3RgdGC0YDRg9C60YbQuNC5INC00LvRjyDRjdGC0L7Qs9C+INGB0L7QsdGL0YLQuNGPJyApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2dnaW5nKCAnQWN0aW9uLCDQv9C+0LvRg9GH0LXQvdC90YvQuSBTdG9yZSwg0YHQvtC00LXRgNC20LjRgiDQvdC10LrQvtGA0LXQutGC0L3Ri9C1INC00LDQvdC90YvQtScgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHZpZXdTdHViID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy52aWV3LXN0dWInICk7XG4gIHZhciBpbnB1dCA9IHZpZXdTdHViLnF1ZXJ5U2VsZWN0b3IoICcudmlldy1zdHViX19pbnB1dCcgKTtcbiAgdmFyIGJ1dHRvbiA9IHZpZXdTdHViLnF1ZXJ5U2VsZWN0b3IoICcudmlldy1zdHViX19hcHBseScgKTtcbiAgdmFyIHNlcnZlclJlcG9ydCA9IHZpZXdTdHViLnF1ZXJ5U2VsZWN0b3IoICcudmlldy1zdHViX19sYWJlbCcgKTtcblxuICBmdW5jdGlvbiBBY3Rpb24oIG5hbWUsIGRhdGEgKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9O1xuXG4gIHZhciByZW5kZXIgPSB7XG4gICAgcmVwb3J0OiBmdW5jdGlvbiAoIHJlcG9ydExpc3QgKSB7XG4gICAgICB2YXIgcmVwb3J0QmxvY2sgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICAgIHJlcG9ydExpc3QuZm9yRWFjaChmdW5jdGlvbiggaXRlbSApIHtcbiAgICAgICAgdmFyIHJlcG9ydEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXG4gICAgICAgIHJlcG9ydEl0ZW0udGV4dENvbnRlbnQgPSBpdGVtO1xuICAgICAgICByZXBvcnRCbG9jay5hcHBlbmRDaGlsZCggcmVwb3J0SXRlbSApO1xuICAgICAgfSk7XG5cbiAgICAgIHNlcnZlclJlcG9ydC5pbm5lckhUTUwgPSAnJztcbiAgICAgIHNlcnZlclJlcG9ydC5hcHBlbmRDaGlsZCggcmVwb3J0QmxvY2sgKTtcbiAgICB9LFxuICAgIGlucHV0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgfVxuICB9O1xuXG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbiggZXZ0ICkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgdmFyIG5ld0FjdGlvbiA9IG5ldyBBY3Rpb24oICdkYXRhLWlucHV0JywgdmFsdWUgKTtcbiAgICBsb2dnaW5nKCAn0KHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4gQWN0aW9uINCyIFZpZXcnLCBuZXdBY3Rpb24gKTtcblxuICAgIHJlbmRlci5pbnB1dCgpO1xuXG4gICAgbG9nZ2luZyggJ9Cf0LXRgNC10LTQsNGH0LAg0L3QvtCy0L7Qs9C+IEFjdGlvbiDQuNC3IFZpZXcg0LIgRGlzcGF0Y2hlcicgKTtcbiAgICBkaXNwYXRjaGVyLmRpc3BhdGNoKCBuZXdBY3Rpb24gKTtcbiAgfSk7XG5cbiAgc2VydmVyUmVwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCBldnQgKSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbG9nZ2luZygnVmlldyDRgNC10LDQs9C40YDRg9C10YIg0L3QsCDQuNC30LzQtdC90LXQvdC40LUnKTtcblxuICAgIGxvZ2dpbmcoJ1ZpZXcg0L/QtdGA0LXRgNC40YHQvtCy0YvQstCw0LXRgiDQsdC70L7QuiDRgSDQvdC+0LLRi9C80Lgg0LTQsNC90L3Ri9C80LgnKTtcbiAgICByZW5kZXIucmVwb3J0KCBldnQuZGV0YWlsICk7XG4gIH0pO1xuXG5cblxuXG5cbi8vIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbi8vICAgICBzdG9yZS5iaW5kKCAnY2hhbmdlJywgdGhpcy5saXN0Q2hhbmdlZCApO1xuLy8gfSxcbi8vXG4vLyBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XG4vLyAgICAgc3RvcmUudW5iaW5kKCAnY2hhbmdlJywgdGhpcy5saXN0Q2hhbmdlZCApO1xuLy8gfSxcblxufSkoKTtcbiIsInZhciBsb2dnaW5nID0gZnVuY3Rpb24oIG1lc3NhZ2UsIG9iamVjdCApIHtcblxuICB2YXIgcGFnZUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoICcubG9nJyApO1xuICB2YXIgbmV3TG9nSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdkaXYnICk7XG5cbiAgaWYgKCBvYmplY3QgKSB7XG4gICAgbmV3TG9nSXRlbS50ZXh0Q29udGVudCA9IG1lc3NhZ2UgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkoIG9iamVjdCApO1xuICAgIGNvbnNvbGUubG9nKCBtZXNzYWdlLCBvYmplY3QgKTtcbiAgfSBlbHNlIHtcbiAgICBuZXdMb2dJdGVtLmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgY29uc29sZS5sb2coIG1lc3NhZ2UgKTtcbiAgfVxuICBwYWdlTG9nLmFwcGVuZENoaWxkKCBuZXdMb2dJdGVtICk7XG59O1xuIl19
