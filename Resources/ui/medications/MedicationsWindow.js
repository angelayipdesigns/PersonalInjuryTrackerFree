//MedicationsWindow Component Constructor
function MedicationsWindow(date, displayValueUtil) {
		
	//create component instance
	var medicationsWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		medicationsWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var MedicationsView = require('ui/medications/MedicationsView').MedicationsView;
	var medicationsView = new MedicationsView(medicationsWindow, date, displayValueUtil);
	
	medicationsWindow.add(medicationsView);

	medicationsWindow.addEventListener('android:back', function () {
		medicationsWindow.remove(medicationsView);
		medicationsWindow.close();
		medicationsWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	return medicationsWindow;
}

//make constructor function the public component interface
exports.MedicationsWindow = MedicationsWindow;