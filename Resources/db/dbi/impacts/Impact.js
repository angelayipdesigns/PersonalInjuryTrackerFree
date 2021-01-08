//Impact Component Constructor
function Impact (id, injuryId, impactDate, missedWork, missedWorkDetails, houseActivities, houseActivityDetails, otherDetails) {
    this.id = id;
    this.injuryId = injuryId;
    this.impactDate = impactDate;
    this.missedWork = missedWork;
    this.missedWorkDetails = missedWorkDetails;
    this.houseActivities = houseActivities;
    this.houseActivityDetails = houseActivityDetails;
	this.otherDetails = otherDetails;
}

Impact.prototype.getId = function(){
	return this.id;
};

Impact.prototype.getInjuryId = function(){
	return this.injuryId;
};

Impact.prototype.setInjuryId = function(injuryId) {
    this.injuryId = injuryId;
};

Impact.prototype.getImpactDate = function(){
	return this.impactDate;
};

Impact.prototype.setImpactDate = function(impactDate) {
    this.impactDate = impactDate;
};

Impact.prototype.getMissedWork = function(){
	return this.missedWork;
};

Impact.prototype.setMissedWork = function(missedWork) {
    this.missedWork = missedWork;
};

Impact.prototype.getMissedWorkDetails = function(){
	return this.missedWorkDetails;
};

Impact.prototype.setMissedWorkDetails = function(missedWorkDetails) {
    this.missedWorkDetails = missedWorkDetails;
};

Impact.prototype.getHouseActivities = function(){
	return this.houseActivities;
};

Impact.prototype.setHouseActivities = function(houseActivities) {
    this.houseActivities = houseActivities;
};

Impact.prototype.getHouseActivityDetails = function(){
	return this.houseActivityDetails;
};

Impact.prototype.setHouseActivityDetails = function(houseActivityDetails) {
    this.houseActivityDetails = houseActivityDetails;
};

Impact.prototype.getOtherDetails = function(){
	return this.otherDetails;
};

Impact.prototype.setOtherDetails = function(otherDetails) {
    this.otherDetails = otherDetails;
};


exports.Impact = Impact;