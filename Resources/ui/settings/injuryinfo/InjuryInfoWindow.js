//InjuryInfoWindow Component Constructor
function InjuryInfoWindow(displayValueUtil) {
		
	//create component instance
	var injuryInfoWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		injuryInfoWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var InjuryInfoView = require('ui/settings/injuryinfo/InjuryInfoView').InjuryInfoView;
	var injuryInfoView = new InjuryInfoView(injuryInfoWindow, displayValueUtil);
	
	injuryInfoWindow.add(injuryInfoView);

	injuryInfoWindow.addEventListener('android:back', function () {
		injuryInfoWindow.remove(injuryInfoView);
		injuryInfoWindow.close();
		injuryInfoWindow = null;
	});

	return injuryInfoWindow;
}

//make constructor function the public component interface
exports.InjuryInfoWindow = InjuryInfoWindow;