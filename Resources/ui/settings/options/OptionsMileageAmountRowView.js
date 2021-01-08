//OptionsMileageAmountRowView Component Constructor
function OptionsMileageAmountRowView (displayValueUtil) {
	var OC = require('ui/settings/options/OptionsConstants').OptionsConstants;
	
	this.optionsMileageAmountRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(OC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var HalfLengthTextFieldLabel = require('ui/common/entryfields/HalfLengthTextFieldLabel').HalfLengthTextFieldLabel;
    var optionsMileageAmountLabel = new HalfLengthTextFieldLabel(displayValueUtil, 'Mileage Amount:', textFieldLabelHeight);

	this.optionsMileageAmountRowView.add(optionsMileageAmountLabel);

	var DollarSignLabel = require('ui/common/entryfields/DollarSignLabel').DollarSignLabel;
    var dollarSignLabel = new DollarSignLabel(displayValueUtil, textFieldLabelHeight, OC.DOLLAR_SIGN_LABEL_WIDTH());

	this.optionsMileageAmountRowView.add(dollarSignLabel);

	var ExpenseTextField = require('ui/common/entryfields/ExpenseTextField').ExpenseTextField;
	this.optionsMileageAmountTextField = new ExpenseTextField(displayValueUtil, 'The mileage amount', OC.DOLLAR_SIGN_LABEL_WIDTH());

	this.optionsMileageAmountRowView.add(this.optionsMileageAmountTextField);
	this.optionsMileageAmountTextField.blur();
}

OptionsMileageAmountRowView.prototype.getOptionsMileageAmountRowView = function(){
	return this.optionsMileageAmountRowView;
};

OptionsMileageAmountRowView.prototype.getOptionsMileageAmountTextField = function(){
	return this.optionsMileageAmountTextField.value;
};

OptionsMileageAmountRowView.prototype.setOptionsMileageAmountTextField = function(optionsMileageAmount){
	this.optionsMileageAmountTextField.value = optionsMileageAmount;
};


exports.OptionsMileageAmountRowView = OptionsMileageAmountRowView;