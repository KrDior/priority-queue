const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.size = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		//console.log('push',this.heap.length)
	}

	pop() {

		if (this.isEmpty()) {
			return;
		}

		// console.log(this.root.data)
		// console.log(this.root.left.data)
		// console.log(this.root.right.data)
		// console.log(this.root.left.left.data)

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
		let CurrentRootLeft = detached.left;
		let CurrentRootRight = detached.right;

		let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
		//console.log(detached.data)
		detached = lastInsertedNode;
		//console.log(detached.data)
		detached.left.parent = lastInsertedNode;
		detached.right.parent = lastInsertedNode;
		//console.log(detached.data)
		detached.left = CurrentRootLeft;
		detached.right = CurrentRootRight;

		lastInsertedNode.remove()


	}

	size() {
		return this.size;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];

	}

	insertNode(node) {
		this.size += 1;

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

	}
	shiftNodeDown(node) {
		let indextNode = this.parentNodes.indexOf(node);
		let indextChild = this.parentNodes.indexOf(node.left);

		if (node.left !== null && node.right !== null) {
			if (node.priority < node.left.priority && node.left.priority > node.right.priority) {
				//console.log('test_Left-right')
				if (node == this.root) {
					this.root = node.left;
				}
				if (this.parentNodes.indexOf(node.left) !== -1) {
					this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
				}
				node.left.swapWithParent();

				this.shiftNodeDown(node)
			} else if (node.priority < node.right.priority && node.left.priority < node.right.priority) {
				//console.log('test_left-Right')
				if (node == this.root) {
					this.root = node.right;
				}
				if (this.parentNodes.indexOf(node.right) !== -1) {
					this.parentNodes[this.parentNodes.indexOf(node.right)] = node;
				}
				node.right.swapWithParent();
				this.shiftNodeDown(node)
			}
		} else if (node.left !== null && node.right == null) {
			if (node.priority < node.left.priority) {
				//console.log('test_left')

				this.parentNodes[indextNode] = node.left;
				this.parentNodes[indextChild] = node;

				node.left.swapWithParent();
				this.shiftNodeDown(node)
			}
		} else if (node.left == null && node.right !== null) {
			if (node.priority < node.right.priority) {
				//console.log('test_right')
				this.parentNodes[indextNode] = node.right;
				this.parentNodes[indextChild] = node;

				node.right.swapWithParent();
				this.shiftNodeDown(node)
			}
		}


	}
}

module.exports = MaxHeap;