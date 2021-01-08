function DatabaseBooleanUtil () {
}

DatabaseBooleanUtil.prototype.getBooleanFromSelect = function(intVar) {
	if (intVar == 0) {
		return false;
	}
	return true;
};

DatabaseBooleanUtil.prototype.getBooleanIntForSelect = function(booleanVar) {
    if (booleanVar) {
    	return 1;
    }
    return 0;
};

DatabaseBooleanUtil.prototype.getBooleanIntForInsert = function(booleanVar) {
	var self = this;
	return self.getBooleanIntForSelect(booleanVar);
};


exports.DatabaseBooleanUtil = DatabaseBooleanUtil;