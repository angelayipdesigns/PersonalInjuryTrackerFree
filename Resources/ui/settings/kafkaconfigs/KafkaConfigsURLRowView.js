//KafkaConfigsURLRowView Component Constructor
function KafkaConfigsURLRowView (displayValueUtil) {
	var KCC = require('ui/settings/kafkaconfigs/KafkaConfigsConstants').KafkaConfigsConstants;

	this.urlRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(KCC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
  var textFieldValueLabel = new TextFieldLabel(displayValueUtil, 'URL of Kafka-rest:', textFieldLabelHeight);

	this.urlRowView.add(textFieldValueLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.textField = new StandardTextField(displayValueUtil, 'http://<somehost.or.ip>:8082', textFieldLabelHeight);

	this.urlRowView.add(this.textField);
	this.textField.blur();
}

KafkaConfigsURLRowView.prototype.getKafkaConfigsURLRowView = function(){
	return this.urlRowView;
};

KafkaConfigsURLRowView.prototype.getTextFieldValue = function(){
	return this.textField.value;
};

KafkaConfigsURLRowView.prototype.setTextFieldValue = function(textFieldValue){
	this.textField.value = textFieldValue;
};


exports.KafkaConfigsURLRowView = KafkaConfigsURLRowView;
