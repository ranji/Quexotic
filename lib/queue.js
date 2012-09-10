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
	queue.shift(function(err,message){
		self.emit('dequeue', message);
		callback(err, message);
	}); 
	
};

Queue.prototype.dequeueAll = function(callback) {
	var self = this;
	var length = queue.length();
	self.emit('polling', length);
	
	if (length === 0) callback("queue empty",null);
	
	if (length > 0) {
		self.dequeue(function(err,message){
			//do nothing
		});
		self.dequeueAll(callback);			 
	}	
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

module.exports = Queue;
