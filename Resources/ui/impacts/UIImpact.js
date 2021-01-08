function UIImpact (impactsMissedWorkRowView, impactsMissedWorkDetailsRowView,
					impactsHouseActivitiesRowView, impactsHouseActivitiesDetailsRowView,
					impactsAdditionalDetailsRowView) {
    this.impactsMissedWorkRowView = impactsMissedWorkRowView;
    this.impactsMissedWorkDetailsRowView = impactsMissedWorkDetailsRowView;
    this.impactsHouseActivitiesRowView = impactsHouseActivitiesRowView;
    this.impactsHouseActivitiesDetailsRowView = impactsHouseActivitiesDetailsRowView;
    this.impactsAdditionalDetailsRowView = impactsAdditionalDetailsRowView;
}

UIImpact.prototype.getImpactsMissedWorkRowView = function(){
	return this.impactsMissedWorkRowView;
};

UIImpact.prototype.setImpactsMissedWorkRowView = function(impactsMissedWorkRowView) {
    this.impactsMissedWorkRowView = impactsMissedWorkRowView;
};

UIImpact.prototype.getImpactsMissedWorkDetailsRowView = function(){
	return this.impactsMissedWorkDetailsRowView;
};

UIImpact.prototype.setImpactsMissedWorkDetailsRowView = function(impactsMissedWorkDetailsRowView) {
    this.impactsMissedWorkDetailsRowView = impactsMissedWorkDetailsRowView;
};

UIImpact.prototype.getImpactsHouseActivitiesRowView = function(){
	return this.impactsHouseActivitiesRowView;
};

UIImpact.prototype.setImpactsHouseActivitiesRowView = function(impactsHouseActivitiesRowView) {
    this.impactsHouseActivitiesRowView = impactsHouseActivitiesRowView;
};

UIImpact.prototype.getImpactsHouseActivitiesDetailsRowView = function(){
	return this.impactsHouseActivitiesDetailsRowView;
};

UIImpact.prototype.setImpactsHouseActivitiesDetailsRowView = function(impactsHouseActivitiesDetailsRowView) {
    this.impactsHouseActivitiesDetailsRowView = impactsHouseActivitiesDetailsRowView;
};

UIImpact.prototype.getImpactsAdditionalDetailsRowView = function(){
	return this.impactsAdditionalDetailsRowView;
};

UIImpact.prototype.setImpactsAdditionalDetailsRowView = function(impactsHouseActivitiesDetailsRowView) {
    this.impactsAdditionalDetailsRowView = impactsAdditionalDetailsRowView;
};


exports.UIImpact = UIImpact;