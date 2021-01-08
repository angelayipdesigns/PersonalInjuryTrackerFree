//KafkaConfigsEmailButtonRowView Component Constructor
function KafkaConfigsEmailButtonRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	this.kafkaConfigsEmailButtonRowView = Titanium.UI.createTableViewRow();

	var buttonHeight = displayValueUtil.getRelativeHeight(10);
	var buttonWidth = displayValueUtil.getRelativeWidth(40);
	var borderWidth = displayValueUtil.getRelativeBoarderSize();

	this.kafkaConfigsEmailButton = Titanium.UI.createButton({
		title: 'Email Spreadsheet',
		height: buttonHeight,
		width: buttonWidth,
		left: borderWidth,
		top: borderWidth,
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		color: '#000000',
		borderColor: '#000000',
		borderRadius: 5,
	});

	this.kafkaConfigsEmailButtonRowView.add(this.kafkaConfigsEmailButton);
}

KafkaConfigsEmailButtonRowView.prototype.getKafkaConfigsEmailButtonRowView = function(){
	return this.kafkaConfigsEmailButtonRowView;
};

KafkaConfigsEmailButtonRowView.prototype.getKafkaConfigsEmailButton = function(){
	return this.kafkaConfigsEmailButton;
};


exports.KafkaConfigsEmailButtonRowView = KafkaConfigsEmailButtonRowView;
