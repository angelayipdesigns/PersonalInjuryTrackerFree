//MedicationsPurposeRowView Component Constructor
function MedicationsPurposeRowView (displayValueUtil) {
	var AC = require('ui/medications/MedicationsConstants').MedicationsConstants;

	this.medicationPurposeRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(AC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var medicationPurposeLabel = new TextFieldLabel(displayValueUtil, 'Purpose of Medication:', textFieldLabelHeight);

	this.medicationPurposeRowView.add(medicationPurposeLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.medicationPurposeTextArea = new StandardTextField(displayValueUtil, 'The purpose for taking this medication', textFieldLabelHeight);

	this.medicationPurposeRowView.add(this.medicationPurposeTextArea);
	this.medicationPurposeTextArea.blur();
}

MedicationsPurposeRowView.prototype.getMedicationPurposeTextAreaRowView = function(){
	return this.medicationPurposeRowView;
};

MedicationsPurposeRowView.prototype.getMedicationPurposeTextArea = function(){
	return this.medicationPurposeTextArea.value;
};

MedicationsPurposeRowView.prototype.setMedicationPurposeTextArea = function(medicationPurpose){
	this.medicationPurposeTextArea.value = medicationPurpose;
};


exports.MedicationsPurposeRowView = MedicationsPurposeRowView;
