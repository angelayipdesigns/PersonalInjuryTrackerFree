//SubmitFeedbackWindow Component Constructor
function SubmitFeedbackWindow(displayValueUtil) {
		
	//create component instance
	var submitFeedbackWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		submitFeedbackWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var SubmitFeedbackView = require('ui/settings/submitfeedback/SubmitFeedbackView').SubmitFeedbackView;
	var submitFeedbackView = new SubmitFeedbackView(submitFeedbackWindow, displayValueUtil);
	
	submitFeedbackWindow.add(submitFeedbackView);

	submitFeedbackWindow.addEventListener('android:back', function () {
		submitFeedbackWindow.remove(submitFeedbackView);
		submitFeedbackWindow.close();
		submitFeedbackWindow = null;
	});

	return submitFeedbackWindow;
}

//make constructor function the public component interface
exports.SubmitFeedbackWindow = SubmitFeedbackWindow;