//SymptomsTableData Component Constructor
function SymptomsTableData () {
}

SymptomsTableData.prototype.buildTableData = function(symptomsWindow, date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var symptomsHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView('Symptoms', '#000000', UIC.COLOR_RED(), false, true);

	tableData.push(symptomsHeaderRowView);

	var AppDateRowView = require('ui/common/components/AppDateRowView').AppDateRowView;
    var appDateRowView = new AppDateRowView(date, displayValueUtil);
	tableData.push(appDateRowView);

	var SymptomsPainAreaRowView = require('ui/symptoms/SymptomsPainAreaRowView').SymptomsPainAreaRowView;
	var SymptomsPainDetailsRowView = require('ui/symptoms/SymptomsPainDetailsRowView').SymptomsPainDetailsRowView;
	var TableComponentSeparatorRowView = require('ui/common/components/TableComponentSeparatorRowView').TableComponentSeparatorRowView;
	var UISymptom = require('ui/symptoms/UISymptom').UISymptom;
	var SymptomsDBI = require('db/dbi/symptoms/SymptomsDBI').SymptomsDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;

	var uiSymptoms = [];
	var symptomsDBI = new SymptomsDBI();
	var injuryId = currentInjuryCache.getCurrentId();
	//Titanium.API.info("Retrieved current injury id: " + injuryId);
	var symptoms = symptomsDBI.getSymptomsByInjuryIdSymptomDate(injuryId, date);
	
	for (var i = 0; i < symptoms.length; i++) {
    	var symptom = symptoms[i];
    	var symptomsPainAreaRowView = new SymptomsPainAreaRowView(displayValueUtil, symptom.getId(), symptomsWindow);
    	symptomsPainAreaRowView.setSymptomPainAreaTextField(symptom.getSymptomArea());
		tableData.push(symptomsPainAreaRowView.getSymptomPainAreaRowView());
    	var symptomsPainDetailsRowView = new SymptomsPainDetailsRowView(displayValueUtil);
    	symptomsPainDetailsRowView.setSymptomPainDetailsTextArea(symptom.getSymptomDetails());
    	tableData.push(symptomsPainDetailsRowView.getSymptomPainDetailsTextAreaRowView());
    	var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
    	tableData.push(tableComponentSeparatorRowView);
    	var uiSymptom = new UISymptom(symptomsPainAreaRowView, symptomsPainDetailsRowView);
    	uiSymptoms.push(uiSymptom);
	}

    var symptomsPainAreaRowView = new SymptomsPainAreaRowView(displayValueUtil, -1, symptomsWindow);
	tableData.push(symptomsPainAreaRowView.getSymptomPainAreaRowView());
    var symptomsPainDetailsRowView = new SymptomsPainDetailsRowView(displayValueUtil);
    tableData.push(symptomsPainDetailsRowView.getSymptomPainDetailsTextAreaRowView());
    var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
    tableData.push(tableComponentSeparatorRowView);

	var buttonViewRow = Titanium.UI.createTableViewRow();	
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var AddButton = require('ui/common/buttons/AddButton').AddButton;
    var addButton = new AddButton(buttonHeight, buttonWidth, buttonBorderWidth);

	addButton.addEventListener('click', function() {	
		save(uiSymptoms, symptoms, symptomsPainAreaRowView, symptomsPainDetailsRowView, date);
		symptomsWindow.fireEvent('updateSymptomTable');	
	});

	buttonViewRow.add(addButton);

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
    var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function() {	
		save(uiSymptoms, symptoms, symptomsPainAreaRowView, symptomsPainDetailsRowView, date);
	
		symptomsWindow.close();
		symptomsWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		symptomsWindow.close();
		symptomsWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
};

function save(uiSymptoms, symptoms, currentSymptomsPainAreaRowView, currentSymptomsPainDetailsRowView, date) {
	var Symptom = require('db/dbi/symptoms/Symptom').Symptom;
	var SymptomsDBI = require('db/dbi/symptoms/SymptomsDBI').SymptomsDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	
	var injuryId = currentInjuryCache.getCurrentId();
	var symptomsDBI = new SymptomsDBI();

	for (var i = 0; i < uiSymptoms.length; i++) {
		var uiSymptom = uiSymptoms[i];
		var uiSymptomsPainAreaRowView = uiSymptom.getSymptomsPainAreaRowView();
		var uiSymptomsPainDetailsRowView = uiSymptom.getSymptomsPainDetailsRowView();
		var uiSymptomPainArea = uiSymptomsPainAreaRowView.getSymptomPainAreaTextField();
		var uiSymptomPainDetails = uiSymptomsPainDetailsRowView.getSymptomPainDetailsTextArea();			

		var symptom = symptoms[i];
		if ((symptom.getSymptomArea() != uiSymptomPainArea) || (symptom.getSymptomDetails) != uiSymptomPainDetails) {
			symptom.setSymptomArea(uiSymptomPainArea);
			symptom.setSymptomDetails(uiSymptomPainDetails);
			symptomsDBI.updateSymptom(symptom);
		}
	}		

	var symptomPainArea = currentSymptomsPainAreaRowView.getSymptomPainAreaTextField();
	var symptomPainDetails = currentSymptomsPainDetailsRowView.getSymptomPainDetailsTextArea();
	
	if (symptomPainArea || symptomPainDetails) {
		var newSymptom = new Symptom('noid', injuryId, date, symptomPainArea, symptomPainDetails);
		var id = symptomsDBI.insertSymptom(newSymptom);
	}
}


exports.SymptomsTableData = SymptomsTableData;