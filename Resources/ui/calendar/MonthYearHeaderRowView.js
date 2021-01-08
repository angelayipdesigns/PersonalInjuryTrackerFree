function MONTHS_IN_THE_YEAR() {
	var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	return months;
}

//MonthYearHeaderRowView Component Constructor
function MonthYearHeaderRowView (monthYear, displayValueUtil) {
	var CC = require('ui/calendar/CalendarConstants').CalendarConstants;
	
	var rowObjectHeightPercent = displayValueUtil.getProportionalObjectHeight(CC.NUM_ROW_ELEMENTS_ON_CALENDAR_PAGE(), true);
	var rowObjectWidthPercent = displayValueUtil.getRelativeWidth(12);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();
	var rowObjectWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();
	
	var headerViewRow = Titanium.UI.createTableViewRow();
	
	var lastYearButton = Titanium.UI.createButton({
   		backgroundImage:'/images/backward.png',
   		backgroundSelectedImage: '/images/backward_selected.png',
		height: rowObjectHeightPercent - 7*rowObjectHeightBorderPercent,
		width: rowObjectWidthPercent,
 		left: rowObjectWidthBorderPercent,
		top: rowObjectHeightBorderPercent
	});

	lastYearButton.addEventListener('click', function() {
		monthYear.decrementYear();
		Ti.App.fireEvent('updateCalendarTable');
	}); 

	var lastMonthButton = Titanium.UI.createButton({
   		backgroundImage:'/images/play_back.png',
   		backgroundSelectedImage: '/images/play_back_selected.png',
		height: rowObjectHeightPercent - 7*rowObjectHeightBorderPercent,
		width: rowObjectWidthPercent,
 		left: rowObjectWidthPercent + rowObjectWidthBorderPercent,
		top: rowObjectHeightBorderPercent
	});

	lastMonthButton.addEventListener('click', function() {
		monthYear.decrementMonth();
		Ti.App.fireEvent('updateCalendarTable');
	});

	var nextMonthButton = Titanium.UI.createButton({
   		backgroundImage:'/images/play.png',
   		backgroundSelectedImage: '/images/play_selected.png',
		height: rowObjectHeightPercent - 7*rowObjectHeightBorderPercent,
		width: rowObjectWidthPercent,
 		right: rowObjectWidthPercent + rowObjectWidthBorderPercent,
		top: rowObjectHeightBorderPercent
	});

	nextMonthButton.addEventListener('click', function() {
		monthYear.incrementMonth();
		Ti.App.fireEvent('updateCalendarTable');
	});

	var nextYearButton = Titanium.UI.createButton({
   		backgroundImage:'/images/forward.png',
   		backgroundSelectedImage: '/images/forward_selected.png',
		height: rowObjectHeightPercent - 7*rowObjectHeightBorderPercent,
		width: rowObjectWidthPercent,
 		right: rowObjectWidthBorderPercent,
		top: rowObjectHeightBorderPercent
	});

	nextYearButton.addEventListener('click', function() {
		monthYear.incrementYear();
		Ti.App.fireEvent('updateCalendarTable');
	}); 

	var monthYearLabel = Titanium.UI.createLabel({
		text:MONTHS_IN_THE_YEAR()[monthYear.getMonth()] + ' ' + monthYear.getYear(),
		color: '#000000',
		font: { fontSize: "16dp"},
		height: rowObjectHeightPercent - 7*rowObjectHeightBorderPercent,
		width: 'auto',
		textAlign:'center',
		top: rowObjectHeightBorderPercent
	});
	
	headerViewRow.add(lastYearButton);
	headerViewRow.add(lastMonthButton);
	headerViewRow.add(monthYearLabel);
	headerViewRow.add(nextMonthButton);
	headerViewRow.add(nextYearButton);
	
	return headerViewRow;
}


exports.MonthYearHeaderRowView = MonthYearHeaderRowView;