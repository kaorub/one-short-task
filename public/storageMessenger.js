var getStorageManager = (function () {

  return function() {
  	return {
  		set: function ( key , value, expiry ) {
		    var valueWithExpiry = {value: value, expiry: new Date().getTime() + expiry}
		    localStorage.setItem(key, JSON.stringify(valueWithExpiry));
		    return;
		},
		get: function( key ) {
			var o = JSON.parse(localStorage.getItem( key ));
			var _value = o.value;
			var _time = o.expiry;
			var _date = new Date();
			_date = _date.getTime();
			if (_date > _time) {
				localStorage.removeItem(key);
				return null;}
		  	return _value;
		},
		remove: function ( key ) {
			localStorage.removeItem(key);
			return;
		},
		setProperty: function( key , property, value, expiry ) {
			try {
				  if (typeof key !== 'object') {
				    throw new SyntaxError("Ошибка key");
				  } else if (typeof key === 'array') {
				  	return;
				  } else if (typeof key === 'object') {
				  	this.set(property, value, expiry);
				  }
			} catch(e) {
				if (e.name === 'SyntaxError') {
					alert('Error');
				} else {
					throw e;
				}
			}
		}
  	}
  }
})();