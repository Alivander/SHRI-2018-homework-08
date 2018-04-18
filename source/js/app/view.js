// (function() {
//
//   var viewStub = document.querySelector( '.view-stub' );
//   var input = viewStub.querySelector( '.view-stub__input' );
//   var button = viewStub.querySelector( '.view-stub__apply' );
//   var serverReport = viewStub.querySelector( '.view-stub__label' );
//
//   function Action( name, data ) {
//     this.name = name;
//     this.data = data;
//   };
//
//   var render = {
//     report: function ( reportList ) {
//       var reportBlock = document.createDocumentFragment();
//
//       reportList.forEach(function( item ) {
//         var reportItem = document.createElement( 'div' );
//
//         reportItem.textContent = item;
//         reportBlock.appendChild( reportItem );
//       });
//
//       serverReport.innerHTML = '';
//       serverReport.appendChild( reportBlock );
//     },
//     input: function() {
//       input.value = '';
//     }
//   };
//
//   button.addEventListener( 'click', function( evt ) {
//     var value = input.value;
//     var newAction = new Action( 'input', value );
//     logging( 'Создание нового Action в View', newAction );
//
//     logging( 'Передача нового Action из View в Dispatcher' );
//     Dispatcher.dispatch( newAction );
//
//     render.input();
//   });
//
//   console.log( 'View регистрирует обработчик для события изменения Store' );
//   eventEmitter.on( 'storeChanged', function() {
//     logging( 'View реагирует на изменение' );
//
//     var data = Store.getData( 'input' );
//
//     logging( 'View перерисовывает блок с новыми данными' );
//     if (data) {
//       render.report( data );
//     }
//   });
//
// })();
