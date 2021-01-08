//Symtom Component Constructor
function Symptom (id, injuryId, symptomDate, symptomArea, symptomDetails) {
    this.id = id;
    this.injuryId = injuryId;
    this.symptomDate = symptomDate;
    this.symptomArea = symptomArea;
    this.symptomDetails = symptomDetails;
}

Symptom.prototype.getId = function(){
	return this.id;
};

Symptom.prototype.getInjuryId = function(){
	return this.injuryId;
};

Symptom.prototype.setInjuryId = function(injuryId) {
    this.injuryId = injuryId;
};

Symptom.prototype.getSymptomDate = function(){
	return this.symptomDate;
};

Symptom.prototype.setSymptomDate = function(symptomDate) {
    this.symptomDate = symptomDate;
};

Symptom.prototype.getSymptomArea = function(){
	return this.symptomArea;
};

Symptom.prototype.setSymptomArea = function(symptomArea) {
    this.symptomArea = symptomArea;
};

Symptom.prototype.getSymptomDetails = function(){
	return this.symptomDetails;
};

Symptom.prototype.setSymptomDetails = function(symptomDetails) {
    this.symptomDetails = symptomDetails;
};


exports.Symptom = Symptom;