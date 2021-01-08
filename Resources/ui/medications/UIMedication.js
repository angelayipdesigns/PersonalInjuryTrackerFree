function UIMedication (medicationsNameRowView, medicationsPurposeRowView, medicationsDosageRowView, medicationsCostRowView, medicationsInsuranceCoveredRowView) {
    this.medicationsNameRowView = medicationsNameRowView;
    this.medicationsPurposeRowView = medicationsPurposeRowView;
    this.medicationsDosageRowView = medicationsDosageRowView;
    this.medicationsCostRowView = medicationsCostRowView;
    this.medicationsInsuranceCoveredRowView = medicationsInsuranceCoveredRowView;
}

UIMedication.prototype.getMedicationsNameRowView = function(){
	return this.medicationsNameRowView;
};

UIMedication.prototype.setMedicationsNameRowView = function(medicationsNameRowView) {
    this.medicationsNameRowView = medicationsNameRowView;
};

UIMedication.prototype.getMedicationsPurposeRowView = function() {
	return this.medicationsPurposeRowView;
};

UIMedication.prototype.setMedicationsPurposeRowView = function(medicationsPurposeRowView) {
    this.medicationsPurposeRowView = medicationsPurposeRowView;
};

UIMedication.prototype.getMedicationsDosageRowView = function() {
	return this.medicationsDosageRowView;
};

UIMedication.prototype.setMedicationsDosageRowView = function(medicationsDosageRowView) {
    this.medicationsDosageRowView = medicationsDosageRowView;
};

UIMedication.prototype.getMedicationsCostRowView = function() {
	return this.medicationsCostRowView;
};

UIMedication.prototype.setMedicationsCostRowView = function(medicationsCostRowView) {
    this.medicationsCostRowView = medicationsCostRowView;
};

UIMedication.prototype.getMedicationsInsuranceCoveredRowView = function() {
	return this.medicationsInsuranceCoveredRowView;
};

UIMedication.prototype.setMedicationsInsuranceCoveredRowView = function(medicationsInsuranceCoveredRowView) {
    this.medicationsInsuranceCoveredRowView = medicationsInsuranceCoveredRowView;
};


exports.UIMedication = UIMedication;