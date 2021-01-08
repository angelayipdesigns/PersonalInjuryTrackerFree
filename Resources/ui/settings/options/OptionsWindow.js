//OptionsWindow Component Constructor
function OptionsWindow(displayValueUtil) {
		
	//create component instance
	var optionsWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		optionsWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var OptionsView = require('ui/settings/options/OptionsView').OptionsView;
	var optionsView = new OptionsView(optionsWindow, displayValueUtil);
	
	optionsWindow.add(optionsView);

	optionsWindow.addEventListener('android:back', function () {
		optionsWindow.remove(optionsView);
		optionsWindow.close();
		optionsWindow = null;
	});

	return optionsWindow;
}

//make constructor function the public component interface
exports.OptionsWindow = OptionsWindow;