//FirstInjuryTimeRowView Component Constructor
function FirstInjuryTimeRowView (displayValueUtil, wrappedTime, initalText) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	var rowObjectHeightPercent = displayValueUtil.getRelativeHeight(7);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthPercent = displayValueUtil.getProportionalObjectWidth(2, true);
	var rowObjectWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var injuryTimeRowView = Titanium.UI.createTableViewRow();

	var injuryTimeLabel = Titanium.UI.createLabel({
		text:'Time of Injury:',
		color: '#000000',
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		height: rowObjectHeightPercent,
		width: rowObjectWidthPercent,
		left: rowObjectWidthBorderPercent, 
		textAlign: 'left',
		top: rowObjectHeightBorderPercent
	});

	injuryTimeRowView.add(injuryTimeLabel);

	var injuryTimeSelectLabel = Titanium.UI.createLabel({
		text: initalText,
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		height: rowObjectHeightPercent,
		width: rowObjectWidthPercent,
		textAlign: 'left',
		left: rowObjectWidthBorderPercent + rowObjectWidthPercent,
		top: rowObjectHeightBorderPercent
	});

	injuryTimeSelectLabel.addEventListener('click', function(e) {
   		executeClickEvent(e, displayValueUtil, wrappedTime, injuryTimeSelectLabel);
	});

	injuryTimeRowView.add(injuryTimeSelectLabel);
	return injuryTimeRowView;
}

function executeClickEvent(e, displayValueUtil, wrappedTime, injuryTimeSelectLabel) {
	var FirstInjuryTimeWindow = require('ui/firstinjury/FirstInjuryTimeWindow').FirstInjuryTimeWindow;
    var firstInjuryTimeWindow = new FirstInjuryTimeWindow(displayValueUtil, wrappedTime, injuryTimeSelectLabel);
}


exports.FirstInjuryTimeRowView = FirstInjuryTimeRowView;