//MileageUnitLabel Component Constructor
function MILEAGE_UNIT() {
	return "MileageUnit";
}

function MileageUnitLabel (displayValueUtil, labelHeight, labelWidth) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();

	var rowObjectHeightBorder= displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorder= displayValueUtil.getRelativeBoarderSize();
	
	var mileageUnit = settingsDBI.getSettingValueByName(MILEAGE_UNIT());
	
	var labelLeft = displayValueUtil.getProportionalObjectWidth(2, true);
	var textFieldLabel = Titanium.UI.createLabel({
		text: mileageUnit,
		color: '#000000',
		font: { fontSize: UIC.FIELD_FONT_SIZE(), fontWeight: 'bold' },
		height: labelHeight,
		width: labelWidth,
		left: rowObjectWidthBorder + labelLeft, 
		textAlign: 'left',
		top:2*rowObjectHeightBorder
	});
	return textFieldLabel;
}


exports.MileageUnitLabel = MileageUnitLabel;