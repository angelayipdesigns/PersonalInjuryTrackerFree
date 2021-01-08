//SymptomsPainDetailsRowView Component Constructor
function SymptomsPainDetailsRowView (displayValueUtil) {
	var SC = require('ui/symptoms/SymptomsConstants').SymptomsConstants;

	this.symptomPainDetailsRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(SC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var symptomPainDetailsLabel = new TextFieldLabel(displayValueUtil, 'Symptom Pain Details:', textFieldLabelHeight);

	this.symptomPainDetailsRowView.add(symptomPainDetailsLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.symptomPainDetailsTextArea = new StandardTextField(displayValueUtil, 'Details of Symptom Pain', textFieldLabelHeight);

	this.symptomPainDetailsRowView.add(this.symptomPainDetailsTextArea);
	this.symptomPainDetailsTextArea.blur();
}

SymptomsPainDetailsRowView.prototype.getSymptomPainDetailsTextAreaRowView = function(){
	return this.symptomPainDetailsRowView;
};

SymptomsPainDetailsRowView.prototype.getSymptomPainDetailsTextArea = function(){
	return this.symptomPainDetailsTextArea.value;
};

SymptomsPainDetailsRowView.prototype.setSymptomPainDetailsTextArea = function(symptomPainDetails){
	this.symptomPainDetailsTextArea.value = symptomPainDetails;
};


exports.SymptomsPainDetailsRowView = SymptomsPainDetailsRowView;
