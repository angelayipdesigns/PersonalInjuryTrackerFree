//SymptomsWindow Component Constructor
function SymptomsWindow(date, displayValueUtil) {
		
	//create component instance
	var symptomsWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		symptomsWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var SymptomsView = require('ui/symptoms/SymptomsView').SymptomsView;
	var symptomsView = new SymptomsView(symptomsWindow, date, displayValueUtil);
	
	symptomsWindow.add(symptomsView);

	symptomsWindow.addEventListener('android:back', function () {
		symptomsWindow.remove(symptomsView);
		symptomsWindow.close();
		symptomsWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	return symptomsWindow;
}

//make constructor function the public component interface
exports.SymptomsWindow = SymptomsWindow;