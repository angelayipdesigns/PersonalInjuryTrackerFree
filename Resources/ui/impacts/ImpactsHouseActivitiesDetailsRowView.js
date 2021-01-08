//ImpactsHouseActivitiesDetailsRowView Component Constructor
function ImpactsHouseActivitiesDetailsRowView (displayValueUtil) {
	var IC = require('ui/impacts/ImpactsConstants').ImpactsConstants;

	this.impactsHouseActivitiesDetailsRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(IC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;

    var impactsHouseActivitiesDetailsLabel = new TextFieldLabel(displayValueUtil, 'More Details:', textFieldLabelHeight);
	this.impactsHouseActivitiesDetailsRowView.add(impactsHouseActivitiesDetailsLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
    this.impactsHouseActivitiesDetailsTextField = new StandardTextField(displayValueUtil, 'Details of inability to perform household activities', textFieldLabelHeight);

	this.impactsHouseActivitiesDetailsRowView.add(this.impactsHouseActivitiesDetailsTextField);
}

ImpactsHouseActivitiesDetailsRowView.prototype.getImpactsHouseActivitiesDetailsRowView = function(){
	return this.impactsHouseActivitiesDetailsRowView;
};

ImpactsHouseActivitiesDetailsRowView.prototype.getImpactsHouseActivitiesDetailsTextField = function(){
	return this.impactsHouseActivitiesDetailsTextField.value;
};

ImpactsHouseActivitiesDetailsRowView.prototype.setImpactsHouseActivitiesDetailsTextField = function(houseActivityDetails){
	this.impactsHouseActivitiesDetailsTextField.value = houseActivityDetails;
};


exports.ImpactsHouseActivitiesDetailsRowView = ImpactsHouseActivitiesDetailsRowView;
