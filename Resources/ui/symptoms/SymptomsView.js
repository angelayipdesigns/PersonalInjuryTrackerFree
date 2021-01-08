//SymptomsView Component Constructor
function SymptomsView (symptomsWindow, date, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL									
	});

	var SymptomsTableData = require('ui/symptoms/SymptomsTableData').SymptomsTableData;
    var symptomsTableData = new SymptomsTableData();

	tableView.setData(symptomsTableData.buildTableData(symptomsWindow, date, displayValueUtil));

	symptomsWindow.addEventListener('updateSymptomTable', function() {
		tableView.setData(symptomsTableData.buildTableData(symptomsWindow, date, displayValueUtil));
	}); 
	
	return tableView;
}


exports.SymptomsView = SymptomsView;