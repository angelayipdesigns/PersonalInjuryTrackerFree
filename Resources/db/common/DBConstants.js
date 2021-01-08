//DBConstants Singleton Constructor
var DBConstants = (function() {

	function PERSONAL_INJURY_TRACKER() {
		return 'PersonalInjuryTracker';
	};

	return {
		PERSONAL_INJURY_TRACKER:PERSONAL_INJURY_TRACKER,
	};
})();

exports.DBConstants = DBConstants;