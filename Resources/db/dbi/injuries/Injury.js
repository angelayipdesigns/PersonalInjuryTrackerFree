//Injury Component Constructor
function Injury (id, injuryDate, injuryTime, injuryName, injuryDescription, isCurrent) {
    this.id = id;
    this.injuryDate = injuryDate;
    this.injuryTime = injuryTime;
    this.injuryName = injuryName;
    this.injuryDescription = injuryDescription;
    this.isCurrent = isCurrent;
}

Injury.prototype.getId = function(){
	return this.id;
};

Injury.prototype.setId = function(id){
	return this.id = id;
};

Injury.prototype.getInjuryDate = function(){
	return this.injuryDate;
};

Injury.prototype.setInjuryDate = function(injuryDate) {
    this.injuryDate = injuryDate;
};

Injury.prototype.getInjuryTime = function(){
	return this.injuryTime;
};

Injury.prototype.setInjuryTime = function(injuryTime) {
    this.injuryTime = injuryTime;
};

Injury.prototype.getInjuryName = function(){
	return this.injuryName;
};

Injury.prototype.setInjuryName = function(injuryName) {
    this.injuryName = injuryName;
};

Injury.prototype.getInjuryDescription = function(){
	return this.injuryDescription;
};

Injury.prototype.setInjuryDescription = function(injuryDescription) {
    this.injuryDescription = injuryDescription;
};

Injury.prototype.getInjuryIsCurrent = function(){
	return this.isCurrent;
};

Injury.prototype.setInjuryIsCurrent = function(isCurrent) {
    this.isCurrent = isCurrent;
};


exports.Injury = Injury;