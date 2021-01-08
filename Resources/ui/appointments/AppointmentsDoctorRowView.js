//AppointmentsDoctorRowView Component Constructor
function AppointmentsDoctorRowView (displayValueUtil, appointmentId, appointmentsWindow) {
	var AC = require('ui/appointments/AppointmentsConstants').AppointmentsConstants;
	
	this.appointmentDoctorRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(AC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var appointmentDoctorLabel = new TextFieldLabel(displayValueUtil, 'Doctor:', textFieldLabelHeight);
	
	this.appointmentDoctorRowView.add(appointmentDoctorLabel);

	if (appointmentId >= 0) {
		var DeleteButton = require('ui/common/buttons/DeleteButton').DeleteButton;
		var deleteButton = new DeleteButton(displayValueUtil);

		deleteButton.addEventListener('click', function() {
				var AppointmentsDBI = require('db/dbi/appointments/AppointmentsDBI').AppointmentsDBI;
				var appointmentsDBI = new AppointmentsDBI();
				appointmentsDBI.deleteAppointment(appointmentId);
				appointmentsWindow.fireEvent('updateAppointmentsTable');
		});	
	
		this.appointmentDoctorRowView.add(deleteButton);
	}

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.appointmentDoctorTextField = new StandardTextField(displayValueUtil, 'The name of the Doctor', textFieldLabelHeight);

	this.appointmentDoctorRowView.add(this.appointmentDoctorTextField);
	this.appointmentDoctorTextField.blur();
}

AppointmentsDoctorRowView.prototype.getAppointmentDoctorRowView = function(){
	return this.appointmentDoctorRowView;
};

AppointmentsDoctorRowView.prototype.getAppointmentDoctorTextField = function(){
	return this.appointmentDoctorTextField.value;
};

AppointmentsDoctorRowView.prototype.setAppointmentDoctorTextField = function(appointmentDoctor){
	this.appointmentDoctorTextField.value = appointmentDoctor;
};


exports.AppointmentsDoctorRowView = AppointmentsDoctorRowView;