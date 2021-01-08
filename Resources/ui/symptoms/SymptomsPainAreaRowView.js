//SymptomsPainAreaRowView Component Constructor
function SymptomsPainAreaRowView (displayValueUtil, symptomId, symptomsWindow) {
	var SC = require('ui/symptoms/SymptomsConstants').SymptomsConstants;
	
	this.symptomPainAreaRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(SC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var symptomPainAreaLabel = new TextFieldLabel(displayValueUtil, 'Symptom Pain Area:', textFieldLabelHeight);
	
	this.symptomPainAreaRowView.add(symptomPainAreaLabel);

	if (symptomId >= 0) {
		var DeleteButton = require('ui/common/buttons/DeleteButton').DeleteButton;
		var deleteButton = new DeleteButton(displayValueUtil);

		deleteButton.addEventListener('click', function() {
				var SymptomsDBI = require('db/dbi/symptoms/SymptomsDBI').SymptomsDBI;
				var symptomsDBI = new SymptomsDBI();
				symptomsDBI.deleteSymptom(symptomId);
				symptomsWindow.fireEvent('updateSymptomTable');
		});	
	
		this.symptomPainAreaRowView.add(deleteButton);
	}

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.symptomPainAreaTextField = new StandardTextField(displayValueUtil, 'Area of the Symptom Pain', textFieldLabelHeight);

	this.symptomPainAreaRowView.add(this.symptomPainAreaTextField);
	this.symptomPainAreaTextField.blur();
}

SymptomsPainAreaRowView.prototype.getSymptomPainAreaRowView = function(){
	return this.symptomPainAreaRowView;
};

SymptomsPainAreaRowView.prototype.getSymptomPainAreaTextField = function(){
	return this.symptomPainAreaTextField.value;
};

SymptomsPainAreaRowView.prototype.setSymptomPainAreaTextField = function(symptomPainArea){
	this.symptomPainAreaTextField.value = symptomPainArea;
};


exports.SymptomsPainAreaRowView = SymptomsPainAreaRowView;