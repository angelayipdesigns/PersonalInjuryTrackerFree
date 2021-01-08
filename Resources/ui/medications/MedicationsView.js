//MedicationsView Component Constructor
function MedicationsView (medicationsWindow, date, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL									
	});

	var MedicationsTableData = require('ui/medications/MedicationsTableData').MedicationsTableData;
    var medicationsTableData = new MedicationsTableData();

	tableView.setData(medicationsTableData.buildTableData(medicationsWindow, date, displayValueUtil));

	medicationsWindow.addEventListener('updateMedicationsTable', function() {
		tableView.setData(medicationsTableData.buildTableData(medicationsWindow, date, displayValueUtil));
	}); 
	
	return tableView;
}


exports.MedicationsView = MedicationsView;