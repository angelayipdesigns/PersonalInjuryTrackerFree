//OptionsTableData Component Constructor
function OptionsTableData () {
}

function MILEAGE_UNIT() {
	return "MileageUnit";
}

function MILEAGE_AMOUNT() {
	return "MileageAmount";
}

OptionsTableData.prototype.buildTableData = function(optionsWindow, displayValueUtil) {
	var UIC = require('ui/common/UIConstants').UIConstants;
	var OC = require('ui/settings/options/OptionsConstants').OptionsConstants;
	
	var tableData = [];

	var AppHeaderRowView = require('ui/common/components/AppHeaderRowView').AppHeaderRowView;
    var appHeaderRowView = new AppHeaderRowView(displayValueUtil);
    var optionsHeaderRowView = 
    	appHeaderRowView.getBasicHeaderRowView('Injury Information', '#000000', UIC.COLOR_LIGHT_GREY(), false, false);

	tableData.push(optionsHeaderRowView);

    var OptionsMileageUnitRowView = require('ui/settings/options/OptionsMileageUnitRowView').OptionsMileageUnitRowView;
    var OptionsMileageAmountRowView = require('ui/settings/options/OptionsMileageAmountRowView').OptionsMileageAmountRowView;
    
	var TableComponentSeparatorRowView = require('ui/common/components/TableComponentSeparatorRowView').TableComponentSeparatorRowView;
	var currentInjuryCache = require('db/dbi/injuries/CurrentInjuryCache').CurrentInjuryCache;

    var Setting = require('db/dbi/settings/Setting').Setting;
    var Options = require('db/dbi/settings/Options').Options;
    var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
	var settingsDBI = new SettingsDBI();
    
    var mileageUnit = settingsDBI.getSettingValueByName(MILEAGE_UNIT());
    var mileageAmount = settingsDBI.getSettingValueByName(MILEAGE_AMOUNT());

    var options = new Options(mileageUnit, mileageAmount);

    var optionsMileageUnitRowView = new OptionsMileageUnitRowView(displayValueUtil, mileageUnit);
	tableData.push(optionsMileageUnitRowView.getOptionsMileageUnitRowView());
	var optionsMileageAmountRowView = new OptionsMileageAmountRowView(displayValueUtil);
	optionsMileageAmountRowView.setOptionsMileageAmountTextField(mileageAmount);
	tableData.push(optionsMileageAmountRowView.getOptionsMileageAmountRowView());
	
	var tableComponentSeparatorRowView = new TableComponentSeparatorRowView(displayValueUtil);
	tableData.push(tableComponentSeparatorRowView);
	
	var UIOptions = require('ui/settings/options/UIOptions').UIOptions;
	var uiOptions = new UIOptions(optionsMileageUnitRowView, optionsMileageAmountRowView);

	var buttonViewRow = Titanium.UI.createTableViewRow();	
	var buttonWidth = displayValueUtil.getProportionalObjectWidth(6, true);
	var buttonBorderWidth = displayValueUtil.getRelativeBoarderSize();
	//make the buttons square
	var buttonHeight = buttonWidth;

	var OKButton = require('ui/common/buttons/OKButton').OKButton;
    var okButton = new OKButton(buttonHeight, buttonWidth, buttonBorderWidth);

	okButton.addEventListener('click', function() {	
		save(uiOptions, options);
		optionsWindow.close();
		optionsWindow = null;
	});
	buttonViewRow.add(okButton);

	var CancelButton = require('ui/common/buttons/CancelButton').CancelButton;
    var cancelButton = new CancelButton(buttonHeight, buttonWidth, buttonBorderWidth);

	cancelButton.addEventListener('click', function() {
		optionsWindow.close();
		optionsWindow = null;
	});

	buttonViewRow.add(cancelButton);
	tableData.push(buttonViewRow);
	return tableData;
};


function save(uiOptions, options) {
    var SettingsDBI = require('db/dbi/settings/SettingsDBI').SettingsDBI;
    var settingsDBI = new SettingsDBI();
	var uiOptionsMileageUnit = uiOptions.getOptionsMileageUnitRowView().getOptionsMileageUnit();
	var uiOptionsMileageAmount = uiOptions.getOptionsMileageAmountRowView().getOptionsMileageAmountTextField();

	if (options.getMileageUnit() != uiOptionsMileageUnit) {
        settingsDBI.updateSettingValueByName(MILEAGE_UNIT(), uiOptionsMileageUnit);
    }
    
	if ((options.getMileageAmount() != uiOptionsMileageAmount) && (!isNaN(uiOptionsMileageAmount))) {
		settingsDBI.updateSettingValueByName(MILEAGE_AMOUNT(), uiOptionsMileageAmount);
	}
}


exports.OptionsTableData = OptionsTableData;