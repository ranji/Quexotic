var assert = require("assert"),
	Queue = require("../lib/queue");

var queue;

beforeEach(function(){
	queue = new Queue();
})

describe('Queue', function(){
  describe('#enqueue()', function(){
    it('should enqueue and return message after', function(){
      	queue.enqueue("a message",function(err,message){
				assert.equal(message,'a message')
								})
      })
  })
})
