var eulerLib = {
	getProperDivisors: function(n) {
		if(isNaN(n)) { throw "Value must be a number"; }
		if(n < 1) { throw "Value must be positive"; }
	
		var result = [1];
		for(var i=2;i<=n/2;i++) {
			if(n % i === 0) {
				result.push(i);
			}
		}
		return result;
	}
}
