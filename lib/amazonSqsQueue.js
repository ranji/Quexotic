function AmazonSqsQueue(options) {
	if (!(this instanceof Queue)) {
		return new AmazonSqsQueue();
	}
//set the connection params etc
}

AmazonSqsQueue.prototype.push = function (item) {
	//push on to sqs queue
}

AmazonSqsQueue.prototype.shift = function() {
	//get the top one out of the queue
	//return it
}

module.exports = AmazonSqsQueue;
