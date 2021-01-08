//WeeksViewSection Component Constructor
function WeeksViewSection(monthYear, displayValueUtil) {
	var CC = require('ui/calendar/CalendarConstants').CalendarConstants;
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	var weeksViewSection = Ti.UI.createTableViewSection();
	
	var DAYS_OF_THE_WEEK = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
	var NUM_ROWS_IN_CALENDAR = 6;

	var rowObjectHeightPercent = displayValueUtil.getRelativeHeight(5, true);
	var rowObjectWidthPercent = displayValueUtil.getProportionalObjectWidth(CC.NUM_DAYS_IN_THE_WEEK(), true);
	var rowObjectWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var daysOfTheWeekRow = Titanium.UI.createTableViewRow();

	for (var i = 0; i < CC.NUM_DAYS_IN_THE_WEEK(); i++) {
		var dayLabel = Titanium.UI.createLabel({
			color: '#000000',
			font: { fontSize: UIC.FIELD_FONT_SIZE() },
			text:DAYS_OF_THE_WEEK[i],
   			left: (rowObjectWidthBorderPercent + i*rowObjectWidthPercent),
   			textAlign:'center',
   			width: rowObjectWidthPercent,
   			height: rowObjectHeightPercent
		});
		daysOfTheWeekRow.add(dayLabel);
	}
	weeksViewSection.add(daysOfTheWeekRow);

	var currentMonth = monthYear.getMonth();
	var currentYear = monthYear.getYear();

	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	var injuryId = currentInjuryCache.getCurrentId();
	var injuryDateStr = currentInjuryCache.getCurrentDateStr();
	
	//Titanium.API.info("Current injury id: " + injuryId + ", date: " +  injuryDateStr);

	var numDaysInMonth = daysInMonth(currentMonth, currentYear);
	var firstDayOfTheWeekInMonth = firstDayOfTheMonth(currentMonth, currentYear);

	var SymptomsDBI = require('db/dbi/symptoms/SymptomsDBI').SymptomsDBI;
    var symptomsDBI = new SymptomsDBI();
    var symptomsExist = symptomsDBI.getExistsArrayByInjuryIdByMonthYear(injuryId, monthYear, numDaysInMonth);

	var ImpactsDBI = require('db/dbi/impacts/ImpactsDBI').ImpactsDBI;
    var impactsDBI = new ImpactsDBI();
	var impactExists = impactsDBI.getExistsArrayByInjuryIdByMonthYear(injuryId, monthYear, numDaysInMonth);
	
	var AppointmentsDBI = require('db/dbi/appointments/AppointmentsDBI').AppointmentsDBI;
    var appointmentsDBI = new AppointmentsDBI();
	var apptsExist = appointmentsDBI.getExistsArrayByInjuryIdByMonthYear(injuryId, monthYear, numDaysInMonth);
	
	var MedicationsDBI = require('db/dbi/medications/MedicationsDBI').MedicationsDBI;
    var medicationsDBI = new MedicationsDBI();
	var medicationsExist = medicationsDBI.getExistsArrayByInjuryIdByMonthYear(injuryId, monthYear, numDaysInMonth);
	
	var ExpensesDBI = require('db/dbi/expenses/ExpensesDBI').ExpensesDBI;
    var expensesDBI = new ExpensesDBI();
	var expensesExist = expensesDBI.getExistsArrayByInjuryIdByMonthYear(injuryId, monthYear, numDaysInMonth);

	var CalendarButton = require('ui/calendar/CalendarButton').CalendarButton;
	var EmptyCalendarButton = require('ui/calendar/EmptyCalendarButton').EmptyCalendarButton;
	
	for (var i = 0; i < NUM_ROWS_IN_CALENDAR; i++) {
    	var tableRow = Ti.UI.createTableViewRow();
    	for (var j=0; j < CC.NUM_DAYS_IN_THE_WEEK(); j++) {
    		//var calendarCellNumber = i*NUM_ROWS_IN_CALENDAR + j;
    		//		subtract the first day of the week in month - the first isn't always monday!
    		//		add 1, since we don't use 0 (zero in a calendar)
    		var currentDayNumber = (i*CC.NUM_DAYS_IN_THE_WEEK() + j) - firstDayOfTheWeekInMonth + 1;
    		
    		if (i==0 && j < firstDayOfTheWeekInMonth) {
    			var button = new EmptyCalendarButton(j, displayValueUtil);
    		}
    		else if (currentDayNumber > numDaysInMonth){
    			var button = new EmptyCalendarButton(j, displayValueUtil);
    		}
    		else {
    			var DayMarkers = require('ui/beans/DayMarkers').DayMarkers;
    			var dayMarkers = new DayMarkers(symptomsExist[currentDayNumber], impactExists[currentDayNumber], apptsExist[currentDayNumber], 
    											medicationsExist[currentDayNumber], expensesExist[currentDayNumber]);
    			
				var date = new Date(currentYear, currentMonth, currentDayNumber);
				var dateStr = (currentMonth+1) + '-' + currentDayNumber + '-' + currentYear;
				if (dateStr == injuryDateStr) {
    				var button = new CalendarButton(date, j, displayValueUtil, true, dayMarkers);
    			}
    			else {
    				var button = new CalendarButton(date, j, displayValueUtil, false, dayMarkers);
    			}
    		}
    		
    		tableRow.add(button);
    	}
    	weeksViewSection.add(tableRow);
	}
	
	var startx;
	var endx;
	var isTouched = false;
	var rowObjectWidthPercent = displayValueUtil.getRelativeWidth(10);
	
	weeksViewSection.addEventListener('touchstart', function(e) {
		startx = e.x;
		isTouched = true;
	});
	
	weeksViewSection.addEventListener('touchmove', function(e) {
		endx = e.x;
		if (isTouched) {
			if (startx - endx > rowObjectWidthPercent) {
				monthYear.incrementMonth();
				Ti.App.fireEvent('updateCalendarTable');
				isTouched = false;
			}
					endx = e.x;
			if (endx - startx > rowObjectWidthPercent) {
				monthYear.decrementMonth();
				Ti.App.fireEvent('updateCalendarTable');
				isTouched = false;
			}
		}
	});
	
	weeksViewSection.addEventListener('touchend', function(e) {
    	isTouched = false;
	});
	
	return weeksViewSection;
}

function daysInMonth(month, year)  {
	return 32 - new Date(year, month, 32).getDate();
}

function firstDayOfTheMonth(month, year) {
	var firstOfTheMonth = new Date(year, month, 1);
	return firstOfTheMonth.getDay();
}

exports.WeeksViewSection = WeeksViewSection;