var ArrayQueue = require("./arrayQueue");

function queueFrom(queueType) {
	switch (queueType.trim()) {
	case 'array':
		return new ArrayQueue();
	default:
		return new ArrayQueue();
	}
};
exports.queueFrom = queueFrom;

