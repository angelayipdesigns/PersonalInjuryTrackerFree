function KM() {
	return 'km';
}
function MI() {
	return 'mi';
}

//MileageUnitButton Component Constructor
function MileageUnitButton (displayValueUtil, labelHeight, mileageUnit) {
	this.displayValueUtil = displayValueUtil;
	this.labelHeight = labelHeight;
	this.mileageUnit = mileageUnit;
}

MileageUnitButton.prototype.getButtonDisplayable = function(){
	var UIC = require('ui/common/UIConstants').UIConstants;

	var rowObjectHeightBorder = this.displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorder = this.displayValueUtil.getRelativeBoarderSize();

	var buttonWidth = this.displayValueUtil.getRelativeWidth(8);;
	var labelTop = this.displayValueUtil.getRelativeBoarderSize();

    var labelLeft = this.displayValueUtil.getProportionalObjectWidth(2, true);

	var mileageUnitButton = Titanium.UI.createLabel({
		text: this.mileageUnit,
		color: '#000000',
		font: { fontSize: UIC.FIELD_FONT_SIZE(), fontWeight: 'bold' },
		height: this.labelHeight,
		width: buttonWidth,
		left: rowObjectWidthBorder + labelLeft,
		textAlign: 'right',
		top: 2*rowObjectHeightBorder
	});

	var self = this;
	mileageUnitButton.addEventListener('click', function() {
		if (self.getMileageUnit() == KM()) {
			mileageUnitButton.setText(MI());
			self.setMileageUnit(MI());
		}
		else {
			mileageUnitButton.setText(KM());
			self.setMileageUnit(KM());
		}
	});

	return mileageUnitButton;
};

MileageUnitButton.prototype.getMileageUnit = function(){
	return this.mileageUnit;
};

MileageUnitButton.prototype.setMileageUnit = function(mileageUnit){
	this.mileageUnit = mileageUnit;
};




exports.MileageUnitButton = MileageUnitButton;
