//v4 GUID
function getGuid() {
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
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
		var clanId = $(document.createElement('span')).addClass('hidden clanId').text(getGuid());
		var deleteIcon = $(document.createElement('span')).addClass('ui-icon ui-icon-closethick close');
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

function shuffleArray(toShuffle) {
   for (var i = toShuffle.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = toShuffle[i];
		toShuffle[i] = toShuffle[j];
		toShuffle[j] = temp;
	}
}

function importData() {

}

function exportData() {

}

function showError(errorText) {

}

$(function() {
	//need to fix added buttons firing with "on"
	$('.close').button().click(function() {
		if (confirm('Click OK to delete this user.')) {
			deleteUser($(this).parents('li'));
		}
	});
	$('.shufflePeople').button().click(function() {
		console.log('shuffle');
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
