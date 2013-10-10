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

function shuffleUsers() {
	var toShuffle = [];
	var allNames = [];
	$('#people-list>li').each(function(index, element) {
		allNames.push({
			userId: $(element).find('.userId').text(), 
			clanId: $(element).find('.clanId').text()
		});
		toShuffle.push({
			name: $(element).find('.name').text(), 
			userId: $(element).find('.userId').text(), 
			clan: $(element).find('.clan').text(),
			clanId: $(element).find('.clanId').text(),
			previousTargetId: $(element).find('.previous-target-Id').text()
		});
	});

	$(toShuffle).each(function(index, element) {
		var randomIndex = Math.floor(Math.random() * allNames.length);

		while((!allNames[randomIndex].clanId || allNames[randomIndex].clanId == element.clanId) && 
			!allSameClan(allNames) && 
			allNames[randomIndex].previousTargetId != element.userId &&
			allNames.length > 1) 
		{
			randomIndex = Math.floor(Math.random() * allNames.length);
		}
		element.targetName = allNames[randomIndex].name;
		element.targetId = allNames[randomIndex].userId;
		allNames.splice(randomIndex,1);
	});

	//construct shuffled list
	$(toShuffle).each(function(index, element) {
		var newPairElement = $(document.createElement('li'));
		newPairElement.addClass('ui-widget ui-corner-all ui-state-default');
		var nameElement = $(document.createElement('span')).addClass('userfield name').text(element.name);
		var userId = $(document.createElement('span')).addClass('hidden userId').text(element.userId);
		var clanElement = $(document.createElement('span')).addClass('userfield clan');
		if(element.clan) {
			clanElement.text('(' + element.clan + ')');
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
