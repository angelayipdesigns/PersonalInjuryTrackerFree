//SaveSpreadsheetEmailButtonRowView Component Constructor
function SaveSpreadsheetEmailButtonRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	this.saveSpreadsheetEmailButtonRowView = Titanium.UI.createTableViewRow();

	var buttonHeight = displayValueUtil.getRelativeHeight(10);
	var buttonWidth = displayValueUtil.getRelativeWidth(40);
	var borderWidth = displayValueUtil.getRelativeBoarderSize();

  var fSize = UIC.FIELD_FONT_SIZE()
  if (Titanium.Platform.name == 'android') {
		var fSize = UIC.ANDROID_BUTTON_FONT_SIZE()
	}

	this.saveSpreadsheetEmailButton = Titanium.UI.createButton({
		title: 'Email Spreadsheet',
		height: buttonHeight,
		width: buttonWidth,
		left: borderWidth,
		top: borderWidth,
		font: { fontSize:  fSize},
		color: '#000000',
		borderColor: '#000000',
		borderRadius: 5,
	});

	this.saveSpreadsheetEmailButtonRowView.add(this.saveSpreadsheetEmailButton);
}

SaveSpreadsheetEmailButtonRowView.prototype.getSaveSpreadsheetEmailButtonRowView = function(){
	return this.saveSpreadsheetEmailButtonRowView;
};

SaveSpreadsheetEmailButtonRowView.prototype.getSaveSpreadsheetEmailButton = function(){
	return this.saveSpreadsheetEmailButton;
};


exports.SaveSpreadsheetEmailButtonRowView = SaveSpreadsheetEmailButtonRowView;
