function SYMPTOMS() {
	return 'symptoms';
}
function ID() {
	return 'id';
}
function INJURY_ID() {
	return 'injuryid';
}
function SYMPTOM_DATE() {
	return 'symptomdate';
}
function SYMPTOM_AREA() {
	return 'symptomarea';
}
function SYMPTOM_DETAILS() {
	return 'symptomdetails';
}
function SYMPTOM_DETAILS() {
	return 'symptomdetails';
}

//SymptomsDBI Component Constructor
function SymptomsDBI () {
}

SymptomsDBI.prototype.getSymptomsByInjuryIdSymptomDate = function(injuryId, symptomDate) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	var symptoms = [];
	var Symptom = require('db/dbi/symptoms/Symptom').Symptom;
	var symptom;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var stringSymptomDate = dbDateUtil.getDateStringForSelect(symptomDate);
	var symptomsRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_ID() + ', ' + SYMPTOM_DATE() + ', ' + SYMPTOM_AREA() + ', ' + SYMPTOM_DETAILS() +
								' FROM '+ SYMPTOMS() + ' WHERE ' + INJURY_ID() + ' = ? AND ' + SYMPTOM_DATE() + ' = ?', injuryId, stringSymptomDate);

	while (symptomsRS.isValidRow()) {
		var fetchedId = symptomsRS.fieldByName(ID());
		var fetchedInjuryId = symptomsRS.fieldByName(INJURY_ID());
		var fetchedSymptomDate = symptomsRS.fieldByName(SYMPTOM_DATE());
		var finalSymptomDate = dbDateUtil.getDateFromSelect(fetchedSymptomDate);
		var fetchedSymptomArea = symptomsRS.fieldByName(SYMPTOM_AREA());
		var fetchedSymptomDetails = symptomsRS.fieldByName(SYMPTOM_DETAILS());
		Ti.API.info("Fetched symptom:  id: " + fetchedId + ", injuryid: " + fetchedInjuryId +
											", symptomdate: " + finalSymptomDate + ", symptomarea: " + fetchedSymptomArea +
											", symptomdetails: " + fetchedSymptomDetails);

		symptom = new Symptom(fetchedId, fetchedInjuryId, finalSymptomDate, fetchedSymptomArea, fetchedSymptomDetails);
		symptoms.push(symptom);
  		symptomsRS.next();
	}
	symptomsRS.close();
	db.close();
	return symptoms;
};

SymptomsDBI.prototype.getAllSymptomsByInjuryId = function(injuryId) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	var symptoms = [];
	var Symptom = require('db/dbi/symptoms/Symptom').Symptom;
	var symptom;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var symptomsRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_ID() + ', ' + SYMPTOM_DATE() + ', ' + SYMPTOM_AREA() + ', ' + SYMPTOM_DETAILS() +
								' FROM '+ SYMPTOMS() + ' WHERE ' + INJURY_ID() + ' = ?', injuryId);

	while (symptomsRS.isValidRow()) {
		var fetchedId = symptomsRS.fieldByName(ID());
		var fetchedInjuryId = symptomsRS.fieldByName(INJURY_ID());
		var fetchedSymptomDate = symptomsRS.fieldByName(SYMPTOM_DATE());
		var finalSymptomDate = dbDateUtil.getDateFromSelect(fetchedSymptomDate);
		var fetchedSymptomArea = symptomsRS.fieldByName(SYMPTOM_AREA());
		var fetchedSymptomDetails = symptomsRS.fieldByName(SYMPTOM_DETAILS());
		/*
		Ti.API.info("Fetched symptom:  id: " + fetchedId + ", injuryid: " + fetchedInjuryId +
											", symptomdate: " + finalSymptomDate + ", symptomarea: " + fetchedSymptomArea +
											", symptomdetails: " + fetchedSymptomDetails);
		*/
		symptom = new Symptom(fetchedId, fetchedInjuryId, finalSymptomDate, fetchedSymptomArea, fetchedSymptomDetails);
		symptoms.push(symptom);
  		symptomsRS.next();
	}
	symptomsRS.close();
	db.close();
	return symptoms;
};

SymptomsDBI.prototype.getExistsArrayByInjuryIdByMonthYear = function(injuryId, monthYear, numDaysInMonth) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var currentMonth = monthYear.getMonth() + 1;	//to adjust for the month count starting at 0 (Jan)
	var currentYear = monthYear.getYear();

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	var symptomsExist = [];
	//initial the array of booleans all to false
	//in fact, the value at position 0, will never be used since day number is always > 0
	for (var i=0; i <= numDaysInMonth; i++) {
		symptomsExist.push(false);
	}

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var symptomsRS = db.execute('SELECT ' + SYMPTOM_DATE() + ' FROM ' + SYMPTOMS() +
								' WHERE ' + SYMPTOM_DATE() + ' LIKE \'' + currentMonth + '-%-' + currentYear + '\' AND ' + INJURY_ID() + ' = ?', injuryId);

	while (symptomsRS.isValidRow()) {
		var fetchedSymptomDateStr = symptomsRS.fieldByName(SYMPTOM_DATE());
		var dateComponents = fetchedSymptomDateStr.split("-");
		var day = dateComponents[1];

		symptomsExist[day] = true;

  		symptomsRS.next();
	}
	symptomsRS.close();
	db.close();
	return symptomsExist;
};

SymptomsDBI.prototype.symptomExists = function(injuryId, symptomDate) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var stringSymptomDate = dbDateUtil.getDateStringForSelect(symptomDate);
	var symptomsRS = db.execute('SELECT ' + ID() + ' FROM '+ SYMPTOMS() +
								' WHERE ' + INJURY_ID() + ' = ? AND ' + SYMPTOM_DATE() + ' = ?', injuryId, stringSymptomDate);
	var symptomExist = symptomsRS.isValidRow();

	symptomsRS.close();
	db.close();
	return symptomExist;
};

SymptomsDBI.prototype.insertSymptom = function(symptom) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	var stringSymptomDate = dbDateUtil.getDateStringForInsert(symptom.getSymptomDate());
	db.execute('INSERT INTO ' + SYMPTOMS() + ' (' + INJURY_ID() + ', ' + SYMPTOM_DATE() + ', '
							+ SYMPTOM_AREA() + ', ' + SYMPTOM_DETAILS() +
							') VALUES (?, ?, ?, ?)', symptom.getInjuryId(), stringSymptomDate, symptom.getSymptomArea(), symptom.getSymptomDetails());
	var lastId = db.getLastInsertRowId();
	db.close();

	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
  var kafkaConfigs = kafkaConfigsCache.getKafkaConfigs();
	if (kafkaConfigs.getSendToKafkaEnabled()) {
	  var KafkaRestController = require('ctrls/kafkarest/KafkaRestController').KafkaRestController;
	  var kafkaRestController = new KafkaRestController(kafkaConfigs.getKafkaRestURL(), kafkaConfigs.getKafkaTopic());
	  kafkaRestController.produce('Symptom: ' + symptom.getSymptomArea() + ', ' + symptom.getSymptomDetails() + ', ' + stringSymptomDate);
	}

	return lastId;
};

SymptomsDBI.prototype.updateSymptom = function(symptom) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('UPDATE ' + SYMPTOMS() + ' SET ' + SYMPTOM_AREA() + ' = ?, ' + SYMPTOM_DETAILS() + ' = ? WHERE '
							+ ID() + ' = ?', symptom.getSymptomArea(), symptom.getSymptomDetails(), symptom.getId());
	db.close();

	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	var kafkaConfigs = kafkaConfigsCache.getKafkaConfigs();
	if (kafkaConfigs.getSendToKafkaEnabled()) {
		var KafkaRestController = require('ctrls/kafkarest/KafkaRestController').KafkaRestController;
		var kafkaRestController = new KafkaRestController(kafkaConfigs.getKafkaRestURL(), kafkaConfigs.getKafkaTopic());
		kafkaRestController.produce('Symptom: ' + symptom.getSymptomArea() + ', ' + symptom.getSymptomDetails());
	}
};

SymptomsDBI.prototype.deleteSymptom = function(symptomId) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('DELETE from ' + SYMPTOMS() + ' WHERE ' + ID() + ' = ?', symptomId);
	db.close();
};

SymptomsDBI.prototype.getSymptomsOutputHeader = function() {
	return ',,Symptom Date,Symptom Area,Symptom Details,,\n';
};


exports.SymptomsDBI = SymptomsDBI;
