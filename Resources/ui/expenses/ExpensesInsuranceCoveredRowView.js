//ExpensesInsuranceCoveredRowView Component Constructor
function ExpensesInsuranceCoveredRowView (displayValueUtil, insuranceCovered) {
	var MC = require('ui/expenses/ExpensesConstants').ExpensesConstants;
	
	this.expensesInsuranceCoveredRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(MC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var CheckBoxFieldLabel = require('ui/common/entryfields/CheckBoxFieldLabel').CheckBoxFieldLabel;

    var expensesInsuranceCoveredLabel = new CheckBoxFieldLabel(displayValueUtil, 'Covered by Insurance:', textFieldLabelHeight);	
	this.expensesInsuranceCoveredRowView.add(expensesInsuranceCoveredLabel);

	var CheckboxButton = require('ui/common/buttons/CheckboxButton').CheckboxButton;
	this.checkboxButton = new CheckboxButton(displayValueUtil, textFieldLabelHeight, insuranceCovered);
	this.expensesInsuranceCoveredRowView.add(this.checkboxButton.getButtonDisplayable());
}

ExpensesInsuranceCoveredRowView.prototype.getExpensesInsuranceCoveredRowView = function(){
	return this.expensesInsuranceCoveredRowView;
};

ExpensesInsuranceCoveredRowView.prototype.getExpensesInsuranceCovered = function(){
	return this.checkboxButton.getSelected();
};

ExpensesInsuranceCoveredRowView.prototype.setExpensesInsuranceCovered = function(isSelected){
	this.checkboxButton.setSelected(isSelected);
};


exports.ExpensesInsuranceCoveredRowView = ExpensesInsuranceCoveredRowView;