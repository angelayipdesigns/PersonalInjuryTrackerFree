//SaveSpreadsheetButtonRowView Component Constructor
function SaveSpreadsheetButtonRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	this.saveSpreadsheetButtonRowView = Titanium.UI.createTableViewRow();

	var buttonHeight = displayValueUtil.getRelativeHeight(10);
	var buttonWidth = displayValueUtil.getRelativeWidth(40);
	var borderWidth = displayValueUtil.getRelativeBoarderSize();

	var fSize = UIC.FIELD_FONT_SIZE()
  if (Titanium.Platform.name == 'android') {
		var fSize = UIC.ANDROID_BUTTON_FONT_SIZE()
	}

	this.saveSpreadsheetButton = Titanium.UI.createButton({
		title: 'Save Spreadsheet',
		height: buttonHeight,
		width: buttonWidth,
		left: borderWidth,
		top: borderWidth,
		font: { fontSize: fSize },
		color: '#000000',
		borderColor: '#000000',
		borderRadius: 5,
	});

	this.saveSpreadsheetButtonRowView.add(this.saveSpreadsheetButton);
}

SaveSpreadsheetButtonRowView.prototype.getSaveSpreadsheetButtonRowView = function(){
	return this.saveSpreadsheetButtonRowView;
};

SaveSpreadsheetButtonRowView.prototype.getSaveSpreadsheetButton = function(){
	return this.saveSpreadsheetButton;
};

exports.SaveSpreadsheetButtonRowView = SaveSpreadsheetButtonRowView;
