function APPOINTMENTS() {
	return 'appointments';
}
function ID() {
	return 'id';
}
function INJURY_ID() {
	return 'injuryid';
}
function APPOINTMENT_DATE() {
	return 'appointmentdate';
}
function APPOINTMENT_DOCTOR() {
	return 'appointmentdoctor';
}
function APPOINTMENT_REASON() {
	return 'appointmentreason';
}
function APPOINTMENT_RECOMMENDATION() {
	return 'appointmentrecommendation';
}
function APPOINTMENT_MILEAGE() {
	return 'appointmentmileage';
}

//AppointmentsDBI Component Constructor
function AppointmentsDBI () {	
}

AppointmentsDBI.prototype.getAppointmentsByInjuryIdAppointmentDate = function(injuryId, appointmentDate) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	
	var appointments = [];
	var Appointment = require('db/dbi/appointments/Appointment').Appointment;
	var appointment;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var stringAppointmentDate = dbDateUtil.getDateStringForSelect(appointmentDate);
	var appointmentsRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_ID() + ', ' + APPOINTMENT_DATE() + ', ' + APPOINTMENT_DOCTOR() + ', ' + APPOINTMENT_REASON() + ', ' + APPOINTMENT_RECOMMENDATION() + ', ' + APPOINTMENT_MILEAGE() +
								' FROM '+ APPOINTMENTS() + ' WHERE ' + INJURY_ID() + ' = ? AND ' + APPOINTMENT_DATE() + ' = ?', injuryId, stringAppointmentDate);

	while (appointmentsRS.isValidRow()) {
		var fetchedId = appointmentsRS.fieldByName(ID());
		var fetchedInjuryId = appointmentsRS.fieldByName(INJURY_ID());
		var fetchedAppointmentDate = appointmentsRS.fieldByName(APPOINTMENT_DATE());
		var finalAppointmentDate = dbDateUtil.getDateFromSelect(fetchedAppointmentDate);
		var fetchedAppointmentDoctor = appointmentsRS.fieldByName(APPOINTMENT_DOCTOR());
		var fetchedAppointmentReason = appointmentsRS.fieldByName(APPOINTMENT_REASON());
		var fetchedAppointmentRecommendation = appointmentsRS.fieldByName(APPOINTMENT_RECOMMENDATION());
		var fetchedAppointmentMileage = appointmentsRS.fieldByName(APPOINTMENT_MILEAGE());
		Ti.API.info("Fetched appointment:  id: " + fetchedId + ", injuryid: " + fetchedInjuryId +
											", appointmentdate: " + finalAppointmentDate + ", appointmentdoctor: " + fetchedAppointmentDoctor + 
											", appointmentreason: " + fetchedAppointmentReason + ", appointmentrecommendation: " + fetchedAppointmentRecommendation +
											", appointmentmileage: " + fetchedAppointmentMileage);
		
		appointment = new Appointment(fetchedId, fetchedInjuryId, finalAppointmentDate, fetchedAppointmentDoctor, fetchedAppointmentReason, fetchedAppointmentRecommendation, fetchedAppointmentMileage);
		appointments.push(appointment);
  		appointmentsRS.next();
	}
	appointmentsRS.close();
	db.close();		
	return appointments;
};

AppointmentsDBI.prototype.getAllAppointmentsByInjuryId = function(injuryId) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	
	var appointments = [];
	var Appointment = require('db/dbi/appointments/Appointment').Appointment;
	var appointment;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var appointmentsRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_ID() + ', ' + APPOINTMENT_DATE() + ', ' + APPOINTMENT_DOCTOR() + ', ' + APPOINTMENT_REASON() + ', ' + APPOINTMENT_RECOMMENDATION() + ', ' + APPOINTMENT_MILEAGE() +
								' FROM '+ APPOINTMENTS() + ' WHERE ' + INJURY_ID() + ' = ?', injuryId);

	while (appointmentsRS.isValidRow()) {
		var fetchedId = appointmentsRS.fieldByName(ID());
		var fetchedInjuryId = appointmentsRS.fieldByName(INJURY_ID());
		var fetchedAppointmentDate = appointmentsRS.fieldByName(APPOINTMENT_DATE());
		var finalAppointmentDate = dbDateUtil.getDateFromSelect(fetchedAppointmentDate);
		var fetchedAppointmentDoctor = appointmentsRS.fieldByName(APPOINTMENT_DOCTOR());
		var fetchedAppointmentReason = appointmentsRS.fieldByName(APPOINTMENT_REASON());
		var fetchedAppointmentRecommendation = appointmentsRS.fieldByName(APPOINTMENT_RECOMMENDATION());
		var fetchedAppointmentMileage = appointmentsRS.fieldByName(APPOINTMENT_MILEAGE());
		/*
		Ti.API.info("Fetched appointment:  id: " + fetchedId + ", injuryid: " + fetchedInjuryId +
											", appointmentdate: " + finalAppointmentDate + ", appointmentdoctor: " + fetchedAppointmentDoctor + 
											", appointmentreason: " + fetchedAppointmentReason + ", appointmentrecommendation: " + fetchedAppointmentRecommendation);
		*/
		appointment = new Appointment(fetchedId, fetchedInjuryId, finalAppointmentDate, fetchedAppointmentDoctor, fetchedAppointmentReason, fetchedAppointmentRecommendation, fetchedAppointmentMileage);
		appointments.push(appointment);
  		appointmentsRS.next();
	}
	appointmentsRS.close();
	db.close();		
	return appointments;
};

AppointmentsDBI.prototype.getExistsArrayByInjuryIdByMonthYear = function(injuryId, monthYear, numDaysInMonth) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var currentMonth = monthYear.getMonth() + 1;	//to adjust for the month count starting at 0 (Jan)
	var currentYear = monthYear.getYear();
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	
	var apptsExist = [];
	//initial the array of booleans all to false
	//in fact, the value at position 0, will never be used since day number is always > 0
	for (var i=0; i <= numDaysInMonth; i++) {
		apptsExist.push(false);
	}

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var appointmentsRS = db.execute('SELECT ' + APPOINTMENT_DATE() + ' FROM ' + APPOINTMENTS() + 
								' WHERE ' + APPOINTMENT_DATE() + ' LIKE \'' + currentMonth + '-%-' + currentYear + '\' AND ' + INJURY_ID() + ' = ?', injuryId);

	while (appointmentsRS.isValidRow()) {
		var fetchedApptDateStr = appointmentsRS.fieldByName(APPOINTMENT_DATE());
		var dateComponents = fetchedApptDateStr.split("-");
		var day = dateComponents[1];

		apptsExist[day] = true;
		
  		appointmentsRS.next();
	}
	appointmentsRS.close();
	db.close();		
	return apptsExist;
};

AppointmentsDBI.prototype.appointmentExists = function(injuryId, appointmentDate) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var stringAppointmentDate = dbDateUtil.getDateStringForSelect(appointmentDate);
	var appointmentsRS = db.execute('SELECT ' + ID() + ' FROM '+ APPOINTMENTS() +
								' WHERE ' + INJURY_ID() + ' = ? AND ' + APPOINTMENT_DATE() + ' = ?', injuryId, stringAppointmentDate);
	var appointmentExist = appointmentsRS.isValidRow();

	appointmentsRS.close();
	db.close();		
	return appointmentExist;
};

AppointmentsDBI.prototype.insertAppointment = function(appointment) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	var stringAppointmentDate = dbDateUtil.getDateStringForInsert(appointment.getAppointmentDate());
	db.execute('INSERT INTO ' + APPOINTMENTS() + ' (' + INJURY_ID() + ', ' + APPOINTMENT_DATE() + ', ' 
							+ APPOINTMENT_DOCTOR() + ', ' + APPOINTMENT_REASON() +  ', ' + APPOINTMENT_RECOMMENDATION() + ', ' + APPOINTMENT_MILEAGE() +
							') VALUES (?, ?, ?, ?, ?, ?)', appointment.getInjuryId(), stringAppointmentDate, appointment.getAppointmentDoctor(), appointment.getAppointmentReason(), appointment.getAppointmentRecommendation(), appointment.getAppointmentMileage());
	var lastId = db.getLastInsertRowId();
	db.close();
	
	return lastId;
};

AppointmentsDBI.prototype.updateAppointment = function(appointment) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('UPDATE ' + APPOINTMENTS() + ' SET ' + APPOINTMENT_DOCTOR() + ' = ?, ' + APPOINTMENT_REASON() + ' = ?, ' + APPOINTMENT_RECOMMENDATION() + ' = ?, ' + APPOINTMENT_MILEAGE() + ' = ? WHERE ' 
							+ ID() + ' = ?', appointment.getAppointmentDoctor(), appointment.getAppointmentReason(), appointment.getAppointmentRecommendation(), appointment.getAppointmentMileage(), appointment.getId());
	db.close();
};

AppointmentsDBI.prototype.deleteAppointment = function(appointmentId) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('DELETE from ' + APPOINTMENTS() + ' WHERE ' + ID() + ' = ?', appointmentId);
	db.close();
};

AppointmentsDBI.prototype.getAppointmentsOutputHeader = function() {
	return ',,Appointment Date,Doctor,Reason for Appointment, Doctor\'s Recommendation,Mileage,\n';
};


exports.AppointmentsDBI = AppointmentsDBI;