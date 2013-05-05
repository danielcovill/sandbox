var projectEuler = {};

// run the problems and display
window.onload = function() {
	var resultsTable = document.getElementById('eulerResults');
	
	for(var i=0;i<20;i++) {
		loadScript('problem' + i + '.js', runProblem(i));
	}

	function runProblem(i) {
		return function() {
			var title = window['projectEuler']['problem'+i]['title'];
			var results = window['projectEuler']['problem'+i]['solve']();
			addEulerRow(i, title, results);
		}
	}
	
	function addEulerRow(problemNumber, title, results) {
		var problemRow = document.createElement('tr');
		problemRow.setAttribute('id', 'problem' + problemNumber);
		resultsTable.appendChild(problemRow);
	
		var problemNumberCol = document.createElement('td');
		problemNumberCol.setAttribute('class', 'problemNumber');
		problemNumberCol.innerHTML = problemNumber;
	
		var problemTitle = document.createElement('td');
		problemTitle.setAttribute('class', 'problemTitle');
		problemTitle.innerHTML = title;
	
		var problemResults = document.createElement('td');
		problemResults.setAttribute('class', 'problemResults');
		problemResults.innerHTML = results;
	
		problemRow.appendChild(problemNumberCol);
		problemRow.appendChild(problemTitle);
		problemRow.appendChild(problemResults);
	}

	function loadScript(url, callback)
	{
		// adding the script tag to the head as suggested before
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;

		// then bind the event to the callback function 
		// there are several events for cross browser compatibility
		script.onreadystatechange = callback;
		script.onload = callback;

		// fire the loading
		head.appendChild(script);
	}
}
