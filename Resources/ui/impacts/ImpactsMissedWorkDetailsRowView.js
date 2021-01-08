//ImpactsMissedWorkDetailsRowView Component Constructor
function ImpactsMissedWorkDetailsRowView (displayValueUtil) {
	var IC = require('ui/impacts/ImpactsConstants').ImpactsConstants;
	
	this.impactsMissedWorkDetailsRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(IC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;

    var impactsMissedWorkDetailsLabel = new TextFieldLabel(displayValueUtil, 'More Details:', textFieldLabelHeight);	
	this.impactsMissedWorkDetailsRowView.add(impactsMissedWorkDetailsLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.impactsMissedWorkDetailsTextField = new StandardTextField(displayValueUtil, 'Details of missed work', textFieldLabelHeight);
	
	this.impactsMissedWorkDetailsRowView.add(this.impactsMissedWorkDetailsTextField);

}

ImpactsMissedWorkDetailsRowView.prototype.getImpactsMissedWorkDetailsRowView = function(){
	return this.impactsMissedWorkDetailsRowView;
};

ImpactsMissedWorkDetailsRowView.prototype.getImpactsMissedWorkDetailsTextField = function(){
	return this.impactsMissedWorkDetailsTextField.value;
};

ImpactsMissedWorkDetailsRowView.prototype.setImpactsMissedWorkDetailsTextField = function(missedWorkDetails){
	this.impactsMissedWorkDetailsTextField.value = missedWorkDetails;
};


exports.ImpactsMissedWorkDetailsRowView = ImpactsMissedWorkDetailsRowView;