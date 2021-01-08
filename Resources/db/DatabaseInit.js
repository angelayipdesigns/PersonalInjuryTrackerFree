//DatabaseInit Component Constructor
function DatabaseInit () {
}

DatabaseInit.prototype.exec = function() {
	var DBC = require('db/common/DBConstants').DBConstants;
	
	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	
	//iOSSpecific:  Disable the db file from being backed up to the cloud
	if ((Titanium.Platform.name == 'iphone') || (Titanium.Platform.name == 'ipad')) {
		db.file.setRemoteBackup(false);
	}

	db.execute('CREATE TABLE IF NOT EXISTS injuries(id INTEGER PRIMARY KEY AUTOINCREMENT, injuryname TEXT, injurydescription TEXT, injurydate TEXT, injurytime TEXT, iscurrent INTEGER);');
	db.execute('CREATE TABLE IF NOT EXISTS symptoms(id INTEGER PRIMARY KEY AUTOINCREMENT, injuryid INTEGER, symptomdate TEXT, symptomarea TEXT, symptomdetails TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS impacts(id INTEGER PRIMARY KEY AUTOINCREMENT, injuryid INTEGER, impactdate TEXT, missedwork INTEGER, missedworkdetails TEXT, houseactivities INTEGER, houseactivitydetails TEXT, otherdetails TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS appointments(id INTEGER PRIMARY KEY AUTOINCREMENT, injuryid INTEGER, appointmentdate TEXT, appointmentdoctor TEXT, appointmentreason TEXT, appointmentrecommendation TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS medications(id INTEGER PRIMARY KEY AUTOINCREMENT, injuryid INTEGER, medicationdate TEXT, medicationname TEXT, medicationpurpose TEXT, medicationdosage TEXT, medicationcost REAL, insurancecovered INTEGER);');
	db.execute('CREATE TABLE IF NOT EXISTS expenses(id INTEGER PRIMARY KEY AUTOINCREMENT, injuryid INTEGER, expensedate TEXT, expensename TEXT, expensedetail TEXT, expenseamount REAL, insurancecovered INTEGER);');
	db.execute('CREATE TABLE IF NOT EXISTS settings(name TEXT, value TEXT, description TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS version(versionnumber TEXT, versiondetails TEXT);');

   

	/*
	 * Incase, we decide to use foreign keys, we would use the following create statements
	 * this would also require the addition of the
	 *	db.execute('PRAGMA foreign_keys = ON');
	 * statement after each connection, which seems heavy so we'll wait until foreign keys are default
	 * in SQLite
	 * 
	db.execute('CREATE TABLE IF NOT EXISTS injuries(id INTEGER PRIMARY KEY AUTOINCREMENT, injuryname TEXT, injurydescription TEXT, injurydate TEXT, injurytime TEXT, iscurrent INTEGER);');
	db.execute('CREATE TABLE IF NOT EXISTS symptoms(id INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY(injuryid) REFERENCES injuries(id), symptomdate TEXT, symptomarea TEXT, symptomdetails TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS impacts(id INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY(injuryid) REFERENCES injuries(id), impactdate TEXT, missedwork INTEGER, missedworkdetails TEXT, houseactivities INTEGER, houseactivitydetails TEXT, otherdetails TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS appointments(id INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY(injuryid) REFERENCES injuries(id), appointmentdate TEXT, appointmentdoctor TEXT, appointmentreason TEXT, appointmentrecommendation TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS medications(id INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY(injuryid) REFERENCES injuries(id), medicationdate TEXT, medicationname TEXT, medicationpurpose TEXT, medicationdosage TEXT, medicationcost REAL);');
	db.execute('CREATE TABLE IF NOT EXISTS expenses(id INTEGER PRIMARY KEY AUTOINCREMENT, FOREIGN KEY(injuryid) REFERENCES injuries(id), expensedate TEXT, expensename TEXT, expensedetail TEXT, expenseamount REAL);');
	db.execute('CREATE TABLE IF NOT EXISTS settings(name TEXT, value TEXT, description TEXT);');
	db.execute('CREATE TABLE IF NOT EXISTS version(versionnumber TEXT, versiondetails TEXT);');	
	*/

	db.close();
};


exports.DatabaseInit = DatabaseInit;