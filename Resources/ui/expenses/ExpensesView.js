//ExpensesView Component Constructor
function ExpensesView (expensesWindow, date, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL									
	});

	var ExpensesTableData = require('ui/expenses/ExpensesTableData').ExpensesTableData;
    var expensesTableData = new ExpensesTableData();

	tableView.setData(expensesTableData.buildTableData(expensesWindow, date, displayValueUtil));

	expensesWindow.addEventListener('updateExpensesTable', function() {
		tableView.setData(expensesTableData.buildTableData(expensesWindow, date, displayValueUtil));
	}); 
	
	return tableView;
}


exports.ExpensesView = ExpensesView;