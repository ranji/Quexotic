var messageType = '';
var headers = [];
var body = {};

function Message() {
	if (!(this instanceof Message)) {
		return new Message();
	}
}

Message.prototype.messageType = messageType;
Message.prototype.headers = headers;
Message.prototype.body = body;
module.exports = Message;
