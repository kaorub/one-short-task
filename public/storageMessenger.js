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
			var _value = o.value || null;
			var _time = o.expiry;
			var _date = new Date();
			_date = _date.getTime();
			if (_date > _time) {
				localStorage.removeItem(key);
				throw new SyntaxError("Ошибка get key");
			}
		  	return _value;				
		},
		remove: function ( key ) {
			localStorage.removeItem(key);
			return;
		},
		setProperty: function( key , property, value, expiry ) {
			try {
				var parsedValue = JSON.parse(localStorage.getItem(key));
				if (typeof parsedValue === 'object') {
					if (parsedValue === null) {
						parsedValue = {};
						parsedValue[property] = value;
						this.set(key, parsedValue, expiry);
					} else {
						parsedValue.value[property] = value;
						parsedValue.expiry = expiry;
						localStorage.setItem(key, JSON.stringify(parsedValue));
					}
					return;
				} else if (typeof parsedValue === 'array') {
					return;
				} else if (typeof parsedValue !== 'object') {
					throw new SyntaxError("Ошибка setproperty key");
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