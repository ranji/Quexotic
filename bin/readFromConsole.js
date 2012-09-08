var readline = require('readline');
var Queue = require('../lib/queue');
var simpleStringHandler = require('./simpleStringHandler');
var anotherHandler = require('./anotherStringHandler');
var Message = require('../lib/message'); 

var message = new Message();
message.messageType = "string";
var queue = new Queue();

queue.on('enqueue', function(message) {
	var statusMessage = 'adding to queue: ' + message.body;
	console.log(statusMessage);
});

queue.addMessageHandler(simpleStringHandler,function(err,msg){});
queue.addMessageHandler(anotherHandler,function(err,msg){});

queue.on('polling', function(length) {
	if (length > 0) {
		var statusMessage = 'messages in queue: ' + length;
		console.log(statusMessage);
	}
});

queue.startPolling(1000,function(err,data){
	console.log(data);
});


rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('ENTER MESSAGE> ');
rl.prompt();

rl.on('line', function(line) {
	switch (line.trim()) {
	default:
		//raise an event to send message to sqs  
		message.body = line;
		queue.enqueue(message,function done(err,message){
				var statusMessage = 'callback called after queueing with err,msg: ' + err +', '+ message.body;
				console.log(statusMessage);
		});
		break;
	}
	rl.prompt();
}).on('close', function() {
	console.log('Have a great day!');
	process.exit(0);
});
