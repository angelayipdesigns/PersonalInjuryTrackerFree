function WrappedDate (date) {
    this.date = date;
}

WrappedDate.prototype.getDate = function(){
	return this.date;
};

WrappedDate.prototype.setDate = function(date) {
    this.date = date;
};


exports.WrappedDate = WrappedDate;