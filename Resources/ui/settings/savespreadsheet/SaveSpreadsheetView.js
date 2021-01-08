//SaveSpreadsheetView Component Constructor
function SaveSpreadsheetView (saveSpreadsheetWindow, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL									
	});

	var SaveSpreadsheetTableData = require('ui/settings/savespreadsheet/SaveSpreadsheetTableData').SaveSpreadsheetTableData;
    var saveSpreadsheetTableData = new SaveSpreadsheetTableData();

	tableView.setData(saveSpreadsheetTableData.buildTableData(saveSpreadsheetWindow, displayValueUtil));

	return tableView;
}


exports.SaveSpreadsheetView = SaveSpreadsheetView;