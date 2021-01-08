//SubmitFeedbackButtonRowView Component Constructor
function SubmitFeedbackButtonRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	this.submitFeedbackButtonRowView = Titanium.UI.createTableViewRow();

	var buttonHeight = displayValueUtil.getRelativeHeight(10);
	var buttonWidth = displayValueUtil.getRelativeWidth(40);
	var borderWidth = displayValueUtil.getRelativeBoarderSize();

	var fSize = UIC.FIELD_FONT_SIZE()
  if (Titanium.Platform.name == 'android') {
		var fSize = UIC.ANDROID_BUTTON_FONT_SIZE()
	}

	this.submitFeedbackButton = Titanium.UI.createButton({
		title: 'Submit Feedback',
		height: buttonHeight,
		width: buttonWidth,
		left: borderWidth,
		top: borderWidth,
		font: { fontSize: fSize },
		color: '#000000',
		borderColor: '#000000',
		borderRadius: 5,
	});

	this.submitFeedbackButtonRowView.add(this.submitFeedbackButton);
}

SubmitFeedbackButtonRowView.prototype.getSubmitFeedbackButtonRowView = function(){
	return this.submitFeedbackButtonRowView;
};

SubmitFeedbackButtonRowView.prototype.getSubmitFeedbackButton = function(){
	return this.submitFeedbackButton;
};


exports.SubmitFeedbackButtonRowView = SubmitFeedbackButtonRowView;
