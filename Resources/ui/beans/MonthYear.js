function MonthYear (currentMonth, currentYear) {
    this.currentMonth = currentMonth;
    this.currentYear = currentYear;
}

function FIRST_MONTH_IN_YEAR() {
	return 0;
}

function LAST_MONTH_IN_YEAR() {
	return 11;
}

MonthYear.prototype.getMonth = function(){
	return this.currentMonth;
};

MonthYear.prototype.setMonth = function(currentMonth) {
    this.currentMonth = currentMonth;
};

MonthYear.prototype.getYear = function() {
	return this.currentYear;
};

MonthYear.prototype.setYear = function(currentYear) {
    this.currentYear = currentYear;
};


MonthYear.prototype.decrementYear = function(monthYear) {
	this.currentYear--;
};

MonthYear.prototype.incrementYear = function(monthYear) {
	this.currentYear++;
};

MonthYear.prototype.decrementMonth = function(monthYear) {
	if (this.currentMonth > FIRST_MONTH_IN_YEAR()) {
		this.currentMonth--;
	}
	else {
		this.currentMonth = LAST_MONTH_IN_YEAR();
		this.currentYear--;
	}
};

MonthYear.prototype.incrementMonth = function(monthYear) {
	if (this.currentMonth < LAST_MONTH_IN_YEAR()) {
		this.currentMonth++;
	}
	else {
		this.currentMonth = FIRST_MONTH_IN_YEAR();
		this.currentYear++;
	}
};

exports.MonthYear = MonthYear;