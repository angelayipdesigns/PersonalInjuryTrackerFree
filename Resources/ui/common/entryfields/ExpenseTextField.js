//ExpenseTextField Component Constructor
function ExpenseTextField (displayValueUtil, hintText, dollarSignWidth) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var rowObjectHeightBorder = displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorder = displayValueUtil.getRelativeBoarderSize();	
	var textFieldHeight = displayValueUtil.getRelativeHeight(7);
	var labelWidth = displayValueUtil.getProportionalObjectWidth(2, true);
	var textFieldWidth = labelWidth - dollarSignWidth;

	var keyboardType = Ti.UI.KEYBOARD_ASCII;
	
	if (Titanium.Platform.name == 'android') {
		keyboardType = Ti.UI.KEYBOARD_DECIMAL_PAD;
	}
	
	var expenseTextField = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: UIC.COLOR_DARK_GREY(),
  		font: { fontSize: UIC.FIELD_BIG_FONT_SIZE()},
  		height: textFieldHeight, 
  		width: textFieldWidth,
		left: rowObjectWidthBorder + labelWidth + dollarSignWidth, 
  		top: 2*rowObjectHeightBorder,
  		hintText: hintText,
  		keyboardType: keyboardType
	});
	return expenseTextField;
}


exports.ExpenseTextField = ExpenseTextField;