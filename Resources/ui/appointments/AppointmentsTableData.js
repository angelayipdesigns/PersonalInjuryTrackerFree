//AppointmentsTableData Component Constructor
function AppointmentsTableData () {
}

AppointmentsTableData.prototype.buildTableData = function(appointmentsWindow, date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var appointmentsHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView('Appointments', '#000000', UIC.COLOR_ORANGE(), false, true);

	tableData.push(appointmentsHeaderRowView);

	var AppDateRowView = require('ui/common/components/AppDateRowView').AppDateRowView;
    var appDateRowView = new AppDateRowView(date, displayValueUtil);
	tableData.push(appDateRowView);

	var AppointmentsDoctorRowView = require('ui/appointments/AppointmentsDoctorRowView').AppointmentsDoctorRowView;
	var AppointmentsReasonRowView = require('ui/appointments/AppointmentsReasonRowView').AppointmentsReasonRowView;
	var AppointmentsRecommendationRowView = require('ui/appointments/AppointmentsRecommendationRowView').AppointmentsRecommendationRowView;
	var AppointmentsMileageRowView = require('ui/appointments/AppointmentsMileageRowView').AppointmentsMileageRowView;
	var TableComponentSeparatorRowView = require('ui/common/components/TableComponentSeparatorRowView').TableComponentSeparatorRowView;
	var UIAppointment = require('ui/appointments/UIAppointment').UIAppointment;
	var AppointmentsDBI = require('db/dbi/appointments/AppointmentsDBI').AppointmentsDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;

	var uiAppointments = [];
	var appointmentsDBI = new AppointmentsDBI();
	var injuryId = currentInjuryCache.getCurrentId();
	//Titanium.API.info("Retrieved current injury id: " + injuryId);
	var appointments = appointmentsDBI.getAppointmentsByInjuryIdAppointmentDate(injuryId, date);
	
	for (var i = 0; i < appointments.length; i++) {
    	var appointment = appointments[i];
    	var appointmentsDoctorRowView = new AppointmentsDoctorRowView(displayValueUtil, appointment.getId(), appointmentsWindow);
    	appointmentsDoctorRowView.setAppointmentDoctorTextField(appointment.getAppointmentDoctor());
		tableData.push(appointmentsDoctorRowView.getAppointmentDoctorRowView());
    	var appointmentsReasonRowView = new AppointmentsReasonRowView(displayValueUtil);
    	appointmentsReasonRowView.setAppointmentReasonTextArea(appointment.getAppointmentReason());
    	tableData.push(appointmentsReasonRowView.getAppointmentReasonTextAreaRowView());
    	var appointmentsRecommendationRowView = new AppointmentsRecommendationRowView(displayValueUtil);
    	appointmentsRecommendationRowView.setAppointmentRecommendationTextArea(appointment.getAppointmentRecommendation());
    	tableData.push(appointmentsRecommendationRowView.getAppointmentRecommendationTextAreaRowView());
    	var appointmentsMileageRowView = new AppointmentsMileageRowView(displayValueUtil);
    	appointmentsMileageRowView.setAppointmentsMileageTextField(appointment.getAppointmentMileage());
    	Ti.API.info("uiAppointmentMileage:  " + appointmentsMileageRowView.getAppointmentsMileageTextField());
    	tableData.push(appointmentsMileageRowView.getAppointmentsMileageRowView());
    	var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
    	tableData.push(tableComponentSeparatorRowView);
    	var uiAppointment = new UIAppointment(appointmentsDoctorRowView, appointmentsReasonRowView, appointmentsRecommendationRowView, appointmentsMileageRowView);
    	uiAppointments.push(uiAppointment);
	}

    var appointmentsDoctorRowView = new AppointmentsDoctorRowView(displayValueUtil, -1, appointmentsWindow);
	tableData.push(appointmentsDoctorRowView.getAppointmentDoctorRowView());
    var appointmentsReasonRowView = new AppointmentsReasonRowView(displayValueUtil);
    tableData.push(appointmentsReasonRowView.getAppointmentReasonTextAreaRowView());
    var appointmentsRecommendationRowView = new AppointmentsRecommendationRowView(displayValueUtil);
    tableData.push(appointmentsRecommendationRowView.getAppointmentRecommendationTextAreaRowView());
    var appointmentsMileageRowView = new AppointmentsMileageRowView(displayValueUtil);
    tableData.push(appointmentsMileageRowView.getAppointmentsMileageRowView());
    var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
    tableData.push(tableComponentSeparatorRowView);

	var buttonViewRow = Titanium.UI.createTableViewRow();	
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var AddButton = require('ui/common/buttons/AddButton').AddButton;
    var addButton = new AddButton(buttonHeight, buttonWidth, buttonBorderWidth);

	addButton.addEventListener('click', function() {	
		save(uiAppointments, appointments, appointmentsDoctorRowView, appointmentsReasonRowView, appointmentsRecommendationRowView, appointmentsMileageRowView, date);
		appointmentsWindow.fireEvent('updateAppointmentsTable');	
	});

	buttonViewRow.add(addButton);

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
    var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function() {	
		save(uiAppointments, appointments, appointmentsDoctorRowView, appointmentsReasonRowView, appointmentsRecommendationRowView, appointmentsMileageRowView, date);
	
		appointmentsWindow.close();
		appointmentsWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		appointmentsWindow.close();
		appointmentsWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
};

function save(uiAppointments, appointments, currentAppointmentsDoctorRowView, currentAppointmentsReasonRowView, currentAppointmentsRecommendationRowView, currentAppointmentsMileageRowView, date) {
	var Appointment = require('db/dbi/appointments/Appointment').Appointment;
	var AppointmentsDBI = require('db/dbi/appointments/AppointmentsDBI').AppointmentsDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	
	var injuryId = currentInjuryCache.getCurrentId();
	var appointmentsDBI = new AppointmentsDBI();

	for (var i = 0; i < uiAppointments.length; i++) {
		var uiAppointment = uiAppointments[i];
		var uiAppointmentsDoctorRowView = uiAppointment.getAppointmentsDoctorRowView();
		var uiAppointmentsReasonRowView = uiAppointment.getAppointmentsReasonRowView();
		var uiAppointmentsRecommendationRowView = uiAppointment.getAppointmentsRecommendationRowView();
		var uiAppointmentsMileageRowView = uiAppointment.getAppointmentsMileageRowView();
		var uiAppointmentDoctor = uiAppointmentsDoctorRowView.getAppointmentDoctorTextField();
		var uiAppointmentReason = uiAppointmentsReasonRowView.getAppointmentReasonTextArea();
		var uiAppointmentRecommendation = uiAppointmentsRecommendationRowView.getAppointmentRecommendationTextArea();
		var uiAppointmentMileage = uiAppointmentsMileageRowView.getAppointmentsMileageTextField();

		var appointment = appointments[i];
		if ((appointment.getAppointmentDoctor() != uiAppointmentDoctor) || (appointment.getAppointmentReason() != uiAppointmentReason) ||
				(appointment.getAppointmentRecommendation() != uiAppointmentRecommendation) || (appointment.getAppointmentMileage() != uiAppointmentMileage)) {
			appointment.setAppointmentDoctor(uiAppointmentDoctor);
			appointment.setAppointmentReason(uiAppointmentReason);
			appointment.setAppointmentRecommendation(uiAppointmentRecommendation);
			appointment.setAppointmentMileage(uiAppointmentMileage);
			appointmentsDBI.updateAppointment(appointment);
		}
	}		

	var appointmentDoctor = currentAppointmentsDoctorRowView.getAppointmentDoctorTextField();
	var appointmentReason = currentAppointmentsReasonRowView.getAppointmentReasonTextArea();
	var appointmentRecommendation = currentAppointmentsRecommendationRowView.getAppointmentRecommendationTextArea();
	var appointmentMileage = currentAppointmentsMileageRowView.getAppointmentsMileageTextField();
	
	if (appointmentDoctor || appointmentReason || appointmentRecommendation || appointmentMileage) {
		var newAppointment = new Appointment('noid', injuryId, date, appointmentDoctor, appointmentReason, appointmentRecommendation, appointmentMileage);
		var id = appointmentsDBI.insertAppointment(newAppointment);
	}
}


exports.AppointmentsTableData = AppointmentsTableData;