//ExpensesTableData Component Constructor
function ExpensesTableData () {
}

ExpensesTableData.prototype.buildTableData = function(expensesWindow, date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var expensesHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView('Expenses', '#000000', UIC.COLOR_PURPLE(), false, true);

	tableData.push(expensesHeaderRowView);

	var AppDateRowView = require('ui/common/components/AppDateRowView').AppDateRowView;
    var appDateRowView = new AppDateRowView(date, displayValueUtil);
	tableData.push(appDateRowView);

	var ExpensesNameRowView = require('ui/expenses/ExpensesNameRowView').ExpensesNameRowView;
	var ExpensesDetailRowView = require('ui/expenses/ExpensesDetailRowView').ExpensesDetailRowView;
	var ExpensesAmountRowView = require('ui/expenses/ExpensesAmountRowView').ExpensesAmountRowView;
	var ExpensesInsuranceCoveredRowView = require('ui/expenses/ExpensesInsuranceCoveredRowView').ExpensesInsuranceCoveredRowView;
	var TableComponentSeparatorRowView = require('ui/common/components/TableComponentSeparatorRowView').TableComponentSeparatorRowView;
	var UIExpense = require('ui/expenses/UIExpense').UIExpense;
	var ExpensesDBI = require('db/dbi/expenses/ExpensesDBI').ExpensesDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;

	var uiExpenses = [];
	var expensesDBI = new ExpensesDBI();
	var injuryId = currentInjuryCache.getCurrentId();
	//Titanium.API.info("Retrieved current injury id: " + injuryId);

	var expenses = expensesDBI.getExpensesByInjuryIdExpenseDate(injuryId, date);
	
	for (var i = 0; i < expenses.length; i++) {
    	var expense = expenses[i];
    	var expensesNameRowView = new ExpensesNameRowView(displayValueUtil, expense.getId(), expensesWindow);
    	expensesNameRowView.setExpenseNameTextField(expense.getExpenseName());
		tableData.push(expensesNameRowView.getExpenseNameRowView());
    	var expensesDetailRowView = new ExpensesDetailRowView(displayValueUtil);
    	expensesDetailRowView.setExpenseDetailTextArea(expense.getExpenseDetail());
    	tableData.push(expensesDetailRowView.getExpenseDetailTextAreaRowView());
    	var expensesAmountRowView = new ExpensesAmountRowView(displayValueUtil);
    	expensesAmountRowView.setExpenseAmountTextField(expense.getExpenseAmount());
    	tableData.push(expensesAmountRowView.getExpenseAmountRowView());
		var expensesInsuranceCoveredRowView = new ExpensesInsuranceCoveredRowView(displayValueUtil, expense.getInsuranceCovered());
		tableData.push(expensesInsuranceCoveredRowView.getExpensesInsuranceCoveredRowView());
    	
    	var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
    	tableData.push(tableComponentSeparatorRowView);
    	var uiExpense = new UIExpense(expensesNameRowView, expensesDetailRowView, expensesAmountRowView, expensesInsuranceCoveredRowView);
    	uiExpenses.push(uiExpense);
	}

    var expensesNameRowView = new ExpensesNameRowView(displayValueUtil, -1, expensesWindow);
	tableData.push(expensesNameRowView.getExpenseNameRowView());
    var expensesDetailRowView = new ExpensesDetailRowView(displayValueUtil);
    tableData.push(expensesDetailRowView.getExpenseDetailTextAreaRowView());
	var expensesAmountRowView = new ExpensesAmountRowView(displayValueUtil);
    tableData.push(expensesAmountRowView.getExpenseAmountRowView());
	var expensesInsuranceCoveredRowView = new ExpensesInsuranceCoveredRowView(displayValueUtil, false);
	tableData.push(expensesInsuranceCoveredRowView.getExpensesInsuranceCoveredRowView());
    
    var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
    tableData.push(tableComponentSeparatorRowView);

	var buttonViewRow = Titanium.UI.createTableViewRow();	
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var AddButton = require('ui/common/buttons/AddButton').AddButton;
    var addButton = new AddButton(buttonHeight, buttonWidth, buttonBorderWidth);

	addButton.addEventListener('click', function() {	
		save(uiExpenses, expenses, expensesNameRowView, expensesDetailRowView, expensesAmountRowView, expensesInsuranceCoveredRowView, date);
		expensesWindow.fireEvent('updateExpensesTable');	
	});

	buttonViewRow.add(addButton);

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
    var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function() {	
		save(uiExpenses, expenses, expensesNameRowView, expensesDetailRowView, expensesAmountRowView, expensesInsuranceCoveredRowView, date);
	
		expensesWindow.close();
		expensesWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		expensesWindow.close();
		expensesWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
};

function save(uiExpenses, expenses, currentExpensesNameRowView, currentExpensesDetailRowView, currentExpensesAmountRowView, currentExpensesInsuranceCoveredRowView, date) {
	var Expense = require('db/dbi/expenses/Expense').Expense;
	var ExpensesDBI = require('db/dbi/expenses/ExpensesDBI').ExpensesDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	
	var injuryId = currentInjuryCache.getCurrentId();
	var expensesDBI = new ExpensesDBI();

	for (var i = 0; i < uiExpenses.length; i++) {
		var uiExpense = uiExpenses[i];
		var uiExpensesNameRowView = uiExpense.getExpensesNameRowView();
		var uiExpensesDetailRowView = uiExpense.getExpensesDetailRowView();
		var uiExpensesAmountRowView = uiExpense.getExpensesAmountRowView();
		var uiExpensesInsuranceCoveredRowView = uiExpense.getExpensesInsuranceCoveredRowView();
		var uiExpenseName = uiExpensesNameRowView.getExpenseNameTextField();
		var uiExpenseDetail = uiExpensesDetailRowView.getExpenseDetailTextArea();
		var uiExpenseAmount = uiExpensesAmountRowView.getExpenseAmountTextField();
		var uiExpenseInsuranceCovered = uiExpensesInsuranceCoveredRowView.getExpensesInsuranceCovered();
		

		var expense = expenses[i];
		if ((expense.getExpenseName() != uiExpenseName) || (expense.getExpenseDetail() != uiExpenseDetail) ||
				(expense.getExpenseAmount() != uiExpenseAmount) || (expense.getInsuranceCovered() != uiExpenseInsuranceCovered)) {
			expense.setExpenseName(uiExpenseName);
			expense.setExpenseDetail(uiExpenseDetail);
			expense.setExpenseAmount(uiExpenseAmount);
			expense.setInsuranceCovered(uiExpenseInsuranceCovered);
			expensesDBI.updateExpense(expense);
		}
	}		

	var expenseName = currentExpensesNameRowView.getExpenseNameTextField();
	var expenseDetail = currentExpensesDetailRowView.getExpenseDetailTextArea();
	var expenseAmount = currentExpensesAmountRowView.getExpenseAmountTextField();
	var insuranceCovered = currentExpensesInsuranceCoveredRowView.getExpensesInsuranceCovered();
	
	if (expenseName || expenseDetail || expenseAmount || insuranceCovered) {
		var newExpense = new Expense('noid', injuryId, date, expenseName, expenseDetail, expenseAmount, insuranceCovered);
		var id = expensesDBI.insertExpense(newExpense);
	}
}


exports.ExpensesTableData = ExpensesTableData;