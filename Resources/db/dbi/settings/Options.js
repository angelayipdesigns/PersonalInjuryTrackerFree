//Options Component Constructor
function Options (mileageUnit, mileageAmount) {
    this.mileageUnit = mileageUnit;
    this.mileageAmount = mileageAmount;
}

Options.prototype.getMileageUnit = function(){
	return this.mileageUnit;
};

Options.prototype.setMileageUnit = function(mileageUnit) {
    this.mileageUnit = mileageUnit;
};

Options.prototype.getMileageAmount = function(){
	return this.mileageAmount;
};

Options.prototype.setMileageAmount = function(mileageAmount) {
    this.mileageAmount = mileageAmount;
};


exports.Options = Options;