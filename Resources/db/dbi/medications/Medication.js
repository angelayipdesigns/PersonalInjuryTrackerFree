//Medication Component Constructor
function Medication (id, injuryId, medicationDate, medicationName, medicationPurpose, medicationDosage, medicationCost, insuranceCovered) {
    this.id = id;
    this.injuryId = injuryId;
    this.medicationDate = medicationDate;
    this.medicationName = medicationName;
    this.medicationPurpose = medicationPurpose;
    this.medicationDosage = medicationDosage;
    this.medicationCost = medicationCost;
    this.insuranceCovered = insuranceCovered;
}

Medication.prototype.getId = function(){
	return this.id;
};

Medication.prototype.getInjuryId = function(){
	return this.injuryId;
};

Medication.prototype.setInjuryId = function(injuryId) {
    this.injuryId = injuryId;
};

Medication.prototype.getMedicationDate = function(){
	return this.medicationDate;
};

Medication.prototype.setMedicationDate = function(medicationDate) {
    this.medicationDate = medicationDate;
};

Medication.prototype.getMedicationName = function(){
	return this.medicationName;
};

Medication.prototype.setMedicationName = function(medicationName) {
    this.medicationName = medicationName;
};

Medication.prototype.getMedicationPurpose = function(){
	return this.medicationPurpose;
};

Medication.prototype.setMedicationPurpose = function(medicationPurpose) {
    this.medicationPurpose = medicationPurpose;
};

Medication.prototype.getMedicationDosage = function(){
	return this.medicationDosage;
};

Medication.prototype.setMedicationDosage = function(medicationDosage) {
    this.medicationDosage = medicationDosage;
};

Medication.prototype.getMedicationCost = function(){
	return this.medicationCost;
};

Medication.prototype.setMedicationCost = function(medicationCost) {
    this.medicationCost = medicationCost;
};

Medication.prototype.getInsuranceCovered = function(){
	return this.insuranceCovered;
};

Medication.prototype.setInsuranceCovered = function(insuranceCovered) {
    this.insuranceCovered = insuranceCovered;
};


exports.Medication = Medication;