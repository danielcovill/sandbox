projectEuler.problem21 = {
	title: "Evaluate the sum of all the amicable numbers under 10000.",
	solve: function() {
		var result = 0;
		var matches = [];

		for(var i=0;i<10000;i++) {
			var sum = sumOfProperDivisors(i+1);
			if(sum <= 10000 
			&& sum !== (i+1)
			&& matches.indexOf(sum) < 0
			&& sumOfProperDivisors(sum) === (i+1)) {
				result += (i+1) + sum;
				matches.push(i+1);
			}
		}
		return result;
	}
}

function sumOfProperDivisors(n) {
	var total = 0;
	var allDivisors = eulerLib.getProperDivisors(n);
	for(var i=0;i<allDivisors.length;i++) {
		total += allDivisors[i];
	}
	return total;
}
