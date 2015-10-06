var assert = require('assert');
var relative = require('../lib/relative');


describe('Incorrect call', function() {
	it('should throw error if called without arguments', function(done) {
		try {
			relative();
		} catch(err) {
			assert.equal(err.toString(), 
						 'Error: No date provided');
			done();
		}
	});
	
	it('should throw error if first argument not a Date type', function(done) {
		try {
			relative('string');
		} catch(err) {
			assert.equal(err.toString(), 
						 'Error: Provided date is not an instance of a Date');
			done();
		}
	});
});

describe('Relative timing', function() {
	it('should return several years', function() {
		var yearDifference = new Date().getFullYear() - new Date(0).getFullYear();
		assert.equal(relative(new Date(0)), yearDifference + ' years');
	});
	
	it('should return single year', function() {
		var previousYear = new Date();
		previousYear.setFullYear(new Date().getFullYear() - 1);
		assert.equal(relative(previousYear), '1 year');
	});
	
	it('should return single month');
	it('should return three days');
	it('should return single days');
	it('should return three hours');
	it('should return 10 minutes');
})