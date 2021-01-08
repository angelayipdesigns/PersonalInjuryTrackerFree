//SettingsSubmitFeedbackRowView Component Constructor
function SettingsSubmitFeedbackRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var SC = require('ui/settings/SettingsConstants').SettingsConstants;

    var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) 
    					+ displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(SC.NUM_SIMILAR_ROW_ELEMENTS_ON_SETTINGS_PAGE(), true, usedHeight);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var submitFeedbackRowView = Titanium.UI.createTableViewRow();

	var submitFeedbackLabel = Titanium.UI.createLabel({
		text:'Submit Feedback',
		borderColor: UIC.COLOR_LIGHT_GREY(),
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: "20dp" },
		height: rowObjectHeightPercent - rowObjectHeightBorderPercent,
		width: displayValueUtil.getAbsoluteWidthLessBoarders(),
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 5,
		top: rowObjectHeightBorderPercent
	});

	submitFeedbackRowView.add(submitFeedbackLabel);
	
	submitFeedbackRowView.addEventListener('click', function() {
   		executeClickEvent(displayValueUtil);
	});
	
	return submitFeedbackRowView;
}

function executeClickEvent(displayValueUtil) {
	var SubmitFeedbackWindow = require('ui/settings/submitfeedback/SubmitFeedbackWindow').SubmitFeedbackWindow;
    var submitFeedbackWindow = new SubmitFeedbackWindow(displayValueUtil);
    submitFeedbackWindow.open();
}

exports.SettingsSubmitFeedbackRowView = SettingsSubmitFeedbackRowView;