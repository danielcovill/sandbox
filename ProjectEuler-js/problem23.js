projectEuler.problem23 = {
	title: "Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.",
	solve: function() {
		var result = 0;
		var upperSumLimit = 28123;
		var abundantNumbers = [];
		
		for(var i = 1; i<upperSumLimit; i++) {
			if(sumOfProperDivisors(i) > i) {
				abundantNumbers.push(i);
			}
 			if(!isSumOfTwoAbundantNumbers(i, abundantNumbers)) {
				
				result += i;
			}
		}
		console.log(result);
		return result;
	}
}

//assumes abundantNumbers is in sorted order from lowest to highest value
function isSumOfTwoAbundantNumbers(val, abundantNumbers) {
	for(var i=0;i<abundantNumbers.length;i++) {
		if(abundantNumbers[i] + abundantNumbers[i] > val) { 
			break;
		}
		for(var j=i;j<abundantNumbers.length;j++) {
			if(abundantNumbers[i] + abundantNumbers[j] > val) { 
				break;
			}
			if(abundantNumbers[i] + abundantNumbers[j] === val) { 
				return true; 
			}
		}
	}
	return false;
}

function sumOfProperDivisors(n) {
	var total = 0;
	var allDivisors = eulerLib.getProperDivisors(n);
	for(var i=0;i<allDivisors.length;i++) {
		total += allDivisors[i];
	}
	return total;
}
