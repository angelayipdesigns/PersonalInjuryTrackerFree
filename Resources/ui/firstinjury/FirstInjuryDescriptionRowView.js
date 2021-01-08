//FirstInjuryDescriptionRowView Component Constructor
function FirstInjuryDescriptionRowView (displayValueUtil) {
	var FIC = require('ui/firstinjury/FirstInjuryConstants').FirstInjuryConstants;

	this.injuryDescriptionRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(FIC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var injuryDescriptionLabel = new TextFieldLabel(displayValueUtil, 'Description of Injury:', textFieldLabelHeight);

	this.injuryDescriptionRowView.add(injuryDescriptionLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.injuryDescriptionTextArea = new StandardTextField(displayValueUtil, 'Injury Description', textFieldLabelHeight);

	this.injuryDescriptionRowView.add(this.injuryDescriptionTextArea);
	this.injuryDescriptionTextArea.blur();
}

FirstInjuryDescriptionRowView.prototype.getInjuryDescriptionRowView = function(){
	return this.injuryDescriptionRowView;
};

FirstInjuryDescriptionRowView.prototype.getInjuryDescriptionTextAreaValue = function(){
	return this.injuryDescriptionTextArea.value;
};

FirstInjuryDescriptionRowView.prototype.setInjuryDescriptionTextAreaValue = function(injuryDescription){
	this.injuryDescriptionTextArea.value = injuryDescription;
};

exports.FirstInjuryDescriptionRowView = FirstInjuryDescriptionRowView;
