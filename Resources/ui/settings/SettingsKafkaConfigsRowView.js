//SettingsKafkaConfigsRowView Component Constructor
function SettingsKafkaConfigsRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var SC = require('ui/settings/SettingsConstants').SettingsConstants;

    var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT())
    					+ displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(SC.NUM_SIMILAR_ROW_ELEMENTS_ON_SETTINGS_PAGE(), true, usedHeight);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var kafkaConfigsRowView = Titanium.UI.createTableViewRow();

	var kafkaConfigsLabel = Titanium.UI.createLabel({
		text:'Kafka-Rest Configs',
		borderColor: UIC.COLOR_LIGHT_GREY(),
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: "20dp" },
		height: rowObjectHeightPercent - rowObjectHeightBorderPercent,
		width: displayValueUtil.getAbsoluteWidthLessBoarders(),
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 5,
		top: rowObjectHeightBorderPercent
	});

	kafkaConfigsRowView.add(kafkaConfigsLabel);

	kafkaConfigsRowView.addEventListener('click', function() {
   		executeClickEvent(displayValueUtil);
	});

	return kafkaConfigsRowView;
}

function executeClickEvent(displayValueUtil) {
	var KafkaConfigsWindow = require('ui/settings/kafkaconfigs/KafkaConfigsWindow').KafkaConfigsWindow;
    var kafkaConfigsWindow = new KafkaConfigsWindow(displayValueUtil);
    kafkaConfigsWindow.open();
}

exports.SettingsKafkaConfigsRowView = SettingsKafkaConfigsRowView;
