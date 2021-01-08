//EmailFeedbackController Component Constructor

function EMAIL_FEEDBACK_ADDRESS() {
	return 'EmailFeedbackAddress';
}

function EmailFeedbackController (feedback) {
	this.feedback = feedback;
	this.errorMessage;
}

EmailFeedbackController.prototype.emailFeedback = function() {
	try {
		var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
		var settingsDBI = new SettingsDBI();
		
		var emailFeedbackAddress = settingsDBI.getSettingValueByName(EMAIL_FEEDBACK_ADDRESS());
		
		var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.subject = "Personal Injury Tracker Feedback";
		emailDialog.toRecipients = [emailFeedbackAddress];
		emailDialog.messageBody = this.feedback;
		emailDialog.open();	
	}
	catch (e) {
		Ti.API.info("An error occurred emailing the feedback. ");
		Ti.API.info(e.message);
		
		this.errorMessage = "An error occurred emailing the feedback.  Feedback was " + this.feedback;
		return false;
	}
	
	return true;
};

EmailFeedbackController.prototype.getErrorMessage = function() {
	return this.errorMessage;
};


exports.EmailFeedbackController = EmailFeedbackController;