var util = require('util');
var events = require('events');
var queueFactory = require('./queueFactory');

var queue = queueFactory.queueFrom('array');
var handlers = [];
function Queue() {
	if (false === (this instanceof Queue)) {
		return new Queue();
	}
	events.EventEmitter.call(this);
}
util.inherits(Queue, events.EventEmitter);

Queue.prototype.enqueue = function(message) {
	var self = this;
	self.emit('enqueue', message);
	queue.push(message); //specific to array queue
};
Queue.prototype.dequeue = function() {
	var self = this;
	var message = queue.shift(); //specific to array queue
	self.emit('dequeue', message);
};

Queue.prototype.startPolling = function(interval) {
	var self = this;
	setInterval(function() {
		pollAndDequeue(self);
	}, interval);
};

Queue.prototype.addMessageHandler = function(handler) {
	handlers.push(handler);
	var self = this;
	self.on("dequeue", function(message) {
		if (typeof message === handler.messageType) {
			handler.handle(message);
		}
		//if handling fails put back in the queue??
	});
}

function pollAndDequeue(ee) {
	var length = queue.length;
	ee.emit('polling', length);
	if (length > 0) {
		var message = queue.shift(); //specific to array queue
		ee.emit('dequeue', message);
		pollAndDequeue(ee);
	}
}
module.exports = Queue;
