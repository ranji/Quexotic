exports.messageType = 'string';
exports.handle = function(message) {
	console.log('handled string by another handler - ' + message.body);
};