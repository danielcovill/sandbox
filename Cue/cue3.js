var nums = [3, 4, 9, 14, 15, 19, 28, 37, 47, 50, 54, 56, 59, 61, 70, 73, 78, 81, 92, 95, 97, 99]
var possibleSums = [];
var totalCount = 0;

for(var j=0;j<nums.length;j++) {
	var currArrayLength = possibleSums.length;
	for(var i=0;i<currArrayLength;i++) {
		var newSumNumber = possibleSums[i] + nums[j];
		if(newSumNumber <= nums[nums.length - 1]) {
			possibleSums.push(newSumNumber);
		}
		if(nums.indexOf(newSumNumber) > 0) { 
			totalCount++;
		}
	}
	possibleSums.push(nums[j]);
}
console.log(totalCount);
