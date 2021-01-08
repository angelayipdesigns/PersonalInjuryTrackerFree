//OKButton Component Constructor
function OKButton (buttonHeight, buttonWidth, buttonBorderWidth) {

    /*
     * for a smaller icon
     */
	var okButton = Titanium.UI.createButton({
		backgroundImage:'/images/ok.png',
		backgroundSelectedImage: '/images/ok_selected.png',
		height: buttonHeight-6*buttonBorderWidth,
		width: buttonWidth-6*buttonBorderWidth,
		left: buttonBorderWidth + 4*buttonWidth,
		top: 2*buttonBorderWidth
	});

    /*
     * for a bigger icon
     * 
	var okButton = Titanium.UI.createButton({
		backgroundImage:'/images/ok.png',
		height: buttonHeight-3*buttonBorderWidth,
		width: buttonWidth-3*buttonBorderWidth,
		left: buttonBorderWidth + 4*buttonWidth,
		top: 2*buttonBorderWidth
	});
	*/
	
	return okButton;
}

exports.OKButton = OKButton;