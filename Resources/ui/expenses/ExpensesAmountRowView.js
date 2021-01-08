//ExpensesAmountRowView Component Constructor
function ExpensesAmountRowView (displayValueUtil) {
	var EC = require('ui/expenses/ExpensesConstants').ExpensesConstants;
	
	this.expenseAmountRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(EC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var HalfLengthTextFieldLabel = require('ui/common/entryfields/HalfLengthTextFieldLabel').HalfLengthTextFieldLabel;
    var expenseAmountLabel = new HalfLengthTextFieldLabel(displayValueUtil, 'Amount of expense:', textFieldLabelHeight);

	this.expenseAmountRowView.add(expenseAmountLabel);

	var DollarSignLabel = require('ui/common/entryfields/DollarSignLabel').DollarSignLabel;
    var dollarSignLabel = new DollarSignLabel(displayValueUtil, textFieldLabelHeight, EC.DOLLAR_SIGN_LABEL_WIDTH());

	this.expenseAmountRowView.add(dollarSignLabel);

	var ExpenseTextField = require('ui/common/entryfields/ExpenseTextField').ExpenseTextField;
	this.expenseAmountTextField = new ExpenseTextField(displayValueUtil, 'The expense amount', EC.DOLLAR_SIGN_LABEL_WIDTH());

	this.expenseAmountRowView.add(this.expenseAmountTextField);
	this.expenseAmountTextField.blur();
}

ExpensesAmountRowView.prototype.getExpenseAmountRowView = function(){
	return this.expenseAmountRowView;
};

ExpensesAmountRowView.prototype.getExpenseAmountTextField = function(){
	return this.expenseAmountTextField.value;
};

ExpensesAmountRowView.prototype.setExpenseAmountTextField = function(expenseAmount){
	this.expenseAmountTextField.value = expenseAmount;
};


exports.ExpensesAmountRowView = ExpensesAmountRowView;