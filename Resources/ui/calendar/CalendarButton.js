//CalendarButton Component Constructor
function CalendarButton (date, rowIndex, displayValueUtil, isInjuryDate, dayMarkers) {
	var CC = require('ui/calendar/CalendarConstants').CalendarConstants;
	var UIC = require('ui/common/UIConstants').UIConstants;

	var rowObjectHeightPercent = displayValueUtil.getProportionalObjectHeight(CC.NUM_ROW_ELEMENTS_ON_CALENDAR_PAGE(), true);
	var rowObjectWidthPercent = displayValueUtil.getProportionalObjectWidth(CC.NUM_DAYS_IN_THE_WEEK(), true);
	var rowObjectWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var day = date.getDate();
	var dayText = day.toString();

	var buttonView = Titanium.UI.createView({
		borderColor: '#000000',
  		borderWidth: 2,
		left: (rowObjectWidthBorderPercent + rowIndex*rowObjectWidthPercent),
		width: rowObjectWidthPercent,
		height: rowObjectHeightPercent
	});

	var dayLabelWidth = rowObjectWidthPercent/2;
	var dayLabelHeight = rowObjectHeightPercent/2;


	var dayLabel;
	var today = new Date();	
	if (today.getDate() == date.getDate() && today.getMonth() == date.getMonth() &&
		today.getFullYear() == date.getFullYear()) {
		var dayLabel = Titanium.UI.createLabel({
			text: dayText,
			color: '#000000',
			font: { fontSize: (UIC.FIELD_BIG_FONT_SIZE()), fontWeight: 'bold'},
			width: dayLabelWidth,
			height: dayLabelHeight,
			left: 0,
			top: 0,
			textAlign: 'center'
		});
	}
	else {
		var dayLabel = Titanium.UI.createLabel({
			text: dayText,
			color: '#000000',
			font: { fontSize: UIC.FIELD_FONT_SIZE()},
			width: dayLabelWidth,
			height: dayLabelHeight,
			left: 0,
			top: 0,
			textAlign: 'center'
		});
	}
	
	buttonView.add(dayLabel);
	
	if (isInjuryDate) {
		var starImageView = Ti.UI.createImageView({
			image:'/images/star.png',
			height: dayLabelHeight,
			width: dayLabelWidth,
			top: dayLabelHeight,
			left: 0
		});
		buttonView.add(starImageView);
	}

	//marker properties
	var markerWidth = rowObjectWidthPercent/3;
	var markerHeight = rowObjectHeightPercent/5;
	var markerLeft = 2*rowObjectWidthPercent/3;
	var markerTop = 0;

	//symptoms marker
	if (dayMarkers.getSymptomExists()) {	
		var symptomMarker = createMarker(markerHeight, markerWidth, markerLeft, markerTop, UIC.COLOR_RED());
		markerTop = markerHeight;
		buttonView.add(symptomMarker);
	}
	
	//impacts marker
	if (dayMarkers.getImpactExists()) {	
		var impactMarker = createMarker(markerHeight, markerWidth, markerLeft, markerTop, UIC.COLOR_BLUE());
		markerTop += markerHeight;
		buttonView.add(impactMarker);
	}

	//appointment marker
	if (dayMarkers.getAppointmentExists()) {	
		var appointmentMarker = createMarker(markerHeight, markerWidth, markerLeft, markerTop, UIC.COLOR_ORANGE());
		markerTop += markerHeight;
		buttonView.add(appointmentMarker);
	}

	//medication marker
	if (dayMarkers.getMedicationExists()) {	
		var medicationMarker = createMarker(markerHeight, markerWidth, markerLeft, markerTop, UIC.COLOR_GREEN());
		markerTop += markerHeight;
		buttonView.add(medicationMarker);
	}

	//expenses marker
	if (dayMarkers.getExpenseExists()) {	
		var expensesMarker = createMarker(markerHeight, markerWidth, markerLeft, markerTop, UIC.COLOR_PURPLE());
		markerTop += markerHeight;
		buttonView.add(expensesMarker);
	}
	
	//empty white marker, to fill the column correctly - to solve some bizarre behavior that appeared with iOS sdk 7
	var remainingDayMarkerWhitespace = rowObjectHeightPercent - markerTop;
	//the value 1 is used here, since 0 might be too small - not accounting for small rounding precions
	if (markerTop > 0 && remainingDayMarkerWhitespace > 1) {
		var whitespaceMarker = createMarker(remainingDayMarkerWhitespace, markerWidth, markerLeft, markerTop, UIC.COLOR_WHITE());
		buttonView.add(whitespaceMarker);
	}

	buttonView.addEventListener('click', function(e) {
   		executeClickEvent(e, date, displayValueUtil);
	});

	return buttonView;
}

function executeClickEvent(e, date, displayValueUtil) {
	var ActionsWindow = require('ui/actions/ActionsWindow').ActionsWindow;
    var actionsWindow = new ActionsWindow(date, displayValueUtil);
    actionsWindow.open();
}

function createMarker(height, width, left, top, color) {
	var marker = Titanium.UI.createLabel({
		backgroundColor: color,
		width: width,
		height: height,
		left: left,
		top: top,
	});
	return marker;
}

exports.CalendarButton = CalendarButton;