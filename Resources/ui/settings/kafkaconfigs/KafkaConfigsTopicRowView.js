//KafkaConfigsTopicRowView Component Constructor
function KafkaConfigsTopicRowView (displayValueUtil) {
	var KCC = require('ui/settings/kafkaconfigs/KafkaConfigsConstants').KafkaConfigsConstants;

	this.topicRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(KCC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  var textFieldValueLabel = new TextFieldLabel(displayValueUtil, 'Topic Name:', textFieldLabelHeight);

	this.topicRowView.add(textFieldValueLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
  this.textField = new StandardTextField(displayValueUtil, 'someTopic', textFieldLabelHeight);

	this.topicRowView.add(this.textField);
	this.textField.blur();
}

KafkaConfigsTopicRowView.prototype.getKafkaConfigsTopicRowView = function(){
	return this.topicRowView;
};

KafkaConfigsTopicRowView.prototype.getTextFieldValue = function(){
	return this.textField.value;
};

KafkaConfigsTopicRowView.prototype.setTextFieldValue = function(textFieldValue){
	this.textField.value = textFieldValue;
};

exports.KafkaConfigsTopicRowView = KafkaConfigsTopicRowView;
