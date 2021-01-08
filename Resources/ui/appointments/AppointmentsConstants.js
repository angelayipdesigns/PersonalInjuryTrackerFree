//AppointmentsConstants Singleton Constructor
var AppointmentsConstants = (function() {

	function TEXT_FIELD_LABEL_HEIGHT_PERCENT() {
		return 5;
	};

	function MILEAGE_UNIT_LABEL_WIDTH() {
		return 70;
	};

	return {
		TEXT_FIELD_LABEL_HEIGHT_PERCENT:TEXT_FIELD_LABEL_HEIGHT_PERCENT,
		MILEAGE_UNIT_LABEL_WIDTH:MILEAGE_UNIT_LABEL_WIDTH,
	};
})();

exports.AppointmentsConstants = AppointmentsConstants;