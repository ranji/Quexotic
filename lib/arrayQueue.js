var queue = [];

function Queue() {
	if (false === (this instanceof Queue)) {
		return new Queue();
	}
}

Queue.prototype.push = function(message) {
	queue.push(message);
};

Queue.prototype.shift = function() {
	var	message = queue.shift(); 
	return message;
};

Queue.prototype.length = function(){
	return queue.length;
} ;


module.exports = Queue;

