//Appointment Component Constructor
function Appointment (id, injuryId, appointmentDate, appointmentDoctor, appointmentReason, appointmentRecommendation, appointmentMileage) {
    this.id = id;
    this.injuryId = injuryId;
    this.appointmentDate = appointmentDate;
    this.appointmentDoctor = appointmentDoctor;
    this.appointmentReason = appointmentReason;
    this.appointmentRecommendation = appointmentRecommendation;
    this.appointmentMileage = appointmentMileage;
}

Appointment.prototype.getId = function(){
	return this.id;
};

Appointment.prototype.getInjuryId = function(){
	return this.injuryId;
};

Appointment.prototype.setInjuryId = function(injuryId) {
    this.injuryId = injuryId;
};

Appointment.prototype.getAppointmentDate = function(){
	return this.appointmentDate;
};

Appointment.prototype.setAppointmentDate = function(appointmentDate) {
    this.appointmentDate = appointmentDate;
};

Appointment.prototype.getAppointmentDoctor = function(){
	return this.appointmentDoctor;
};

Appointment.prototype.setAppointmentDoctor = function(appointmentDoctor) {
    this.appointmentDoctor = appointmentDoctor;
};

Appointment.prototype.getAppointmentReason = function(){
	return this.appointmentReason;
};

Appointment.prototype.setAppointmentReason = function(appointmentReason) {
    this.appointmentReason = appointmentReason;
};

Appointment.prototype.getAppointmentRecommendation = function(){
	return this.appointmentRecommendation;
};

Appointment.prototype.setAppointmentRecommendation = function(appointmentRecommendation) {
    this.appointmentRecommendation = appointmentRecommendation;
};

Appointment.prototype.getAppointmentMileage = function(){
	return this.appointmentMileage;
};

Appointment.prototype.setAppointmentMileage = function(appointmentMileage) {
    this.appointmentMileage = appointmentMileage;
};


exports.Appointment = Appointment;