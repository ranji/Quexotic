var readline = require('readline');
var Queue = require('../lib/queue');
var simpleStringHandler = require('./simpleStringHandler');

var queue = new Queue();

queue.on('enqueue', function(message) {
	var statusMessage = 'adding to queue: ' + message;
	console.log(statusMessage);
});
/*
queue.on('dequeue', function(message) {
	var statusMessage = 'read from queue: ' + message;
	console.log(statusMessage);
});
*/

queue.addMessageHandler(simpleStringHandler);

queue.on('polling', function(length) {
	if (length > 0) {
		var statusMessage = 'messages in queue: ' + length;
		console.log(statusMessage);
	}
});

queue.startPolling(1000);


rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('ENTER MESSAGE> ');
rl.prompt();

rl.on('line', function(line) {
	switch (line.trim()) {
	default:
		//raise and event to send message to sqs  
		queue.enqueue(line);
		break;
	}
	rl.prompt();
}).on('close', function() {
	console.log('Have a great day!');
	process.exit(0);
});
