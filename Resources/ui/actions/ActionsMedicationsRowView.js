//ActionsMedicationsRowView Component Constructor
function ActionsMedicationsRowView (date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var AC = require('ui/actions/ActionsConstants').ActionsConstants;

    var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) 
    					+ displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(AC.NUM_SIMILAR_ROW_ELEMENTS_ON_ACTIONS_PAGE(), true, usedHeight);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var medicationsRowView = Titanium.UI.createTableViewRow();

	var medicationsLabel = Titanium.UI.createLabel({
		text:'Medications',
		borderColor: UIC.COLOR_GREEN(),
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: "20dp" },
		height: rowObjectHeightPercent - rowObjectHeightBorderPercent,
		width: displayValueUtil.getAbsoluteWidthLessBoarders(),
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 5,
		top: rowObjectHeightBorderPercent
	});
	
	medicationsRowView.add(medicationsLabel);
	
	medicationsRowView.addEventListener('click', function() {
   		executeClickEvent(date, displayValueUtil);
	});
	
	return medicationsRowView;
}

function executeClickEvent(date, displayValueUtil) {
	var MedicationsWindow = require('ui/medications/MedicationsWindow').MedicationsWindow;
    var medicationsWindow = new MedicationsWindow(date, displayValueUtil);
    medicationsWindow.open();
}

exports.ActionsMedicationsRowView = ActionsMedicationsRowView;