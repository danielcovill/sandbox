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

function importUser(name, id, clan, clanid, prevTargetId) {
	if(!userIdExists(id)) {
		var newPersonElement = $(document.createElement('li'));
		newPersonElement.addClass('ui-widget ui-corner-all ui-state-default');
		var nameElement = $(document.createElement('span')).addClass('userfield name').text(name);
		var userId = $(document.createElement('span')).addClass('hidden userId').text(id);
		var clanElement = $(document.createElement('span')).addClass('userfield clan');
		if(clan) {
			clanElement.text('(' + clan + ')');
		}
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
		console.log('User with id: ' + id + ' already exists');
		//find that person and update their values with what was saved
		var existingPersonElement = $(document.createElement('li'));
		existingPersonElement.addClass('ui-widget ui-corner-all ui-state-default');
		var nameElement = $(document.createElement('span')).addClass('userfield name').text(name);
		var userId = $(document.createElement('span')).addClass('hidden userId').text(id);
		var clanElement = $(document.createElement('span')).addClass('userfield clan');
		if(clan) {
			clanElement.text('(' + clan + ')');
		}
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

		existingPersonElement.append(nameElement);
		existingPersonElement.append(userId);
		existingPersonElement.append(clanElement);
		existingPersonElement.append(clanId);
		existingPersonElement.append(deleteIcon);
		$('#people-list').append(existingPersonElement);
	}
}

function addNewUser(name, clan) {
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

function importData(data) {
	var userSet = $.parseJSON(data);
	if(!!userSet) {
		$('.shuffle').hide();
		$('#people-list').empty();
	}
	for(var i=0;i<userSet.userList.length;i++) {
		importUser(userSet.userList[i].name, userSet.userList[i].userId, userSet.userList[i].clan, userSet.userList[i].clanId, userSet.userList[i].prevTargetId);
	}
}

function exportData() {
	var toExport = {};
	toExport.date = new Date();
	toExport.userList = [];
	$('#shuffle-results>li').each(function(index, element) {
		toExport.userList.push({
			name: $(element).find('.name').text(), 
			userId: $(element).find('.userId').text(), 
			clan: $(element).find('.clan').text().substr(1,$(element).find('.clan').text().length-2),
			clanId: $(element).find('.clanId').text(),
			previousTargetId: $(element).find('.targetId').text()
		});
	});
	var data = JSON.stringify(toExport);
	$('#exportData').html(data);
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
	if(collection.length == 0) {
		collection.push([ element ]);
	}
}

function addShuffleResult(user_name, user_id, user_clan, user_clan_id, target_name, target_id) {
	var newPairElement = $(document.createElement('li'));
	newPairElement.addClass('ui-widget ui-corner-all ui-state-default');
	var nameElement = $(document.createElement('span')).addClass('userfield name').text(user_name);
	var userId = $(document.createElement('span')).addClass('hidden userId').text(user_id);
	var clanElement = $(document.createElement('span')).addClass('userfield clan');
	if(user_clan) {
		clanElement.text('(' + user_clan + ')');
	}
	var clanId = $(document.createElement('span')).addClass('hidden clanId');
	if(user_clan_id) {
		clanId.text(user_clan_id);
	}
	var targetElement = $(document.createElement('span')).addClass('userfield target').text(target_name);
	var targetId = $(document.createElement('span')).addClass('hidden targetId').text(target_id);

	var arrowIcon = $(document.createElement('span')).addClass('ui-icon ui-icon-circle-arrow-e rightArrow');
	newPairElement.append(nameElement);
	newPairElement.append(userId);
	newPairElement.append(clanElement);
	newPairElement.append(clanId);
	newPairElement.append(arrowIcon);
	newPairElement.append(targetElement);
	newPairElement.append(targetId);
	$('#shuffle-results').append(newPairElement);
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
			clan: $(element).find('.clan').text().substr(1,$(element).find('.clan').text().length-2),
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
	var usingOverflow = false;
	if(longestGroupLength > toShuffle.length / 2 && !!groupCollection[longestGroupIndex][0].groupId) {
		overflowGroup = groupCollection[longestGroupIndex].splice(Math.floor(toShuffle.length), toShuffle.length - Math.floor(toShuffle.length));
		usingOverflow = true;
	}

	for(var i=0;i<groupCollection.length;i++) {
		
		//go through and assemble available items for this group
		var availableOptions = [];
		for(var k=0;k<groupCollection.length;k++) {
			//don't assign people to the group they're in unless it's the overflow group or it's the only group
			if(k!=i || (usingOverflow && k==groupCollection.length-1) || groupCollection.length == 1) { 
				for(var j=0;j<groupCollection[k].length;j++) {
					if(!groupCollection[k][j].assigned) {
						availableOptions.push(groupCollection[k][j]);
					}
				}
			}
		}
		
		//for each person in the group
		for(var j=0;j<groupCollection[i].length;j++) {

			//pick a random item from the list of available options
			var randIndex = (Math.floor(Math.random() * availableOptions.length));

			//while that item was this person's previous match and if there's more than one option left, pick a new random
			while((groupCollection[i][j].previousTargetId == availableOptions.userId) && (availableOptions.length > 1)) {
				randIndex = (Math.floor(Math.random() * availableOptions.length));
			}
			
			//once you have a good (enough) random, assign it and move on
			var selectedOption = availableOptions.splice(randIndex, 1)[0];
			groupCollection[i][j].previousTargetId = groupCollection[i][j].targetId;
			groupCollection[i][j].targetName = selectedOption.name;
			groupCollection[i][j].targetId = selectedOption.userId;

			//need to mark the user as having been assigned
			selectedOption.assigned = true;
			
		}

	}

	//construct shuffled list
	$('#shuffle-results').empty();
	$('.shuffle').show();
	for(var i=0;i<groupCollection.length;i++) {
		for(var j=0;j<groupCollection[i].length;j++) {
			var element = groupCollection[i][j];
			addShuffleResult(element.name, element.userId, element.clan, element.clanId, element.targetName, element.targetId);
		}
	}

	for(shuffleResult in $('#shuffle-results').children('li')){
		console.log($(shuffleResult));
	}
}

var currentShuffleJSON;
$(function() {

	$('.openImport').button().click(function() {
		$('#importModal').dialog('open');
	});

	$('.openExport').button().click(function() {
		exportData();
		$('#exportModal').dialog('open');
	});

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
	$('#exportModal').dialog({
		title: 'Export',
		autoOpen: false,
		height: 220,
		width: '80%',
		modal: true,
	});
	$('#importModal').dialog({
		title: 'Import',
		autoOpen: false,
		height: 300,
		width: '80%',
		modal: true,
		buttons: {
			Cancel: function() {
				$(this).dialog('close');
			},
			'Submit': function() {
				importData($('#importData').val());
				$(this).dialog('close');
			}
		}
	});
	$('#addPersonModal').dialog({
		title: 'Add new',
		autoOpen: false,
		height: 220,
		width: 350,
		modal: true,
		buttons: {
			'Add': function() {
				addNewUser($('#newName').val(), $('#newClan').val());
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
