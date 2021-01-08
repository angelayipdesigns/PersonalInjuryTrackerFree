//MedicationsDosageRowView Component Constructor
function MedicationsDosageRowView (displayValueUtil) {
	var AC = require('ui/medications/MedicationsConstants').MedicationsConstants;

	this.medicationDosageRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(AC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var medicationDosageLabel = new TextFieldLabel(displayValueUtil, 'Dosage (how much / how often):', textFieldLabelHeight);

	this.medicationDosageRowView.add(medicationDosageLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.medicationDosageTextArea = new StandardTextField(displayValueUtil, 'The dosage for this medication', textFieldLabelHeight);

	this.medicationDosageRowView.add(this.medicationDosageTextArea);
	this.medicationDosageTextArea.blur();
}

MedicationsDosageRowView.prototype.getMedicationDosageTextAreaRowView = function(){
	return this.medicationDosageRowView;
};

MedicationsDosageRowView.prototype.getMedicationDosageTextArea = function(){
	return this.medicationDosageTextArea.value;
};

MedicationsDosageRowView.prototype.setMedicationDosageTextArea = function(medicationDosage){
	this.medicationDosageTextArea.value = medicationDosage;
};


exports.MedicationsDosageRowView = MedicationsDosageRowView;
