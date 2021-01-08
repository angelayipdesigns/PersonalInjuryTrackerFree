//ImpactsView Component Constructor
function ImpactsView (impactsWindow, date, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL									
	});

	var ImpactsTableData = require('ui/impacts/ImpactsTableData').ImpactsTableData;
    var impactsTableData = new ImpactsTableData();

	tableView.setData(impactsTableData.buildTableData(impactsWindow, date, displayValueUtil));

	/*
	impactsWindow.addEventListener('updateSymptomTable', function() {
		tableView.setData(impactsTableData.buildTableData(impactsWindow, date, displayValueUtil));
	});*/
	
	return tableView;
}


exports.ImpactsView = ImpactsView;