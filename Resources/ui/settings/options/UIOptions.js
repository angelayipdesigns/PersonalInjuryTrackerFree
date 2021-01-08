function UIOptions (optionsMileageUnitRowView, optionsMileageAmountRowView) {
    this.optionsMileageUnitRowView = optionsMileageUnitRowView;
    this.optionsMileageAmountRowView = optionsMileageAmountRowView;
}

UIOptions.prototype.getOptionsMileageUnitRowView = function() {
	return this.optionsMileageUnitRowView;
};

UIOptions.prototype.setOptionsMileageUnitRowView = function(optionsMileageUnitRowView) {
    this.optionsMileageUnitRowView = optionsMileageUnitRowView;
};

UIOptions.prototype.getOptionsMileageAmountRowView = function() {
	return this.optionsMileageAmountRowView;
};

UIOptions.prototype.setOptionsMileageAmountRowView = function(optionsMileageAmountRowView) {
    this.optionsMileageAmountRowView = optionsMileageAmountRowView;
};


exports.UIOptions = UIOptions;