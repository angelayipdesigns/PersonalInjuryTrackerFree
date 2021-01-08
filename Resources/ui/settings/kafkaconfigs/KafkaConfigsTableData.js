//KafkaConfigsTableData Component Constructor
function KafkaConfigsTableData () {
}

function SEND_TO_KAFKA_ENABLED() {
	return "SendToKafka";
}

function KAFKA_REST_URL() {
	return "KafkaRestURL";
}

function KAFKA_TOPIC() {
	return "KafkaTopic";
}

KafkaConfigsTableData.prototype.buildTableData = function(kafkaConfigsWindow, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
  var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
  var kafkaConfigsHeaderRowView =
    	appHeaderRowView.getBasicHeaderRowView('Kafka-Rest Configs', '#000000', UIC.COLOR_LIGHT_GREY(), false, false);

	tableData.push(kafkaConfigsHeaderRowView);

	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();

	var sendToKafkaValue = settingsDBI.getSettingValueByName(SEND_TO_KAFKA_ENABLED());
  var KafkaConfigsSendToKafkaRowView = require('ui/settings/kafkaconfigs/KafkaConfigsSendToKafkaRowView').KafkaConfigsSendToKafkaRowView;
  var booleanSendToKafkaValue = (sendToKafkaValue == 'true');
	var kafkaConfigsSendToKafkaRowView = new KafkaConfigsSendToKafkaRowView(displayValueUtil, booleanSendToKafkaValue);
	tableData.push(kafkaConfigsSendToKafkaRowView.getKafkaConfigsSendToKafkaRowView());

  var kafkaRestURLValue = settingsDBI.getSettingValueByName(KAFKA_REST_URL());
	var KafkaConfigsURLRowView = require('ui/settings/kafkaconfigs/KafkaConfigsURLRowView').KafkaConfigsURLRowView;
  var kafkaConfigsURLRowView = new KafkaConfigsURLRowView(displayValueUtil);
	kafkaConfigsURLRowView.setTextFieldValue(kafkaRestURLValue)
	tableData.push(kafkaConfigsURLRowView.getKafkaConfigsURLRowView());

  var kafkaTopicValue = settingsDBI.getSettingValueByName(KAFKA_TOPIC());
  var KafkaConfigsTopicRowView = require('ui/settings/kafkaconfigs/KafkaConfigsTopicRowView').KafkaConfigsTopicRowView;
  var kafkaConfigsTopicRowView = new KafkaConfigsTopicRowView(displayValueUtil);
	kafkaConfigsTopicRowView.setTextFieldValue(kafkaTopicValue)
	tableData.push(kafkaConfigsTopicRowView.getKafkaConfigsTopicRowView());

	var buttonViewRow = Titanium.UI.createTableViewRow();
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();

	var TableComponentSeparatorRowView = require('ui/common/components/TableComponentSeparatorRowView').TableComponentSeparatorRowView;
	var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
  tableData.push(tableComponentSeparatorRowView);

	var buttonViewRow = Titanium.UI.createTableViewRow();
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var ActionButton = require('ui/common/buttons/ActionButton').ActionButton;
  var actionButton = new ActionButton("Test", buttonHeight, buttonWidth, buttonBorderWidth, 0);

	// remove these dev hardcoded values
	//kafkaConfigsURLRowView.setTextFieldValue("https://10.0.0.23:8443");
	//kafkaConfigsURLRowView.setTextFieldValue("http://10.209.32.145:8082");
	//kafkaConfigsTopicRowView.setTextFieldValue("myTopic");

	actionButton.addEventListener('click', function(e) {
	  var urlFieldValue = kafkaConfigsURLRowView.getTextFieldValue();
	  var topicFieldValue = kafkaConfigsTopicRowView.getTextFieldValue();
		var KafkaRestController = require('ctrls/kafkarest/KafkaRestController').KafkaRestController;
    var kafkaRestController = new KafkaRestController(urlFieldValue, topicFieldValue);
    kafkaRestController.listTopics();
	});
	buttonViewRow.add(actionButton);

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
  var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function() {
    var newSendToKafkaValue = kafkaConfigsSendToKafkaRowView.getKafkaConfigsSendToKafka();
		var newSendToKafkaStrValue = 'true';
	  var newKafkaRestURLValue = kafkaConfigsURLRowView.getTextFieldValue();
	  var newTopicValue = kafkaConfigsTopicRowView.getTextFieldValue();

	  if ((kafkaRestURLValue != newKafkaRestURLValue) ||
	      (booleanSendToKafkaValue != newSendToKafkaValue) ||
			  (kafkaTopicValue != newTopicValue)) {
      if (kafkaRestURLValue != newKafkaRestURLValue) {
		    saveKafkaRestURL(newKafkaRestURLValue);
		  }
		  if (booleanSendToKafkaValue != newSendToKafkaValue) {
        if (newSendToKafkaValue) {
          saveSendToKafka(newSendToKafkaStrValue);
			  }
			  else {
					newSendToKafkaStrValue = 'false';
			    saveSendToKafka(newSendToKafkaStrValue);
			  }
		  }
		  if (kafkaTopicValue != newTopicValue) {
		    saveTopic(newTopicValue);
	    }

			var KafkaConfigs = require('db/dbi/settings/KafkaConfigs').KafkaConfigs;
	    var kafkaConfigs = new KafkaConfigs(newSendToKafkaStrValue, newKafkaRestURLValue, newTopicValue);
			var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
			kafkaConfigsCache.setKafkaConfigs(kafkaConfigs);

		  kafkaConfigsWindow.close();
	    kafkaConfigsWindow = null;
    }
	  else {
      kafkaConfigsWindow.close();
		  kafkaConfigsWindow = null;
	  }
	});

	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
  var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		kafkaConfigsWindow.close();
		kafkaConfigsWindow = null;
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
};

function saveKafkaRestURL(newKafkaRestURL) {
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();
	settingsDBI.updateSettingValueByName(KAFKA_REST_URL(), newKafkaRestURL);
}

function saveSendToKafka(newSendToKafkaValue) {
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();
	settingsDBI.updateSettingValueByName(SEND_TO_KAFKA_ENABLED(), newSendToKafkaValue);
}

function saveTopic(newTopicValue) {
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();
	settingsDBI.updateSettingValueByName(KAFKA_TOPIC(), newTopicValue);
}

exports.KafkaConfigsTableData = KafkaConfigsTableData;
