function View( actionName ) {
  this.actionName = actionName;
};

View.prototype._Action = function( name, data ) {
  return {
    name: name,
    data: data
  };
};

View.prototype.generateAction = function ( value ) {
  var newAction = this._Action( this.actionName, value );
  console.info( 'Создание нового Action в View', newAction );

  console.info( 'Передача нового Action из View в Dispatcher' );
  Dispatcher.dispatch( newAction );
};

View.prototype.addHandlerChange = function( render ) {
  var name = this.actionName;

  eventEmitter.on( 'storeChanged', function() {
    console.info( 'View реагирует на изменение Store' );

    console.info( 'View запрашивает новые данные из Store' );
    var data = Store.getData( name );

    console.info( 'View перерисовывает блок с новыми данными' );
    if (data) {
      render( data );
    }
  });
};
