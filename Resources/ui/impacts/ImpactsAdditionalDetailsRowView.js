//ImpactsAdditionalDetailsRowView Component Constructor
function ImpactsAdditionalDetailsRowView (displayValueUtil) {
	var IC = require('ui/impacts/ImpactsConstants').ImpactsConstants;

	this.impactsAdditionalDetailsRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(IC.TWO_LINE_TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var TextFieldLabel = require('ui/common/entryfields/TextFieldLabel').TextFieldLabel;

    var impactsAdditionalDetailsLabel = new TextFieldLabel(displayValueUtil, 'Additional impacts on you due to injury on this day:', textFieldLabelHeight);
	this.impactsAdditionalDetailsRowView.add(impactsAdditionalDetailsLabel);

	var StandardTextField = require('ui/common/entryfields/StandardTextField').StandardTextField;
	this.impactsAdditionalDetailsTextArea = new StandardTextField(displayValueUtil, 'Additional impacts', textFieldLabelHeight);

	this.impactsAdditionalDetailsRowView.add(this.impactsAdditionalDetailsTextArea);
	this.impactsAdditionalDetailsTextArea.blur();
}

ImpactsAdditionalDetailsRowView.prototype.getImpactsAdditionalDetailsRowView = function(){
	return this.impactsAdditionalDetailsRowView;
};

ImpactsAdditionalDetailsRowView.prototype.getImpactsAdditionalDetailsTextArea = function(){
	return this.impactsAdditionalDetailsTextArea.value;
};

ImpactsAdditionalDetailsRowView.prototype.setImpactsAdditionalDetailsTextArea = function(impactsAdditionalDetails){
	this.impactsAdditionalDetailsTextArea.value = impactsAdditionalDetails;
};


exports.ImpactsAdditionalDetailsRowView = ImpactsAdditionalDetailsRowView;
