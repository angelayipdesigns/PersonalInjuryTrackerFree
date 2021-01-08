//KafkaConfigsWindow Component Constructor
function KafkaConfigsWindow(displayValueUtil) {

	//create component instance
	var kafkaConfigsWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor:'#ffffff',
		navBarHidden:true
	});

	if (Titanium.Platform.name == 'android') {
  		kafkaConfigsWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
	}

	var KafkaConfigsView = require('ui/settings/kafkaconfigs/KafkaConfigsView').KafkaConfigsView;
	var kafkaConfigsView = new KafkaConfigsView(kafkaConfigsWindow, displayValueUtil);

	kafkaConfigsWindow.add(kafkaConfigsView);

	kafkaConfigsWindow.addEventListener('android:back', function () {
		kafkaConfigsWindow.remove(kafkaConfigsView);
		kafkaConfigsWindow.close();
		kafkaConfigsWindow = null;
	});

	return kafkaConfigsWindow;
}

//make constructor function the public component interface
exports.KafkaConfigsWindow = KafkaConfigsWindow;
