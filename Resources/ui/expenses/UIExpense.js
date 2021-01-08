function UIExpense (expensesNameRowView, expensesDetailRowView, expensesAmountRowView, expensesInsuranceCoveredRowView) {
    this.expensesNameRowView = expensesNameRowView;
    this.expensesDetailRowView = expensesDetailRowView;
    this.expensesAmountRowView = expensesAmountRowView;
    this.expensesInsuranceCoveredRowView = expensesInsuranceCoveredRowView;
}

UIExpense.prototype.getExpensesNameRowView = function(){
	return this.expensesNameRowView;
};

UIExpense.prototype.setExpensesNameRowView = function(expensesNameRowView) {
    this.expensesNameRowView = expensesNameRowView;
};

UIExpense.prototype.getExpensesDetailRowView = function() {
	return this.expensesDetailRowView;
};

UIExpense.prototype.setExpensesDetailRowView = function(expensesDetailRowView) {
    this.expensesDetailRowView = expensesDetailRowView;
};

UIExpense.prototype.getExpensesAmountRowView = function() {
	return this.expensesAmountRowView;
};

UIExpense.prototype.setExpensesAmountRowView = function(expensesAmountRowView) {
    this.expensesAmountRowView = expensesAmountRowView;
};

UIExpense.prototype.getExpensesInsuranceCoveredRowView = function() {
	return this.expensesInsuranceCoveredRowView;
};

UIExpense.prototype.setExpensesInsuranceCoveredRowView = function(expensesInsuranceCoveredRowView) {
    this.expensesInsuranceCoveredRowView = expensesInsuranceCoveredRowView;
};


exports.UIExpense = UIExpense;