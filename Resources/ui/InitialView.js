//InitialView Component Constructor
function InitialView (appWindow) {

	var currentDate = new Date();
	var currentMonth = currentDate.getMonth();
	var currentYear = currentDate.getFullYear();

    var MonthYear = require('ui/beans/MonthYear').MonthYear;
    var monthYear = new MonthYear(currentMonth, currentYear);

	var InjuriesDBI = require('db/dbi/injuries/InjuriesDBI').InjuriesDBI;
	var injuriesDBI = new InjuriesDBI();

	var CalendarTableData = require('ui/calendar/CalendarTableData').CalendarTableData;
	var calendarTableData = new CalendarTableData();

	var tableData;

	if (injuriesDBI.noInjuryDefined()) {
		var FirstInjuryTableData = require('ui/firstinjury/FirstInjuryTableData').FirstInjuryTableData;
		tableData = new FirstInjuryTableData(appWindow, currentDate, monthYear);
	}
	else {
		tableData = calendarTableData.buildTableData(monthYear);
	}

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL								
	});
	tableView.setData(tableData);
	
	Ti.App.addEventListener('updateCalendarTable', function() {
		tableView.setData(calendarTableData.buildTableData(monthYear));
	}); 
	
	return tableView;
}

exports.InitialView = InitialView;