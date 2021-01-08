//SubmitFeedbackTableData Component Constructor
function SubmitFeedbackTableData () {
}

SubmitFeedbackTableData.prototype.buildTableData = function(submitFeedbackWindow, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var submitFeedbackHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView('Submit Feedback', '#000000', UIC.COLOR_LIGHT_GREY(), false, false);

	tableData.push(submitFeedbackHeaderRowView);

	var SubmitFeedbackRowView = require('ui/settings/submitfeedback/SubmitFeedbackRowView').SubmitFeedbackRowView;
    var submitFeedbackRowView = new SubmitFeedbackRowView(displayValueUtil);
	tableData.push(submitFeedbackRowView.getSubmitFeedbackRowView());

	var SubmitFeedbackButtonRowView = require('ui/settings/submitfeedback/SubmitFeedbackButtonRowView').SubmitFeedbackButtonRowView;
    var submitFeedbackButtonRowView = new SubmitFeedbackButtonRowView(displayValueUtil);

    submitFeedbackButtonRowView.getSubmitFeedbackButton().addEventListener('click', function() {											
		var EmailFeedbackController = require('ctrls/submitfeedback/EmailFeedbackController').EmailFeedbackController;
		var emailFeedbackController = new EmailFeedbackController(submitFeedbackRowView.getSubmitFeedbackTextArea());
		var returnCode = emailFeedbackController.emailFeedback();
		if (!returnCode) {
			alert(emailFeedbackController.getErrorMessage());
		}
	});

	tableData.push(submitFeedbackButtonRowView.getSubmitFeedbackButtonRowView());	
	
	var TableComponentSeparatorRowView = require('ui/common/components/TableComponentSeparatorRowView').TableComponentSeparatorRowView;
	var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
    tableData.push(tableComponentSeparatorRowView);

	var buttonViewRow = Titanium.UI.createTableViewRow();	
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		submitFeedbackWindow.close();
		submitFeedbackWindow = null;
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
};


exports.SubmitFeedbackTableData = SubmitFeedbackTableData;