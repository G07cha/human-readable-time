module.exports = function(dateTime, pattern, options) {
	/*
	 * Validating arguments
	 */
	if(dateTime instanceof Date === false) {
		throw new Error('Provided date/time is not instance of Date');
	}
	
	if(options && typeof options !== 'object') {
		throw new Error('Options must be object');
	}
	
	if(pattern && typeof pattern !== 'string') {
		throw new Error('Pattern must be string');
	}
	
	// If no pattern provided setting default one
	var defaultPattern = pattern || '%hh%:%mm% %DD%/%MM%/%YYYY%';
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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
		}
	];
	
	filters.forEach(function(f) {
		defaultPattern = defaultPattern.replace(f.pattern, f.replacment);
	});
	
	return defaultPattern;
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
