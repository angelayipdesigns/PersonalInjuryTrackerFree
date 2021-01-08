//SaveSpreadsheetPathRowView Component Constructor
function SaveSpreadsheetPathRowView (displayValueUtil) {
	var SSC = require('ui/settings/savespreadsheet/SaveSpreadsheetConstants').SaveSpreadsheetConstants;
	
	this.saveSpreadsheetPathRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(SSC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var saveSpreadsheetPathLabel = new TextFieldLabel(displayValueUtil, 'Spreadsheet Save Location:', textFieldLabelHeight);
	
	this.saveSpreadsheetPathRowView.add(saveSpreadsheetPathLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.saveSpreadsheetPathTextField = new StandardTextField(displayValueUtil, 'Location where spreadsheet will be saved', textFieldLabelHeight);

	this.saveSpreadsheetPathRowView.add(this.saveSpreadsheetPathTextField);
	this.saveSpreadsheetPathTextField.blur();
}

SaveSpreadsheetPathRowView.prototype.getSaveSpreadsheetPathRowView = function(){
	return this.saveSpreadsheetPathRowView;
};

SaveSpreadsheetPathRowView.prototype.getSaveSpreadsheetPathTextField = function(){
	return this.saveSpreadsheetPathTextField.value;
};

SaveSpreadsheetPathRowView.prototype.setSaveSpreadsheetPathTextField = function(saveSpreadsheetPath){
	this.saveSpreadsheetPathTextField.value = saveSpreadsheetPath;
};


exports.SaveSpreadsheetPathRowView = SaveSpreadsheetPathRowView;