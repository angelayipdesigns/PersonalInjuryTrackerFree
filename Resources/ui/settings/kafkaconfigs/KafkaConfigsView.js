//KafkaConfigsView Component Constructor
function KafkaConfigsView (kafkaConfigsWindow, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});

	var KafkaConfigsTableData = require('ui/settings/kafkaconfigs/KafkaConfigsTableData').KafkaConfigsTableData;
    var kafkaConfigsTableData = new KafkaConfigsTableData();

	tableView.setData(kafkaConfigsTableData.buildTableData(kafkaConfigsWindow, displayValueUtil));

	return tableView;
}


exports.KafkaConfigsView = KafkaConfigsView;
