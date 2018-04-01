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
