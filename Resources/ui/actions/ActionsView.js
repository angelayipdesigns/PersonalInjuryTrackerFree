//ActionsView Component Constructor
function ActionsView (date, displayValueUtil, actionsWindow) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL									
	});
	tableView.setData(getTableData(date, displayValueUtil, actionsWindow));

	return tableView;
}

function getTableData (date, displayValueUtil, actionsWindow) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var actionsHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView(UIC.PERSONAL_INJURY_TRACKER(), UIC.COLOR_DARK_GREY(), '#FFFFFF', true, true);
	var homeButton = appHeaderRowView.getHomeButton();
	homeButton.addEventListener('click', function(e) {
		actionsWindow.close();
		actionsWindow = null;
	});
	tableData.push(actionsHeaderRowView);

	var AppDateRowView = require('ui/common/components/AppDateRowView').AppDateRowView;
    var appDateRowView = new AppDateRowView(date, displayValueUtil);

	tableData.push(appDateRowView);

    var ActionsSymptomsRowView = require('ui/actions/ActionsSymptomsRowView').ActionsSymptomsRowView;
    var actionsSymptomsRowView = new ActionsSymptomsRowView(date, displayValueUtil);

	tableData.push(actionsSymptomsRowView);

    var ActionsImpactsRowView = require('ui/actions/ActionsImpactsRowView').ActionsImpactsRowView;
    var actionsImpactsRowView = new ActionsImpactsRowView(date, displayValueUtil);

	tableData.push(actionsImpactsRowView);
	
    var ActionsAppointmentsRowView = require('ui/actions/ActionsAppointmentsRowView').ActionsAppointmentsRowView;
    var actionsAppointmentsRowView = new ActionsAppointmentsRowView(date, displayValueUtil);	

	tableData.push(actionsAppointmentsRowView);
	
	var ActionsMedicationsRowView = require('ui/actions/ActionsMedicationsRowView').ActionsMedicationsRowView;
    var actionsMedicationsRowView = new ActionsMedicationsRowView(date, displayValueUtil);	

	tableData.push(actionsMedicationsRowView);
	
	var ActionsExpensesRowView = require('ui/actions/ActionsExpensesRowView').ActionsExpensesRowView;
    var actionsExpensesRowView = new ActionsExpensesRowView(date, displayValueUtil);	

	tableData.push(actionsExpensesRowView);	
	
	return tableData;
}

exports.ActionsView = ActionsView;