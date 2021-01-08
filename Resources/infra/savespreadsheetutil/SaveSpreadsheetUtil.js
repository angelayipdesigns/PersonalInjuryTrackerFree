function ANDROID_EXTERNAL_ATTACHMENTS_DIR() {
	return '/sdcard/Attachments';
}

function EXTERNAL_SAVE_DIR_NAME() {
	return 'PersonalInjuryTrackerReports';
}

function APPDATA_SAVE_DIR_NAME() {
	return 'Reports';
}

//SaveSpreadsheetUtil Component Constructor
function SaveSpreadsheetUtil() {
}

SaveSpreadsheetUtil.prototype.getDefaultPath = function() {
	//var separator = Titanium.Filesystem.getSeparator();
	var self = this;
	
	if (Titanium.Filesystem.isExternalStoragePresent()) {
		var dir = Ti.Filesystem.getFile(self.filePrefix() + ANDROID_EXTERNAL_ATTACHMENTS_DIR(), EXTERNAL_SAVE_DIR_NAME());
		if (!dir.exists()) {
			if (dir.createDirectory()) {
				return (dir.nativePath.substr(self.filePrefixLength()));
			}
		}
		else {
			if (dir.writable) {
				return (dir.nativePath.substr(self.filePrefixLength()));
			}
		}
	}
	
	return self.getTempPath();
};


SaveSpreadsheetUtil.prototype.getTempPath = function() {
	var self = this;
	
	var tempDir = Ti.Filesystem.tempDirectory;
	var dir = Ti.Filesystem.getFile(tempDir, APPDATA_SAVE_DIR_NAME());
	if (!dir.exists()) {
		if (dir.createDirectory()) {
			return (dir.nativePath.substr(self.filePrefixLength()));
		}
	}
	else {
		if (dir.writable) {
			return (dir.nativePath.substr(self.filePrefixLength()));
		}
	}
};

SaveSpreadsheetUtil.prototype.verifyPath = function(path) {
	var self = this;
	
	var dir = Ti.Filesystem.getFile(self.filePrefix() + path);
	if (!dir.exists()) {
		return dir.createDirectory();
	}
	else {
		return dir.writable;
	}
};

SaveSpreadsheetUtil.prototype.filePrefix = function() {
	return 'file://';
};

SaveSpreadsheetUtil.prototype.filePrefixLength = function() {
	var self = this;
	return self.filePrefix().length;
};


exports.SaveSpreadsheetUtil = SaveSpreadsheetUtil;