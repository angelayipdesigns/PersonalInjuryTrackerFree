//CalendarConstants Singleton Constructor
var CalendarConstants = (function() {

	function NUM_ROW_ELEMENTS_ON_CALENDAR_PAGE() {
		return 10;
	};

	function NUM_DAYS_IN_THE_WEEK() {
		return 7;
	};

	return {
		NUM_ROW_ELEMENTS_ON_CALENDAR_PAGE:NUM_ROW_ELEMENTS_ON_CALENDAR_PAGE,
		NUM_DAYS_IN_THE_WEEK:NUM_DAYS_IN_THE_WEEK,
	};
})();

exports.CalendarConstants = CalendarConstants;