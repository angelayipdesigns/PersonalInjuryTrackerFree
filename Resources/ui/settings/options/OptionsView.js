//OptionsView Component Constructor
function OptionsView (optionsWindow, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL									
	});

	var OptionsTableData = require('ui/settings/options/OptionsTableData').OptionsTableData;
    var optionsTableData = new OptionsTableData();

	tableView.setData(optionsTableData.buildTableData(optionsWindow, displayValueUtil));

	return tableView;
}


exports.OptionsView = OptionsView;