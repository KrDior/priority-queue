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
		let lastInsertedNode = this.parentNodes[this.parentNodes.length-1];
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