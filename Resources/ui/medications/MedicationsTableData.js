//MedicationsTableData Component Constructor
function MedicationsTableData () {
}

MedicationsTableData.prototype.buildTableData = function(medicationsWindow, date, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	
	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var medicationsHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView('Medications', '#000000', UIC.COLOR_GREEN(), false, true);

	tableData.push(medicationsHeaderRowView);

	var AppDateRowView = require('ui/common/components/AppDateRowView').AppDateRowView;
    var appDateRowView = new AppDateRowView(date, displayValueUtil);
	tableData.push(appDateRowView);

	var MedicationsNameRowView = require('ui/medications/MedicationsNameRowView').MedicationsNameRowView;
	var MedicationsPurposeRowView = require('ui/medications/MedicationsPurposeRowView').MedicationsPurposeRowView;
	var MedicationsDosageRowView = require('ui/medications/MedicationsDosageRowView').MedicationsDosageRowView;
	var MedicationsCostRowView = require('ui/medications/MedicationsCostRowView').MedicationsCostRowView;
	var MedicationsInsuranceCoveredRowView = require('ui/medications/MedicationsInsuranceCoveredRowView').MedicationsInsuranceCoveredRowView;
	var TableComponentSeparatorRowView = require('ui/common/components/TableComponentSeparatorRowView').TableComponentSeparatorRowView;
	var UIMedication = require('ui/medications/UIMedication').UIMedication;
	var MedicationsDBI = require('db/dbi/medications/MedicationsDBI').MedicationsDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;

	var uiMedications = [];
	var medicationsDBI = new MedicationsDBI();
	var injuryId = currentInjuryCache.getCurrentId();
	//Titanium.API.info("Retrieved current injury id: " + injuryId);

	var medications = medicationsDBI.getMedicationsByInjuryIdMedicationDate(injuryId, date);
	
	for (var i = 0; i < medications.length; i++) {
    	var medication = medications[i];
    	var medicationsNameRowView = new MedicationsNameRowView(displayValueUtil, medication.getId(), medicationsWindow);
    	medicationsNameRowView.setMedicationNameTextField(medication.getMedicationName());
		tableData.push(medicationsNameRowView.getMedicationNameRowView());
    	var medicationsPurposeRowView = new MedicationsPurposeRowView(displayValueUtil);
    	medicationsPurposeRowView.setMedicationPurposeTextArea(medication.getMedicationPurpose());
    	tableData.push(medicationsPurposeRowView.getMedicationPurposeTextAreaRowView());
    	var medicationsDosageRowView = new MedicationsDosageRowView(displayValueUtil);
    	medicationsDosageRowView.setMedicationDosageTextArea(medication.getMedicationDosage());
    	tableData.push(medicationsDosageRowView.getMedicationDosageTextAreaRowView());
    	var medicationsCostRowView = new MedicationsCostRowView(displayValueUtil);
    	medicationsCostRowView.setMedicationCostTextField(medication.getMedicationCost());
    	tableData.push(medicationsCostRowView.getMedicationCostRowView());
    	var medicationsInsuranceCoveredRowView = new MedicationsInsuranceCoveredRowView(displayValueUtil, medication.getInsuranceCovered());
		tableData.push(medicationsInsuranceCoveredRowView.getMedicationsInsuranceCoveredRowView());
    	
    	var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
    	tableData.push(tableComponentSeparatorRowView);
    	var uiMedication = new UIMedication(medicationsNameRowView, medicationsPurposeRowView,
    											medicationsDosageRowView, medicationsCostRowView, medicationsInsuranceCoveredRowView);
    	uiMedications.push(uiMedication);
	}

    var medicationsNameRowView = new MedicationsNameRowView(displayValueUtil, -1, medicationsWindow);
	tableData.push(medicationsNameRowView.getMedicationNameRowView());
    var medicationsPurposeRowView = new MedicationsPurposeRowView(displayValueUtil);
    tableData.push(medicationsPurposeRowView.getMedicationPurposeTextAreaRowView());
    var medicationsDosageRowView = new MedicationsDosageRowView(displayValueUtil);
    tableData.push(medicationsDosageRowView.getMedicationDosageTextAreaRowView());
	var medicationsCostRowView = new MedicationsCostRowView(displayValueUtil);
    tableData.push(medicationsCostRowView.getMedicationCostRowView());
	var medicationsInsuranceCoveredRowView = new MedicationsInsuranceCoveredRowView(displayValueUtil, false);
	tableData.push(medicationsInsuranceCoveredRowView.getMedicationsInsuranceCoveredRowView());
    
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
		save(uiMedications, medications, medicationsNameRowView, medicationsPurposeRowView,
				medicationsDosageRowView, medicationsCostRowView, medicationsInsuranceCoveredRowView, date);
		medicationsWindow.fireEvent('updateMedicationsTable');	
	});

	buttonViewRow.add(addButton);

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
    var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function() {	
		save(uiMedications, medications, medicationsNameRowView, medicationsPurposeRowView,
				medicationsDosageRowView, medicationsCostRowView, medicationsInsuranceCoveredRowView, date);
	
		medicationsWindow.close();
		medicationsWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		medicationsWindow.close();
		medicationsWindow = null;
		Ti.App.fireEvent('updateCalendarTable');
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
};

function save(uiMedications, medications, currentMedicationsNameRowView, currentMedicationsPurposeRowView, 
				currentMedicationsDosageRowView, currentMedicationsCostRowView, currentMedicationsInsuranceCoveredRowView, date) {
	var Medication = require('db/dbi/medications/Medication').Medication;
	var MedicationsDBI = require('db/dbi/medications/MedicationsDBI').MedicationsDBI;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;
	
	var injuryId = currentInjuryCache.getCurrentId();
	var medicationsDBI = new MedicationsDBI();

	for (var i = 0; i < uiMedications.length; i++) {
		var uiMedication = uiMedications[i];
		var uiMedicationsNameRowView = uiMedication.getMedicationsNameRowView();
		var uiMedicationsPurposeRowView = uiMedication.getMedicationsPurposeRowView();
		var uiMedicationsDosageRowView = uiMedication.getMedicationsDosageRowView();
		var uiMedicationsCostRowView = uiMedication.getMedicationsCostRowView();
		var uiMedicationsInsuranceCoveredRowView = uiMedication.getMedicationsInsuranceCoveredRowView();
		
		var uiMedicationName = uiMedicationsNameRowView.getMedicationNameTextField();
		var uiMedicationPurpose = uiMedicationsPurposeRowView.getMedicationPurposeTextArea();
		var uiMedicationDosage = uiMedicationsDosageRowView.getMedicationDosageTextArea();
		var uiMedicationCost = uiMedicationsCostRowView.getMedicationCostTextField();
		var uiMedicationInsuranceCovered = uiMedicationsInsuranceCoveredRowView.getMedicationsInsuranceCovered();		

		var medication = medications[i];
		if ((medication.getMedicationName() != uiMedicationName) || (medication.getMedicationPurpose() != uiMedicationPurpose) ||
				(medication.getMedicationDosage() != uiMedicationDosage) || (medication.getMedicationCost() != uiMedicationCost) ||
				(medication.getInsuranceCovered() != uiMedicationInsuranceCovered)) {
			medication.setMedicationName(uiMedicationName);
			medication.setMedicationPurpose(uiMedicationPurpose);
			medication.setMedicationDosage(uiMedicationDosage);
			medication.setMedicationCost(uiMedicationCost);
			medication.setInsuranceCovered(uiMedicationInsuranceCovered);
			medicationsDBI.updateMedication(medication);
		}
	}		

	var medicationName = currentMedicationsNameRowView.getMedicationNameTextField();
	var medicationPurpose = currentMedicationsPurposeRowView.getMedicationPurposeTextArea();
	var medicationDosage = currentMedicationsDosageRowView.getMedicationDosageTextArea();
	var medicationCost = currentMedicationsCostRowView.getMedicationCostTextField();
	var medicationInsuranceCovered = currentMedicationsInsuranceCoveredRowView.getMedicationsInsuranceCovered();
	
	if (medicationName || medicationPurpose || medicationDosage || medicationCost || medicationInsuranceCovered) {
		var newMedication = new Medication('noid', injuryId, date, medicationName, medicationPurpose, medicationDosage, medicationCost, medicationInsuranceCovered);
		var id = medicationsDBI.insertMedication(newMedication);
	}
}


exports.MedicationsTableData = MedicationsTableData;