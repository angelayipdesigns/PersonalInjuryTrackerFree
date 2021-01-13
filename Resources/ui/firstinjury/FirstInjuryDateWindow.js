function MIN_INJURY_DATE() {
	//Jan 1, 2008
	return new Date(2008,0,1);
}

function MAX_INJURY_DATE() {
	//Dec 31, 2030
	return new Date(2030,11,31);
}

//FirstInjuryDateWindow Display
function FirstInjuryDateWindow(displayValueUtil, wrappedDate, injuryDateSelectLabel) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var rowObjectHeightBorderPercent = displayValueUtil.getRelativeBoarderSize();
	var rowObjectHeightPercent = displayValueUtil.getRelativeHeight(10);

	var WrappedDate = require('ui/beans/WrappedDate').WrappedDate;
    var originalWrappedDate = new WrappedDate(wrappedDate.getDate());

    var windowBackgroundColor = Titanium.Platform.name == 'android' ? UIC.COLOR_BLACK() : UIC.COLOR_WHITE();

	var dateWindow = Ti.UI.createWindow({
		top: displayValueUtil.getConfigurableTop(),
		backgroundColor: windowBackgroundColor,
		navBarHidden: true,
		layout: 'vertical'
	});

	var headerLabel = Titanium.UI.createLabel({
		text: 'Date of Injury',
		color: UIC.COLOR_DARK_GREY(),
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		height: rowObjectHeightPercent,
		width:'auto',
		textAlign:'center'
	});

	dateWindow.add(headerLabel);

	var datePicker = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_DATE,
		minDate: MIN_INJURY_DATE(),
		maxDate: MAX_INJURY_DATE(),
		value: wrappedDate.getDate()
	});

	dateWindow.add(datePicker);

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
		injuryDateSelectLabel.setText(wrappedDate.getDate().toDateString());
    	dateWindow.close();
		dateWindow = null;
	});

	buttonViewRow.add(okButton);

	var cancelButton = Titanium.UI.createButton({
		title: 'Cancel',
		height: buttonRowHeightPercent,
		width: buttonRowWidthPercent +2,
		left: buttonRowWidthBorderPercent + (2.5 * buttonRowWidthPercent),
		textAlign: 'center',
		top: buttonRowWidthBorderPercent
	});

	cancelButton.addEventListener('click', function(e) {
		wrappedDate.setDate(originalWrappedDate.getDate());
		injuryDateSelectLabel.setText(wrappedDate.getDate().toDateString());
		dateWindow.close();
		dateWindow = null;
	});

	buttonViewRow.add(cancelButton);

	var tableView = Ti.UI.createTableView();
	var tableData = [];
	tableData.push(buttonViewRow);
	tableView.setData(tableData);
	dateWindow.add(tableView);

	dateWindow.open();

	datePicker.addEventListener('change',function(e){
		wrappedDate.setDate(e.value);
		injuryDateSelectLabel.setText(wrappedDate.getDate().toDateString());
	});
}


exports.FirstInjuryDateWindow = FirstInjuryDateWindow;
