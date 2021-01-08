//EmptyCalendarButton Component Constructor
function EmptyCalendarButton(rowIndex, displayValueUtil) {
	var CC = require('ui/calendar/CalendarConstants').CalendarConstants;
	
	var rowObjectHeightPercent = displayValueUtil.getProportionalObjectHeight(CC.NUM_ROW_ELEMENTS_ON_CALENDAR_PAGE(), true);
	var rowObjectWidthPercent = displayValueUtil.getProportionalObjectWidth(CC.NUM_DAYS_IN_THE_WEEK(), true);
	var rowObjectWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var buttonView = Titanium.UI.createView({
		borderColor: '#000000',
  		borderWidth: 2,
		left: (rowObjectWidthBorderPercent + rowIndex*rowObjectWidthPercent),
		width: rowObjectWidthPercent,
		height: rowObjectHeightPercent
	});

	var buttonLabel = Titanium.UI.createLabel({
		text: ' ',
		color: '#000000',
		//font: { fontSize: UIC.FIELD_FONT_SIZE() },
		//left: (rowObjectWidthBorderPercent + rowIndex*rowObjectWidthPercent),
		//width: rowObjectWidthPercent,
		//height: rowObjectHeightPercent,
		width: 'auto',
		height: 'auto',
		textAlign: 'center'
	});
	
	/*
	buttonView.addEventListener('click', function(e) {
   		executeClickEvent(e, date, displayValueUtil);
	});
	*/

	buttonView.add(buttonLabel);

	return buttonView;
}

exports.EmptyCalendarButton = EmptyCalendarButton;