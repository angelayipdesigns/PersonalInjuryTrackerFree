//SettingsWindow Component Constructor
function SettingsWindow(displayValueUtil) {
		
	//create component instance
	var settingsWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		settingsWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	//construct UI
	var SettingsView = require('ui/settings/SettingsView').SettingsView;
	var settingsView = new SettingsView(displayValueUtil, settingsWindow);
	settingsWindow.add(settingsView);

	settingsWindow.addEventListener('android:back', function (e) {
		//Ti.API.Info("Closing the Settings Window");
		settingsWindow.remove(settingsView);
		settingsWindow.close();
		settingsWindow = null;
	});

	return settingsWindow;
}

//make constructor function the public component interface
exports.SettingsWindow = SettingsWindow;