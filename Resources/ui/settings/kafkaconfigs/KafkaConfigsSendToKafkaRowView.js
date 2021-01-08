//KafkaConfigsSendToKafkaRowView Component Constructor
function KafkaConfigsSendToKafkaRowView (displayValueUtil, sendToKafka) {
	var KCC = require('ui/settings/kafkaconfigs/KafkaConfigsConstants').KafkaConfigsConstants;

	this.kafkaConfigsSendToKafkaRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(KCC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var CheckBoxFieldLabel = require('ui/common/entryfields/CheckBoxFieldLabel').CheckBoxFieldLabel;

  var kafkaConfigsSendToKafkaLabel = new CheckBoxFieldLabel(displayValueUtil, 'Send Data to Kafka:', textFieldLabelHeight);
	this.kafkaConfigsSendToKafkaRowView.add(kafkaConfigsSendToKafkaLabel);

	var CheckboxButton = require('ui/common/buttons/CheckboxButton').CheckboxButton;
	this.checkboxButton = new CheckboxButton(displayValueUtil, textFieldLabelHeight, sendToKafka);
	this.kafkaConfigsSendToKafkaRowView.add(this.checkboxButton.getButtonDisplayable());
}

KafkaConfigsSendToKafkaRowView.prototype.getKafkaConfigsSendToKafkaRowView = function(){
	return this.kafkaConfigsSendToKafkaRowView;
};

KafkaConfigsSendToKafkaRowView.prototype.getKafkaConfigsSendToKafka = function(){
	return this.checkboxButton.getSelected();
};

KafkaConfigsSendToKafkaRowView.prototype.setKafkaConfigsSendToKafka = function(isSelected){
	this.checkboxButton.setSelected(isSelected);
};



exports.KafkaConfigsSendToKafkaRowView = KafkaConfigsSendToKafkaRowView;
