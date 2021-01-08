//SettingsSaveSpreadsheetRowView Component Constructor
function SettingsSaveSpreadsheetRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var SC = require('ui/settings/SettingsConstants').SettingsConstants;

    var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) 
    					+ displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(SC.NUM_SIMILAR_ROW_ELEMENTS_ON_SETTINGS_PAGE(), true, usedHeight);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var saveSpreadsheetRowView = Titanium.UI.createTableViewRow();

	var saveSpreadsheetLabel = Titanium.UI.createLabel({
		text:'Email Spreadsheet',
		borderColor: UIC.COLOR_LIGHT_GREY(),
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: "20dp" },
		height: rowObjectHeightPercent - rowObjectHeightBorderPercent,
		width: displayValueUtil.getAbsoluteWidthLessBoarders(),
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 5,
		top: rowObjectHeightBorderPercent
	});

	saveSpreadsheetRowView.add(saveSpreadsheetLabel);
	
	saveSpreadsheetRowView.addEventListener('click', function() {
   		executeClickEvent(displayValueUtil);
	});
	
	return saveSpreadsheetRowView;
}

function executeClickEvent(displayValueUtil) {
	var SaveSpreadsheetWindow = require('ui/settings/savespreadsheet/SaveSpreadsheetWindow').SaveSpreadsheetWindow;
    var saveSpreadsheetWindow = new SaveSpreadsheetWindow(displayValueUtil);
    saveSpreadsheetWindow.open();
}

exports.SettingsSaveSpreadsheetRowView = SettingsSaveSpreadsheetRowView;