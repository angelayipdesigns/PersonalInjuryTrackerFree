//UIConstants Singleton Constructor
var UIConstants = (function() {

	function RELATIVE_HEADER_ROW_HEIGHT() {
		return 10;
	};
	//The icon width in the header row is equal to RELATIVE_HEADER_ROW_HEIGHT()
	//since it's square

	function RELATIVE_DATE_ROW_HEIGHT() {
		return 5;
	};

	function PERSONAL_INJURY_TRACKER() {
		return 'Personal Injury Tracker';
	}

	function COLOR_WHITE() {
		return '#FFFFFF';
	}

    function  COLOR_BLACK() {
    	return '#000000';
    }

	function COLOR_DARK_GREY() {
		return '#636363';
	}

	function COLOR_LIGHT_GREY() {
		return '#C2C2C2';
	}

	function COLOR_RED() {
		return '#C40B0B';
	}

	function COLOR_BLUE() {
		return '#0000FF';
	}

	function COLOR_GREEN() {
		return '#008000';
	}

	function COLOR_ORANGE() {
		return '#FFA500';
	}

	function COLOR_PURPLE() {
		return '#800080';
	}

  function ANDROID_BUTTON_FONT_SIZE() {
		return "12dp";
	}

	function FIELD_FONT_SIZE() {
		return "14dp";
	}

	function FIELD_BIG_FONT_SIZE() {
		return "16dp";
	}

	return {
		RELATIVE_HEADER_ROW_HEIGHT:RELATIVE_HEADER_ROW_HEIGHT,
		RELATIVE_DATE_ROW_HEIGHT:RELATIVE_DATE_ROW_HEIGHT,
		PERSONAL_INJURY_TRACKER:PERSONAL_INJURY_TRACKER,
		COLOR_WHITE:COLOR_WHITE,
		COLOR_BLACK:COLOR_BLACK,
		COLOR_DARK_GREY:COLOR_DARK_GREY,
		COLOR_LIGHT_GREY:COLOR_LIGHT_GREY,
		COLOR_RED:COLOR_RED,
		COLOR_BLUE:COLOR_BLUE,
		COLOR_GREEN:COLOR_GREEN,
		COLOR_ORANGE:COLOR_ORANGE,
		COLOR_PURPLE:COLOR_PURPLE,
		ANDROID_BUTTON_FONT_SIZE:ANDROID_BUTTON_FONT_SIZE,
		FIELD_FONT_SIZE:FIELD_FONT_SIZE,
		FIELD_BIG_FONT_SIZE:FIELD_BIG_FONT_SIZE,
	};
})();


exports.UIConstants = UIConstants;
