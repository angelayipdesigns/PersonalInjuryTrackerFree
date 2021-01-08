//SaveSpreadsheetOpenRowView Component Constructor
function SaveSpreadsheetOpenRowView (displayValueUtil) {
	var SSC = require('ui/settings/savespreadsheet/SaveSpreadsheetConstants').SaveSpreadsheetConstants;

	this.saveSpreadsheetOpenRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(SSC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  var saveSpreadsheetOpenLabel = new TextFieldLabel(displayValueUtil, 'Raw CSV Data:', textFieldLabelHeight);

	this.saveSpreadsheetOpenRowView.add(saveSpreadsheetOpenLabel);

	var StandardTextArea = require('ui/common/entryfields/StandardTextArea').StandardTextArea;
  this.saveSpreadsheetOpenTextArea = new StandardTextArea(displayValueUtil, 'This area will be populated with your raw csv data', textFieldLabelHeight);

	this.saveSpreadsheetOpenRowView.add(this.saveSpreadsheetOpenTextArea);
	this.saveSpreadsheetOpenTextArea.blur();
}

SaveSpreadsheetOpenRowView.prototype.getSaveSpreadsheetOpenRowView = function(){
	return this.saveSpreadsheetOpenRowView;
};


SaveSpreadsheetOpenRowView.prototype.setSaveSpreadsheetOpenTextField = function(saveSpreadsheetOpen){
	this.saveSpreadsheetOpenTextField.value = saveSpreadsheetOpen;
};


exports.SaveSpreadsheetOpenRowView = SaveSpreadsheetOpenRowView;
