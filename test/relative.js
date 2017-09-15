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
	
	it('should return single month', function() {
		var previousMonth = new Date();
		previousMonth.setMonth(new Date().getMonth() - 1);
		assert.equal(relative(previousMonth), '1 month');
	});
	
	it('should return three days', function() {
		var threeDays = new Date();
		threeDays.setDate(new Date().getDate() - 3);
		assert.equal(relative(threeDays), '3 days');
	});
	
	it('should return one day', function() {
		var threeDays = new Date();
		threeDays.setDate(new Date().getDate() - 1);
		assert.equal(relative(threeDays), '1 day');
	});
	
	it('should return three hours', function() {
		var threeHours = new Date();
		threeHours.setHours(new Date().getHours() - 3);
		assert.equal(relative(threeHours), '3 hours');
	});
	
	it('should return 1 minute', function(done) {
		setTimeout(done, 60000);
		var tenMinutes = new Date();
		if(tenMinutes.getMinutes < 1) {
			this.slow(60000);
		}
		
		tenMinutes.setMinutes(new Date().getMinutes() - 1);
		assert.equal(relative(tenMinutes), '1 minute');
		done();
	});
	
	it('should return "Just now"', function() {
		assert.equal(relative(new Date()), 'Just now');
	});
})
