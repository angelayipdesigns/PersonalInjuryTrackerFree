//YesNoPicker Component Constructor
//TODO: This is a prototype component
function YesNoPicker (displayValueUtil) {

	var rowObjectHeightBorder = displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorder = displayValueUtil.getRelativeBoarderSize();

	var pickerHeight = displayValueUtil.getRelativeHeight(5);
	//make the button square
	var pickerWidth = pickerHeight;
	var pickerTop = displayValueUtil.getRelativeBoarderSize();

	var yesNoPicker = Ti.UI.createPicker({
		//height: pickerHeight,
		//width: pickerWidth,
		right: rowObjectWidthBorder,
		selectionIndicator: false
		//top: pickerTop
	});

	var data = [];
	data[0]=Ti.UI.createPickerRow({title:'Yes'});
	data[1]=Ti.UI.createPickerRow({title:'No'});

	yesNoPicker.add(data);
	return yesNoPicker;
}


exports.YesNoPicker = YesNoPicker;