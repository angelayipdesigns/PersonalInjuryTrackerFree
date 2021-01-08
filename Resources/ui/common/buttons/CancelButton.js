//CancelButton Component Constructor
function CancelButton (buttonHeight, buttonWidth, buttonBorderWidth) {

    /*
     * for a smaller icon
     */
	var cancelButton = Titanium.UI.createButton({
		backgroundImage:'/images/cancel.png',
		backgroundSelectedImage: '/images/cancel_selected.png',
		height: buttonHeight-6*buttonBorderWidth,
		width: buttonWidth-6*buttonBorderWidth,
		left: buttonBorderWidth + 5*buttonWidth,
		top: 2*buttonBorderWidth
	});

    /*
     * for a bigger icon
     * 	
	var cancelButton = Titanium.UI.createButton({
		backgroundImage:'/images/cancel.png',
		height: buttonHeight-3*buttonBorderWidth,
		width: buttonWidth-3*buttonBorderWidth,
		left: buttonBorderWidth + 5*buttonWidth,
		top: 2*buttonBorderWidth
	});
	 */
	
	return cancelButton;
}

exports.CancelButton = CancelButton;