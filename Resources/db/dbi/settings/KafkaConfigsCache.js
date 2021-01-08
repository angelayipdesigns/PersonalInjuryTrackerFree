//KafkaConfigsCache Singleton Constructor
var KafkaConfigsCache = (function() {
	var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var KafkaConfigs = require('db/dbi/settings/KafkaConfigs').KafkaConfigs;
	var settingsDBI = new SettingsDBI();
	var kafkaConfigs = new KafkaConfigs(settingsDBI.getSettingValueByName("SendToKafka"),
	                                    settingsDBI.getSettingValueByName("KafkaRestURL"),
	                                    settingsDBI.getSettingValueByName("KafkaTopic"));

	//DON'T call this method from anywhere other than KafkaConfigsTableData
	function setKafkaConfigs(newKafkaConfigs) {
		kafkaConfigs = newKafkaConfigs;
	};

	function getKafkaConfigs() {
		return kafkaConfigs;
	};

	return {
		setKafkaConfigs:setKafkaConfigs,
		getKafkaConfigs:getKafkaConfigs,
	};
})();

exports.KafkaConfigsCache = KafkaConfigsCache;
