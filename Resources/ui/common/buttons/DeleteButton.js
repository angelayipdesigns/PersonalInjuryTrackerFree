//DeleteButton Component Constructor
function DeleteButton (displayValueUtil) {

	var rowObjectHeightBorder = displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorder = displayValueUtil.getRelativeBoarderSize();

	var buttonWidth = displayValueUtil.getRelativeWidth(7);
	//make the button square
	var buttonHeight = buttonWidth;

	var labelHeight = displayValueUtil.getRelativeHeight(5);
	var labelTop = displayValueUtil.getRelativeBoarderSize();
	var buttonTop = labelHeight + labelTop - buttonHeight;
	if (buttonTop < 0) {
		buttonTop = 0;
	}

	var deleteButton = Titanium.UI.createButton({
		backgroundImage:'/images/delete.png',
		backgroundSelectedImage: '/images/delete_selected.png',
		height: buttonHeight,
		width: buttonWidth,
		right: 2*rowObjectWidthBorder,
		top: buttonTop
	});

	return deleteButton;
}


exports.DeleteButton = DeleteButton;