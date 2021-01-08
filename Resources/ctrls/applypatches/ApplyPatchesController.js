//ApplyPatchesController Component Constructor
function ORIGINAL_VERSION_NUMBER() {
	return '1.0';
}
function ORIGINAL_VERSION_DETAILS() {
	return 'None';
}
function CURRENT_VERSION_NUMBER() {
	return '1.0';
}
function ApplyPatchesController () {
}

//At this time, we only store the major.minor value for the version, rather
//than the major.minor.patch verison we use for publishing the application.
//Any database changes require at least an increment to the minor version.
ApplyPatchesController.prototype.applyPatches = function() {
	
	var VersionDBI = require('db/dbi/version/VersionDBI').VersionDBI;
	var versionDBI = new VersionDBI();
	
	//This is a float value 
	var versionNumber = parseFloat(versionDBI.getVersion().getVersionNumber());

    versionNumber = apply11Patches(versionDBI, versionNumber);

};

function apply11Patches(versionDBI, currentVersionNumber) {
	var DBC = require('db/common/DBConstants').DBConstants;
	var patchVersionNumber = 1.1;
	
	if (currentVersionNumber < patchVersionNumber) {
		Ti.API.info("Applying 1.1 patches");
		
		var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	    db.execute('ALTER TABLE appointments ADD column appointmentmileage REAL');
		db.close();
	    versionDBI.updateVersionNumber(patchVersionNumber.toString());
	    return patchVersionNumber;
	}
	
	return currentVersionNumber;
}


exports.ApplyPatchesController = ApplyPatchesController;