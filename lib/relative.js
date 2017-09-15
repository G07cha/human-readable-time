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
		result = checkIsSingle(now.getDate() - date.getDate(), 'day');
	} else if(now.getHours() > date.getHours()) {
		result = checkIsSingle(now.getHours() - date.getHours(), 'hour');
	} else if(now.getMinutes() > date.getMinutes()) {
		result = checkIsSingle(now.getMinutes() - date.getMinutes(), 'minute');
	} else if(now.getSeconds() > date.getSeconds()) {
		result = checkIsSingle(now.getSeconds() - date.getSeconds(), 'second');
	} else {
		result = 'Just now';
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
