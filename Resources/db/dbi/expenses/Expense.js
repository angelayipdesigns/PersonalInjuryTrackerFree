//Expense Component Constructor
function Expense (id, injuryId, expenseDate, expenseName, expenseDetail, expenseAmount, insuranceCovered) {
    this.id = id;
    this.injuryId = injuryId;
    this.expenseDate = expenseDate;
    this.expenseName = expenseName;
    this.expenseDetail = expenseDetail;
    this.expenseAmount = expenseAmount;
    this.insuranceCovered = insuranceCovered;
}

Expense.prototype.getId = function(){
	return this.id;
};

Expense.prototype.getInjuryId = function(){
	return this.injuryId;
};

Expense.prototype.setInjuryId = function(injuryId) {
    this.injuryId = injuryId;
};

Expense.prototype.getExpenseDate = function(){
	return this.expenseDate;
};

Expense.prototype.setExpenseDate = function(expenseDate) {
    this.expenseDate = expenseDate;
};

Expense.prototype.getExpenseName = function(){
	return this.expenseName;
};

Expense.prototype.setExpenseName = function(expenseName) {
    this.expenseName = expenseName;
};

Expense.prototype.getExpenseDetail = function(){
	return this.expenseDetail;
};

Expense.prototype.setExpenseDetail = function(expenseDetail) {
    this.expenseDetail = expenseDetail;
};

Expense.prototype.getExpenseAmount = function(){
	return this.expenseAmount;
};

Expense.prototype.setExpenseAmount = function(expenseAmount) {
    this.expenseAmount = expenseAmount;
};

Expense.prototype.getInsuranceCovered = function(){
	return this.insuranceCovered;
};

Expense.prototype.setInsuranceCovered = function(insuranceCovered) {
    this.insuranceCovered = insuranceCovered;
};

exports.Expense = Expense;