//Version Component Constructor
function Version (versionNumber, versionDetails) {
    this.versionNumber = versionNumber;
    this.versionDetails = versionDetails;
}

Version.prototype.getVersionNumber = function(){
	return this.versionNumber;
};

Version.prototype.setVersionNumber = function(versionNumber) {
    this.versionNumber = versionNumber;
};

Version.prototype.getVersionDetails = function(){
	return this.versionDetails;
};

Version.prototype.setVersionDetails = function(versionDetails) {
    this.versionDetails = versionDetails;
};


exports.Version = Version;