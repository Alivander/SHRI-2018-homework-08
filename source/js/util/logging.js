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
