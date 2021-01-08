function UIAppointment (appointmentsDoctorRowView, appointmentsReasonRowView, appointmentsRecommendationRowView, appointmentsMileageRowView) {
    this.appointmentsDoctorRowView = appointmentsDoctorRowView;
    this.appointmentsReasonRowView = appointmentsReasonRowView;
    this.appointmentsRecommendationRowView = appointmentsRecommendationRowView;
    this.appointmentsMileageRowView = appointmentsMileageRowView;
}

UIAppointment.prototype.getAppointmentsDoctorRowView = function(){
	return this.appointmentsDoctorRowView;
};

UIAppointment.prototype.setAppointmentsDoctorRowView = function(appointmentsDoctorRowView) {
    this.appointmentsDoctorRowView = appointmentsDoctorRowView;
};

UIAppointment.prototype.getAppointmentsReasonRowView = function() {
	return this.appointmentsReasonRowView;
};

UIAppointment.prototype.setAppointmentsReasonRowView = function(appointmentsReasonRowView) {
    this.appointmentsReasonRowView = appointmentsReasonRowView;
};

UIAppointment.prototype.getAppointmentsRecommendationRowView = function() {
	return this.appointmentsRecommendationRowView;
};

UIAppointment.prototype.setAppointmentsRecommendationRowView = function(appointmentsRecommendationRowView) {
    this.appointmentsRecommendationRowView = appointmentsRecommendationRowView;
};

UIAppointment.prototype.getAppointmentsMileageRowView = function() {
	return this.appointmentsMileageRowView;
};

UIAppointment.prototype.setAppointmentsMileageRowView = function(appointmentsMileageRowView) {
    this.appointmentsMileageRowView = appointmentsMileageRowView;
};


exports.UIAppointment = UIAppointment;