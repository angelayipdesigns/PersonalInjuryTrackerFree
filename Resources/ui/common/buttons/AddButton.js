//AddButton Component Constructor
function AddButton (buttonHeight, buttonWidth, buttonBorderWidth) {

    /*
     * for a smaller icon
     */
	var addButton = Titanium.UI.createButton({
		backgroundImage:'/images/add.png',
		backgroundSelectedImage: '/images/add_selected.png',
		height: buttonHeight-6*buttonBorderWidth,
		width: buttonWidth-6*buttonBorderWidth,
		left: buttonBorderWidth + 3*buttonWidth,
		top: 2*buttonBorderWidth
	});

    /*
     * for a bigger icon
     * 
	var addButton = Titanium.UI.createButton({
		backgroundImage:'/images/ok.png',
		height: buttonHeight-3*buttonBorderWidth,
		width: buttonWidth-3*buttonBorderWidth,
		left: buttonBorderWidth + 3*buttonWidth,
		top: 2*buttonBorderWidth
	});
	*/
	
	return addButton;
}


exports.AddButton = AddButton;