function EXPENSES() {
	return 'expenses';
}
function ID() {
	return 'id';
}
function INJURY_ID() {
	return 'injuryid';
}
function EXPENSE_DATE() {
	return 'expensedate';
}
function EXPENSE_NAME() {
	return 'expensename';
}
function EXPENSE_DETAIL() {
	return 'expensedetail';
}
function EXPENSE_AMOUNT() {
	return 'expenseamount';
}
function INSURANCE_COVERED() {
	return 'insurancecovered';
}

//ExpensesDBI Component Constructor
function ExpensesDBI () {
}

ExpensesDBI.prototype.getExpensesByInjuryIdExpenseDate = function(injuryId, expenseDate) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();

	var expenses = [];
	var Expense = require('db/dbi/expenses/Expense').Expense;
	var expense;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var stringExpenseDate = dbDateUtil.getDateStringForSelect(expenseDate);
	var expensesRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_ID() + ', ' +
											EXPENSE_DATE() + ', ' + EXPENSE_NAME() + ', ' +
											EXPENSE_DETAIL() + ', ' + EXPENSE_AMOUNT() + ', ' +
											INSURANCE_COVERED() +
								' FROM '+ EXPENSES() + ' WHERE ' + INJURY_ID() + ' = ? AND ' + EXPENSE_DATE() + ' = ?', injuryId, stringExpenseDate);

	while (expensesRS.isValidRow()) {
		var fetchedId = expensesRS.fieldByName(ID());
		var fetchedInjuryId = expensesRS.fieldByName(INJURY_ID());
		var fetchedExpenseDate = expensesRS.fieldByName(EXPENSE_DATE());
		var finalExpenseDate = dbDateUtil.getDateFromSelect(fetchedExpenseDate);
		var fetchedExpenseName = expensesRS.fieldByName(EXPENSE_NAME());
		var fetchedExpenseDetail = expensesRS.fieldByName(EXPENSE_DETAIL());
		var fetchedExpenseAmount = expensesRS.fieldByName(EXPENSE_AMOUNT());
		var fetchedInsuranceCovered = expensesRS.fieldByName(INSURANCE_COVERED());
		var finalInsuranceCovered = dbBooleanUtil.getBooleanFromSelect(fetchedInsuranceCovered);
		Ti.API.info("Fetched expense:  id: " + fetchedId + ", injuryid: " + fetchedInjuryId +
											", expensedate: " + finalExpenseDate + ", expensename: " + fetchedExpenseName +
											", expensedetail: " + fetchedExpenseDetail + ", expenseamount: " + fetchedExpenseAmount +
											", insurancecovered: " + finalInsuranceCovered);

		expense = new Expense(fetchedId, fetchedInjuryId, finalExpenseDate, fetchedExpenseName, fetchedExpenseDetail, fetchedExpenseAmount, finalInsuranceCovered);
		expenses.push(expense);
  		expensesRS.next();
	}
	expensesRS.close();
	db.close();
	return expenses;
};

ExpensesDBI.prototype.getAllExpensesByInjuryId = function(injuryId) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();

	var expenses = [];
	var Expense = require('db/dbi/expenses/Expense').Expense;
	var expense;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var expensesRS = db.execute('SELECT ' + ID() + ' , ' + INJURY_ID() + ', ' +
											EXPENSE_DATE() + ', ' + EXPENSE_NAME() + ', ' +
											EXPENSE_DETAIL() + ', ' + EXPENSE_AMOUNT() + ', ' +
											INSURANCE_COVERED() +
								' FROM '+ EXPENSES() + ' WHERE ' + INJURY_ID() + ' = ?', injuryId);

	while (expensesRS.isValidRow()) {
		var fetchedId = expensesRS.fieldByName(ID());
		var fetchedInjuryId = expensesRS.fieldByName(INJURY_ID());
		var fetchedExpenseDate = expensesRS.fieldByName(EXPENSE_DATE());
		var finalExpenseDate = dbDateUtil.getDateFromSelect(fetchedExpenseDate);
		var fetchedExpenseName = expensesRS.fieldByName(EXPENSE_NAME());
		var fetchedExpenseDetail = expensesRS.fieldByName(EXPENSE_DETAIL());
		var fetchedExpenseAmount = expensesRS.fieldByName(EXPENSE_AMOUNT());
		var fetchedInsuranceCovered = expensesRS.fieldByName(INSURANCE_COVERED());
		var finalInsuranceCovered = dbBooleanUtil.getBooleanFromSelect(fetchedInsuranceCovered);
		/*
		Ti.API.info("Fetched expense:  id: " + fetchedId + ", injuryid: " + fetchedInjuryId +
											", expensedate: " + finalExpenseDate + ", expensename: " + fetchedExpenseName +
											", expensedetail: " + fetchedExpenseDetail + ", expenseamount: " + fetchedExpenseAmount +
											", insurancecovered: " + finalInsuranceCovered);
		*/
		expense = new Expense(fetchedId, fetchedInjuryId, finalExpenseDate, fetchedExpenseName, fetchedExpenseDetail, fetchedExpenseAmount, finalInsuranceCovered);
		expenses.push(expense);
  		expensesRS.next();
	}
	expensesRS.close();
	db.close();
	return expenses;
};

ExpensesDBI.prototype.getExistsArrayByInjuryIdByMonthYear = function(injuryId, monthYear, numDaysInMonth) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var currentMonth = monthYear.getMonth() + 1;	//to adjust for the month count starting at 0 (Jan)
	var currentYear = monthYear.getYear();

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	var expensesExist = [];
	//initial the array of booleans all to false
	//in fact, the value at position 0, will never be used since day number is always > 0
	for (var i=0; i <= numDaysInMonth; i++) {
		expensesExist.push(false);
	}

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var expensesRS = db.execute('SELECT ' + EXPENSE_DATE() + ' FROM ' + EXPENSES() +
								' WHERE ' + EXPENSE_DATE() + ' LIKE \'' + currentMonth + '-%-' + currentYear + '\' AND ' + INJURY_ID() + ' = ?', injuryId);

	while (expensesRS.isValidRow()) {
		var fetchedExpenseDateStr = expensesRS.fieldByName(EXPENSE_DATE());
		var dateComponents = fetchedExpenseDateStr.split("-");
		var day = dateComponents[1];

		expensesExist[day] = true;

  		expensesRS.next();
	}
	expensesRS.close();
	db.close();
	return expensesExist;
};

ExpensesDBI.prototype.expenseExists = function(injuryId, expenseDate) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());

	//execute the select
	var stringExpenseDate = dbDateUtil.getDateStringForSelect(expenseDate);
	var expensesRS = db.execute('SELECT ' + ID() + ' FROM '+ EXPENSES() +
								' WHERE ' + INJURY_ID() + ' = ? AND ' + EXPENSE_DATE() + ' = ?', injuryId, stringExpenseDate);
	var expenseExist = expensesRS.isValidRow();

	expensesRS.close();
	db.close();
	return expenseExist;
};

ExpensesDBI.prototype.insertExpense = function(expense) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//Instantiate the DatabaseDateUtil
	var DatabaseDateUtil = require('db/common/utils/DatabaseDateUtil').DatabaseDateUtil;
	var dbDateUtil = new DatabaseDateUtil();
	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	var stringExpenseDate = dbDateUtil.getDateStringForInsert(expense.getExpenseDate());
	var intInsuranceCovered = dbBooleanUtil.getBooleanIntForInsert(expense.getInsuranceCovered());
	db.execute('INSERT INTO ' + EXPENSES() + ' (' + INJURY_ID() + ', ' + EXPENSE_DATE() + ', '
							+ EXPENSE_NAME() + ', ' + EXPENSE_DETAIL() +  ', '
							+ EXPENSE_AMOUNT() + ', ' + INSURANCE_COVERED() +
							') VALUES (?, ?, ?, ?, ?, ?)', expense.getInjuryId(), stringExpenseDate, expense.getExpenseName(),
															expense.getExpenseDetail(), expense.getExpenseAmount(), intInsuranceCovered);
	var lastId = db.getLastInsertRowId();
	db.close();

	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
  var kafkaConfigs = kafkaConfigsCache.getKafkaConfigs();
	if (kafkaConfigs.getSendToKafkaEnabled()) {
	  var KafkaRestController = require('ctrls/kafkarest/KafkaRestController').KafkaRestController;
	  var kafkaRestController = new KafkaRestController(kafkaConfigs.getKafkaRestURL(), kafkaConfigs.getKafkaTopic());
	  kafkaRestController.produce('Expense: ' + expense.getExpenseName() + ', ' + expense.getExpenseDetail() + ', ' +
										expense.getExpenseAmount() + ', ' + expense.getInsuranceCovered() + ', ' + stringExpenseDate);
	}

	return lastId;
};

ExpensesDBI.prototype.updateExpense = function(expense) {
	var DBC = require('db/common/DBConstants').DBConstants;

	var DatabaseBooleanUtil = require('db/common/utils/DatabaseBooleanUtil').DatabaseBooleanUtil;
	var dbBooleanUtil = new DatabaseBooleanUtil();

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	var intInsuranceCovered = dbBooleanUtil.getBooleanIntForInsert(expense.getInsuranceCovered());
	db.execute('UPDATE ' + EXPENSES() + ' SET ' + EXPENSE_NAME() + ' = ?, ' + EXPENSE_DETAIL() + ' = ?, ' + EXPENSE_AMOUNT() + ' = ?, ' + INSURANCE_COVERED() + ' = ? WHERE '
							+ ID() + ' = ?', expense.getExpenseName(), expense.getExpenseDetail(), expense.getExpenseAmount(), intInsuranceCovered, expense.getId());
	db.close();

	var kafkaConfigsCache = require('db/dbi/settings/KafkaConfigsCache').KafkaConfigsCache;
	var kafkaConfigs = kafkaConfigsCache.getKafkaConfigs();
	if (kafkaConfigs.getSendToKafkaEnabled()) {
		var KafkaRestController = require('ctrls/kafkarest/KafkaRestController').KafkaRestController;
		var kafkaRestController = new KafkaRestController(kafkaConfigs.getKafkaRestURL(), kafkaConfigs.getKafkaTopic());
		kafkaRestController.produce('Expense: ' + expense.getExpenseName() + ', ' + expense.getExpenseDetail() + ', ' +
										expense.getExpenseAmount() + ', ' + expense.getInsuranceCovered());
	}
};

ExpensesDBI.prototype.deleteExpense = function(expenseId) {
	var DBC = require('db/common/DBConstants').DBConstants;

	//open the database
	var db = Ti.Database.open(DBC.PERSONAL_INJURY_TRACKER());
	db.execute('DELETE from ' + EXPENSES() + ' WHERE ' + ID() + ' = ?', expenseId);
	db.close();
};

ExpensesDBI.prototype.getExpensesOutputHeader = function() {
	return ',,Expense Date,Expense Name,Covered Amount, Uncovered Amount, Expense Detail,,\n';
};


exports.ExpensesDBI = ExpensesDBI;
