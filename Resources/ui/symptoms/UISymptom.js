function UISymptom (symptomsPainAreaRowView, symptomsPainDetailsRowView) {
    this.symptomsPainAreaRowView = symptomsPainAreaRowView;
    this.symptomsPainDetailsRowView = symptomsPainDetailsRowView;
}

UISymptom.prototype.getSymptomsPainAreaRowView = function(){
	return this.symptomsPainAreaRowView;
};

UISymptom.prototype.setSymptomsPainAreaRowView = function(symptomsPainAreaRowView) {
    this.symptomsPainAreaRowView = symptomsPainAreaRowView;
};

UISymptom.prototype.getSymptomsPainDetailsRowView = function() {
	return this.symptomsPainDetailsRowView;
};

UISymptom.prototype.setSymptomsPainDetailsRowView = function(symptomsPainDetailsRowView) {
    this.symptomsPainDetailsRowView = symptomsPainDetailsRowView;
};

exports.UISymptom = UISymptom;