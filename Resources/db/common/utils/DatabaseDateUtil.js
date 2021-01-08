function DatabaseDateUtil () {
}

DatabaseDateUtil.prototype.getDateFromSelect = function(stringVar) {
	var dateComponents = stringVar.split("-");
	var month = dateComponents[0] - 1;
	var day = dateComponents[1];
	var year = dateComponents[2];

	var date = new Date(year, month, day);	
	return date;
};

DatabaseDateUtil.prototype.getDateStringForSelect = function(dateVar) {
    var stringVar = (dateVar.getMonth()+1) + '-' + dateVar.getDate() + '-' + dateVar.getFullYear();
    return stringVar;
};

DatabaseDateUtil.prototype.getDateStringForInsert = function(dateVar) {
	var self = this;
	return self.getDateStringForSelect(dateVar);
};

DatabaseDateUtil.prototype.getTimeFromSelect = function(stringVar) {
	var date = new Date();
	var timeAndAmPm = stringVar.split(" ");
	var time = timeAndAmPm[0];
	var amOrPm = timeAndAmPm[1];
	var hoursAndMinutes = time.split(":");
	var hours = parseInt(hoursAndMinutes[0], 10);
	var minutes = parseInt(hoursAndMinutes[1], 10);
	
	if ((hours == 12) && (amOrPm == 'AM')) {
		hours = 0;
	} else if ((hours < 12) && (amOrPm == 'PM')) {
		hours = hours + 12;
	}
	
	date.setHours(hours);
	date.setMinutes(minutes);
	date.setSeconds(0);

	return date;
};

DatabaseDateUtil.prototype.getTimeStringForSelect = function(dateVar) {
	var hours = dateVar.getHours();
	var amOrPm = 'PM'; 
	if (hours == 0) {
		amOrPm = 'AM';
		hours = 12;
	} else if ((hours > 0) && (hours < 12)) {
		amOrPm = 'AM';
	} else if (hours > 12) {
		hours = hours - 12;
	}
	
	var minutes = dateVar.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	var stringVar = hours + ':' + minutes + ' ' + amOrPm;
	return stringVar;
};

DatabaseDateUtil.prototype.getTimeStringForInsert = function(dateVar) {
	var self = this;
	return self.getTimeStringForSelect(dateVar);
};



exports.DatabaseDateUtil = DatabaseDateUtil;