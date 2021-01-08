//StandardSwitch Component Constructor
//TODO: This is a prototype component
function StandardSwitch (displayValueUtil) {

	var rowObjectBorder = displayValueUtil.getRelativeBoarderSize();
	
	var standardSwitch = Ti.UI.createSwitch({
		style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		value: false,
		top: rowObjectBorder,
		right: rowObjectBorder
	});
	
	var switchHeight = displayValueUtil.getRelativeHeight(5);
	//absolute minimum is 38
	Titanium.API.info("switchHeight is set to: " + switchHeight);
	/*
	var switchHeight = displayValueUtil.getRelativeHeight(5);
	Titanium.API.info("switchHeight is set to: " + switchHeight);
	
	var switchWidth = displayValueUtil.getRelativeWidth(15);
	if (switchWidth < 72) {
		switchWidth = 72
	}

	var standardSwitch = Ti.UI.createSwitch({
		value: false,
		height: switchHeight,
		width: switchWidth,
		right: rowObjectBorder, 
		//top:2*rowObjectBorder
	});*/
	
	return standardSwitch;
}


exports.StandardSwitch = StandardSwitch;