let assert = require('assert');
let humanize_numbers = require('../humanize-time.js')({asText:false});
let humanize_text = require('../humanize-time.js')({asText:true});

describe('Time in numbers', function() {
    it('midnight', function(){
      assert.equal(humanize_numbers.time({hours:0,mins:0}), "midnight");
    });
    it('o clock', function(){
      assert.equal(humanize_numbers.time({hours:5,mins:0}), "5 o clock A.M.");
    });
    it('1 minute past', function(){
      assert.equal(humanize_numbers.time({hours:5,mins:1}), "1 minute past 5 A.M.");
    });
    it('2 minutes past', function(){
      assert.equal(humanize_numbers.time({hours:5,mins:2}), "2 minutes past 5 A.M.");
    });
    it('quarter past', function(){
      assert.equal(humanize_numbers.time({hours:0,mins:15}), "quarter past midnight");
    });
    it('half past', function(){
      assert.equal(humanize_numbers.time({hours:0,mins:30}), "half past midnight");
    });
    it('quarter to', function(){
      assert.equal(humanize_numbers.time({hours:0,mins:45}), "quarter to 1 A.M.");
    });
});

describe('Time with words', function() {
    it('o clock', function(){
      assert.equal(humanize_text.time({hours:5,mins:0}), "five o clock A.M.");
    });
    it('1 minute to', function(){
      assert.equal(humanize_text.time({hours:5,mins:59}), "one minute to six A.M.");
    });
    it('2 minutes to', function(){
      assert.equal(humanize_text.time({hours:5,mins:58}), "two minutes to six A.M.");
    });
    it('quarter past', function(){
      assert.equal(humanize_text.time({hours:6,mins:15}), "quarter past six A.M.");
    });
    it('half past', function(){
      assert.equal(humanize_text.time({hours:6,mins:30}), "half past six A.M.");
    });
    it('half past (PM)', function(){
      assert.equal(humanize_text.time({hours:18,mins:30}), "half past six P.M.");
    });
    it('quarter to', function(){
      assert.equal(humanize_text.time({hours:0,mins:45}), "quarter to one A.M.");
    });
});
