//SaveSpreadsheetOpenButtonRowView Component Constructor
function SaveSpreadsheetOpenButtonRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	this.saveSpreadsheetOpenButtonRowView = Titanium.UI.createTableViewRow();

	var buttonHeight = displayValueUtil.getRelativeHeight(10);
	var buttonWidth = displayValueUtil.getRelativeWidth(40);
	var borderWidth = displayValueUtil.getRelativeBoarderSize();

  var fSize = UIC.FIELD_FONT_SIZE()
  if (Titanium.Platform.name == 'android') {
		var fSize = UIC.ANDROID_BUTTON_FONT_SIZE()
	}

	this.saveSpreadsheetOpenButton = Titanium.UI.createButton({
		title: 'Get Raw Csv',
		height: buttonHeight,
		width: buttonWidth,
		left: borderWidth,
		top: borderWidth,
		font: { fontSize:  fSize},
		color: '#000000',
		borderColor: '#000000',
		borderRadius: 5,
	});

	this.saveSpreadsheetOpenButtonRowView.add(this.saveSpreadsheetOpenButton);
}

SaveSpreadsheetOpenButtonRowView.prototype.getSaveSpreadsheetOpenButtonRowView = function(){
	return this.saveSpreadsheetOpenButtonRowView;
};

SaveSpreadsheetOpenButtonRowView.prototype.getSaveSpreadsheetOpenButton = function(){
	return this.saveSpreadsheetOpenButton;
};


exports.SaveSpreadsheetOpenButtonRowView = SaveSpreadsheetOpenButtonRowView;
