//KafkaConfigsButtonRowView Component Constructor
function KafkaConfigsButtonRowView (displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	this.kafkaConfigsButtonRowView = Titanium.UI.createTableViewRow();

	var buttonHeight = displayValueUtil.getRelativeHeight(10);
	var buttonWidth = displayValueUtil.getRelativeWidth(40);
	var borderWidth = displayValueUtil.getRelativeBoarderSize();

	this.kafkaConfigsButton = Titanium.UI.createButton({
		title: 'Save Spreadsheet',
		height: buttonHeight,
		width: buttonWidth,
		left: borderWidth,
		top: borderWidth,
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		color: '#000000',
		borderColor: '#000000',
		borderRadius: 5,
	});

	this.kafkaConfigsButtonRowView.add(this.kafkaConfigsButton);
}

KafkaConfigsButtonRowView.prototype.getKafkaConfigsButtonRowView = function(){
	return this.kafkaConfigsButtonRowView;
};

KafkaConfigsButtonRowView.prototype.getKafkaConfigsButton = function(){
	return this.kafkaConfigsButton;
};


exports.KafkaConfigsButtonRowView = KafkaConfigsButtonRowView;
