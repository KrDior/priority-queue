const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.size2 = 0;
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
		let LastRoot = this.root.data
		this.size2 -= 1;
		let detached = this.detachRoot()
		if (this.parentNodes.length == 0) {
			this.detachRoot()
			return LastRoot;
		} else {
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root)
			return detached.data;
		}
	}

	detachRoot() {

		if (this.parentNodes.length == 0) {
			return;
		}
		let currentRoot = this.root;
		this.root = null;
		if (this.parentNodes.indexOf(currentRoot) !== -1) {
			this.parentNodes.shift();
		}

		return currentRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		let CurrentRootLeft, CurrentRootRight;
		if (detached.left && detached.right) {
			CurrentRootLeft = detached.left;
			CurrentRootRight = detached.right;
		} else if (detached.left) {

			CurrentRootLeft = detached.left;
			CurrentRootRight = null;
		} else {

			return detached.data;
		}


		let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];

		if (this.parentNodes.indexOf(detached) !== -1) {

			this.parentNodes.shift();
		} else {
			if (detached.right == lastInsertedNode) {
				this.parentNodes.pop();
				this.parentNodes.unshift(lastInsertedNode);
			}
			if (lastInsertedNode.parent.right == lastInsertedNode && lastInsertedNode.parent !== detached) {
				this.parentNodes.pop();
				this.parentNodes.unshift(lastInsertedNode.parent);
			} else if (lastInsertedNode.parent.left == lastInsertedNode) {
				this.parentNodes.pop();
			}

		}

		this.root = lastInsertedNode;
		this.root.left = CurrentRootLeft;
		this.root.right = CurrentRootRight;
		if (this.root.right) {
			this.root.right.parent = lastInsertedNode;
		}
		if (this.root.left) {
			this.root.left.parent = lastInsertedNode;
		}

		this.root.left = CurrentRootLeft;
		this.root.right = CurrentRootRight;
		lastInsertedNode.remove()

	}

	size() {
		return this.size2;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];

	}

	insertNode(node) {
		this.size2 += 1;

		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes[0] = this.root;

			return;
		} else {
			let CurrentParent = this.parentNodes[0];
			CurrentParent.appendChild(node);
			this.parentNodes.push(node);
			if (CurrentParent.right == node) {
				this.parentNodes.shift();
			}

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