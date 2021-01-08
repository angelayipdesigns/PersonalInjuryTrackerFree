//SubmitFeedbackRowView Component Constructor
function SubmitFeedbackRowView (displayValueUtil) {
	var SSC = require('ui/settings/savespreadsheet/SaveSpreadsheetConstants').SaveSpreadsheetConstants;
	
	this.submitFeedbackRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(SSC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var submitFeedbackLabel = new TextFieldLabel(displayValueUtil, 'Enter your feedback below:', textFieldLabelHeight);
	
	this.submitFeedbackRowView.add(submitFeedbackLabel);

	var StandardTextArea = require('ui/common/entryfields/StandardTextArea').StandardTextArea;
    this.submitFeedbackTextArea = new StandardTextArea(displayValueUtil, 'Type here', textFieldLabelHeight);

	this.submitFeedbackRowView.add(this.submitFeedbackTextArea);
	this.submitFeedbackTextArea.blur();
}

SubmitFeedbackRowView.prototype.getSubmitFeedbackRowView = function(){
	return this.submitFeedbackRowView;
};

SubmitFeedbackRowView.prototype.getSubmitFeedbackTextArea = function(){
	return this.submitFeedbackTextArea.value;
};


exports.SubmitFeedbackRowView = SubmitFeedbackRowView;