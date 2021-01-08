//ActionsSymptomsRowView Component Constructor
function ActionsSymptomsRowView (date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var AC = require('ui/actions/ActionsConstants').ActionsConstants;

    var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) 
    					+ displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(AC.NUM_SIMILAR_ROW_ELEMENTS_ON_ACTIONS_PAGE(), true, usedHeight);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var symptomsRowView = Titanium.UI.createTableViewRow();

	var symptomsLabel = Titanium.UI.createLabel({
		text:'Symptoms',
		borderColor: UIC.COLOR_RED(),
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: "20dp" },
		height: rowObjectHeightPercent - rowObjectHeightBorderPercent,
		width: displayValueUtil.getAbsoluteWidthLessBoarders(),
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 5,
		top: rowObjectHeightBorderPercent
	});

	symptomsRowView.add(symptomsLabel);
	
	symptomsRowView.addEventListener('click', function() {
   		executeClickEvent(date, displayValueUtil);
	});
	
	return symptomsRowView;
}

function executeClickEvent(date, displayValueUtil) {
	var SymptomsWindow = require('ui/symptoms/SymptomsWindow').SymptomsWindow;
    var symptomsWindow = new SymptomsWindow(date, displayValueUtil);
    symptomsWindow.open();
}

exports.ActionsSymptomsRowView = ActionsSymptomsRowView;