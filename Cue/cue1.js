var copy = 'FourscoreandsevenyearsagoourfaathersbroughtforthonthiscontainentanewnationconceivedinzLibertyanddedicatedtothepropositionthatallmenarecreatedequalNowweareengagedinagreahtcivilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth';

var evenStartIndexes = [];
var oddStartIndexes = [];
var longestStartIndex = -1;
var longestMatch = -1;

for(var i=0;i<copy.length;i++) {
	if(copy[i] == copy[i+1]) {
		evenStartIndexes.push(i);
	}
	if(i>0 && copy[i-1] === copy[i+1]) {
		oddStartIndexes.push(i);
	}
}

for(var i=0;i<evenStartIndexes.length;i++) {
	var left = evenStartIndexes[i];
	var right = evenStartIndexes[i] + 1;
	while(copy[left] === copy[right] && left >= 0 && right <= copy.length) {
		if(right-left+1 > longestMatch) {
			longestMatch = right-left+1;
			longestStartIndex = evenStartIndexes[i];
		}
		left--;
		right++;
	}
}

for(var i=0;i<oddStartIndexes.length;i++) {
	var left = oddStartIndexes[i] - 1;
	var right = oddStartIndexes[i] + 1;
	while(copy[left] === copy[right] && left >= 0 && right <= copy.length) {
		if(right-left+1 > longestMatch) {
			longestMatch = right-left+1;
			longestStartIndex = oddStartIndexes[i];
		}
		left--;
		right++;
	}
}

console.log("start: " + longestStartIndex);
console.log("length: " + longestMatch);
var start = longestStartIndex - Math.floor(longestMatch/2);
var result = "";
for(var i=0;i<longestMatch;i++) {
	result += copy[start + i];
}
console.log(result);
