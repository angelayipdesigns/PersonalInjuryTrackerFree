//AppointmentsRecommendationRowView Component Constructor
function AppointmentsRecommendationRowView (displayValueUtil) {
	var AC = require('ui/appointments/AppointmentsConstants').AppointmentsConstants;

	this.appointmentRecommendationRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(AC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var appointmentRecommendationLabel = new TextFieldLabel(displayValueUtil, 'Doctor\'s Recommendations:', textFieldLabelHeight);

	this.appointmentRecommendationRowView.add(appointmentRecommendationLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.appointmentRecommendationTextArea = new StandardTextField(displayValueUtil, 'The Doctor\'s recommendations from this appointment', textFieldLabelHeight);

	this.appointmentRecommendationRowView.add(this.appointmentRecommendationTextArea);
	this.appointmentRecommendationTextArea.blur();
}

AppointmentsRecommendationRowView.prototype.getAppointmentRecommendationTextAreaRowView = function(){
	return this.appointmentRecommendationRowView;
};

AppointmentsRecommendationRowView.prototype.getAppointmentRecommendationTextArea = function(){
	return this.appointmentRecommendationTextArea.value;
};

AppointmentsRecommendationRowView.prototype.setAppointmentRecommendationTextArea = function(appointmentRecommendation){
	this.appointmentRecommendationTextArea.value = appointmentRecommendation;
};


exports.AppointmentsRecommendationRowView = AppointmentsRecommendationRowView;
