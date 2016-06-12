var assert = require('assert');
var hrt = require('../index');

describe('Incorrect arguments', function() {
	it('should throw error if called without arguments', function(done) {
		try {
			hrt();
		} catch(err) {
			done();
		}
	});
	
	it('should throw error if string given as dateTime(first argument)', function(done) {
		try {
			hrt('string');
		} catch(err) {
			done();
		}
	});
	
	it('should throw error if number given as dateTime(first argument)', function(done) {
		try {
			hrt(12345);
		} catch(err) {
			done();
		}
	});
	
	it('should throw error if object given as dateTime(first argument)', function(done) {
		try {
			hrt({'i am': 'an object'});
		} catch(err) {
			done();
		}
	});
	
	it('should throw error if non-string given as pattern(second argument)', function(done) {
		try {
			hrt(new Date(), 12345);
		} catch(err) {
			done();
		}
	});
	
	it('should throw error if non-object given as options(third argument)', function(done) {
		try {
			hrt(new Date(), 'pattern', 12345);
		} catch(err) {
			done();
		}
	});
});

describe('Pattern', function() {
	it('should return time with default pattern', function() {
		assert.equal(hrt(new Date(1970, 0, 1, 0, 0, 0, 0)), '00:00 01/01/1970');
	});
	
	it('should return year only', function() {
		assert.equal(hrt(new Date(0), '%YYYY%'), '1970');
	});
	
	it('should return month twice', function() {
		assert.equal(hrt(new Date(0), '%MM%/%MM%'), '01/01');
	});
	
	it('should return month with one digit', function() {
		assert.equal(hrt(new Date(0), '%M%'), '1');
	});
	
	it('should return year with two digits', function() {
		assert.equal(hrt(new Date(0), '%YY%'), '70');
	});
	
	it('should return day of week', function() {
		assert.equal(hrt(new Date(0), '%day%'), 'Thursday');
	});
	
	it('should return month', function() {
	    assert.equal(hrt(new Date(0), '%month%'), 'January');
	});
	
	it('should ignore pattern in words', function() {
		assert.equal(hrt(new Date(0), 'Today is %day%'), 'Today is Thursday');
	});
	
	it('should work fine with direct call', function() {
		var previousYear = new Date();
		previousYear.setFullYear(new Date().getFullYear() - 1);
		assert.equal(hrt(previousYear, '%relative% ago'), '1 year ago');
	})
});

describe('Currying function', function() {
	var curriedHrt;
	
	it('should return function', function() {
		curriedHrt = new hrt(new Date(1970, 0, 1, 0, 0, 0, 0));
		assert.equal(typeof(curriedHrt), 'function');
	});
	
	it('should be able to call new function with pattern as argument', function() {
		assert.equal(curriedHrt('%hh%:%mm%'), '00:00');
	});
	
	it('should return function based on date', function() {
		assert.equal(curriedHrt(new Date(1970, 0, 1, 0, 0, 0, 0)), '00:00 01/01/1970');
	});
	
	it('should return function based on pattern', function() {
		curriedHrt = new hrt('%hh%:%mm%');
		assert.equal(curriedHrt(new Date(1970, 0, 1, 0, 0, 0, 0)), '00:00');
	});

	it('should return function based on date and pattern', function() {
		curriedHrt = new hrt(new Date(1970, 0, 1, 0, 0, 0, 0), '%hh%:%mm%');
		assert.equal(curriedHrt(), '00:00');
	});
	
	it('should throw error if first argument not string and not date', function(done) {
		try {
			curriedHrt({});
		} catch(err) {
			done();
		}
	});
	
	it('should throw error if second argument not string', function(done) {
		try {
			curriedHrt(new Date(), {});
		} catch(err) {
			done();
		}
	});
	
	it('should work fine with relative option', function() {
		var previousYear = new Date();
		previousYear.setFullYear(new Date().getFullYear() - 1);
		curriedHrt = new hrt('%relative% ago');
		
		assert.equal(curriedHrt(previousYear), '1 year ago');
	});
});

describe('options', function() {
	it('should return shortened day', function() {
		assert.equal(hrt(new Date(0), '%day%', {'shortDay': true}), 'Thu');
	});
	
	it('should return time in 12 hour format', function() {
		assert.equal(hrt(new Date(1970, 0, 1, 12, 0, 0, 0), '%hh%:%mm%', {'shortTime': true}), '12:00 PM');
	});
	
	it('should return time in 12 hour format cutted to 1 PM', function() {
		assert.equal(hrt(new Date(1970, 0, 1, 13, 0, 0, 0), '%h%', {'shortTime': true}), '1 PM');
	});
	
	it('should return time in 12 hour format with forced position', function() {
		assert.equal(hrt(new Date(1970, 0, 1, 0, 0, 0, 0), '%12h% %hh%:%mm%', {'shortTime': true}), 'AM 00:00');
	});
});
