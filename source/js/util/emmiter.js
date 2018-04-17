var eventEmitter = {
  _events: {},

  on: function( event, handler ) {
    var queue = this._events[event];
    if (!queue) {
      queue = [];
    }
    queue.push( handler );
    return this;
  },

  off: function( event, handler ) {
    var queue = this._events[event];
    queue = queue.filter( function(value ) {
      return value !== handler;
    });
    return this;
  },

  emit: function( event ) {
    var queue = this._events[event];
    if ( queue ) {
      queue.forEach( function( value ) {
        value();
      });
    }
    return this;
  }
};
