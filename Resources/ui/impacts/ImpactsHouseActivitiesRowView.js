//ImpactsHouseActivitiesRowView Component Constructor
function ImpactsHouseActivitiesRowView (displayValueUtil, houseActivities) {
	var IC = require('ui/impacts/ImpactsConstants').ImpactsConstants;
	
	this.impactsHouseActivitiesRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(IC.TWO_LINE_TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var CheckBoxFieldLabel = require('ui/common/entryfields/CheckBoxFieldLabel').CheckBoxFieldLabel;

    var impactsHouseActivitiesLabel = new CheckBoxFieldLabel(displayValueUtil, 'Unable to perform household activities:', textFieldLabelHeight);	
	this.impactsHouseActivitiesRowView.add(impactsHouseActivitiesLabel);

	var CheckboxButton = require('ui/common/buttons/CheckboxButton').CheckboxButton;
	this.checkboxButton = new CheckboxButton(displayValueUtil, textFieldLabelHeight, houseActivities);
	this.impactsHouseActivitiesRowView.add(this.checkboxButton.getButtonDisplayable());
}

ImpactsHouseActivitiesRowView.prototype.getImpactsHouseActivitiesRowView = function(){
	return this.impactsHouseActivitiesRowView;
};

ImpactsHouseActivitiesRowView.prototype.getImpactsHouseActivities = function(){
	return this.checkboxButton.getSelected();
};

ImpactsHouseActivitiesRowView.prototype.setImpactsHouseActivities = function(isSelected){
	this.checkboxButton.setSelected(isSelected);
};


exports.ImpactsHouseActivitiesRowView = ImpactsHouseActivitiesRowView;