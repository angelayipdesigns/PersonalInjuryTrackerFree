function IMPACTS() {
	return 'impacts';
}
function ID() {
	return 'id';
}
function INJURY_ID() {
	return 'injuryid';
}
function IMPACT_DATE() {
	return 'impactdate';
}
function MISSED_WORK() {
	return 'missedwork';
}
function MISSED_WORK_DETAILS() {
	return 'missedworkdetails';
}
function HOUSE_ACTIVITIES() {
	return 'houseactivities';
}
function HOUSE_ACTIVITY_DETAILS() {
	return 'houseactivitydetails';
}
function OTHER_DETAILS() {
	return 'otherdetails';
}

//ImpactsDBI Component Constructor
function ImpactsDBI () {	
}

ImpactsDBI.prototype.getImpactByInjuryIdImpactDate = function(injuryId, impactDate) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil and the DatabaseBooleanUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();
	
	var Impact = require('db/dbi/impacts/Impact').Impact;
	var impact;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var stringImpactDate = dbDateUtil.getDateStringForSelect(impactDate);
	var impactsRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_ID() + ', ' + IMPACT_DATE() + ', ' + MISSED_WORK() + ', ' + MISSED_WORK_DETAILS() + ', ' + 
								HOUSE_ACTIVITIES() + ', ' + HOUSE_ACTIVITY_DETAILS() + ', ' + OTHER_DETAILS() + 
								' FROM '+ IMPACTS() + ' WHERE ' + INJURY_ID() + ' = ? AND ' + IMPACT_DATE() + ' = ?', injuryId, stringImpactDate);

	if (impactsRS.isValidRow()) {
		var fetchedId = impactsRS.fieldByName(ID());
		var fetchedInjuryId = impactsRS.fieldByName(INJURY_ID());
		var fetchedImpactDate = impactsRS.fieldByName(IMPACT_DATE());
		var finalImpactDate = dbDateUtil.getDateFromSelect(fetchedImpactDate);
		var fetchedMissedWork = impactsRS.fieldByName(MISSED_WORK());
		var finalMissedWork = dbBooleanUtil.getBooleanFromSelect(fetchedMissedWork);
		var fetchedMissedWorkDetails = impactsRS.fieldByName(MISSED_WORK_DETAILS());
		var fetchedHouseActivities = impactsRS.fieldByName(HOUSE_ACTIVITIES());
		var finalHouseActivities = dbBooleanUtil.getBooleanFromSelect(fetchedHouseActivities);
		var fetchedHouseActivityDetails = impactsRS.fieldByName(HOUSE_ACTIVITY_DETAILS());
		var fetchedOtherDetails = impactsRS.fieldByName(OTHER_DETAILS());				
		
		Ti.API.info("Fetched impact:  id: " + fetchedId + ", injuryid: " + fetchedInjuryId + ", impactdate: " + finalImpactDate + 
					", missedwork: " + finalMissedWork + ", missedworkdetails: " + fetchedMissedWorkDetails +
					", houseactivities: " + finalHouseActivities + ", houseactivitydetails: " + fetchedHouseActivityDetails +
					", otherdetails: " + fetchedOtherDetails);
		
		impact = new Impact(fetchedId, fetchedInjuryId, finalImpactDate, finalMissedWork, fetchedMissedWorkDetails, finalHouseActivities, fetchedHouseActivityDetails, fetchedOtherDetails);
	}
	impactsRS.close();
	db.close();		
	return impact;
};

ImpactsDBI.prototype.getAllImpactsByInjuryId = function(injuryId) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil and the DatabaseBooleanUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();

	var impacts = [];
	var Impact = require('db/dbi/impacts/Impact').Impact;
	var impact;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var impactsRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_ID() + ', ' + IMPACT_DATE() + ', ' + MISSED_WORK() + ', ' + MISSED_WORK_DETAILS() + ', ' + 
								HOUSE_ACTIVITIES() + ', ' + HOUSE_ACTIVITY_DETAILS() + ', ' + OTHER_DETAILS() + 
								' FROM '+ IMPACTS() + ' WHERE ' + INJURY_ID() + ' = ?', injuryId);

	while (impactsRS.isValidRow()) {
		var fetchedId = impactsRS.fieldByName(ID());
		var fetchedInjuryId = impactsRS.fieldByName(INJURY_ID());
		var fetchedImpactDate = impactsRS.fieldByName(IMPACT_DATE());
		var finalImpactDate = dbDateUtil.getDateFromSelect(fetchedImpactDate);
		var fetchedMissedWork = impactsRS.fieldByName(MISSED_WORK());
		var finalMissedWork = dbBooleanUtil.getBooleanFromSelect(fetchedMissedWork);
		var fetchedMissedWorkDetails = impactsRS.fieldByName(MISSED_WORK_DETAILS());
		var fetchedHouseActivities = impactsRS.fieldByName(HOUSE_ACTIVITIES());
		var finalHouseActivities = dbBooleanUtil.getBooleanFromSelect(fetchedHouseActivities);
		var fetchedHouseActivityDetails = impactsRS.fieldByName(HOUSE_ACTIVITY_DETAILS());
		var fetchedOtherDetails = impactsRS.fieldByName(OTHER_DETAILS());				
		
		/*
		Ti.API.info("Fetched impact:  id: " + fetchedId + ", injuryid: " + fetchedInjuryId + ", impactdate: " + finalImpactDate + 
					", missedwork: " + finalMissedWork + ", missedworkdetails: " + fetchedMissedWorkDetails +
					", houseactivities: " + finalHouseActivities + ", houseactivitydetails: " + fetchedHouseActivityDetails +
					", otherdetails: " + fetchedOtherDetails);
		*/
		impact = new Impact(fetchedId, fetchedInjuryId, finalImpactDate, finalMissedWork, fetchedMissedWorkDetails, finalHouseActivities, fetchedHouseActivityDetails, fetchedOtherDetails);
		impacts.push(impact);
  		impactsRS.next();
	}
	impactsRS.close();
	db.close();		
	return impacts;
};

ImpactsDBI.prototype.getExistsArrayByInjuryIdByMonthYear = function(injuryId, monthYear, numDaysInMonth) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var currentMonth = monthYear.getMonth() + 1;	//to adjust for the month count starting at 0 (Jan)
	var currentYear = monthYear.getYear();
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	
	var impactExists = [];
	//initial the array of booleans all to false
	//in fact, the value at position 0, will never be used since day number is always > 0
	for (var i=0; i <= numDaysInMonth; i++) {
		impactExists.push(false);
	}

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var impactsRS = db.execute('SELECT ' + IMPACT_DATE() + ' FROM ' + IMPACTS() + 
								' WHERE ' + IMPACT_DATE() + ' LIKE \'' + currentMonth + '-%-' + currentYear + '\' AND ' + INJURY_ID() + ' = ?', injuryId);

	while (impactsRS.isValidRow()) {
		var fetchedImpactDateStr = impactsRS.fieldByName(IMPACT_DATE());
		var dateComponents = fetchedImpactDateStr.split("-");
		var day = dateComponents[1];

		impactExists[day] = true;
		
  		impactsRS.next();
	}
	impactsRS.close();
	db.close();		
	return impactExists;
};

ImpactsDBI.prototype.impactExists = function(injuryId, impactDate) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var stringImpactDate = dbDateUtil.getDateStringForSelect(impactDate);
	var impactRS = db.execute('SELECT ' + ID() + ' FROM '+ IMPACTS() +
								' WHERE ' + INJURY_ID() + ' = ? AND ' + IMPACT_DATE() + ' = ?', injuryId, stringImpactDate);
	var impactExists = impactRS.isValidRow();

	impactRS.close();
	db.close();		
	return impactExists;
};

ImpactsDBI.prototype.insertImpact = function(impact) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	var stringImpactDate = dbDateUtil.getDateStringForInsert(impact.getImpactDate());
	var intMissedWork = dbBooleanUtil.getBooleanIntForInsert(impact.getMissedWork());
	var intHouseActivities = dbBooleanUtil.getBooleanIntForInsert(impact.getHouseActivities());
	db.execute('INSERT INTO ' + IMPACTS() + ' (' + INJURY_ID() + ', ' + IMPACT_DATE() + ', '
							+ MISSED_WORK() + ', ' + MISSED_WORK_DETAILS() + ', '
							+ HOUSE_ACTIVITIES() + ', ' + HOUSE_ACTIVITY_DETAILS() + ', ' + OTHER_DETAILS()
							+ ') VALUES (?, ?, ?, ?, ?, ?, ?)', 
							impact.getInjuryId(), stringImpactDate, intMissedWork, impact.getMissedWorkDetails(), 
							intHouseActivities, impact.getHouseActivityDetails(), impact.getOtherDetails());
	var lastId = db.getLastInsertRowId();
	db.close();
	
	return lastId;
};

ImpactsDBI.prototype.updateImpact = function(impact) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	var intMissedWork = dbBooleanUtil.getBooleanIntForInsert(impact.getMissedWork());
	var intHouseActivities = dbBooleanUtil.getBooleanIntForInsert(impact.getHouseActivities());
	db.execute('UPDATE ' + IMPACTS() + ' SET ' + MISSED_WORK() + ' = ?, ' + MISSED_WORK_DETAILS() + ' = ?, '
							+ HOUSE_ACTIVITIES() + ' = ?, ' + HOUSE_ACTIVITY_DETAILS() + ' = ?, ' + OTHER_DETAILS()
							+ ' = ? WHERE ' + ID() + ' = ?', 
							intMissedWork, impact.getMissedWorkDetails(), intHouseActivities, impact.getHouseActivityDetails(), impact.getOtherDetails(), impact.getId());
	db.close();
};

ImpactsDBI.prototype.deleteImpact = function(impactId) {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('DELETE from ' + IMPACTS() + ' WHERE ' + ID() + ' = ?', impactId);
	db.close();
};

ImpactsDBI.prototype.getImpactsOutputHeader = function() {
	return ',,Impact Date,Missed Work,Missed Work Details,Unable to do House Activities,House Activity Details,Other Details,,\n';
};


exports.ImpactsDBI = ImpactsDBI;