//ExpensesDetailRowView Component Constructor
function ExpensesDetailRowView (displayValueUtil) {
	var AC = require('ui/expenses/ExpensesConstants').ExpensesConstants;

	this.expenseDetailRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(AC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var expenseDetailLabel = new TextFieldLabel(displayValueUtil, 'Expense Details:', textFieldLabelHeight);

	this.expenseDetailRowView.add(expenseDetailLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.expenseDetailTextArea = new StandardTextField(displayValueUtil, 'The details of this expense', textFieldLabelHeight);

	this.expenseDetailRowView.add(this.expenseDetailTextArea);
	this.expenseDetailTextArea.blur();
}

ExpensesDetailRowView.prototype.getExpenseDetailTextAreaRowView = function(){
	return this.expenseDetailRowView;
};

ExpensesDetailRowView.prototype.getExpenseDetailTextArea = function(){
	return this.expenseDetailTextArea.value;
};

ExpensesDetailRowView.prototype.setExpenseDetailTextArea = function(expenseDetail){
	this.expenseDetailTextArea.value = expenseDetail;
};


exports.ExpensesDetailRowView = ExpensesDetailRowView;
