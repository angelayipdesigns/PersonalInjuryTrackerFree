//SubmitFeedbackView Component Constructor
function SubmitFeedbackView (submitFeedbackWindow, displayValueUtil) {

	var tableView = Ti.UI.createTableView({
		separatorColor: 'transparent',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL									
	});

	var SubmitFeedbackTableData = require('ui/settings/submitfeedback/SubmitFeedbackTableData').SubmitFeedbackTableData;
    var submitFeedbackTableData = new SubmitFeedbackTableData();

	tableView.setData(submitFeedbackTableData.buildTableData(submitFeedbackWindow, displayValueUtil));

	return tableView;
}


exports.SubmitFeedbackView = SubmitFeedbackView;