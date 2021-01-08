//ActionsWindow Component Constructor
function ActionsWindow(date, displayValueUtil) {
		
	//create component instance
	var actionsWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		actionsWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	//construct UI
	var ActionsView = require('ui/actions/ActionsView').ActionsView;
	var actionsView = new ActionsView(date, displayValueUtil, actionsWindow);
	actionsWindow.add(actionsView);

	actionsWindow.addEventListener('android:back', function (e) {
		//Ti.API.Info("Closing the Actions Window");
		actionsWindow.remove(actionsView);
		actionsWindow.close();
		actionsWindow = null;
	});

	return actionsWindow;
}

//make constructor function the public component interface
exports.ActionsWindow = ActionsWindow;