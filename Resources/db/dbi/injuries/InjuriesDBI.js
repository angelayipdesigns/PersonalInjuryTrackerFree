function INJURIES() {
	return 'injuries';
}
function ID() {
	return 'id';
}
function INJURY_NAME() {
	return 'injuryname';
}
function INJURY_DESCRIPTION() {
	return 'injurydescription';
}
function INJURY_DATE() {
	return 'injurydate';
}
function INJURY_TIME() {
	return 'injurytime';
}

function IS_CURRENT() {
	return 'iscurrent';
}

//InjuriesDBI Component Constructor
//for "current" operations, use the CurrentInjuryCache
function InjuriesDBI () {
}

InjuriesDBI.prototype.noInjuryDefined = function() {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//check for any existing injury entries
	var injuryRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_NAME() + ', ' + INJURY_DESCRIPTION() + ', ' + INJURY_DATE() + ', ' + INJURY_TIME() + ', ' + IS_CURRENT() +
								' FROM '+ INJURIES());
	if (injuryRS.isValidRow()) {
		var fetchedInjuryId = injuryRS.fieldByName(ID());
		var fetchedInjuryName = injuryRS.fieldByName(INJURY_NAME());
		var fetchedInjuryDesc = injuryRS.fieldByName(INJURY_DESCRIPTION());
		var fetchedInjuryDateStr = injuryRS.fieldByName(INJURY_DATE());
		var finalInjuryDate = dbDateUtil.getDateFromSelect(fetchedInjuryDateStr);
		var fetchedInjuryTimeStr = injuryRS.fieldByName(INJURY_TIME());
		var finalInjuryTime = dbDateUtil.getTimeFromSelect(fetchedInjuryTimeStr);
		var fetchedInjuryIsCurrent = injuryRS.fieldByName(IS_CURRENT());
		Ti.API.info("At least one injury already exists. id: " + fetchedInjuryId + ", name: " + fetchedInjuryName +
											", injurydescription: " + fetchedInjuryDesc + ", injurydate: " + finalInjuryDate +
											", injurytime: " + finalInjuryTime + ", is current: " + fetchedInjuryIsCurrent);

		injuryRS.close();
		db.close();
		return false;
	}
	injuryRS.close();
	db.close();
	return true;

};

InjuriesDBI.prototype.getInjuryById = function(injuryId) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil and the DatabaseBooleanUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	var Injury = require('db/dbi/injuries/Injury').Injury;
	var injury;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var injuryRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_NAME() + ', ' + INJURY_DESCRIPTION() + ', ' + INJURY_DATE() + ', ' + INJURY_TIME() + ', ' + IS_CURRENT() +
								' FROM '+ INJURIES() + ' WHERE ' + ID() + ' = ?', injuryId);
	if (injuryRS.isValidRow()) {
		var fetchedInjuryId = injuryRS.fieldByName(ID());
		var fetchedInjuryName = injuryRS.fieldByName(INJURY_NAME());
		var fetchedInjuryDesc = injuryRS.fieldByName(INJURY_DESCRIPTION());
		var fetchedInjuryDateStr = injuryRS.fieldByName(INJURY_DATE());
		var finalInjuryDate = dbDateUtil.getDateFromSelect(fetchedInjuryDateStr);
		var fetchedInjuryTimeStr = injuryRS.fieldByName(INJURY_TIME());
		var finalInjuryTime = dbDateUtil.getTimeFromSelect(fetchedInjuryTimeStr);
		var fetchedInjuryIsCurrent = injuryRS.fieldByName(IS_CURRENT());
		Ti.API.info("Fetched injury:  id: " + fetchedInjuryId + ", name: " + fetchedInjuryName +
											", injurydescription: " + fetchedInjuryDesc + ", injurydate: " + finalInjuryDate +
											", injurytime: " + finalInjuryTime + ", is current: " + fetchedInjuryIsCurrent);

		injury = new Injury(fetchedInjuryId, finalInjuryDate, finalInjuryTime, fetchedInjuryName, fetchedInjuryDesc, fetchedInjuryIsCurrent);
	}
	injuryRS.close();
	db.close();
	return injury;
};

InjuriesDBI.prototype.insertInjury = function(injury) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	var stringDate = dbDateUtil.getDateStringForInsert(injury.getInjuryDate());
	var stringTime = dbDateUtil.getTimeStringForInsert(injury.getInjuryTime());
	db.execute('INSERT INTO ' + INJURIES() + ' (' + INJURY_NAME() + ', ' + INJURY_DESCRIPTION() + ', '
							+ INJURY_DATE() + ', ' + INJURY_TIME() + ', ' + IS_CURRENT() +
							') VALUES (?, ?, ?, ?, ?)', injury.getInjuryName(), injury.getInjuryDescription(), stringDate, stringTime, injury.getInjuryIsCurrent());
	var lastId = db.getLastInsertRowId();
	db.close();

	injury.setId(lastId);

	//update the CurrentInjuryCache singleton
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	currentInjuryCache.setCurrent(injury);
};

InjuriesDBI.prototype.updateInjury = function(injury) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	//open the database
	var stringDate = dbDateUtil.getDateStringForInsert(injury.getInjuryDate());
	var stringTime = dbDateUtil.getTimeStringForInsert(injury.getInjuryTime());
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('UPDATE ' + INJURIES() + ' SET ' + INJURY_NAME() + ' = ?, ' + INJURY_DESCRIPTION() + ' = ?, ' +
													INJURY_DATE() + ' = ?, ' + INJURY_TIME() + ' = ? WHERE '
							+ ID() + ' = ?', injury.getInjuryName(), injury.getInjuryDescription(), stringDate, stringTime, injury.getId());
	db.close();

  var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
  var kafkaConfigs = kafkaConfigsCache.getKafkaConfigs();
	if (kafkaConfigs.getSendToKafkaEnabled()) {
	  var KafkaRestController = require('ctrls/kafkarest/KafkaRestController').KafkaRestController;
	  var kafkaRestController = new KafkaRestController(kafkaConfigs.getKafkaRestURL(), kafkaConfigs.getKafkaTopic());
	  kafkaRestController.produce('Injury: ' + injury.getInjuryName() + ', ' + injury.getInjuryDescription() + ', ' + stringDate);
	}

	//update the CurrentInjuryCache singleton
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	currentInjuryCache.setCurrent(injury);
};

//normally, you should use the CurrentInjuryCache for this type of request
InjuriesDBI.prototype.getCurrentInjury = function() {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil and the DatabaseBooleanUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	var Injury = require('db/dbi/injuries/Injury').Injury;
	var injury;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var injuryRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_NAME() + ', ' + INJURY_DESCRIPTION() + ', ' + INJURY_DATE() + ', ' + INJURY_TIME() + ', ' + IS_CURRENT() +
								' FROM '+ INJURIES() + ' WHERE ' + IS_CURRENT() + ' = ?', 1);
	if (injuryRS.isValidRow()) {
		var fetchedInjuryId = injuryRS.fieldByName(ID());
		var fetchedInjuryName = injuryRS.fieldByName(INJURY_NAME());
		var fetchedInjuryDesc = injuryRS.fieldByName(INJURY_DESCRIPTION());
		var fetchedInjuryDateStr = injuryRS.fieldByName(INJURY_DATE());
		var finalInjuryDate = dbDateUtil.getDateFromSelect(fetchedInjuryDateStr);
		var fetchedInjuryTimeStr = injuryRS.fieldByName(INJURY_TIME());
		var finalInjuryTime = dbDateUtil.getTimeFromSelect(fetchedInjuryTimeStr);
		var fetchedInjuryIsCurrent = injuryRS.fieldByName(IS_CURRENT());
		Ti.API.info("Fetched injury:  id: " + fetchedInjuryId + ", name: " + fetchedInjuryName +
											", injurydescription: " + fetchedInjuryDesc + ", injurydate: " + finalInjuryDate +
											", injurytime: " + finalInjuryTime + ", is current: " + fetchedInjuryIsCurrent);
		injury = new Injury(fetchedInjuryId, finalInjuryDate, finalInjuryTime, fetchedInjuryName, fetchedInjuryDesc, fetchedInjuryIsCurrent);
	}
	injuryRS.close();
	db.close();
	return injury;
};


exports.InjuriesDBI = InjuriesDBI;
