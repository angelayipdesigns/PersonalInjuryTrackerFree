function CURRENT_VERSION_NUMBER() {
	return '1.0';
}
function CURRENT_VERSION_DETAILS() {
	return 'None';
}
function VERSION() {
	return 'version';
}
function VERSION_NUMBER() {
	return 'versionnumber';
}
function VERSION_DETAILS() {
	return 'versiondetails';
}

//VersionDBI Component Constructor
function VersionDBI() {	
}

VersionDBI.prototype.getVersion = function() {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	var Version = require('db/dbi/version/Version').Version;
	var version;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//execute the select 
	var versionRS = db.execute('SELECT ' + VERSION_NUMBER() + ', ' + VERSION_DETAILS() +
								' FROM '+ VERSION());
	if (versionRS.isValidRow()) {
		var fetchedVersionNumber = versionRS.fieldByName(VERSION_NUMBER());
		var fetchedVersionDetails = versionRS.fieldByName(VERSION_DETAILS());
		Ti.API.info("Fetched version:  versionnumber: " + fetchedVersionNumber + ", versiondetails: " + fetchedVersionDetails);	
		version = new Version(fetchedVersionNumber, fetchedVersionDetails);
	}
	versionRS.close();
	db.close();	
	
	if (!version) {
		Ti.API.info("The version is not initialized in the database.");
		version = new Version(CURRENT_VERSION_NUMBER(), CURRENT_VERSION_DETAILS());
		self = this;
		self.insertVersion(version);
	}

	return version;
};

VersionDBI.prototype.updateVersionNumber = function(versionNumber) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('UPDATE ' + VERSION() + ' SET ' + VERSION_NUMBER() + ' = ?', versionNumber);
	db.close();
};

VersionDBI.prototype.insertVersion = function(version) {
	var DBC = require('db/common/DBConstants').DBConstants;	
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	Ti.API.info("Inserting current verion details: versionnumber: " + version.getVersionNumber() + " versiondetails: " + version.getVersionDetails());
	db.execute('INSERT INTO ' + VERSION() + ' (' + VERSION_NUMBER() + ', ' + VERSION_DETAILS() + 
							') VALUES (?, ?)', version.getVersionNumber(), version.getVersionDetails());
	db.close();
};


exports.VersionDBI = VersionDBI;