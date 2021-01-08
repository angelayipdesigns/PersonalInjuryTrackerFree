//MedicationsNameRowView Component Constructor
function MedicationsNameRowView (displayValueUtil, medicationId, medicationsWindow) {
	var AC = require('ui/medications/MedicationsConstants').MedicationsConstants;
	
	this.medicationNameRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(AC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var medicationNameLabel = new TextFieldLabel(displayValueUtil, 'Name:', textFieldLabelHeight);
	
	this.medicationNameRowView.add(medicationNameLabel);

	if (medicationId >= 0) {
		var DeleteButton = require('ui/common/buttons/DeleteButton').DeleteButton;
		var deleteButton = new DeleteButton(displayValueUtil);

		deleteButton.addEventListener('click', function() {
				var MedicationsDBI = require('db/dbi/medications/MedicationsDBI').MedicationsDBI;
				var medicationsDBI = new MedicationsDBI();
				medicationsDBI.deleteMedication(medicationId);
				medicationsWindow.fireEvent('updateMedicationsTable');
		});	
	
		this.medicationNameRowView.add(deleteButton);
	}

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.medicationNameTextField = new StandardTextField(displayValueUtil, 'The name of the medication', textFieldLabelHeight);

	this.medicationNameRowView.add(this.medicationNameTextField);
	this.medicationNameTextField.blur();
}

MedicationsNameRowView.prototype.getMedicationNameRowView = function(){
	return this.medicationNameRowView;
};

MedicationsNameRowView.prototype.getMedicationNameTextField = function(){
	return this.medicationNameTextField.value;
};

MedicationsNameRowView.prototype.setMedicationNameTextField = function(medicationName){
	this.medicationNameTextField.value = medicationName;
};


exports.MedicationsNameRowView = MedicationsNameRowView;