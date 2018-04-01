var dispatcher = {
  dispatch: function( action ) {
    logging( 'Получение Dispatcher нового Action' );

    logging( 'Вызов обработчика Actione из Store' );
    store.handlerAction( action );
  }
};
