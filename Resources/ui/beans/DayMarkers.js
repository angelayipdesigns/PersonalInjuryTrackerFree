function DayMarkers (symptomExists, impactExists, appointmentExists, medicationExists, expenseExists) {
	this.symptomExists = symptomExists;
	this.impactExists = impactExists;
	this.appointmentExists = appointmentExists;
	this.medicationExists = medicationExists;
	this.expenseExists = expenseExists;
}

DayMarkers.prototype.getSymptomExists = function(){
	return this.symptomExists;
};

DayMarkers.prototype.getImpactExists = function() {
	return this.impactExists;
};

DayMarkers.prototype.getAppointmentExists = function() {
	return this.appointmentExists;
};

DayMarkers.prototype.getMedicationExists = function() {
    return this.medicationExists;
};

DayMarkers.prototype.getExpenseExists = function() {
    return this.expenseExists;
};

exports.DayMarkers = DayMarkers;