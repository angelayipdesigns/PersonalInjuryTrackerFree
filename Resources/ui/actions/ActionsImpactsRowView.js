//ActionsImpactsRowView Component Constructor
function ActionsImpactsRowView (date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var AC = require('ui/actions/ActionsConstants').ActionsConstants;

    var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) 
    					+ displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(AC.NUM_SIMILAR_ROW_ELEMENTS_ON_ACTIONS_PAGE(), true, usedHeight);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var impactsRowView = Titanium.UI.createTableViewRow();

	var impactsLabel = Titanium.UI.createLabel({
		text:'Impacts',
		borderColor: UIC.COLOR_BLUE(),
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: "20dp" },
		height: rowObjectHeightPercent - rowObjectHeightBorderPercent,
		width: displayValueUtil.getAbsoluteWidthLessBoarders(),
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 5,
		top: rowObjectHeightBorderPercent
	});

	impactsRowView.add(impactsLabel);
	
	impactsRowView.addEventListener('click', function() {
   		executeClickEvent(date, displayValueUtil);
	});
	
	return impactsRowView;
}

function executeClickEvent(date, displayValueUtil) {
	var ImpactsWindow = require('ui/impacts/ImpactsWindow').ImpactsWindow;
    var impactsWindow = new ImpactsWindow(date, displayValueUtil);
    impactsWindow.open();
}

exports.ActionsImpactsRowView = ActionsImpactsRowView;