//SaveSpreadsheetController Component Constructor
function SaveSpreadsheetController (path, filename) {
	this.path = path;
	this.filename = filename;
	this.returnCode = false;
}

SaveSpreadsheetController.prototype.saveSpreadsheet = function() {
	var returnMessage;

	var SaveSpreadsheetUtil = require('infra/savespreadsheetutil/SaveSpreadsheetUtil').SaveSpreadsheetUtil;
	var saveSpreadsheetUtil = new SaveSpreadsheetUtil();
	var filePrefix = saveSpreadsheetUtil.filePrefix();
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	var injuryId = currentInjuryCache.getCurrentId();
	
	var self = this;
	var fullFilePath = self.buildFullFilePath(this.path, this.filename);

	try {
		var file = Titanium.Filesystem.getFile(filePrefix + this.path, this.filename);

		writeHeader(file);
		writeInjury(file, injuryId);
		writeSymptoms(file, injuryId);
		writeImpacts(file, injuryId);
		writeAppointments(file, injuryId);
		writeMedications(file, injuryId);
		writeExpenses(file, injuryId);
 		writeTotalCosts(file, injuryId);
	}
	catch (e) {
		
		returnMessage = "An error occurred saving the spreadsheet " + fullFilePath;
		Ti.API.info(returnMessage);
		Ti.API.info(e.message);
		return returnMessage;
	}
	
	if (!file.exists()) {
		returnMessage = "An error occurred.  The spreadsheet could not be created " + fullFilePath;
		return returnMessage;
	}
	
	returnMessage = "Successfully saved the spreadsheet " + fullFilePath;
	this.returnCode = true;
	return returnMessage;
};

SaveSpreadsheetController.prototype.getReturnCode = function() {
	return this.returnCode;
};

SaveSpreadsheetController.prototype.buildFullFilePath = function(path, filename) {
	pathLength = path.length;

	if (path[pathLength - 1] == '/') {
		return (path + filename );
	}
	
	return (path + '/' + filename);
};

function writeHeader(file) {
	date = new Date();
	file.write('\n');
	file.write(',Personal,Injury,Tracker,Report,' + date.toDateString() + '\n', true);
	file.write('\n', true);
	file.write('\n', true);
}

function writeInjury(file, injuryId) {
	var InjuriesDBI = require('db/dbi/injuries/InjuriesDBI').InjuriesDBI;
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var injuriesDBI = new InjuriesDBI();
	var injury = injuriesDBI.getInjuryById(injuryId);
	var dbDateUtil = new DatabaseDateUtil();
	var timeString = dbDateUtil.getTimeStringForInsert(injury.getInjuryTime());

    file.write(',Injury:,' + injury.getInjuryName() + ',Injury Date:,' + 
    						injury.getInjuryDate().toDateString() + ',,\n', true);
	file.write('\n', true);
}

function writeSymptoms(file, injuryId) {
	var SymptomsDBI = require('db/dbi/symptoms/SymptomsDBI').SymptomsDBI;
	var symptomsDBI = new SymptomsDBI();
	
	file.write(',Symptoms,,\n', true);
	file.write('\n', true);
	file.write(symptomsDBI.getSymptomsOutputHeader(), true);
	
	var symptoms = symptomsDBI.getAllSymptomsByInjuryId(injuryId);
	for (var i = 0; i < symptoms.length; i++) {
    	var symptom = symptoms[i];
    	file.write(',,' + symptom.getSymptomDate().toDateString() + ',' + 
    						symptom.getSymptomArea() + ',' + 
    						symptom.getSymptomDetails()  + ',,\n', true);
    }
    file.write('\n', true);
}

function writeImpacts(file, injuryId) {
	var ImpactsDBI = require('db/dbi/impacts/ImpactsDBI').ImpactsDBI;
	var impactsDBI = new ImpactsDBI();
	
	file.write(',Impacts,,\n', true);
	file.write('\n', true);
	file.write(impactsDBI.getImpactsOutputHeader(), true);
	
	var impacts = impactsDBI.getAllImpactsByInjuryId(injuryId);
	for (var i = 0; i < impacts.length; i++) {
    	var impact = impacts[i];
    	
    	var missedWorkStr;
    	if (impact.getMissedWork()) {
    		missedWorkStr = 'Yes';
    	}
    	else {
    		missedWorkStr = 'No';
    	}

    	var unableHouseActivitiesStr;
    	if (impact.getHouseActivities()) {
    		unableHouseActivitiesStr = 'Yes';
    	}
    	else {
    		unableHouseActivitiesStr = 'No';
    	}
    	
    	file.write(',,' + impact.getImpactDate().toDateString() + ',' + 
    						missedWorkStr + ',' + 
    						impact.getMissedWorkDetails() + ',' +
    						unableHouseActivitiesStr + ',' + 
    						impact.getHouseActivityDetails() + ',' + 
    						impact.getOtherDetails()  + ',,\n', true);
    }
    file.write('\n', true);
}

function writeAppointments(file, injuryId) {
	var AppointmentsDBI = require('db/dbi/appointments/AppointmentsDBI').AppointmentsDBI;
	var appointmentsDBI = new AppointmentsDBI();
	
	file.write(',Appointments,,\n', true);
	file.write('\n', true);
	file.write(appointmentsDBI.getAppointmentsOutputHeader(), true);
	
	var totalMileage = 0.0;
	
	var appointments = appointmentsDBI.getAllAppointmentsByInjuryId(injuryId);
	for (var i = 0; i < appointments.length; i++) {
    	var appointment = appointments[i];
    	appointmentMileage = appointment.getAppointmentMileage();
    	if (!isNaN(appointmentMileage)) {
    		totalMileage += appointmentMileage;
    	}
    	
    	file.write(',,' + appointment.getAppointmentDate().toDateString() + ',' + 
    						appointment.getAppointmentDoctor() + ',' + 
    						appointment.getAppointmentReason() + ',' + 
    						appointment.getAppointmentRecommendation() + ',' + 
    						appointmentMileage  + ',,\n', true);
    }
    
    var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();
    
    var mileageUnit = settingsDBI.getSettingValueByName("MileageUnit");
    var mileageAmount = settingsDBI.getSettingValueByName("MileageAmount");
    var totalMileageAmount = totalMileage * mileageAmount;
    
	file.write('\n', true);
    file.write(',,,,Total ' + mileageUnit + ',$/' + mileageUnit + ',Total Milage Amount\n', true);
    file.write(',,,,' + totalMileage + ',$' + mileageAmount + ',$' + totalMileageAmount.toFixed(2) + ',\n', true);
	file.write('\n', true);
}

function writeMedications(file, injuryId) {
	var MedicationsDBI = require('db/dbi/medications/MedicationsDBI').MedicationsDBI;
	var medicationsDBI = new MedicationsDBI();
	
	file.write(',Medications,,\n', true);
	file.write('\n', true);
	file.write(medicationsDBI.getMedicationsOutputHeader(), true);

	var medications = medicationsDBI.getAllMedicationsByInjuryId(injuryId);

	for (var i = 0; i < medications.length; i++) {
    	var medication = medications[i];
    	var medicationCost = medication.getMedicationCost();

    	file.write(',,' + medication.getMedicationDate().toDateString() + ',' + 
    						medication.getMedicationName(), true);
    	if (medication.getInsuranceCovered()) {					
    		file.write(',$' + medicationCost + ',,', true);
    	}
    	else {
    		file.write(',,$' + medicationCost + ',', true);
    	}
    	
    	file.write(medication.getMedicationPurpose() + ',' + 
    				medication.getMedicationDosage() + ',,\n', true);					
    }
    file.write('\n', true);
}

function writeExpenses(file, injuryId) {
	var ExpensesDBI = require('db/dbi/expenses/ExpensesDBI').ExpensesDBI;
	var expensesDBI = new ExpensesDBI();
	
	file.write(',Expenses,,\n', true);
	file.write('\n', true);
	file.write(expensesDBI.getExpensesOutputHeader(), true);

	var expenses = expensesDBI.getAllExpensesByInjuryId(injuryId);
	for (var i = 0; i < expenses.length; i++) {
    	var expense = expenses[i];
    	var expenseAmount = expense.getExpenseAmount();

    	file.write(',,' + expense.getExpenseDate().toDateString() + ',' + 
    						expense.getExpenseName(), true);
    	if (expense.getInsuranceCovered()) {					
    		file.write(',$' + expenseAmount + ',,', true);
    	}
    	else {
    		file.write(',,$' + expenseAmount + ',', true);
    	}
		file.write(expense.getExpenseDetail() + ',,\n', true);
    }
    file.write('\n', true);
}

function writeTotalCosts(file, injuryId) {
	var MedicationsDBI = require('db/dbi/medications/MedicationsDBI').MedicationsDBI;
	var medicationsDBI = new MedicationsDBI();

	var coveredMedicationCosts = 0.0;
	var uncoveredMedicationCosts = 0.0;
	
	var medications = medicationsDBI.getAllMedicationsByInjuryId(injuryId);
	for (var i = 0; i < medications.length; i++) {
    	var medication = medications[i];
    	var medicationCost = medication.getMedicationCost();
    	if (medicationCost && !isNaN(medicationCost)) {
    		if (medication.getInsuranceCovered()) {
    			coveredMedicationCosts += medicationCost;
    		}
    		else {
    			uncoveredMedicationCosts += medicationCost;
    		}
    	}
	}
	
	var ExpensesDBI = require('db/dbi/expenses/ExpensesDBI').ExpensesDBI;
	var expensesDBI = new ExpensesDBI();

	var coveredExpenses = 0.0;
	var uncoveredExpenses = 0.0;

	var expenses = expensesDBI.getAllExpensesByInjuryId(injuryId);
	
	for (var i = 0; i < expenses.length; i++) {
    	var expense = expenses[i];
    	var expenseAmount = expense.getExpenseAmount();
    	if (expenseAmount && !isNaN(expenseAmount)) {
    		if (expense.getInsuranceCovered()) {
    			coveredExpenses += expenseAmount;
    		}
    		else {
    			uncoveredExpenses += expenseAmount;
    		}
    	}
	}
	
    var coveredCosts = coveredMedicationCosts + coveredExpenses;
    var uncoveredCosts = uncoveredMedicationCosts + uncoveredExpenses;
    var totalCosts = coveredCosts + uncoveredCosts;
    
	file.write('\n', true);
    file.write(',,,,Total Covered Costs,Total Uncovered Costs,Total Costs\n', true);
    file.write(',,,,$' + coveredCosts.toFixed(2) + ',$' + uncoveredCosts.toFixed(2) + ',$' + totalCosts.toFixed(2) + ',\n', true);
	file.write('\n', true);
}


exports.SaveSpreadsheetController = SaveSpreadsheetController;