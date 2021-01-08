//FirstInjuryNameRowView Component Constructor
function FirstInjuryNameRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var FIC = require('ui/firstinjury/FirstInjuryConstants').FirstInjuryConstants;

	this.injuryNameRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(FIC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var injuryNameLabel = new TextFieldLabel(displayValueUtil, 'Name of Injury:', textFieldLabelHeight);
	
	this.injuryNameRowView.add(injuryNameLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.injuryNameTextField = new StandardTextField(displayValueUtil, 'Injury name', textFieldLabelHeight);

	this.injuryNameRowView.add(this.injuryNameTextField);
	this.injuryNameTextField.blur();
}

FirstInjuryNameRowView.prototype.getInjuryNameRowView = function(){
	return this.injuryNameRowView;
};

FirstInjuryNameRowView.prototype.getInjuryNameTextFieldValue = function(){
	return this.injuryNameTextField.value;
};

FirstInjuryNameRowView.prototype.setInjuryNameTextFieldValue = function(injuryName){
	this.injuryNameTextField.value = injuryName;
};


exports.FirstInjuryNameRowView = FirstInjuryNameRowView;