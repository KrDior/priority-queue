const Node = require('./node');

class MaxHeap {
	constructor() {
		this.heap = [];
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.heap = []) {
			return;
		}
		
	}

	detachRoot() {

	}

	restoreRootFromLastInsertedNode(detached) {

	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];

	}

	insertNode(node) {
		this.heap.push(node);
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes[0] = this.root;
			return;
		} else {
			let ParentIndex = this.parentNodes[0]
			if (!ParentIndex.left) {
				ParentIndex.left = node;
				this.parentNodes.push(node);
				// console.log('left', this.parentNodes)
			} else if (!ParentIndex.right) {
				ParentIndex.right = node;
				this.parentNodes.push(node);
				this.parentNodes.shift();
				// console.log('right',this.parentNodes)
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent !== null) {
			node.swapWithParent();
			this.shiftNodeUp(node);
		} else {
			let indextNode = this.parentNodes.indexOf(node);
			this.parentNodes[indextNode] = this.root;
			// console.log('0',this.parentNodes[0])
			// console.log('1',this.parentNodes[1])
			// console.log('2',this.parentNodes[2])
			this.root = node;
			this.parentNodes.reverse();
		}
		
	}
	shiftNodeDown(node) {

	}
}

module.exports = MaxHeap;