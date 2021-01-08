//SaveSpreadsheetTableData Component Constructor
function SaveSpreadsheetTableData () {
}

function SAVE_SPREADSHEET_PATH() {
	return "SaveSpreadsheetPath";
}

function EMAIL_SPREADSHEET_ADDRESS() {
	return "EmailSpreadsheetAddress";
}

function SPREADSHEET_FILENAME() {
	return "PersonalInjurySpreadsheet.csv";
}

SaveSpreadsheetTableData.prototype.buildTableData = function(saveSpreadsheetWindow, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var saveSpreadsheetHeaderRowView =
    	appHeaderRowView.getBasicHeaderRowView('Save to Spreadsheet', '#000000', UIC.COLOR_LIGHT_GREY(), false, false);

	tableData.push(saveSpreadsheetHeaderRowView);

	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();

	//initialize spreadsheet path objects first, we need it for email
	//we add it to the table later, since we want it to appear below email fields
	var saveSpreadsheetPathValue = settingsDBI.getSettingValueByName(SAVE_SPREADSHEET_PATH());

	var SaveSpreadsheetPathRowView = require('ui/settings/savespreadsheet/SaveSpreadsheetPathRowView').SaveSpreadsheetPathRowView;
  var saveSpreadsheetPathRowView = new SaveSpreadsheetPathRowView(displayValueUtil);
  saveSpreadsheetPathRowView.setSaveSpreadsheetPathTextField(saveSpreadsheetPathValue);

	var SaveSpreadsheetButtonRowView = require('ui/settings/savespreadsheet/SaveSpreadsheetButtonRowView').SaveSpreadsheetButtonRowView;
  var saveSpreadsheetButtonRowView = new SaveSpreadsheetButtonRowView(displayValueUtil);

  saveSpreadsheetButtonRowView.getSaveSpreadsheetButton().addEventListener('click', function() {
		/*
		 * This is functionality disabled on the free version
		var SaveSpreadsheetController = require('ctrls/savespreadsheet/SaveSpreadsheetController').SaveSpreadsheetController;
		var saveSpreadsheetController = new SaveSpreadsheetController(saveSpreadsheetPathRowView.getSaveSpreadsheetPathTextField(), SPREADSHEET_FILENAME());
		var returnMessage = saveSpreadsheetController.saveSpreadsheet();
		*/
		returnMessage = "Sorry, this feature is not enabled on the free version of this application.";
		alert(returnMessage);
	});

	var emailSpreadsheetAddressValue = settingsDBI.getSettingValueByName(EMAIL_SPREADSHEET_ADDRESS());

	var SaveSpreadsheetEmailRowView = require('ui/settings/savespreadsheet/SaveSpreadsheetEmailRowView').SaveSpreadsheetEmailRowView;
  var saveSpreadsheetEmailRowView = new SaveSpreadsheetEmailRowView(displayValueUtil);
  saveSpreadsheetEmailRowView.setSaveSpreadsheetEmailTextField(emailSpreadsheetAddressValue);
	tableData.push(saveSpreadsheetEmailRowView.getSaveSpreadsheetEmailRowView());

	var SaveSpreadsheetEmailButtonRowView = require('ui/settings/savespreadsheet/SaveSpreadsheetEmailButtonRowView').SaveSpreadsheetEmailButtonRowView;
  var saveSpreadsheetEmailButtonRowView = new SaveSpreadsheetEmailButtonRowView(displayValueUtil);

  saveSpreadsheetEmailButtonRowView.getSaveSpreadsheetEmailButton().addEventListener('click', function() {
		/*
		 * This is functionality disabled on the free version
		var EmailSpreadsheetController = require('ctrls/savespreadsheet/EmailSpreadsheetController').EmailSpreadsheetController;
		var emailSpreadsheetController = new EmailSpreadsheetController(saveSpreadsheetEmailRowView.getSaveSpreadsheetEmailTextField(), SPREADSHEET_FILENAME());
		var returnCode = emailSpreadsheetController.emailSpreadsheet();
		if (!returnCode) {
			alert(emailSpreadsheetController.getErrorMessage());
		}
		*/
		returnMessage = "Sorry, this feature is not enabled on the free version of this application.";
		alert(returnMessage);
	});

	tableData.push(saveSpreadsheetEmailButtonRowView.getSaveSpreadsheetEmailButtonRowView());

	var SaveSpreadsheetOpenRowView = require('ui/settings/savespreadsheet/SaveSpreadsheetOpenRowView').SaveSpreadsheetOpenRowView;
  var saveSpreadsheetOpenRowView = new SaveSpreadsheetOpenRowView(displayValueUtil);
	tableData.push(saveSpreadsheetOpenRowView.getSaveSpreadsheetOpenRowView());

	var SaveSpreadsheetOpenButtonRowView = require('ui/settings/savespreadsheet/SaveSpreadsheetOpenButtonRowView').SaveSpreadsheetOpenButtonRowView;
  var saveSpreadsheetOpenButtonRowView = new SaveSpreadsheetOpenButtonRowView(displayValueUtil);

  saveSpreadsheetOpenButtonRowView.getSaveSpreadsheetOpenButton().addEventListener('click', function() {
		/*
		 * This is functionality disabled on the free version
		var OpenSpreadsheetController = require('ctrls/savespreadsheet/OpenSpreadsheetController').OpenSpreadsheetController;
		var openSpreadsheetController = new OpenSpreadsheetController(saveSpreadsheetOpenRowView, SPREADSHEET_FILENAME());
		var returnCode = openSpreadsheetController.openSpreadsheet();
		if (!returnCode) {
			alert(openSpreadsheetController.getErrorMessage());
		}
		*/
		returnMessage = "Sorry, this feature is not enabled on the free version of this application.";
		alert(returnMessage);
	});

	tableData.push(saveSpreadsheetOpenButtonRowView.getSaveSpreadsheetOpenButtonRowView());

  // We will put the save spreadsheet section last, since it's probably least useful
	tableData.push(saveSpreadsheetPathRowView.getSaveSpreadsheetPathRowView());
	tableData.push(saveSpreadsheetButtonRowView.getSaveSpreadsheetButtonRowView());

	var TableComponentSeparatorRowView = require('ui/common/components/TableComponentSeparatorRowView').TableComponentSeparatorRowView;
	var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
  tableData.push(tableComponentSeparatorRowView);

	var buttonViewRow = Titanium.UI.createTableViewRow();
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
    var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function() {
		var newSaveSpreadsheetPathValue = saveSpreadsheetPathRowView.getSaveSpreadsheetPathTextField();
		var newSaveSpreadsheetEmailValue = saveSpreadsheetEmailRowView.getSaveSpreadsheetEmailTextField();
		if ((saveSpreadsheetPathValue != newSaveSpreadsheetPathValue) ||
				(emailSpreadsheetAddressValue != newSaveSpreadsheetEmailValue)) {
			if (saveSpreadsheetPathValue != newSaveSpreadsheetPathValue) {
				var SaveSpreadsheetUtil = require('infra/savespreadsheetutil/SaveSpreadsheetUtil').SaveSpreadsheetUtil;
				var saveSpreadsheetUtil = new SaveSpreadsheetUtil();
				if (saveSpreadsheetUtil.verifyPath(newSaveSpreadsheetPathValue)) {
					saveSpreadsheetPath(newSaveSpreadsheetPathValue);
					if (emailSpreadsheetAddressValue != newSaveSpreadsheetEmailValue) {
						saveEmailAddress(newSaveSpreadsheetEmailValue);
					}
					saveSpreadsheetWindow.close();
					saveSpreadsheetWindow = null;
				}
				else {
					alert("The path: " + newSaveSpreadsheetPathValue + " is not valid on this device.");
				}
			}
			else {
				saveEmailAddress(newSaveSpreadsheetEmailValue);
				saveSpreadsheetWindow.close();
				saveSpreadsheetWindow = null;
			}
		}
		else {
			saveSpreadsheetWindow.close();
			saveSpreadsheetWindow = null;
		}
	});

	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		saveSpreadsheetWindow.close();
		saveSpreadsheetWindow = null;
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
};

function saveSpreadsheetPath(newSaveSpreadsheetPathValue) {
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();
	settingsDBI.updateSettingValueByName(SAVE_SPREADSHEET_PATH(), newSaveSpreadsheetPathValue);
}

function saveEmailAddress(newSaveSpreadsheetEmailValue) {
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();
	settingsDBI.updateSettingValueByName(EMAIL_SPREADSHEET_ADDRESS(), newSaveSpreadsheetEmailValue);
}

exports.SaveSpreadsheetTableData = SaveSpreadsheetTableData;
