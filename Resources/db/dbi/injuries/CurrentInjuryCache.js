//CurrentInjuryCache Singleton Constructor
var CurrentInjuryCache = (function() {
	var InjuriesDBI = require('db/dbi/injuries/InjuriesDBI').InjuriesDBI;
	var injuriesDBI = new InjuriesDBI();
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var currentInjury = injuriesDBI.getCurrentInjury();
	var currentInjuryDateStr = dbDateUtil.getDateStringForSelect(currentInjury.getInjuryDate());

	//DON'T call this method from anywhere other than the DBI
	function setCurrent(injury) {
		currentInjury = injury;
		currentInjuryDateStr = dbDateUtil.getDateStringForSelect(currentInjury.getInjuryDate());
	};

	function getCurrentId() {
		return currentInjury.getId();
	};

	function getCurrentDateStr() {
		return currentInjuryDateStr;
	};

	return {
		setCurrent:setCurrent,
		getCurrentId:getCurrentId,
		getCurrentDateStr:getCurrentDateStr,
	};
})();

exports.CurrentInjuryCache = CurrentInjuryCache;