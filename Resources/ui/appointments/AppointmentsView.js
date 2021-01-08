//AppointmentsView Component Constructor
function AppointmentsView (appointmentsWindow, date, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL									
	});

	var AppointmentsTableData = require('ui/appointments/AppointmentsTableData').AppointmentsTableData;
    var appointmentsTableData = new AppointmentsTableData();

	tableView.setData(appointmentsTableData.buildTableData(appointmentsWindow, date, displayValueUtil));

	appointmentsWindow.addEventListener('updateAppointmentsTable', function() {
		tableView.setData(appointmentsTableData.buildTableData(appointmentsWindow, date, displayValueUtil));
	}); 
	
	return tableView;
}


exports.AppointmentsView = AppointmentsView;