( function() {
  console.info('Инициализация inputView');
  var inputView = new View( 'input' );

  var input = document.querySelector( '.view-stub__input' );
  var button = document.querySelector( '.view-stub__apply' );

  button.addEventListener( 'click', function() {
    var value = input.value;
    console.info('inputView генерирует новый Action');
    inputView.generateAction( value );
    input.value = '';
  });
})();
