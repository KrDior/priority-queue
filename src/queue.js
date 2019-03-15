const MaxHeap = require('./max-heap');

class Queue {
	constructor(max) {
		if (max) {
			this.maxSize = max;
		} else {
			this.maxSize = 30;
		}
		this.size2 = 0;
		this.heap = new MaxHeap();
		
	}
	push(data, priority) {
		if (this.size2 == this.maxSize) {
			throw new Error;
		}
		this.size2 += 1;
		this.heap.push(data, priority);
		
	}

	shift() {
		if (this.size2 == 0) {
			throw new Error;
		}
		this.size2 -= 1;
		return this.heap.pop();
	}

	size() {
		return this.size2;
	}

	isEmpty() {
		return (this.size2 == 0) ? true : false;
	}
}

module.exports = Queue;