var relative = require('./relative');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = function(dateTime, pattern, options) {
	if(options && options.shortDay) {
		for(var i = days.length - 1; i ; i--) {
			days[i] = days[i].substring(0, 3);
		}
	}
	
	if(this.constructor === module.exports) {
		// Called as constructor
		var _dateTime;
		var _pattern;
		var _options = options;

		// If first argument is pattern assigning it to _pattern
		if(typeof dateTime === 'string') {
			_pattern = dateTime;
		} else {
			_dateTime = dateTime;
			_pattern = pattern;
		}

		return function(dateOrPattern, pattrn) {
			if(pattrn) {
				validate.all(dateOrPattern, pattrn, _options);

				return convert(dateOrPattern, pattrn);
			}

			if(dateOrPattern) {
				if(dateOrPattern instanceof Date) {
					return convert(dateOrPattern, _pattern);
				} else if(typeof dateOrPattern === 'string') {
					return convert(_dateTime, dateOrPattern);
				} else {
					throw new TypeError('Unknow type of first argument, expected Date or String but recieved <' + typeof dateOrPattern + '>');
				}
			} else {
				validate.all(_dateTime, _pattern, options);
				return convert(_dateTime, _pattern);
			}
		}
	} else {
		// Called as function
		validate.all(dateTime, pattern, options);
		
		return convert(dateTime, pattern);
	} 
}

/**
 * Add 0 if number less than 10 to display proper date/time format
 * @param   {Number} number 
 * @returns {String/Number} Value with 0 on start if number less than 10, else return given number
 */
function validateForOneDigit(number) {
	if(number < 10) {
		return '0' + number;
	} else {
		return number;
	}
}

// Becareful this fuction don't validate arguments!
function convert(dateTime, pattern) {
	// If no pattern provided setting default one
	var defaultPattern = pattern || '%hh%:%mm% %DD%/%MM%/%YYYY%';
	
	const filters = [
		{
			pattern: /%hh%/g,
			replacment: validateForOneDigit(dateTime.getHours())
		},
		{
			pattern: /%mm%/g,
			replacment: validateForOneDigit(dateTime.getMinutes())
		},
		{
			pattern: /%ss%/g,
			replacment: validateForOneDigit(dateTime.getSeconds())
		},
		{
			pattern: /%DD%/g,
			replacment: validateForOneDigit(dateTime.getDate())
		},
		{
			pattern: /%MM%/g,
			replacment: validateForOneDigit(dateTime.getMonth())
		},
		{
			pattern: /%YYYY%/g,
			replacment: validateForOneDigit(dateTime.getFullYear())
		},
		{
			pattern: /%YY%/g,	//TODO
			replacment: validateForOneDigit(dateTime.getFullYear().toString().slice(2))
		},
		{
			pattern: /%h%/g,
			replacment: dateTime.getHours()
		},
		{
			pattern: /%m%/g,
			replacment: dateTime.getMinutes()
		},
		{
			pattern: /%s%/g,
			replacment: dateTime.getSeconds()
		},
		{
			pattern: /%D%/g,
			replacment: dateTime.getDate()
		},
		{
			pattern: /%M%/g,
			replacment: dateTime.getMonth()
		},
		{
			pattern: /%day%/g,
			replacment: days[dateTime.getDay()]
		},
		{
			pattern: /%month%/g,
			replacment: months[dateTime.getMonth()]
		},
		{
			pattern: /%relative%/g,
			replacment: relative(dateTime)
		}
	];
	
	filters.forEach(function(f) {
		defaultPattern = defaultPattern.replace(f.pattern, f.replacment);
	});

	return defaultPattern;
}

/*
 * Validating arguments
 */
var validate = {
	date: function(date) {
		if(date instanceof Date === false) {
			throw new TypeError('Provided argument is not instance of Date');
		} else {
			return true;
		}
	},

	pattern: function(pattern) {
		if(pattern && typeof pattern !== 'string') {
			throw new TypeError('Pattern must be string');
		} else {
			return true;
		}
	},

	options: function(options) {
		if(options && typeof options !== 'object') {
			throw new TypeError('Options must be object');
		} else {
			return true;
		}
	},

	all: function(date, pattern, options) {
		this.date(date);
		this.pattern(pattern);
		this.options(options);
	}
}
