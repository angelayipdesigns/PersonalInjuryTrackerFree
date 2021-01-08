//MedicationsConstants Singleton Constructor
var MedicationsConstants = (function() {

	function TEXT_FIELD_LABEL_HEIGHT_PERCENT() {
		return 5;
	};

	function DOLLAR_SIGN_LABEL_WIDTH() {
		return 25;
	}

	return {
		TEXT_FIELD_LABEL_HEIGHT_PERCENT:TEXT_FIELD_LABEL_HEIGHT_PERCENT,
		DOLLAR_SIGN_LABEL_WIDTH:DOLLAR_SIGN_LABEL_WIDTH,
	};
})();

exports.MedicationsConstants = MedicationsConstants;