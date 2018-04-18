( function() {
  console.info('Инициализация logView');
  var logView = new View( 'log' );

  var pageLog = document.querySelector( '.log' );
  var input = document.querySelector( '.view-stub__input' );
  var button = document.querySelector( '.view-stub__apply' );

  function render( logData ) {
    pageLog.innerHTML = '';
    var LogList = document.createDocumentFragment();
    logData.forEach( function( item ) {
      var LogItem = document.createElement( 'li' );
      LogItem.textContent = item;
      LogList.appendChild( LogItem );
    });
    pageLog.appendChild( LogList );
  }

  button.addEventListener( 'mousedown', function() {
    var value = input.value;
    logView.generateAction( 'Нажата кнопка, отправка данных: ' + value );
  });

  console.log( 'logView регистрирует обработчик для события "storeChanged"' );
  logView.addHandlerChange( render );
})();
