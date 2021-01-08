//KafkaConfigsPathRowView Component Constructor
function KafkaConfigsPathRowView (displayValueUtil) {
	var SSC = require('ui/settings/savespreadsheet/KafkaConfigsConstants').KafkaConfigsConstants;

	this.kafkaConfigsPathRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(SSC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;
    var kafkaConfigsPathLabel = new TextFieldLabel(displayValueUtil, 'Spreadsheet Save Location:', textFieldLabelHeight);

	this.kafkaConfigsPathRowView.add(kafkaConfigsPathLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.kafkaConfigsPathTextField = new StandardTextField(displayValueUtil, 'Location where spreadsheet will be saved', textFieldLabelHeight);

	this.kafkaConfigsPathRowView.add(this.kafkaConfigsPathTextField);
	this.kafkaConfigsPathTextField.blur();
}

KafkaConfigsPathRowView.prototype.getKafkaConfigsPathRowView = function(){
	return this.kafkaConfigsPathRowView;
};

KafkaConfigsPathRowView.prototype.getKafkaConfigsPathTextField = function(){
	return this.kafkaConfigsPathTextField.value;
};

KafkaConfigsPathRowView.prototype.setKafkaConfigsPathTextField = function(kafkaConfigsPath){
	this.kafkaConfigsPathTextField.value = kafkaConfigsPath;
};


exports.KafkaConfigsPathRowView = KafkaConfigsPathRowView;
