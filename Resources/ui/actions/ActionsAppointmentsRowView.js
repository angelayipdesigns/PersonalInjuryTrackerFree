//ActionsAppointmentsRowView Component Constructor
function ActionsAppointmentsRowView (date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var AC = require('ui/actions/ActionsConstants').ActionsConstants;

    var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) 
    					+ displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(AC.NUM_SIMILAR_ROW_ELEMENTS_ON_ACTIONS_PAGE(), true, usedHeight);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var appointmentsRowView = Titanium.UI.createTableViewRow();

	var appointmentsLabel = Titanium.UI.createLabel({
		text:'Appointments',
		borderColor: UIC.COLOR_ORANGE(),
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: "20dp" },
		height: rowObjectHeightPercent - rowObjectHeightBorderPercent,
		width: displayValueUtil.getAbsoluteWidthLessBoarders(),
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 5,
		top: rowObjectHeightBorderPercent
	});

	appointmentsRowView.add(appointmentsLabel);
	
	appointmentsRowView.addEventListener('click', function() {
   		executeClickEvent(date, displayValueUtil);
	});
	
	return appointmentsRowView;
}

function executeClickEvent(date, displayValueUtil) {
	var AppointmentsWindow = require('ui/appointments/AppointmentsWindow').AppointmentsWindow;
    var appointmentsWindow = new AppointmentsWindow(date, displayValueUtil);
    appointmentsWindow.open();
}


exports.ActionsAppointmentsRowView = ActionsAppointmentsRowView;