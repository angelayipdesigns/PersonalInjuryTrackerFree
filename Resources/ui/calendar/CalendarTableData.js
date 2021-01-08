//CalendarTableData Component Constructor
function CalendarTableData () {
}

CalendarTableData.prototype.buildTableData = function(monthYear) {
	var UIC = require('ui/common/UIConstants').UIConstants;

	var tableData = [];

	var DisplayValueUtil = require('ui/common/utils/DisplayValueUtil').DisplayValueUtil;
	var displayValueUtil = new DisplayValueUtil();

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var firstInjuryHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView(UIC.PERSONAL_INJURY_TRACKER(), UIC.COLOR_DARK_GREY(), '#FFFFFF', false, true);
	tableData.push(firstInjuryHeaderRowView);

	var MonthYearHeaderRowView = require('ui/calendar/MonthYearHeaderRowView').MonthYearHeaderRowView;
    var monthYearHeaderRowView = new MonthYearHeaderRowView(monthYear, displayValueUtil);

	tableData.push(monthYearHeaderRowView);

	var date = new Date();

	var WeeksViewSection = require('ui/calendar/WeeksViewSection').WeeksViewSection;
    var weeksViewSection = new WeeksViewSection(monthYear, displayValueUtil);
	
	tableData.push(weeksViewSection);

	var ActionsViewSection = require('ui/calendar/ActionsViewSection').ActionsViewSection;
    var actionsViewSection = new ActionsViewSection(date, displayValueUtil);
	
	tableData.push(actionsViewSection);	

	return tableData;
};


exports.CalendarTableData = CalendarTableData;