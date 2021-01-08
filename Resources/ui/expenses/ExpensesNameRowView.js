//ExpensesNameRowView Component Constructor
function ExpensesNameRowView (displayValueUtil, expenseId, expensesWindow) {
	var AC = require('ui/expenses/ExpensesConstants').ExpensesConstants;
	
	this.expenseNameRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(AC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var expenseNameLabel = new TextFieldLabel(displayValueUtil, 'Name:', textFieldLabelHeight);
	
	this.expenseNameRowView.add(expenseNameLabel);

	if (expenseId >= 0) {
		var DeleteButton = require('ui/common/buttons/DeleteButton').DeleteButton;
		var deleteButton = new DeleteButton(displayValueUtil);

		deleteButton.addEventListener('click', function() {
				var ExpensesDBI = require('db/dbi/expenses/ExpensesDBI').ExpensesDBI;
				var expensesDBI = new ExpensesDBI();
				expensesDBI.deleteExpense(expenseId);
				expensesWindow.fireEvent('updateExpensesTable');
		});	
	
		this.expenseNameRowView.add(deleteButton);
	}

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.expenseNameTextField = new StandardTextField(displayValueUtil, 'The name of the expense', textFieldLabelHeight);

	this.expenseNameRowView.add(this.expenseNameTextField);
	this.expenseNameTextField.blur();
}

ExpensesNameRowView.prototype.getExpenseNameRowView = function(){
	return this.expenseNameRowView;
};

ExpensesNameRowView.prototype.getExpenseNameTextField = function(){
	return this.expenseNameTextField.value;
};

ExpensesNameRowView.prototype.setExpenseNameTextField = function(expenseName){
	this.expenseNameTextField.value = expenseName;
};


exports.ExpensesNameRowView = ExpensesNameRowView;