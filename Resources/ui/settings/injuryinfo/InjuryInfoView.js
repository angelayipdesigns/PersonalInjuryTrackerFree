//InjuryInfoView Component Constructor
function InjuryInfoView (injuryInfoWindow, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL									
	});

	var InjuryInfoTableData = require('ui/settings/injuryinfo/InjuryInfoTableData').InjuryInfoTableData;
    var injuryInfoTableData = new InjuryInfoTableData();

	tableView.setData(injuryInfoTableData.buildTableData(injuryInfoWindow, displayValueUtil));

	return tableView;
}


exports.InjuryInfoView = InjuryInfoView;