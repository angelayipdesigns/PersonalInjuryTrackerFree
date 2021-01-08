//SaveSpreadsheetWindow Component Constructor
function SaveSpreadsheetWindow(displayValueUtil) {
		
	//create component instance
	var saveSpreadsheetWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		saveSpreadsheetWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var SaveSpreadsheetView = require('ui/settings/savespreadsheet/SaveSpreadsheetView').SaveSpreadsheetView;
	var saveSpreadsheetView = new SaveSpreadsheetView(saveSpreadsheetWindow, displayValueUtil);
	
	saveSpreadsheetWindow.add(saveSpreadsheetView);

	saveSpreadsheetWindow.addEventListener('android:back', function () {
		saveSpreadsheetWindow.remove(saveSpreadsheetView);
		saveSpreadsheetWindow.close();
		saveSpreadsheetWindow = null;
	});

	return saveSpreadsheetWindow;
}

//make constructor function the public component interface
exports.SaveSpreadsheetWindow = SaveSpreadsheetWindow;