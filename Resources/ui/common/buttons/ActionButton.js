//ActionButton Component Constructor
function ActionButton (buttonLabel, buttonHeight, buttonWidth, buttonBorderWidth, buttonPositionLeft) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var actionButton = Titanium.UI.createButton({
		title: buttonLabel,
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		height: buttonHeight-5*buttonBorderWidth,
		width: 1.5*buttonWidth-buttonBorderWidth,
		left: buttonPositionLeft*buttonWidth + 4*buttonBorderWidth,
		top: 2*buttonBorderWidth,
		selectedColor: UIC.COLOR_DARK_GREY(),
		color: '#000000',
		borderColor: '#000000',
		borderRadius: 5,
	});

	return actionButton;
}

exports.ActionButton = ActionButton;
