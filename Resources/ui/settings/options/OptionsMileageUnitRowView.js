//OptionsMileageUnitRowView Component Constructor
function OptionsMileageUnitRowView (displayValueUtil, mileageUnitValue) {
	var OC = require('ui/settings/options/OptionsConstants').OptionsConstants;
	
	this.optionsMileageUnitRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(OC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var HalfLengthTextFieldLabel = require('ui/common/entryfields/HalfLengthTextFieldLabel').HalfLengthTextFieldLabel;
    var optionsMileageUnitLabel = new HalfLengthTextFieldLabel(displayValueUtil, 'Mileage Unit:', textFieldLabelHeight);

	this.optionsMileageUnitRowView.add(optionsMileageUnitLabel);

	var MileageUnitButton = require('ui/common/buttons/MileageUnitButton').MileageUnitButton;
	this.mileageUnitButton = new MileageUnitButton(displayValueUtil, textFieldLabelHeight, mileageUnitValue);
	this.optionsMileageUnitRowView.add(this.mileageUnitButton.getButtonDisplayable());

}

OptionsMileageUnitRowView.prototype.getOptionsMileageUnitRowView = function(){
	return this.optionsMileageUnitRowView;
};


OptionsMileageUnitRowView.prototype.getOptionsMileageUnit = function(){
	return this.mileageUnitButton.getMileageUnit();
};

OptionsMileageUnitRowView.prototype.setOptionsMileageUnit = function(optionsMileageUnit){
	this.mileageUnitButton.setMileageUnit(optionsMileageUnit);
};


exports.OptionsMileageUnitRowView = OptionsMileageUnitRowView;