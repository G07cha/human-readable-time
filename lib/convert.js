var relative = require('./relative');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = function(dateTime, pattern, options) {
	if(options) {
		if(options.shortDay) {
			for(var i = days.length - 1; i ; i--) {
				days[i] = days[i].substring(0, 3);
			}
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
		
		return convert(dateTime, pattern, options);
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

// Be careful this fuction doesn't validate arguments!
function convert(dateTime, pattern, options) {
	// If no pattern provided setting default one
	var defaultPattern = pattern || '%hh%:%mm% %DD%/%MM%/%YYYY%';
	
	const filters = [
		{
			pattern: /%hh%/g,
			replacement: (function() {
				if(options && options.shortTime && dateTime.getHours() > 12) {
					return dateTime.getHours() - 12;
				} else {
					return validateForOneDigit(dateTime.getHours());
				}
			})()
		},
		{
			pattern: /%mm%/g,
			replacement: validateForOneDigit(dateTime.getMinutes())
		},
		{
			pattern: /%ss%/g,
			replacement: validateForOneDigit(dateTime.getSeconds())
		},
		{
			pattern: /%DD%/g,
			replacement: validateForOneDigit(dateTime.getDate())
		},
		{
			pattern: /%MM%/g,
			replacement: validateForOneDigit(dateTime.getMonth() + 1)
		},
		{
			pattern: /%YYYY%/g,
			replacement: validateForOneDigit(dateTime.getFullYear())
		},
		{
			pattern: /%YY%/g,	//TODO
			replacement: validateForOneDigit(dateTime.getFullYear().toString().slice(2))
		},
		{
			pattern: /%h%/g,
			replacement: (function() {
				if(options && options.shortTime && dateTime.getHours() > 12) {
					return dateTime.getHours() - 12;
				} else {
					return dateTime.getHours();
				}
			})()
		},
		{
			pattern: /%m%/g,
			replacement: dateTime.getMinutes()
		},
		{
			pattern: /%s%/g,
			replacement: dateTime.getSeconds()
		},
		{
			pattern: /%D%/g,
			replacement: dateTime.getDate()
		},
		{
			pattern: /%M%/g,
			replacement: dateTime.getMonth() + 1
		},
		{
			pattern: /%day%/g,
			replacement: days[dateTime.getDay()]
		},
		{
			pattern: /%month%/g,
			replacement: months[dateTime.getMonth()]
		},
		{
			pattern: /%relative%/g,
			replacement: relative(dateTime)
		},
		{
			pattern: /%12h%/g,
			replacement: (function() {
				if(options && options.shortTime) {
					if(dateTime.getHours() > 11) {
						return 'PM';
					} else {
						return 'AM';
					}
				}
			})()
		}
	];
	
	filters.forEach(function(f) {
		defaultPattern = defaultPattern.replace(f.pattern, f.replacement);
	});
	
	if(options && options.shortTime &&
	  pattern.indexOf('%12h%') === -1) {
		if(dateTime.getHours() > 11) {
			defaultPattern += ' PM';
		} else {
			defaultPattern += ' AM';
		}
	}

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
