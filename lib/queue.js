var util = require('util');
var events = require('events');
var queueFactory = require('./queueFactory');

var queue = queueFactory.queueFrom('array');

function Queue() {
	if (false === (this instanceof Queue)) {
		return new Queue();
	}
	events.EventEmitter.call(this);
}
util.inherits(Queue, events.EventEmitter);

Queue.prototype.enqueue = function (item) {
	var self = this;
	self.emit('enqueue', item);
	queue.push(item); //specific to array queue
};
Queue.prototype.dequeue = function() {
	var self = this;
	var item = queue.shift(); //specific to array queue
	self.emit('dequeue', item);
};

Queue.prototype.startPolling = function(interval) {
	var self = this;
	setInterval(function() {
		pollAndDequeue(self);
	}, interval);
};

function pollAndDequeue(ee) {
	var length = queue.length;
	ee.emit('polling', length);
	if (length > 0) {
		var item = queue.shift(); //specific to array queue
		ee.emit('dequeue', item);
	}
}
module.exports = Queue;

