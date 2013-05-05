projectEuler.problem19 = {
	title: "How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?",
	solve: function() {
		var monthDays = [
			function() { return 31 },
			function (year) {
				if((year%4 === 0 && year%100 !== 0) || year%400 === 0)
					return 29;
				else
					return 28;
			},
			function() { return 31 },
			function() { return 30 },
			function() { return 31 },
			function() { return 30 },
			function() { return 31 },
			function() { return 31 },
			function() { return 30 },
			function() { return 31 },
			function() { return 30 },
			function() { return 31 }
		];
		
		var year = 1901;
		var dayOfWeek = 1;
		var sundayCount = 0;
		
		while(year <= 2000) {
			for(var i=0;i<=11;i++) {
				if(dayOfWeek === 1) {
					sundayCount++;
				}
				dayOfWeek = (dayOfWeek + monthDays[i](year)) % 7;
			}
			year++;
		}
		return (sundayCount);
	}
}
