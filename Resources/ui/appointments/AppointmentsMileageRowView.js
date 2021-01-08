//AppointmentsMileageRowView Component Constructor
function AppointmentsMileageRowView (displayValueUtil) {
	var AC = require('ui/appointments/AppointmentsConstants').AppointmentsConstants;
	
	this.appointmentsMileageRowView = Titanium.UI.createTableViewRow();

	var textFieldLabelHeight = displayValueUtil.getRelativeHeight(AC.TEXT_FIELD_LABEL_HEIGHT_PERCENT());
	var HalfLengthTextFieldLabel = require('ui/common/entryfields/HalfLengthTextFieldLabel').HalfLengthTextFieldLabel;
    var appointmentsMileageLabel = new HalfLengthTextFieldLabel(displayValueUtil, 'Distance Travelled:', textFieldLabelHeight);

	this.appointmentsMileageRowView.add(appointmentsMileageLabel);

	var MileageUnitLabel = require('ui/common/entryfields/MileageUnitLabel').MileageUnitLabel;
    var mileageUnitLabel = new MileageUnitLabel(displayValueUtil, textFieldLabelHeight, AC.MILEAGE_UNIT_LABEL_WIDTH());

	this.appointmentsMileageRowView.add(mileageUnitLabel);

	var ExpenseTextField = require('ui/common/entryfields/ExpenseTextField').ExpenseTextField;
	this.appointmentsMileageTextField = new ExpenseTextField(displayValueUtil, 'The distance travelled', AC.MILEAGE_UNIT_LABEL_WIDTH());

	this.appointmentsMileageRowView.add(this.appointmentsMileageTextField);
	this.appointmentsMileageTextField.blur();
}

AppointmentsMileageRowView.prototype.getAppointmentsMileageRowView = function(){
    return this.appointmentsMileageRowView;
};

AppointmentsMileageRowView.prototype.getAppointmentsMileageTextField = function(){
	return this.appointmentsMileageTextField.value;
};

AppointmentsMileageRowView.prototype.setAppointmentsMileageTextField = function(appointmentsMileage){
	this.appointmentsMileageTextField.value = appointmentsMileage;
};


exports.AppointmentsMileageRowView = AppointmentsMileageRowView;