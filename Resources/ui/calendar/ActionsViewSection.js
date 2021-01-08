//ActionsViewSection Component Constructor
function ActionsViewSection(date, displayValueUtil) {
	var CC = require('ui/calendar/CalendarConstants').CalendarConstants;
	var UIC = require('ui/common/UIConstants').UIConstants;

	var NUM_BUTTONS_PER_ROW = 3;

	var rowObjectWidthBorderPercent = displayValueUtil.getRelativeBoarderSize();	
	var rowObjectHeightPercent = displayValueUtil.getRelativeHeight(8);
	var rowObjectWidthPercent = displayValueUtil.getProportionalObjectWidth(NUM_BUTTONS_PER_ROW, true);
	rowObjectWidthPercent = rowObjectWidthPercent - rowObjectWidthBorderPercent;

	var actionsViewSection = Ti.UI.createTableViewSection();
	var actionsViewRow1 = Titanium.UI.createTableViewRow();

	var symptomsButton = createActionButton(rowObjectHeightPercent, rowObjectWidthPercent, rowObjectWidthBorderPercent,
								'Symptoms', UIC.COLOR_RED());
	symptomsButton.addEventListener('click', function() {
   		executeSymptomsClickEvent(date, displayValueUtil);
	});	
	actionsViewRow1.add(symptomsButton);

	var impactsButton = createActionButton(rowObjectHeightPercent, rowObjectWidthPercent, (2*rowObjectWidthBorderPercent + 1*rowObjectWidthPercent), 
								'Impacts', UIC.COLOR_BLUE());
	impactsButton.addEventListener('click', function() {
   		executeImpactsClickEvent(date, displayValueUtil);
	});
	actionsViewRow1.add(impactsButton);
	
	var appointmentsButton = createActionButton(rowObjectHeightPercent, rowObjectWidthPercent, (3*rowObjectWidthBorderPercent + 2*rowObjectWidthPercent), 
								'Appts.', UIC.COLOR_ORANGE());
	appointmentsButton.addEventListener('click', function() {
   		executeApptsClickEvent(date, displayValueUtil);
	});	
	actionsViewRow1.add(appointmentsButton);
	actionsViewSection.add(actionsViewRow1);

	var actionsViewRow2 = Titanium.UI.createTableViewRow();
	
	var medicationsButton = createActionButton(rowObjectHeightPercent, rowObjectWidthPercent, rowObjectWidthBorderPercent, 
								'Meds.', UIC.COLOR_GREEN());
	medicationsButton.addEventListener('click', function() {
   		executeMedsClickEvent(date, displayValueUtil);
	});
	actionsViewRow2.add(medicationsButton);

	var expensesButton = createActionButton(rowObjectHeightPercent, rowObjectWidthPercent, (2*rowObjectWidthBorderPercent + 1*rowObjectWidthPercent), 
								'Expenses', UIC.COLOR_PURPLE());
	expensesButton.addEventListener('click', function() {
   		executeExpensesClickEvent(date, displayValueUtil);
	});
	actionsViewRow2.add(expensesButton);

	var settingsButton = createActionButton(rowObjectHeightPercent, rowObjectWidthPercent, (3*rowObjectWidthBorderPercent + 2*rowObjectWidthPercent), 
								'Settings', UIC.COLOR_LIGHT_GREY());
	settingsButton.addEventListener('click', function() {
   		executeSettingsClickEvent(displayValueUtil);
	});	
	actionsViewRow2.add(settingsButton);
	
    actionsViewSection.add(actionsViewRow2);
	
	return actionsViewSection;
}

function createActionButton(height, width, left, text, borderColor) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	actionButton = Titanium.UI.createButton({
		title: text,
		font: { fontSize: UIC.FIELD_FONT_SIZE() },
		color: UIC.COLOR_DARK_GREY(),
		left: left,
		textAlign:'center',
		width: width,
		height: height,
		backgroundColor: '#FFFFFF',
		borderColor: borderColor,
		borderWidth: 3,
		borderRadius: 5,
	});
	
	return actionButton;
}

function executeApptsClickEvent(date, displayValueUtil) {
	var AppointmentsWindow = require('ui/appointments/AppointmentsWindow').AppointmentsWindow;
    var appointmentsWindow = new AppointmentsWindow(date, displayValueUtil);
    appointmentsWindow.open();
}

function executeImpactsClickEvent(date, displayValueUtil) {
	var ImpactsWindow = require('ui/impacts/ImpactsWindow').ImpactsWindow;
    var impactsWindow = new ImpactsWindow(date, displayValueUtil);
    impactsWindow.open();
}

function executeSymptomsClickEvent(date, displayValueUtil) {
	var SymptomsWindow = require('ui/symptoms/SymptomsWindow').SymptomsWindow;
    var symptomsWindow = new SymptomsWindow(date, displayValueUtil);
    symptomsWindow.open();
}

function executeMedsClickEvent(date, displayValueUtil) {
	var MedicationsWindow = require('ui/medications/MedicationsWindow').MedicationsWindow;
    var medicationsWindow = new MedicationsWindow(date, displayValueUtil);
    medicationsWindow.open();
}

function executeExpensesClickEvent(date, displayValueUtil) {
	var ExpensesWindow = require('ui/expenses/ExpensesWindow').ExpensesWindow;
    var expensesWindow = new ExpensesWindow(date, displayValueUtil);
    expensesWindow.open();
}

function executeSettingsClickEvent(displayValueUtil) {
	var SettingsWindow = require('ui/settings/SettingsWindow').SettingsWindow;
    var settingsWindow = new SettingsWindow(displayValueUtil);
    settingsWindow.open();
}


exports.ActionsViewSection = ActionsViewSection;