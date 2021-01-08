function MEDICATIONS() {
	return 'medications';
}
function ID() {
	return 'id';
}
function INJURY_ID() {
	return 'injuryid';
}
function MEDICATION_DATE() {
	return 'medicationdate';
}
function MEDICATION_NAME() {
	return 'medicationname';
}
function MEDICATION_PURPOSE() {
	return 'medicationpurpose';
}
function MEDICATION_DOSAGE() {
	return 'medicationdosage';
}
function MEDICATION_COST() {
	return 'medicationcost';
}
function INSURANCE_COVERED() {
	return 'insurancecovered';
}

//MedicationsDBI Component Constructor
function MedicationsDBI () {	
}

MedicationsDBI.prototype.getMedicationsByInjuryIdMedicationDate = function(injuryId, medicationDate) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();
	
	var medications = [];
	var Medication = require('db/dbi/medications/Medication').Medication;
	var medication;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var stringMedicationDate = dbDateUtil.getDateStringForSelect(medicationDate);
	var medicationsRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_ID() + ', ' + 
											MEDICATION_DATE() + ', ' + MEDICATION_NAME() + ', ' + 
											MEDICATION_PURPOSE() + ', ' + MEDICATION_DOSAGE() + ', ' +
											MEDICATION_COST() + ', ' + INSURANCE_COVERED() + 
								' FROM '+ MEDICATIONS() + ' WHERE ' + INJURY_ID() + ' = ? AND ' + MEDICATION_DATE() + ' = ?', injuryId, stringMedicationDate);

	while (medicationsRS.isValidRow()) {
		var fetchedId = medicationsRS.fieldByName(ID());
		var fetchedInjuryId = medicationsRS.fieldByName(INJURY_ID());
		var fetchedMedicationDate = medicationsRS.fieldByName(MEDICATION_DATE());
		var finalMedicationDate = dbDateUtil.getDateFromSelect(fetchedMedicationDate);
		var fetchedMedicationName = medicationsRS.fieldByName(MEDICATION_NAME());
		var fetchedMedicationPurpose = medicationsRS.fieldByName(MEDICATION_PURPOSE());
		var fetchedMedicationDosage = medicationsRS.fieldByName(MEDICATION_DOSAGE());
		var fetchedMedicationCost = medicationsRS.fieldByName(MEDICATION_COST());
		var fetchedInsuranceCovered = medicationsRS.fieldByName(INSURANCE_COVERED());
		var finalInsuranceCovered = dbBooleanUtil.getBooleanFromSelect(fetchedInsuranceCovered);
		Ti.API.info("Fetched medication:  id: " + fetchedId + ", injuryid: " + fetchedInjuryId +
											", medicationdate: " + finalMedicationDate + ", medicationname: " + fetchedMedicationName + 
											", medicationpurpose: " + fetchedMedicationPurpose + ", medicationdosage: " + fetchedMedicationDosage +
											", medicationcost: " + fetchedMedicationCost + ", insurancecovered: " + finalInsuranceCovered);
		
		medication = new Medication(fetchedId, fetchedInjuryId, finalMedicationDate, fetchedMedicationName, fetchedMedicationPurpose, fetchedMedicationDosage, fetchedMedicationCost, finalInsuranceCovered);
		medications.push(medication);
  		medicationsRS.next();
	}
	medicationsRS.close();
	db.close();		
	return medications;
};

MedicationsDBI.prototype.getAllMedicationsByInjuryId = function(injuryId) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();
	
	var medications = [];
	var Medication = require('db/dbi/medications/Medication').Medication;
	var medication;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var medicationsRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_ID() + ', ' + 
											MEDICATION_DATE() + ', ' + MEDICATION_NAME() + ', ' + 
											MEDICATION_PURPOSE() + ', ' + MEDICATION_DOSAGE() + ', ' +
											MEDICATION_COST() + ', ' + INSURANCE_COVERED() + 
								' FROM '+ MEDICATIONS() + ' WHERE ' + INJURY_ID() + ' = ?', injuryId);

	while (medicationsRS.isValidRow()) {
		var fetchedId = medicationsRS.fieldByName(ID());
		var fetchedInjuryId = medicationsRS.fieldByName(INJURY_ID());
		var fetchedMedicationDate = medicationsRS.fieldByName(MEDICATION_DATE());
		var finalMedicationDate = dbDateUtil.getDateFromSelect(fetchedMedicationDate);
		var fetchedMedicationName = medicationsRS.fieldByName(MEDICATION_NAME());
		var fetchedMedicationPurpose = medicationsRS.fieldByName(MEDICATION_PURPOSE());
		var fetchedMedicationDosage = medicationsRS.fieldByName(MEDICATION_DOSAGE());
		var fetchedMedicationCost = medicationsRS.fieldByName(MEDICATION_COST());
		var fetchedInsuranceCovered = medicationsRS.fieldByName(INSURANCE_COVERED());
		var finalInsuranceCovered = dbBooleanUtil.getBooleanFromSelect(fetchedInsuranceCovered);
		/*
		Ti.API.info("Fetched medication:  id: " + fetchedId + ", injuryid: " + fetchedInjuryId +
											", medicationdate: " + finalMedicationDate + ", medicationname: " + fetchedMedicationName + 
											", medicationpurpose: " + fetchedMedicationPurpose + ", medicationdosage: " + fetchedMedicationDosage +
											", medicationcost: " + fetchedMedicationCost + ", insurancecovered: " + finalInsuranceCovered);
		*/
		medication = new Medication(fetchedId, fetchedInjuryId, finalMedicationDate, fetchedMedicationName, fetchedMedicationPurpose, fetchedMedicationDosage, fetchedMedicationCost, finalInsuranceCovered);
		medications.push(medication);
  		medicationsRS.next();
	}
	medicationsRS.close();
	db.close();		
	return medications;
};

MedicationsDBI.prototype.getExistsArrayByInjuryIdByMonthYear = function(injuryId, monthYear, numDaysInMonth) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var currentMonth = monthYear.getMonth() + 1;	//to adjust for the month count starting at 0 (Jan)
	var currentYear = monthYear.getYear();
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	
	var medicationsExist = [];
	//initial the array of booleans all to false
	//in fact, the value at position 0, will never be used since day number is always > 0
	for (var i=0; i <= numDaysInMonth; i++) {
		medicationsExist.push(false);
	}

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var medicationsRS = db.execute('SELECT ' + MEDICATION_DATE() + ' FROM ' + MEDICATIONS() + 
								' WHERE ' + MEDICATION_DATE() + ' LIKE \'' + currentMonth + '-%-' + currentYear + '\' AND ' + INJURY_ID() + ' = ?', injuryId);

	while (medicationsRS.isValidRow()) {
		var fetchedMedicationDateStr = medicationsRS.fieldByName(MEDICATION_DATE());
		var dateComponents = fetchedMedicationDateStr.split("-");
		var day = dateComponents[1];

		medicationsExist[day] = true;
		
  		medicationsRS.next();
	}
	medicationsRS.close();
	db.close();		
	return medicationsExist;
};

MedicationsDBI.prototype.medicationExists = function(injuryId, medicationDate) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var stringMedicationDate = dbDateUtil.getDateStringForSelect(medicationDate);
	var medicationsRS = db.execute('SELECT ' + ID() + ' FROM '+ MEDICATIONS() +
								' WHERE ' + INJURY_ID() + ' = ? AND ' + MEDICATION_DATE() + ' = ?', injuryId, stringMedicationDate);
	var medicationExist = medicationsRS.isValidRow();

	medicationsRS.close();
	db.close();		
	return medicationExist;
};

MedicationsDBI.prototype.insertMedication = function(medication) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	var stringMedicationDate = dbDateUtil.getDateStringForInsert(medication.getMedicationDate());
	var intInsuranceCovered = dbBooleanUtil.getBooleanIntForInsert(medication.getInsuranceCovered());
	db.execute('INSERT INTO ' + MEDICATIONS() + ' (' + INJURY_ID() + ', ' + MEDICATION_DATE() + ', ' 
							+ MEDICATION_NAME() + ', ' + MEDICATION_PURPOSE() +  ', ' + MEDICATION_DOSAGE() + ', ' 
							+ MEDICATION_COST() + ', ' + INSURANCE_COVERED() +
							') VALUES (?, ?, ?, ?, ?, ?, ?)', medication.getInjuryId(), stringMedicationDate, medication.getMedicationName(), 
															medication.getMedicationPurpose(), medication.getMedicationDosage(), medication.getMedicationCost(),
															intInsuranceCovered);
	var lastId = db.getLastInsertRowId();
	db.close();
	
	return lastId;
};

MedicationsDBI.prototype.updateMedication = function(medication) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	var intInsuranceCovered = dbBooleanUtil.getBooleanIntForInsert(medication.getInsuranceCovered());
	db.execute('UPDATE ' + MEDICATIONS() + ' SET ' + MEDICATION_NAME() + ' = ?, ' + MEDICATION_PURPOSE() + ' = ?, ' + 
							MEDICATION_DOSAGE() + ' = ?, ' + MEDICATION_COST() + ' = ?, ' + INSURANCE_COVERED() + ' = ? WHERE ' 
							+ ID() + ' = ?', medication.getMedicationName(), medication.getMedicationPurpose(), 
											medication.getMedicationDosage(), medication.getMedicationCost(), intInsuranceCovered, 
											medication.getId());
	db.close();
};

MedicationsDBI.prototype.deleteMedication = function(medicationId) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('DELETE from ' + MEDICATIONS() + ' WHERE ' + ID() + ' = ?', medicationId);
	db.close();
};

MedicationsDBI.prototype.getMedicationsOutputHeader = function() {
	return ',,Medication Date,Medication Name,Covered Cost, Uncovered Cost, Medication Purpose,Dosage,,\n';
};


exports.MedicationsDBI = MedicationsDBI;