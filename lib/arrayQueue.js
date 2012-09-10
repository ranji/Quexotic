var queue = [];

function Queue() {
	if (false === (this instanceof Queue)) {
		return new Queue();
	}
}

Queue.prototype.push = function(message) {
	queue.push(message);
};

Queue.prototype.shift = function(callback) {
	
	var message = queue.shift();
	/*console.log('in');
	for(var i=0;i<1000000000;i++){
		//a blocking delay w/o using setTimeout
	}
	console.log('out');*/
	callback(null,message);
	
};

Queue.prototype.length = function() {
	return queue.length;
};


module.exports = Queue;
