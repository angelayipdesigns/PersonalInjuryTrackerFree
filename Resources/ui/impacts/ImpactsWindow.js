//ImpactsWindow Component Constructor
function ImpactsWindow(date, displayValueUtil) {
		
	//create component instance
	var impactsWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		impactsWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var ImpactsView = require('ui/impacts/ImpactsView').ImpactsView;
	var impactsView = new ImpactsView(impactsWindow, date, displayValueUtil);
	
	impactsWindow.add(impactsView);

	impactsWindow.addEventListener('android:back', function () {
		impactsWindow.remove(impactsView);
		impactsWindow.close();
		impactsWindow = null;
		//Ti.App.fireEvent('updateCalendarTable');
	});

	return impactsWindow;
}

//make constructor function the public component interface
exports.ImpactsWindow = ImpactsWindow;