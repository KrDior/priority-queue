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
			let ParentIndex = this.parentNodes[0];

			if (!ParentIndex.left) {
				ParentIndex.left = node;
				this.parentNodes.push(node);
				//console.log('left', this.parentNodes)
			} else if (!ParentIndex.right) {
				ParentIndex.right = node;
				this.parentNodes.push(node);
				this.parentNodes.shift();
				// console.log('right',this.parentNodes)
			}
		}
		console.log(this.heap)
	}

	shiftNodeUp(node) {
		//console.log('startShift',this.heap[0].priority)

		if (node.parent !== null && node.priority > node.parent.priority) {
			//console.log(node.data, node.priority, node.parent.data)
			//console.log(node.parent.data, node.parent.priority)

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
			//console.log(this.heap)

			
		}

	}
	shiftNodeDown(node) {

	}
}

module.exports = MaxHeap;