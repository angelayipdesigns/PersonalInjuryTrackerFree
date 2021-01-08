//MedicationsCostRowView Component Constructor
function MedicationsCostRowView (displayValueUtil) {
	var MC = require('ui/medications/MedicationsConstants').MedicationsConstants;
	
	this.medicationCostRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(MC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var HalfLengthTextFieldLabel = require('ui/common/entryfields/HalfLengthTextFieldLabel').HalfLengthTextFieldLabel;
    var medicationCostLabel = new HalfLengthTextFieldLabel(displayValueUtil, 'Cost of medication:', textFieldLabelHeight);

	this.medicationCostRowView.add(medicationCostLabel);

	var DollarSignLabel = require('ui/common/entryfields/DollarSignLabel').DollarSignLabel;
    var dollarSignLabel = new DollarSignLabel(displayValueUtil, textFieldLabelHeight, MC.DOLLAR_SIGN_LABEL_WIDTH());

	this.medicationCostRowView.add(dollarSignLabel);

	var ExpenseTextField = require('ui/common/entryfields/ExpenseTextField').ExpenseTextField;
	this.medicationCostTextField = new ExpenseTextField(displayValueUtil, 'The medication cost', MC.DOLLAR_SIGN_LABEL_WIDTH());

	this.medicationCostRowView.add(this.medicationCostTextField);
	this.medicationCostTextField.blur();
}

MedicationsCostRowView.prototype.getMedicationCostRowView = function(){
	return this.medicationCostRowView;
};

MedicationsCostRowView.prototype.getMedicationCostTextField = function(){
	return this.medicationCostTextField.value;
};

MedicationsCostRowView.prototype.setMedicationCostTextField = function(medicationCost){
	this.medicationCostTextField.value = medicationCost;
};


exports.MedicationsCostRowView = MedicationsCostRowView;