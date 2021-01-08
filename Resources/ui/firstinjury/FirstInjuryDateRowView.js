//FirstInjuryDateRowView Component Constructor
function FirstInjuryDateRowView (displayValueUtil, wrappedDate, initalText) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var rowObjectHeightPercent = displayValueUtil.getRelativeHeight(7);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthPercent = displayValueUtil.getProportionalObjectWidth(2, true);
	var rowObjectWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var injuryDateRowView = Titanium.UI.createTableViewRow();

	var injuryDateLabel = Titanium.UI.createLabel({
		text:'Date of Injury:',
		color: '#000000',
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		height: rowObjectHeightPercent,
		width: rowObjectWidthPercent,
		left: rowObjectWidthBorderPercent, 
		textAlign: 'left',
		top: rowObjectHeightBorderPercent
	});

	injuryDateRowView.add(injuryDateLabel);

	var injuryDateSelectLabel = Titanium.UI.createLabel({
		text: initalText,
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		height: rowObjectHeightPercent,
		width: rowObjectWidthPercent,
		textAlign: 'left',
		left: rowObjectWidthBorderPercent + rowObjectWidthPercent,
		top: rowObjectHeightBorderPercent
	});

	injuryDateSelectLabel.addEventListener('click', function(e) {
   		executeClickEvent(e, displayValueUtil, wrappedDate, injuryDateSelectLabel);
	});

	 injuryDateRowView.add(injuryDateSelectLabel);
	 return injuryDateRowView;
}

function executeClickEvent(e, displayValueUtil, wrappedDate, injuryDateSelectLabel) {
	var FirstInjuryDateWindow = require('ui/firstinjury/FirstInjuryDateWindow').FirstInjuryDateWindow;
    var firstInjuryDateWindow = new FirstInjuryDateWindow(displayValueUtil, wrappedDate, injuryDateSelectLabel);
}


exports.FirstInjuryDateRowView = FirstInjuryDateRowView;