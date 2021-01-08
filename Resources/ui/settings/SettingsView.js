//SettingsView Component Constructor
function SettingsView (displayValueUtil, settingsWindow) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});
	tableView.setData(getTableData(displayValueUtil, settingsWindow));

	return tableView;
}

function getTableData (displayValueUtil, settingsWindow) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var settingsHeaderRowView =
    	appHeaderRowView.getBasicHeaderRowView('Settings', '#000000', UIC.COLOR_LIGHT_GREY(), false, false);
	tableData.push(settingsHeaderRowView);

    var SettingsInjuryInfoRowView = require('ui/settings/SettingsInjuryInfoRowView').SettingsInjuryInfoRowView;
    var settingsInjuryInfoRowView = new SettingsInjuryInfoRowView(displayValueUtil);

	tableData.push(settingsInjuryInfoRowView);

    var SettingsSaveSpreadsheetRowView = require('ui/settings/SettingsSaveSpreadsheetRowView').SettingsSaveSpreadsheetRowView;
    var settingsSaveSpreadsheetRowView = new SettingsSaveSpreadsheetRowView(displayValueUtil);

	tableData.push(settingsSaveSpreadsheetRowView);

    var SettingsSubmitFeedbackRowView = require('ui/settings/SettingsSubmitFeedbackRowView').SettingsSubmitFeedbackRowView;
    var settingsSubmitFeedbackRowView = new SettingsSubmitFeedbackRowView(displayValueUtil);

	tableData.push(settingsSubmitFeedbackRowView);

    var SettingsOptionsRowView = require('ui/settings/SettingsOptionsRowView').SettingsOptionsRowView;
    var settingsOptionsRowView = new SettingsOptionsRowView(displayValueUtil);

	tableData.push(settingsOptionsRowView);

	var SettingsKafkaConfigsRowView = require('ui/settings/SettingsKafkaConfigsRowView').SettingsKafkaConfigsRowView;
	var settingsKafkaConfigsRowView = new SettingsKafkaConfigsRowView(displayValueUtil);

  tableData.push(settingsKafkaConfigsRowView);

	var buttonViewRow = Titanium.UI.createTableViewRow();
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		settingsWindow.close();
		settingsWindow = null;
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);

	return tableData;
}

exports.SettingsView = SettingsView;
