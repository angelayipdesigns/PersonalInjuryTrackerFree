//DollarSignLabel Component Constructor
function DollarSignLabel (displayValueUtil, labelHeight, labelWidth) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var rowObjectHeightBorder= displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorder= displayValueUtil.getRelativeBoarderSize();
	
	var labelLeft = displayValueUtil.getProportionalObjectWidth(2, true);
	var textFieldLabel = Titanium.UI.createLabel({
		text: '$',
		color: '#000000',
		font: { fontSize: UIC.FIELD_FONT_SIZE(), fontWeight: 'bold' },
		height: labelHeight,
		width: labelWidth,
		left: rowObjectWidthBorder + labelLeft, 
		textAlign: 'center',
		top:2*rowObjectHeightBorder
	});
	return textFieldLabel;
}


exports.DollarSignLabel = DollarSignLabel;