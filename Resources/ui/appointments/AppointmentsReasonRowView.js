//AppointmentsReasonRowView Component Constructor
function AppointmentsReasonRowView (displayValueUtil) {
	var AC = require('ui/appointments/AppointmentsConstants').AppointmentsConstants;

	this.appointmentReasonRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(AC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var appointmentReasonLabel = new TextFieldLabel(displayValueUtil, 'Reason for Appointment:', textFieldLabelHeight);

	this.appointmentReasonRowView.add(appointmentReasonLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.appointmentReasonTextArea = new StandardTextField(displayValueUtil, 'The reason(s) for this appointment', textFieldLabelHeight);

	this.appointmentReasonRowView.add(this.appointmentReasonTextArea);
	this.appointmentReasonTextArea.blur();
}

AppointmentsReasonRowView.prototype.getAppointmentReasonTextAreaRowView = function(){
	return this.appointmentReasonRowView;
};

AppointmentsReasonRowView.prototype.getAppointmentReasonTextArea = function(){
	return this.appointmentReasonTextArea.value;
};

AppointmentsReasonRowView.prototype.setAppointmentReasonTextArea = function(appointmentReason){
	this.appointmentReasonTextArea.value = appointmentReason;
};


exports.AppointmentsReasonRowView = AppointmentsReasonRowView;
