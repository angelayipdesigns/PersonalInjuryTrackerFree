//MedicationsInsuranceCoveredRowView Component Constructor
function MedicationsInsuranceCoveredRowView (displayValueUtil, insuranceCovered) {
	var MC = require('ui/medications/MedicationsConstants').MedicationsConstants;
	
	this.medicationsInsuranceCoveredRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(MC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var CheckBoxFieldLabel = require('ui/common/entryfields/CheckBoxFieldLabel').CheckBoxFieldLabel;

    var medicationsInsuranceCoveredLabel = new CheckBoxFieldLabel(displayValueUtil, 'Covered by Insurance:', textFieldLabelHeight);	
	this.medicationsInsuranceCoveredRowView.add(medicationsInsuranceCoveredLabel);

	var CheckboxButton = require('ui/common/buttons/CheckboxButton').CheckboxButton;
	this.checkboxButton = new CheckboxButton(displayValueUtil, textFieldLabelHeight, insuranceCovered);
	this.medicationsInsuranceCoveredRowView.add(this.checkboxButton.getButtonDisplayable());
}

MedicationsInsuranceCoveredRowView.prototype.getMedicationsInsuranceCoveredRowView = function(){
	return this.medicationsInsuranceCoveredRowView;
};

MedicationsInsuranceCoveredRowView.prototype.getMedicationsInsuranceCovered = function(){
	return this.checkboxButton.getSelected();
};

MedicationsInsuranceCoveredRowView.prototype.setMedicationsInsuranceCovered = function(isSelected){
	this.checkboxButton.setSelected(isSelected);
};


exports.MedicationsInsuranceCoveredRowView = MedicationsInsuranceCoveredRowView;