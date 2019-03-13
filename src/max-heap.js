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
		console.log(this.heap[0].priority)
		console.log(this.heap[0].left.priority)
		console.log(this.heap[0].right.priority)
		console.log(this.heap[1].priority)
		console.log(this.heap[2].priority)
		console.log(this.heap[3].priority)

		//console.log(this.heap)
		if (this.heap[0] == undefined) {
			return;
		}

		let popped = this.heap.pop()
		//console.log(popped.data)

		if (popped.parent !== null) {
			if (popped.parent.left == popped) {
				popped.parent.left == null;
			} else {
				popped.parent.right == null;
			}
		}

	}




	detachRoot() {
		let currentRoot = this.root;
		this.root = null;
		if (this.parentNodes.indexOf(currentRoot) !== -1) {
			this.parentNodes.shift();

		}
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


		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes[0] = this.root;
			this.heap.push(node);
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

		let OldParent = node.parent;
		let indextParent = this.parentNodes.indexOf(node.parent);
		let indextNode = this.parentNodes.indexOf(node);

		if (node.parent !== null && node.priority > node.parent.priority) {


			node.swapWithParent();
			if (node.left && node.right) {
				this.parentNodes[indextNode] = OldParent;
			} else if (!node.left || !node.right) {
				this.parentNodes[indextNode] = OldParent;
				this.parentNodes[indextParent] = node;
			}
			this.shiftNodeUp(node);
		} else {

			if (node.parent == null) {
				this.root = node;
			}

			
		}
		//console.log('else', OldParent.data)
		//this.parentNodes.reverse();

		// console.log(this.parentNodes[0].data, this.parentNodes[0].priority)
		// console.log(this.parentNodes[1].data, this.parentNodes[1].priority)
		// console.log(this.parentNodes[2].data, this.parentNodes[2].priority)


	}
	shiftNodeDown(node) {

	}
}

module.exports = MaxHeap;