exports.message_type = 'string';
exports.handle = function(message) {
	console.log('handled string - ' + message.body);
}
