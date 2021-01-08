//ImpactsTableData Component Constructor
function ImpactsTableData () {
}

ImpactsTableData.prototype.buildTableData = function(impactsWindow, date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var impactsHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView('Impacts', '#000000', UIC.COLOR_BLUE(), false, true);

	tableData.push(impactsHeaderRowView);

	var AppDateRowView = require('ui/common/components/AppDateRowView').AppDateRowView;
    var appDateRowView = new AppDateRowView(date, displayValueUtil);
	tableData.push(appDateRowView);

	var ImpactsMissedWorkRowView = require('ui/impacts/ImpactsMissedWorkRowView').ImpactsMissedWorkRowView;
	var ImpactsMissedWorkDetailsRowView = require('ui/impacts/ImpactsMissedWorkDetailsRowView').ImpactsMissedWorkDetailsRowView;
	var ImpactsHouseActivitiesRowView = require('ui/impacts/ImpactsHouseActivitiesRowView').ImpactsHouseActivitiesRowView;
	var ImpactsHouseActivitiesDetailsRowView = require('ui/impacts/ImpactsHouseActivitiesDetailsRowView').ImpactsHouseActivitiesDetailsRowView;
	var ImpactsAdditionalDetailsRowView = require('ui/impacts/ImpactsAdditionalDetailsRowView').ImpactsAdditionalDetailsRowView;
	
	var UIImpact = require('ui/impacts/UIImpact').UIImpact;
	var ImpactsDBI = require('db/dbi/impacts/ImpactsDBI').ImpactsDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;

	var uiImpact;
	var impactsDBI = new ImpactsDBI();
	var injuryId = currentInjuryCache.getCurrentId();
	//Titanium.API.info("Retrieved current injury id: " + injuryId);
	var impact = impactsDBI.getImpactByInjuryIdImpactDate(injuryId, date);
	if (impact) {
		var impactsMissedWorkRowView = new ImpactsMissedWorkRowView(displayValueUtil, impact.getMissedWork());
		tableData.push(impactsMissedWorkRowView.getImpactsMissedWorkRowView());
		var impactsMissedWorkDetailsRowView = new ImpactsMissedWorkDetailsRowView(displayValueUtil);
		impactsMissedWorkDetailsRowView.setImpactsMissedWorkDetailsTextField(impact.getMissedWorkDetails());
		tableData.push(impactsMissedWorkDetailsRowView.getImpactsMissedWorkDetailsRowView());
		var impactsHouseActivitiesRowView = new ImpactsHouseActivitiesRowView(displayValueUtil, impact.getHouseActivities());
		tableData.push(impactsHouseActivitiesRowView.getImpactsHouseActivitiesRowView());
		var impactsHouseActivitiesDetailsRowView = new ImpactsHouseActivitiesDetailsRowView(displayValueUtil);
		impactsHouseActivitiesDetailsRowView.setImpactsHouseActivitiesDetailsTextField(impact.getHouseActivityDetails());
		tableData.push(impactsHouseActivitiesDetailsRowView.getImpactsHouseActivitiesDetailsRowView());
    	var impactsAdditionalDetailsRowView = new ImpactsAdditionalDetailsRowView(displayValueUtil);
    	impactsAdditionalDetailsRowView.setImpactsAdditionalDetailsTextArea(impact.getOtherDetails());
    	tableData.push(impactsAdditionalDetailsRowView.getImpactsAdditionalDetailsRowView());
    	uiImpact = new UIImpact(impactsMissedWorkRowView, impactsMissedWorkDetailsRowView,
    							impactsHouseActivitiesRowView, impactsHouseActivitiesDetailsRowView,
    							impactsAdditionalDetailsRowView);
	}
	else {
		var impactsMissedWorkRowView = new ImpactsMissedWorkRowView(displayValueUtil, false);
		tableData.push(impactsMissedWorkRowView.getImpactsMissedWorkRowView());
		var impactsMissedWorkDetailsRowView = new ImpactsMissedWorkDetailsRowView(displayValueUtil);
		tableData.push(impactsMissedWorkDetailsRowView.getImpactsMissedWorkDetailsRowView());
		var impactsHouseActivitiesRowView = new ImpactsHouseActivitiesRowView(displayValueUtil, false);
		tableData.push(impactsHouseActivitiesRowView.getImpactsHouseActivitiesRowView());
		var impactsHouseActivitiesDetailsRowView = new ImpactsHouseActivitiesDetailsRowView(displayValueUtil);
		tableData.push(impactsHouseActivitiesDetailsRowView.getImpactsHouseActivitiesDetailsRowView());
    	var impactsAdditionalDetailsRowView = new ImpactsAdditionalDetailsRowView(displayValueUtil);
    	tableData.push(impactsAdditionalDetailsRowView.getImpactsAdditionalDetailsRowView());
    	uiImpact = new UIImpact(impactsMissedWorkRowView, impactsMissedWorkDetailsRowView,
    							impactsHouseActivitiesRowView, impactsHouseActivitiesDetailsRowView,
    							impactsAdditionalDetailsRowView);
	}

	var buttonViewRow = Titanium.UI.createTableViewRow();	
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
    var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function() {	
		save(uiImpact, impact, date);
	
		impactsWindow.close();
		impactsWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		impactsWindow.close();
		impactsWindow = null;
		//Ti.App.fireEvent('updateCalendarTable');
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
};

function save(uiImpact, impact, date) {
	var Impact = require('db/dbi/impacts/Impact').Impact;
	var ImpactsDBI = require('db/dbi/impacts/ImpactsDBI').ImpactsDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	
	var injuryId = currentInjuryCache.getCurrentId();
	var impactsDBI = new ImpactsDBI();

	var uiMissedWork = uiImpact.getImpactsMissedWorkRowView().getImpactsMissedWork();
	var uiMissedWorkDetails = uiImpact.getImpactsMissedWorkDetailsRowView().getImpactsMissedWorkDetailsTextField();
	var uiHouseActivities = uiImpact.getImpactsHouseActivitiesRowView().getImpactsHouseActivities();
	var uiHouseActivityDetails = uiImpact.getImpactsHouseActivitiesDetailsRowView().getImpactsHouseActivitiesDetailsTextField();
	var uiAdditionalDetails = uiImpact.getImpactsAdditionalDetailsRowView().getImpactsAdditionalDetailsTextArea();


	if (impact) {		
		if ((impact.getMissedWork() != uiMissedWork) || (impact.getMissedWorkDetails() != uiMissedWorkDetails) ||
				(impact.getHouseActivities() != uiHouseActivities) || (impact.getHouseActivityDetails() != uiHouseActivityDetails) ||
				(impact.getOtherDetails() != uiAdditionalDetails)) {
		
			impact.setMissedWork(uiMissedWork);
			impact.setMissedWorkDetails(uiMissedWorkDetails);
			impact.setHouseActivities(uiHouseActivities);
			impact.setHouseActivityDetails(uiHouseActivityDetails);
			impact.setOtherDetails(uiAdditionalDetails);
			if (uiMissedWork || uiMissedWorkDetails || uiHouseActivities || uiHouseActivityDetails || uiAdditionalDetails) {
				impactsDBI.updateImpact(impact);
			}
			else {
				impactsDBI.deleteImpact(impact.getId());
			}
		}
	}
	else {
		if (uiMissedWork || uiMissedWorkDetails || uiHouseActivities || uiHouseActivityDetails || uiAdditionalDetails) {
			var newImpact = new Impact('noid', injuryId, date, uiMissedWork, uiMissedWorkDetails, uiHouseActivities, uiHouseActivityDetails, uiAdditionalDetails);
			var id = impactsDBI.insertImpact(newImpact);
		}
	}
}


exports.ImpactsTableData = ImpactsTableData;