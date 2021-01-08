//SaveSpreadsheetEmailRowView Component Constructor
function SaveSpreadsheetEmailRowView (displayValueUtil) {
	var SSC = require('ui/settings/savespreadsheet/SaveSpreadsheetConstants').SaveSpreadsheetConstants;
	
	this.saveSpreadsheetEmailRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(SSC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var saveSpreadsheetEmailLabel = new TextFieldLabel(displayValueUtil, 'Destination Email Address:', textFieldLabelHeight);
	
	this.saveSpreadsheetEmailRowView.add(saveSpreadsheetEmailLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.saveSpreadsheetEmailTextField = new StandardTextField(displayValueUtil, 'Email Address where spreadsheet will be sent', textFieldLabelHeight);

	this.saveSpreadsheetEmailRowView.add(this.saveSpreadsheetEmailTextField);
	this.saveSpreadsheetEmailTextField.blur();
}

SaveSpreadsheetEmailRowView.prototype.getSaveSpreadsheetEmailRowView = function(){
	return this.saveSpreadsheetEmailRowView;
};

SaveSpreadsheetEmailRowView.prototype.getSaveSpreadsheetEmailTextField = function(){
	return this.saveSpreadsheetEmailTextField.value;
};

SaveSpreadsheetEmailRowView.prototype.setSaveSpreadsheetEmailTextField = function(saveSpreadsheetEmail){
	this.saveSpreadsheetEmailTextField.value = saveSpreadsheetEmail;
};


exports.SaveSpreadsheetEmailRowView = SaveSpreadsheetEmailRowView;