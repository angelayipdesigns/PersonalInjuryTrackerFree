//FirstInjuryTimeWindow Display
function FirstInjuryTimeWindow(displayValueUtil, wrappedDate, injuryTimeSelectLabel) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();
	var rowObjectHeightPercent = displayValueUtil.getRelativeHeight(10);

	var WrappedDate = require('ui/beans/WrappedDate').WrappedDate;
    var originalWrappedDate = new WrappedDate(wrappedDate.getDate());

    var windowBackgroundColor = Titanium.Platform.name == 'android' ? UIC.COLOR_BLACK() : UIC.COLOR_WHITE();

	var timeWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor: windowBackgroundColor,
		navBarHidden:true,
		layout: 'vertical'
	});

	var headerLabel = Titanium.UI.createLabel({
		text: 'Time of Injury',
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		height: rowObjectHeightPercent,
		width:'auto',
		textAlign:'center'
	});
	
	timeWindow.add(headerLabel);

	var timePicker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_TIME,
		format24: false,
		top: rowObjectHeightBorderPercent,
		value: wrappedDate.getDate()
	});

	timeWindow.add(timePicker);

	var buttonViewRow = Titanium.UI.createTableViewRow();
	var buttonRowHeightPercent = displayValueUtil.getRelativeHeight(10);
	var buttonRowWidthPercent = displayValueUtil.getProportionalObjectWidth(4, true);
	var buttonRowWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();

	var okButton = Titanium.UI.createButton({
		title: 'OK',
		height: buttonRowHeightPercent,
		width: buttonRowWidthPercent,
		left: buttonRowWidthBorderPercent + (0.5 * buttonRowWidthPercent),
		textAlign: 'center',
		top: buttonRowWidthBorderPercent
	});

	okButton.addEventListener('click', function(e) {
		var timeString = getTimeString(wrappedDate.getDate()); 
		injuryTimeSelectLabel.setText(timeString);
    	timeWindow.close();
		timeWindow = null;
	});

	buttonViewRow.add(okButton);

	var cancelButton = Titanium.UI.createButton({
		title: 'Cancel',
		height: buttonRowHeightPercent,
		width: buttonRowWidthPercent + 2,
		left: buttonRowWidthBorderPercent + (2.5 * buttonRowWidthPercent),
		textAlign: 'center',
		top: buttonRowWidthBorderPercent
	});

	cancelButton.addEventListener('click', function(e) {
		wrappedDate.setDate(originalWrappedDate.getDate());
		var timeString = getTimeString(wrappedDate.getDate()); 
		
		injuryTimeSelectLabel.setText(timeString);
		timeWindow.close();
		timeWindow = null;
	});

	buttonViewRow.add(cancelButton);

	var tableView = Ti.UI.createTableView();
	var tableData = [];
	tableData.push(buttonViewRow);
	tableView.setData(tableData);
	timeWindow.add(tableView);

	timeWindow.open();
	
	timePicker.addEventListener('change',function(e){
		wrappedDate.setDate(e.value);
		var timeString = getTimeString(wrappedDate.getDate());
		//Ti.API.info("time string: " + timeString);
		injuryTimeSelectLabel.setText(timeString);
	});
}

function getTimeString(date) {
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var timeString = dbDateUtil.getTimeStringForInsert(date);
	return timeString;
}


exports.FirstInjuryTimeWindow = FirstInjuryTimeWindow;