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

Queue.prototype.enqueue = function(message,callback) {
	var self = this;
	var err;
	try {
		queue.push(message);
	} catch (error) {
		err = error;
	}
	self.emit('enqueue', message);
	callback( null,message);
};

Queue.prototype.dequeue = function(callback) {
	var self = this;
	var message;
	try {
		message = queue.shift(); 
	} catch (err) {
		callback(err, message);
	}
	self.emit('dequeue', message);
	callback(null, message);
};

Queue.prototype.startPolling = function(interval, callback) {
	var self = this;
	setInterval(function() {
		self.dequeueAll(callback);
	}, interval);
};

Queue.prototype.addMessageHandler = function(handler, callback) {
	handlers.push(handler);
	var self = this;
	self.on("dequeue", function(message) {
		if (message.messageType === handler.messageType) {
			handler.handle(message); //move call back here
			callback(null,message);
		}
		//if handling fails put back in the queue??
	});
};

Queue.prototype.dequeueAll = function(callback) {
	var self = this;
	var length = queue.length();
	if (length === 0) callback(null,"queue empty");
	
	self.emit('polling', length);
	if (length > 0) {
		var message = queue.shift(); //specific to array queue
		self.emit('dequeue', message);
		self.dequeueAll(callback);
	}	
};
module.exports = Queue;
