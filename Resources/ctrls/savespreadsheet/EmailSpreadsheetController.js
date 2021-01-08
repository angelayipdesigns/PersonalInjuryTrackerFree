//EmailSpreadsheetController Component Constructor
function EmailSpreadsheetController (email, filename) {
	this.email = email;
	this.filename = filename;
	this.errorMessage;
}

EmailSpreadsheetController.prototype.emailSpreadsheet = function() {
	
	var SaveSpreadsheetUtil = require('infra/savespreadsheetutil/SaveSpreadsheetUtil').SaveSpreadsheetUtil;
	var saveSpreadsheetUtil = new SaveSpreadsheetUtil();
	var path = saveSpreadsheetUtil.getTempPath();
	var filePrefix = saveSpreadsheetUtil.filePrefix();
	
	var SaveSpreadsheetController = require('ctrls/savespreadsheet/SaveSpreadsheetController').SaveSpreadsheetController;
	var saveSpreadsheetController = new SaveSpreadsheetController(path, this.filename);
	var saveSpreadsheetMessage = saveSpreadsheetController.saveSpreadsheet();
	
	if (!saveSpreadsheetController.getReturnCode()) {
		this.errorMessage = saveSpreadsheetMessage;
		return false;
	}

	//save spreadsheet was successful, continue
	try {
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.subject = "Personal Injury Spreadsheet";
		emailDialog.toRecipients = [this.email];
		emailDialog.messageBody = 'Please find attached a copy of my personal injury spreadsheet.';
		var file = Ti.Filesystem.getFile(filePrefix + path, this.filename);
		emailDialog.addAttachment(file);
		emailDialog.open();	
	}
	catch (e) {
		var fullFilePath = saveSpreadsheetController.buildFullFilePath(path, this.filename);
		Ti.API.info("An error occurred emailing the spreadsheet " + fullFilePath);
		Ti.API.info(e.message);
		
		this.errorMessage = "An error occurred emailing the spreadsheet.  Local path of file was " + fullFilePath;
		return false;
	}
	
	return true;
};

EmailSpreadsheetController.prototype.getErrorMessage = function() {
	return this.errorMessage;
};

exports.EmailSpreadsheetController = EmailSpreadsheetController;