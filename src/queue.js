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
		console.log('test1')
		if (this.size2 == 0) {
			throw new Error;
		}
		this.size2 -= 1;
		console.log(this.heap.root.data, this.heap.root.priority)
		//console.log(this.heap.root.left.data, this.heap.root.left.priority)
		//console.log(this.heap.root.right.data, this.heap.root.right.priority)
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