//ActionsExpensesRowView Component Constructor
function ActionsExpensesRowView (date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var AC = require('ui/actions/ActionsConstants').ActionsConstants;

    var usedHeight = displayValueUtil.getRelativeHeight(UIC.RELATIVE_HEADER_ROW_HEIGHT()) 
    					+ displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var rowObjectHeightPercent = displayValueUtil.getRemainingProportionalObjectHeight(AC.NUM_SIMILAR_ROW_ELEMENTS_ON_ACTIONS_PAGE(), true, usedHeight);
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var expensesRowView = Titanium.UI.createTableViewRow();

	var expensesLabel = Titanium.UI.createLabel({
		text:'Expenses',
		borderColor: UIC.COLOR_PURPLE(),
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: "20dp" },
		height: rowObjectHeightPercent - rowObjectHeightBorderPercent,
		width: displayValueUtil.getAbsoluteWidthLessBoarders(),
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 5,
		top: rowObjectHeightBorderPercent
	});
	
	expensesRowView.add(expensesLabel);
	
	expensesRowView.addEventListener('click', function() {
   		executeClickEvent(date, displayValueUtil);
	});
	
	return expensesRowView;
}

function executeClickEvent(date, displayValueUtil) {
	var ExpensesWindow = require('ui/expenses/ExpensesWindow').ExpensesWindow;
    var expensesWindow = new ExpensesWindow(date, displayValueUtil);
    expensesWindow.open();
}

exports.ActionsExpensesRowView = ActionsExpensesRowView;