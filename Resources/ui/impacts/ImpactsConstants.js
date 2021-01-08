//ImpactsConstants Singleton Constructor
var ImpactsConstants = (function() {

	function TEXT_FIELD_LABEL_HEIGHT_PERCENT() {
		return 5;
	};

	function TWO_LINE_TEXT_FIELD_LABEL_HEIGHT_PERCENT() {
		return 7;
	};

	return {
		TEXT_FIELD_LABEL_HEIGHT_PERCENT:TEXT_FIELD_LABEL_HEIGHT_PERCENT,
		TWO_LINE_TEXT_FIELD_LABEL_HEIGHT_PERCENT:TWO_LINE_TEXT_FIELD_LABEL_HEIGHT_PERCENT,
	};
})();

exports.ImpactsConstants = ImpactsConstants;