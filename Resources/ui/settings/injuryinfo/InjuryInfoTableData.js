//InjuryInfoTableData Component Constructor
function InjuryInfoTableData () {
}

InjuryInfoTableData.prototype.buildTableData = function(injuryInfoWindow, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var injuryInfoHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView('Injury Information', '#000000', UIC.COLOR_LIGHT_GREY(), false, false);

	tableData.push(injuryInfoHeaderRowView);

	var FirstInjuryDateRowView = require('ui/firstinjury/FirstInjuryDateRowView').FirstInjuryDateRowView;
	var FirstInjuryTimeRowView = require('ui/firstinjury/FirstInjuryTimeRowView').FirstInjuryTimeRowView;
	var FirstInjuryNameRowView = require('ui/firstinjury/FirstInjuryNameRowView').FirstInjuryNameRowView;
	var FirstInjuryDescriptionRowView = require('ui/firstinjury/FirstInjuryDescriptionRowView').FirstInjuryDescriptionRowView;	
	var TableComponentSeparatorRowView = require('ui/common/components/TableComponentSeparatorRowView').TableComponentSeparatorRowView;
	var UIInjuryInfo = require('ui/settings/injuryinfo/UIInjuryInfo').UIInjuryInfo;
	var InjuriesDBI = require('db/dbi/injuries/InjuriesDBI').InjuriesDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;

	var injuriesDBI = new InjuriesDBI();
	var injuryId = currentInjuryCache.getCurrentId();
	//Titanium.API.info("Retrieved current injury id: " + injuryId);
	var injury = injuriesDBI.getInjuryById(injuryId);

	var WrappedDate = require('ui/beans/WrappedDate').WrappedDate;
    wrappedDate = new WrappedDate(injury.getInjuryDate());
    wrappedTime = new WrappedDate(injury.getInjuryTime());

    var injuryInfoDateRowView = new FirstInjuryDateRowView(displayValueUtil, wrappedDate, wrappedDate.getDate().toDateString());
	tableData.push(injuryInfoDateRowView);
	var injuryInfoTimeRowView = new FirstInjuryTimeRowView(displayValueUtil, wrappedTime, getTimeString(wrappedTime.getDate()));
	tableData.push(injuryInfoTimeRowView);	
    var injuryInfoNameRowView = new FirstInjuryNameRowView(displayValueUtil);
    injuryInfoNameRowView.setInjuryNameTextFieldValue(injury.getInjuryName());
	tableData.push(injuryInfoNameRowView.getInjuryNameRowView());
    var injuryInfoDescriptionRowView = new FirstInjuryDescriptionRowView(displayValueUtil);
	injuryInfoDescriptionRowView.setInjuryDescriptionTextAreaValue(injury.getInjuryDescription());
	tableData.push(injuryInfoDescriptionRowView.getInjuryDescriptionRowView());	
	var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
	tableData.push(tableComponentSeparatorRowView);
	var uiInjuryInfo = new UIInjuryInfo(wrappedDate, wrappedTime, injuryInfoNameRowView, injuryInfoDescriptionRowView);

	var buttonViewRow = Titanium.UI.createTableViewRow();	
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
    var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function() {	
		var preSaveInjuryDate = injury.getInjuryDate();
		save(uiInjuryInfo, injury);
	
		injuryInfoWindow.close();
		injuryInfoWindow = null;
		if (preSaveInjuryDate != uiInjuryInfo.getInjuryInfoDate().getDate()) {
			Ti.App.fireEvent('updateCalendarTable');
		} 
	});

	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		injuryInfoWindow.close();
		injuryInfoWindow = null;
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
};

function getTimeString(date) {
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var timeString = dbDateUtil.getTimeStringForInsert(date);
	return timeString;
}



function save(uiInjuryInfo, injury) {
	var InjuriesDBI = require('db/dbi/injuries/InjuriesDBI').InjuriesDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	
	var injuryId = currentInjuryCache.getCurrentId();
	var injuriesDBI = new InjuriesDBI();

	var uiInjuryInfoDate = uiInjuryInfo.getInjuryInfoDate().getDate();
	var uiInjuryInfoTime = uiInjuryInfo.getInjuryInfoTime().getDate();
	var uiInjuryInfoName = uiInjuryInfo.getInjuryInfoNameRowView().getInjuryNameTextFieldValue();
	var uiInjuryInfoDescription = uiInjuryInfo.getInjuryInfoDescriptionRowView().getInjuryDescriptionTextAreaValue();
		
	if ((injury.getInjuryDate() != uiInjuryInfoDate) || (injury.getInjuryTime() != uiInjuryInfoTime) ||
			(injury.getInjuryName() != uiInjuryInfoName) || (injury.getInjuryDescription() != uiInjuryInfoDescription)) {

		injury.setInjuryDate(uiInjuryInfoDate);
		injury.setInjuryTime(uiInjuryInfoTime);
		injury.setInjuryName(uiInjuryInfoName);
		injury.setInjuryDescription(uiInjuryInfoDescription);
		injuriesDBI.updateInjury(injury);
	}
}


exports.InjuryInfoTableData = InjuryInfoTableData;