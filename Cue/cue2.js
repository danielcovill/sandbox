
function getFibonacciSequenceUpTo(num) {
	if(num === 0) { return [0]; }
	var result = [1, 1];
	var index = 1;
	var nextVal = 1;
	while(num > nextVal) {
		result.push(result[index] + result[index - 1]);
		nextVal = result[result.length-1];
		index++;
	}
	return result;
}

function isPrime(num) {
	if(num % 2 === 0) { return false; }
	for(var i=3;i<Math.sqrt(num);i+=2) {
		if(num%i===0) { return false; }
	}
	return true;
}

function getNextFibonacciNumber(prevNum1, prevNum2) {
	return (prevNum1 + prevNum2);
}

function getPrimeDivisors(num) {
	var result = [];
	var currentDivisor = 2;
	while(!isPrime(num)) {
		while(num % currentDivisor === 0) {
			result.push(currentDivisor);
			num = num / currentDivisor;
		}
		currentDivisor++;
	}
	result.push(num);
	return result;
}

var prevNum1 = 1;
var prevNum2 = 1;
var next = 1;
while(next < 227000 || !isPrime(next)) {
	next = getNextFibonacciNumber(prevNum1, prevNum2);
	prevNum1 = prevNum2;
	prevNum2 = next;
}
console.log(getPrimeDivisors(next + 1));
