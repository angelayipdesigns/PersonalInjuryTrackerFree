//ImpactsMissedWorkRowView Component Constructor
function ImpactsMissedWorkRowView (displayValueUtil, missedWork) {
	var IC = require('ui/impacts/ImpactsConstants').ImpactsConstants;
	
	this.impactsMissedWorkRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(IC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var CheckBoxFieldLabel = require('ui/common/entryfields/CheckBoxFieldLabel').CheckBoxFieldLabel;

    var impactsMissedWorkLabel = new CheckBoxFieldLabel(displayValueUtil, 'Missed Work:', textFieldLabelHeight);	
	this.impactsMissedWorkRowView.add(impactsMissedWorkLabel);

	var CheckboxButton = require('ui/common/buttons/CheckboxButton').CheckboxButton;
	this.checkboxButton = new CheckboxButton(displayValueUtil, textFieldLabelHeight, missedWork);
	this.impactsMissedWorkRowView.add(this.checkboxButton.getButtonDisplayable());

}

ImpactsMissedWorkRowView.prototype.getImpactsMissedWorkRowView = function(){
	return this.impactsMissedWorkRowView;
};

ImpactsMissedWorkRowView.prototype.getImpactsMissedWork = function(){
	return this.checkboxButton.getSelected();
};

ImpactsMissedWorkRowView.prototype.setImpactsMissedWork = function(isSelected){
	this.checkboxButton.setSelected(isSelected);
};



exports.ImpactsMissedWorkRowView = ImpactsMissedWorkRowView;