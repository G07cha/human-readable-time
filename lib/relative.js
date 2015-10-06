module.exports = function(date) {
	if(date === undefined) {
		throw new Error('No date provided');
	}
	if((date instanceof Date) === false) {
		throw new Error('Provided date is not an instance of a Date');
	}
	var now = new Date();
	var result = "";
	
	if(now.getFullYear() > date.getFullYear()) {
		result = checkIsSingle(now.getFullYear() - date.getFullYear(), 'year');
	} else if(now.getMonth() > date.getMonth()) {
		result = checkIsSingle(now.getMonth() - date.getMonth(), 'month');
	} else if(now.getDate() > date.getDate()) {
		if((now.getDate() - date.getDate()) === 1) {
			result = 'Yesterday';
		} else {
			result = (now.getDate() - date.getDate()) + 'days';
		}
	}
	
	return result;
}

function checkIsSingle(number, string) {
	var result = number + ' ' + string;
	if(number > 1) {
		result += 's';
	}
	
	return result;
}