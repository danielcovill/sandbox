projectEuler.problem20 = {
	title: "Find the sum of the digits in the number 100!",
	solve: function() {
		var factorialValue = [1];
		for(var i=2;i<=99;i++) {
			factorialValue = bigMultiply(factorialValue, i.toString().split(""));	
		}
		var result = 0;
		for(var i=0;i<factorialValue.length;i++) {
			result += Number(factorialValue[i]);
		}
		return result;
	}
}

function bigMultiply(arr1, arr2) {
	var resultNumber = [0];
	for(var i=0;i<arr1.length;i++) {
		for(var j=0;j<arr2.length;j++) {
			var multipliedValue = (Number(arr1[i]) * Number(arr2[j])).toString().split("");
			var mvLength = multipliedValue.length;
			for(var zeroes=0;zeroes<arr1.length - i + arr2.length - j - 2;zeroes++) {
				multipliedValue[mvLength + zeroes] = 0;
			}
			resultNumber = bigAdd(resultNumber, multipliedValue);
		}
	}
	return resultNumber;
}

function bigAdd(arr1, arr2) {

	var arr1Counter = arr1.length - 1;
	var arr2Counter = arr2.length - 1;

	var result = [];
	var resultIndex = 0;

	while(arr1Counter >= 0 && arr2Counter >= 0) {
		if(Number(arr1[arr1Counter]) > 9 || Number(arr2[arr2Counter] > 9)) {
			throw "Digits in bigadd must be < 9";
		}
		var sum = Number(arr1[arr1Counter--]) + Number(arr2[arr2Counter--]);
		if(result[resultIndex] === undefined) { result[resultIndex] = 0; }
		sum += result[resultIndex];
		result[resultIndex++] = sum % 10;
		if(sum >= 10) {
			result[resultIndex] = (sum - sum % 10) / 10;
		}
	}
	while(arr1Counter >= 0) {
		if(Number(arr1[arr1Counter]) > 9) {
			throw "Digits in bigadd must be < 9";
		}
		var sum = Number(arr1[arr1Counter--]);
		if(result[resultIndex] === undefined) { result[resultIndex] = 0; }
		sum += result[resultIndex];
		result[resultIndex++] = sum % 10;
		if(sum >= 10) {
			result[resultIndex] = (sum - sum % 10) / 10;
		}
	}
	while(arr2Counter >= 0) {
		if(Number(arr2[arr2Counter]) > 9) {
			throw "Digits in bigadd must be < 9";
		}
		var sum = Number(arr2[arr2Counter--]);
		if(result[resultIndex] === undefined) { result[resultIndex] = 0; }
		sum += result[resultIndex];
		result[resultIndex++] = sum % 10;
		if(sum >= 10) {
			result[resultIndex] = (sum - sum % 10) / 10;
		}
	}
	return result.reverse();
}
