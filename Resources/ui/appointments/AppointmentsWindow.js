//AppointmentsWindow Component Constructor
function AppointmentsWindow(date, displayValueUtil) {
		
	//create component instance
	var appointmentsWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		appointmentsWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var AppointmentsView = require('ui/appointments/AppointmentsView').AppointmentsView;
	var appointmentsView = new AppointmentsView(appointmentsWindow, date, displayValueUtil);
	
	appointmentsWindow.add(appointmentsView);

	appointmentsWindow.addEventListener('android:back', function () {
		appointmentsWindow.remove(appointmentsView);
		appointmentsWindow.close();
		appointmentsWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	return appointmentsWindow;
}

//make constructor function the public component interface
exports.AppointmentsWindow = AppointmentsWindow;