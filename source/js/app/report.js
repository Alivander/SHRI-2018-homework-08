( function() {
  console.info('Инициализация reportView');
  var reportView = new View( 'report' );

  var serverReport = document.querySelector( '.view-stub__report' );

  function render( reportList ) {
    console.log( 'reportView перерисовывает лог сервера' );
    var reportBlock = document.createDocumentFragment();

    reportList.forEach(function( item ) {
      var reportItem = document.createElement( 'div' );

      reportItem.textContent = item;
      reportBlock.appendChild( reportItem );
    });

    serverReport.innerHTML = '';
    serverReport.appendChild( reportBlock );
  }

  console.log( 'reportView регистрирует обработчик для события "storeChanged"' );
  reportView.addHandlerChange( render );
})();
