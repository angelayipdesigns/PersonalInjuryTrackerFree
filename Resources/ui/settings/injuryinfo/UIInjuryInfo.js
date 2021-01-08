function UIInjuryInfo (injuryInfoDate, injuryInfoTime, injuryInfoNameRowView, injuryInfoDescriptionRowView) {
    this.injuryInfoDate = injuryInfoDate;
    this.injuryInfoTime = injuryInfoTime;
    this.injuryInfoNameRowView = injuryInfoNameRowView;
    this.injuryInfoDescriptionRowView = injuryInfoDescriptionRowView;
}

UIInjuryInfo.prototype.getInjuryInfoDate = function(){
	return this.injuryInfoDate;
};

UIInjuryInfo.prototype.setInjuryInfoDate = function(injuryInfoDate) {
    this.injuryInfoDate = injuryInfoDate;
};

UIInjuryInfo.prototype.getInjuryInfoTime = function() {
	return this.injuryInfoTime;
};

UIInjuryInfo.prototype.setInjuryInfoTime = function(injuryInfoTime) {
    this.injuryInfoTime = injuryInfoTime;
};

UIInjuryInfo.prototype.getInjuryInfoNameRowView = function() {
	return this.injuryInfoNameRowView;
};

UIInjuryInfo.prototype.setInjuryInfoNameRowView = function(injuryInfoNameRowView) {
    this.injuryInfoNameRowView = injuryInfoNameRowView;
};

UIInjuryInfo.prototype.getInjuryInfoDescriptionRowView = function() {
	return this.injuryInfoDescriptionRowView;
};

UIInjuryInfo.prototype.setInjuryInfoDescriptionRowView = function(injuryInfoDescriptionRowView) {
    this.injuryInfoDescriptionRowView = injuryInfoDescriptionRowView;
};


exports.UIInjuryInfo = UIInjuryInfo;