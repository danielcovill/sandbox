//v4 GUID
function getGuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}

function userNameExists(name) {
	var result = false;
	$('#people-list>li>.name').each(function(index, element) {
		if($(element).text().toLowerCase() == name.toLowerCase()) {
			result = true;
			return false;//same as 'break'
		}
	});
	return result;
}

function getClanId(clan) {
	$('#people-list>li').each(function(index, element) {
		$(element).find('.clan');
	});
}

function addUser(name, clan) {
	if(!userNameExists(name)) {
		var newPersonElement = $(document.createElement('li'));
		newPersonElement.addClass('ui-widget ui-corner-all ui-state-default');
		var nameElement = $(document.createElement('span')).addClass('userfield name').text(name);
		var userId = $(document.createElement('span')).addClass('hidden userId').text(getGuid());
		var clanElement = $(document.createElement('span')).addClass('userfield clan');
		if(clan) {
			clanElement.text('(' + clan + ')');
		}
		var clanId = getClanId(clan);
		if(!clanId) {
			clanId = $(document.createElement('span')).addClass('hidden clanId').text(getGuid());
		}
		var deleteIcon = $(document.createElement('span'))
			.addClass('ui-icon ui-icon-closethick close')
			.button().click(function() {
				if (confirm('Click OK to delete this user.')) {
					deleteUser($(this).parents('li'));
				}
			});

		newPersonElement.append(nameElement);
		newPersonElement.append(userId);
		newPersonElement.append(clanElement);
		newPersonElement.append(clanId);
		newPersonElement.append(deleteIcon);
		$('#people-list').append(newPersonElement);
	} else {
		//display an error
		showError('Name already exists');
		console.log('User with name: ' + name + ' already exists');
	}
}

function deleteUser(element) {
	element.remove()
}

function editUser() {
	
}

function importData() {

}

function exportData() {

}

function showError(errorText) {

}

function allSameClan(list) {
	var result = true;
	var clan = list[0].clanId;
	$(list).each(function(index, element) {
		if(element.clanId != clan) {
			result = false;
			return false;//break
		}
	});
	return result;
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

/*
 * Adds a person element to a 2d array where elements are grouped by their clan
 */
function addElementToGroupCollection(element, collection) {
	for(var i=0;i<collection.length;i++) {
		var clanExists = false;
		if(!collection[i][0].clanId && !element.clanId || 
			 collection[i][0].clanId == element.clanId) {
			clanExists = true;
			collection[i].push(element);
		}
		if(!clanExists) {
			collection.push([ element ]);
		}
	}
}

function shuffleUsers() {
	var toShuffle = [];
	var groupCollection = [];
	var overflowGroup = [];
	
	//assemble list of names
	$('#people-list>li').each(function(index, element) {
		toShuffle.push({
			name: $(element).find('.name').text(), 
			userId: $(element).find('.userId').text(), 
			clan: $(element).find('.clan').text(),
			clanId: $(element).find('.clanId').text(),
			previousTargetId: $(element).find('.previous-target-Id').text()
		});
	});

	//shuffle based on goal of avoiding people getting people from last year 
	//and avoiding people in the same clan
	$(toShuffle).each(function(index, element) {
		addElementToGroupCollection(element, groupCollection);
	});

	var longestGroupLength = 0;
	var longestGroupIndex = 0;

	//shuffle each group and determine which one is the longest 
	for(var i=0;i<groupCollection.length;i++) {
		shuffleArray(groupCollection[i]);	
		if(groupCollection[i].length > longestGroupLength) {
			longestGroupLength = groupCollection[i].length;
			longestGroupIndex = i;
		}
	}

	//put items from a group too long into the overflow group (as long as it's not the "no group" group)
	if(longestGroupLength > toShuffle.length / 2 && !!groupCollection[longestGroupIndex][0].groupId) {
		overflowGroup = groupCollection[longestGroupIndex].splice(Math.floor(toShuffle.length), toShuffle.length - Math.floor(toShuffle.length))
	}

	for(var i=0;i<groupCollection.length;i++) {
		var availableOptions = [];
		//go through and assemble available items for this set
		for(var k=i;k<groupCollection.length;k++) {
			for(var j=0;j<groupCollection[k].length;j++) {
				if(!groupCollection[k][j].assigned) {
					availableOptions.push(groupCollection[k][j];
				}
			}
		}

		for(var j=0;j<groupCollection[i].length;j++) {

			//pick a random group that's not this group
			var rand_i = (Math.floor(Math.random() * groupCollection.length) + (i + 1));
			//pick a random element from that group
			var rand_j = Math.floor(Math.random() * groupCollection[rand_i].length);

			//if that item hasn't been matched to someone already
			//and
			//if that item wasn't this person's previous match
			//and
			//if there's more than one option left (computationally intensive?)
			
			//doing this this way will result in lots of collisions as you match out the last of the people
			//need to come up with a set where unavailable items are removed
			groupCollection[i][j].targetId
			groupCollection[i][j].previousTargetId
		}
	}

	//construct shuffled list
	$(toShuffle).each(function(index, element) {
		var newPairElement = $(document.createElement('li'));
		newPairElement.addClass('ui-widget ui-corner-all ui-state-default');
		var nameElement = $(document.createElement('span')).addClass('userfield name').text(element.name);
		var userId = $(document.createElement('span')).addClass('hidden userId').text(element.userId);
		var clanElement = $(document.createElement('span')).addClass('userfield clan');
		if(element.clan) {
			clanElement.text(element.clan);
		}
		var clanId = $(document.createElement('span')).addClass('hidden clanId');
		if(element.clanId) {
			clanId.text(element.clanId);
		}
		var arrowIcon = $(document.createElement('span')).addClass('ui-icon ui-icon-circle-arrow-e rightArrow');
		var targetElement = $(document.createElement('span')).addClass('userfield target').text(element.targetName);
		var targetId = $(document.createElement('span')).addClass('hidden targetId').text(element.targetId);
	
		newPairElement.append(nameElement);
		newPairElement.append(userId);
		newPairElement.append(clanElement);
		newPairElement.append(clanId);
		newPairElement.append(arrowIcon);
		newPairElement.append(targetElement);
		newPairElement.append(targetId);
		$('#shuffle-results').append(newPairElement);
	});

}

$(function() {
	$('.close').button().click(function() {
		if (confirm('Click OK to delete this user.')) {
			deleteUser($(this).parents('li'));
		}
	});
	$('.shufflePeople').button().click(function() {
		shuffleUsers();
	});
	$('.openAddPerson').button().click(function() {
		$('#addPersonModal').dialog('open');
	});
	$('#addPersonModal').dialog({
		title: 'Add new',
		autoOpen: false,
		height: 220,
		width: 350,
		modal: true,
		buttons: {
			'Add': function() {
				addUser($('#newName').val(), $('#newClan').val());
				$(this).dialog('close');
			},
		  Cancel: function() {
				$(this).dialog('close');
		  }
		},
		close: function() {
			$('input').val('');
		}
	});
});
