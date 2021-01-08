//FirstInjuryTableData Component Constructor
function FirstInjuryTableData (appWindow, date, monthYear) {
	var UIC = require('ui/common/UIConstants').UIConstants;	

	var tableData = [];

	var DisplayValueUtil = require('ui/common/utils/DisplayValueUtil').DisplayValueUtil;
	var displayValueUtil = new DisplayValueUtil();

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var firstInjuryHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView(UIC.PERSONAL_INJURY_TRACKER(), UIC.COLOR_DARK_GREY(), '#FFFFFF', false, false);
	tableData.push(firstInjuryHeaderRowView);

	var WrappedDate = require('ui/beans/WrappedDate').WrappedDate;
    var wrappedDate = new WrappedDate(new Date());
    var wrappedTime = new WrappedDate(new Date());

    var FirstInjuryDateRowView = require('ui/firstinjury/FirstInjuryDateRowView').FirstInjuryDateRowView;
    var firstInjuryDateRowView = new FirstInjuryDateRowView(displayValueUtil, wrappedDate, 'Click Me');
	tableData.push(firstInjuryDateRowView);

    var FirstInjuryTimeRowView = require('ui/firstinjury/FirstInjuryTimeRowView').FirstInjuryTimeRowView;
    var firstInjuryTimeRowView = new FirstInjuryTimeRowView(displayValueUtil, wrappedTime, 'Click Me');
	tableData.push(firstInjuryTimeRowView);
	
    var FirstInjuryNameRowView = require('ui/firstinjury/FirstInjuryNameRowView').FirstInjuryNameRowView;
    var firstInjuryNameRowView = new FirstInjuryNameRowView(displayValueUtil);
	tableData.push(firstInjuryNameRowView.getInjuryNameRowView());
	
    var FirstInjuryDescriptionRowView = require('ui/firstinjury/FirstInjuryDescriptionRowView').FirstInjuryDescriptionRowView;
    var firstInjuryDescriptionRowView = new FirstInjuryDescriptionRowView(displayValueUtil);
	tableData.push(firstInjuryDescriptionRowView.getInjuryDescriptionRowView());
    
	var buttonViewRow = Titanium.UI.createTableViewRow();	
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
    var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);
	
	okButton.addEventListener('click', function(e) {
		var injuryName = firstInjuryNameRowView.getInjuryNameTextFieldValue();
		var selectedDate = wrappedDate.getDate();
		var selectedMonth = selectedDate.getMonth();
		var selectedYear = selectedDate.getFullYear();
		var selectedTime = wrappedTime.getDate();
		monthYear.setMonth(selectedMonth);
		monthYear.setYear(selectedYear);
		var injuryDesc = firstInjuryDescriptionRowView.getInjuryDescriptionTextAreaValue();
   		executeClickEvent(selectedDate, selectedTime, injuryName, injuryDesc);
	});

	buttonViewRow.add(okButton);

	//AndroidSpecific:  Only show the cancel button on Android, iOS doesn't let you exit the app
	if (Titanium.Platform.name == 'android') {
		var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    	var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

		cancelButton.addEventListener('click', function(e) {
			appWindow.close();
		});

		buttonViewRow.add(cancelButton);
	}

	tableData.push(buttonViewRow);
	
	return tableData;
}

function executeClickEvent(injuryDate, injuryTime, injuryName, injuryDesc) {
	var InjuriesDBI = require('db/dbi/injuries/InjuriesDBI').InjuriesDBI;
	var Injury = require('db/dbi/injuries/Injury').Injury;
	var injuriesDBI = new InjuriesDBI();
	var injury = new Injury(-1, injuryDate, injuryTime, injuryName, injuryDesc, 1);
	injuriesDBI.insertInjury(injury);
	
	Ti.App.fireEvent('updateCalendarTable');
}


exports.FirstInjuryTableData = FirstInjuryTableData;