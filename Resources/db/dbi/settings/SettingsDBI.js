function SETTINGS() {
	return 'settings';
}
function NAME() {
	return 'name';
}
function VALUE() {
	return 'value';
}
function DESCRIPTION() {
	return 'description';
}

//SettingsDBI Component Constructor
function SettingsDBI () {
}

function getDefaultSettingFromName(name) {
	var Setting = require('db/dbi/settings/Setting').Setting;

    switch (name) {
    	case "SaveSpreadsheetPath":
    	    var SaveSpreadsheetUtil = require('infra/savespreadsheetutil/SaveSpreadsheetUtil').SaveSpreadsheetUtil;
		    var saveSpreadsheetUtil = new SaveSpreadsheetUtil();
		    var defaultSaveSpreadsheetPath = saveSpreadsheetUtil.getDefaultPath();
		    var setting = new Setting('SaveSpreadsheetPath', defaultSaveSpreadsheetPath, 'Path to save spreadsheet');
		    return setting;
		case "EmailSpreadsheetAddress":
		    var setting = new Setting('EmailSpreadsheetAddress', 'you@domainname.com', 'Email address to send spreadsheet');
		    return setting;
		case "EmailFeedbackAddress":
		    var setting = new Setting('EmailFeedbackAddress', 'angelayipdesigns@gmail.com', 'Email address to send feedback');
		    return setting;
		case 'MileageUnit':
		    var setting = new Setting('MileageUnit', 'km', 'The unit to use for expensible mileage');
		    return setting;
		case 'MileageAmount':
		    var setting = new Setting('MileageAmount', '4.50', 'The expensible amount per mileage unit');
		    return setting;
		case 'SendToKafka':
				var setting = new Setting('SendToKafka', 'false', 'Send save events to Kafka instance');
				return setting;
		case 'KafkaRestURL':
				var setting = new Setting('KafkaRestURL', 'https://<somehost>:<port>', 'The coordinates of the kafka-rest app');
				return setting;
		case 'KafkaTopic':
				var setting = new Setting('KafkaTopic', 'someTopic', 'The Kafka topic to use');
				return setting;
		default:
		    //do nothing for now
    }
}

SettingsDBI.prototype.getSettingValueByName = function(name) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var Setting = require('db/dbi/settings/Setting').Setting;
	var fetchedSettingValue;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var settingRS = db.execute('SELECT ' + NAME() + ', ' + VALUE() +
								' FROM '+ SETTINGS() + ' WHERE ' + NAME() + ' = ?', name);
	if (settingRS.isValidRow()) {
		var fetchedSettingName = settingRS.fieldByName(NAME());
		fetchedSettingValue = settingRS.fieldByName(VALUE());

		Ti.API.info("Fetched setting:  name: " + fetchedSettingName + ", value: " + fetchedSettingValue);
	}
	settingRS.close();
	db.close();

	//The setting wasn't found, try the default value
	if (!fetchedSettingValue) {
		self = this;
		var setting = getDefaultSettingFromName(name);
		this.insertSetting(setting);
		fetchedSettingValue = setting.getValue();
	}

	return fetchedSettingValue;
};

SettingsDBI.prototype.getSettingByName = function(name) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var Setting = require('db/dbi/settings/Setting').Setting;
	var setting;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var settingRS = db.execute('SELECT ' + ' , ' + NAME() + ', ' + VALUE() + ', ' + DESCRIPTION() +
								' FROM '+ SETTINGS() + ' WHERE ' + NAME() + ' = ?', name);
	if (settingRS.isValidRow()) {
		var fetchedSettingName = settingRS.fieldByName(NAME());
		var fetchedSettingValue = settingRS.fieldByName(VALUE());
		var fetchedSettingDescription = settingRS.fieldByName(DESCRIPTION());

		Ti.API.info("Fetched setting:  name: " + fetchedSettingName +
											", value: " + fetchedSettingValue + ", description: " + fetchedSettingDescription);

		setting = new Setting(fetchedSettingId, fetchedSettingName, fetchedSettingValue, fetchedSettingDescription);
	}
	settingRS.close();
	db.close();

	return setting;
};

SettingsDBI.prototype.updateSettingValueByName = function(name, value) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('UPDATE ' + SETTINGS() + ' SET ' + VALUE() + ' = ? WHERE '
					+ NAME() + ' = ?', value, name);
	db.close();
};

SettingsDBI.prototype.updateSettingByName = function(setting) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('UPDATE ' + SETTINGS() + ' SET ' + VALUE() + ' = ?, ' + DESCRIPTION() + ' = ? WHERE '
					+ NAME() + ' = ?', setting.getValue(), setting.getDescription(), setting.getName());
	db.close();
};

SettingsDBI.prototype.insertSetting = function(setting) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('INSERT INTO ' + SETTINGS() + ' (' + NAME() + ', ' + VALUE() + ', ' + DESCRIPTION() +
							') VALUES (?, ?, ?)', setting.getName(), setting.getValue(), setting.getDescription());
	db.close();
};


exports.SettingsDBI = SettingsDBI;
