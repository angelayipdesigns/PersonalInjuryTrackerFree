//ExpensesWindow Component Constructor
function ExpensesWindow(date, displayValueUtil) {
		
	//create component instance
	var expensesWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		expensesWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var ExpensesView = require('ui/expenses/ExpensesView').ExpensesView;
	var expensesView = new ExpensesView(expensesWindow, date, displayValueUtil);
	
	expensesWindow.add(expensesView);

	expensesWindow.addEventListener('android:back', function () {
		expensesWindow.remove(expensesView);
		expensesWindow.close();
		expensesWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	return expensesWindow;
}

//make constructor function the public component interface
exports.ExpensesWindow = ExpensesWindow;