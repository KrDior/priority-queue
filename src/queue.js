const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.items = [];
		this.max = maxSize - 1;

		while (maxSize > 0) {
			this.queue.push(null);
			maxSize--;
		}
	}
	push(data, priority) {
		let qItem = new Node(data, priority);
	}

	shift() {

	}

	size() {
		return this.items.length;
	}

	isEmpty() {
		if (this.items.length == 0) {
			return true;
		};
	}
}

module.exports = PriorityQueue;