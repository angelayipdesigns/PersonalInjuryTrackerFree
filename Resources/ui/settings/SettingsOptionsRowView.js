//SettingsOptionsRowView Component Constructor
function SettingsOptionsRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var SC = require('ui/settings/SettingsConstants').SettingsConstants;

    var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) 
    					+ displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(SC.NUM_SIMILAR_ROW_ELEMENTS_ON_SETTINGS_PAGE(), true, usedHeight);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var optionsRowView = Titanium.UI.createTableViewRow();

	var optionsLabel = Titanium.UI.createLabel({
		text:'Options',
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

	optionsRowView.add(optionsLabel);
	
	optionsRowView.addEventListener('click', function() {
   		executeClickEvent(displayValueUtil);
	});
	
	return optionsRowView;
}

function executeClickEvent(displayValueUtil) {
	var OptionsWindow = require('ui/settings/options/OptionsWindow').OptionsWindow;
    var optionsWindow = new OptionsWindow(displayValueUtil);
    optionsWindow.open();
}

exports.SettingsOptionsRowView = SettingsOptionsRowView;