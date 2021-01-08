//SettingsInjuryInfoRowView Component Constructor
function SettingsInjuryInfoRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var SC = require('ui/settings/SettingsConstants').SettingsConstants;

    var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) 
    					+ displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(SC.NUM_SIMILAR_ROW_ELEMENTS_ON_SETTINGS_PAGE(), true, usedHeight);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var injuryInfoRowView = Titanium.UI.createTableViewRow();

	var injuryInfoLabel = Titanium.UI.createLabel({
		text:'Injury Information',
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

	injuryInfoRowView.add(injuryInfoLabel);
	
	injuryInfoRowView.addEventListener('click', function() {
   		executeClickEvent(displayValueUtil);
	});
	
	return injuryInfoRowView;
}

function executeClickEvent(displayValueUtil) {
	var InjuryInfoWindow = require('ui/settings/injuryinfo/InjuryInfoWindow').InjuryInfoWindow;
    var injuryInfoWindow = new InjuryInfoWindow(displayValueUtil);
    injuryInfoWindow.open();
}

exports.SettingsInjuryInfoRowView = SettingsInjuryInfoRowView;