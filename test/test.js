var assert = require('assert');
var hrt = require('../index.js');

describe('Incorrect values', function() {
	it('should throw error if string given as first parameter', function(done) {
		try {
			hrt('string');
		} catch(err) {
			done();
		}
	});
	
	it('should throw error if number given as first parameter', function(done) {
		try {
			hrt(12345);
		} catch(err) {
			done();
		}
	});
	
	it('should throw error if object given as first parameter', function(done) {
		try {
			hrt({'i am': 'an object'});
		} catch(err) {
			done();
		}
	});
	
	it('should throw error if non-object given as second parameter', function(done) {
		try {
			hrt(new Date(), 'string');
		} catch(err) {
			done();
		}
	});
	
	it('should throw error if non-string given as third parameter', function(done) {
		try {
			hrt(new Date(), {}, 12345);
		} catch(err) {
			done();
		}
	});
});

describe('Converting', function() {
	it('should return time with default pattern', function() {
		assert.equal(hrt(new Date(0)), '02:00 01/00/1970');
	});
	
	it('should return year only', function() {
		assert.equal(hrt(new Date(0), {}, 'YYYY'), '1970');
	});
	
	it('should return month twice', function() {
		assert.equal(hrt(new Date(0), {}, 'MM/MM'), '00/00');
	});
	
	it('should return month with one digit', function() {
		assert.equal(hrt(new Date(0), {}, 'M'), '0');
	});
	
	it('should return year with two digits', function() {
		assert.equal(hrt(new Date(0), {}, 'YY'), '70');
	});
	
	it('should return day of week', function() {
		assert.equal(hrt(new Date(0), {}, 'day'), 'Thursday');
	});
});