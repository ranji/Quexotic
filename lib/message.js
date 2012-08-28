var message_type = '';
var headers = [];
var body = {};

function Message() {
	if (!(this instanceof Message)) {
		return new Message();
	}
}

Message.prototype.message_type = message_type;
Message.prototype.headers = headers;
Message.prototype.body = body;
module.exports = Message;
