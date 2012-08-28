var readline = require('readline');
var Queue = require('../lib/queue');
var simpleStringHandler = require('./simpleStringHandler');
var anotherHandler = require('./another_string_handler');
var Message = require('../lib/message'); 

var message = new Message();
message.message_type = "string";
var queue = new Queue();

queue.on('enqueue', function(message) {
	var statusMessage = 'adding to queue: ' + message.body;
	console.log(statusMessage);
});
/*
queue.on('dequeue', function(message) {
	var statusMessage = 'read from queue: ' + message;
	console.log(statusMessage);
});
*/

queue.addMessageHandler(simpleStringHandler);
queue.addMessageHandler(anotherHandler);

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
		message.body = line;
		queue.enqueue(message);
		break;
	}
	rl.prompt();
}).on('close', function() {
	console.log('Have a great day!');
	process.exit(0);
});
