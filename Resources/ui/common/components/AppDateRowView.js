//AppDateRowView Component Constructor
function AppDateRowView (date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	var rowObjectHeightPercent = displayValueUtil.getRelativeHeight(UIC.RELATIVE_DATE_ROW_HEIGHT());

	var dateViewRow = Titanium.UI.createTableViewRow();

	var dateLabel = Titanium.UI.createLabel({
		text:date.toDateString(),
		color: '#000000',
		font: { fontSize: "16dp"},
		height: rowObjectHeightPercent,
		width:'auto',
		textAlign:'center'
	});

	dateViewRow.add(dateLabel);	
	return dateViewRow;
}

exports.AppDateRowView = AppDateRowView;