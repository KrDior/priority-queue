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
		//console.log('push',this.heap.length)
	}

	pop() {
		// console.log(this.heap[0].priority)
		// console.log(this.heap[0].left.priority)
		// console.log(this.heap[0].right.priority)
		// console.log(this.heap[1].priority)
		// console.log(this.heap[2].priority)
		// console.log(this.heap[3].priority)


		/*if (this.heap[0] == undefined) {
			return;
		} else {
			/*while (this.heap.length > 0) {
				this.heap.pop()
			}

			let popped = this.heap.pop()

			if (popped.parent !== null) {
				if (popped.parent.left == popped) {
					popped.parent.left == null;
				} else {
					popped.parent.right == null;
				}
			}

		}*/
		

	}

	detachRoot() {
		let currentRoot = this.root;
		this.root = null;
		return currentRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastInsertedNode = this.heap[this.heap.length - 1];
	}

	size() {
		return this.heap.length;
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
			let CurrentParent = this.parentNodes[0];
			CurrentParent.appendChild(node);
			this.parentNodes.push(node);
			if (CurrentParent.right == node) {
				//console.log('RightParent', node.parent.right.data, node.parent.data)
				this.parentNodes.shift();
			}
			//console.log('leftParent', node.parent.left.data, node.parent.data)
		}
		
	}

	shiftNodeUp(node) {

		if (node.parent !== null && node.priority > node.parent.priority) {
			node.swapWithParent();
			this.shiftNodeUp(node);
		} else {
			let indextNode = this.parentNodes.indexOf(node);
			this.parentNodes[indextNode] = this.root;
			this.root = node;
			this.parentNodes.reverse();
			// console.log('node', node.data, node.priority)
			// console.log('leftNode', node.left.data, node.left.priority)
			// console.log('RightNode', node.right.data, node.right.priority)
			// console.log('leftLefttNode', node.left.left.data, node.left.left.priority)
			// console.log('leftLefttNode', node.left.left.parent.data, node.left.left.parent.priority)
		}

	}
	shiftNodeDown(node) {

	}
}

module.exports = MaxHeap;