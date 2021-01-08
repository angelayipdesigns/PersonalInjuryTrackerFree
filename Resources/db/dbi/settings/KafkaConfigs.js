//KafkaConfigs Component Constructor
function KafkaConfigs (sendToKafkaEnabled, kafkaRestURL, kafkaTopic) {
    this.sendToKafkaEnabled = sendToKafkaEnabled;
    this.kafkaRestURL = kafkaRestURL;
    this.kafkaTopic = kafkaTopic;
}

KafkaConfigs.prototype.getSendToKafkaEnabled = function(){
	return this.sendToKafkaEnabled;
};

KafkaConfigs.prototype.setSendToKafkaEnabled = function(sendToKafkaEnabled){
	return this.sendToKafkaEnabled = sendToKafkaEnabled;
};

KafkaConfigs.prototype.getKafkaRestURL = function(){
	return this.kafkaRestURL;
};

KafkaConfigs.prototype.setKafkaRestURL = function(kafkaRestURL) {
    this.kafkaRestURL = kafkaRestURL;
};

KafkaConfigs.prototype.getKafkaTopic = function(){
	return this.kafkaTopic;
};

KafkaConfigs.prototype.setKafkaTopic = function(kafkaTopic) {
    this.kafkaTopic = kafkaTopic;
};


exports.KafkaConfigs = KafkaConfigs;
