//KafkaConfigsEmailRowView Component Constructor
function KafkaConfigsEmailRowView (displayValueUtil) {
	var SSC = require('ui/settings/savespreadsheet/KafkaConfigsConstants').KafkaConfigsConstants;

	this.kafkaConfigsEmailRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(SSC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var kafkaConfigsEmailLabel = new TextFieldLabel(displayValueUtil, 'Destination Email Address:', textFieldLabelHeight);

	this.kafkaConfigsEmailRowView.add(kafkaConfigsEmailLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.kafkaConfigsEmailTextField = new StandardTextField(displayValueUtil, 'Email Address where spreadsheet will be sent', textFieldLabelHeight);

	this.kafkaConfigsEmailRowView.add(this.kafkaConfigsEmailTextField);
	this.kafkaConfigsEmailTextField.blur();
}

KafkaConfigsEmailRowView.prototype.getKafkaConfigsEmailRowView = function(){
	return this.kafkaConfigsEmailRowView;
};

KafkaConfigsEmailRowView.prototype.getKafkaConfigsEmailTextField = function(){
	return this.kafkaConfigsEmailTextField.value;
};

KafkaConfigsEmailRowView.prototype.setKafkaConfigsEmailTextField = function(kafkaConfigsEmail){
	this.kafkaConfigsEmailTextField.value = kafkaConfigsEmail;
};


exports.KafkaConfigsEmailRowView = KafkaConfigsEmailRowView;
