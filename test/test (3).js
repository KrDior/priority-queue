class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.right = null;
		this.left = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			node.parent = this;
		} else if (this.left !== null && this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
			node.parent = null;
		} else if (this.right == node) {
			this.right = null;
			node.parent = null;
		} else {
			throw new Error;
		}
	}

	remove() {
		if (this.parent == null) {
			return;
		} else {
			this.parent.removeChild(this);
		}

	}

	swapWithParent() {
		if (this.parent == undefined) {
			return;
		}
		let grandParent = this.parent.parent;
		let OldParent = this.parent;
		let OldParentLeft = this.parent.left;
		let OldParentRight = this.parent.right;
		let OldChild = this;
		let OldChildLeft = this.left;
		let OldChildRight = this.right;

		if (this == this.parent.left) {
			if (this.parent.right !== null) {
				OldParentRight.parent = OldChild;
			}
			if (OldChildLeft && OldChildRight == undefined) {
				OldChildLeft.parent = OldParent;
			} else if (OldChildLeft && OldChildRight) {
				OldChildLeft.parent = OldParent;
				OldChildRight.parent = OldParent;
			}
			OldChild.parent = OldParent.parent;
			OldChild.left = OldParent;
			OldChild.right = OldParentRight;
			OldParent.left = OldChildLeft;
			OldParent.right = OldChildRight;
			OldParent.parent = this;


		} else if (this == this.parent.right) {
			if (this.parent.left !== null) {
				OldParentLeft.parent = OldChild;
			}
			if (OldChildLeft && OldChildRight == undefined) {
				OldChildLeft.parent = OldParent;
			} else if (OldChildLeft && OldChildRight) {
				OldChildLeft.parent = OldParent;
				OldChildRight.parent = OldParent;
			}
			OldChild.parent = OldParent.parent;
			OldChild.right = OldParent;
			OldChild.left = OldParentLeft;



			OldParent.left = OldChildLeft;
			OldParent.right = OldChildRight;
			OldParent.parent = this;

		}
		if (grandParent) {
			if (grandParent.left == OldParent) {
				grandParent.left = OldChild;
			} else if (grandParent.right == OldParent) {
				grandParent.right = OldChild;
			}
		}

	}

}

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
		this.size2 -= 1;
		if (this.isEmpty()) {
			return;
		}
		let detached = this.detachRoot()

		if (this.parentNodes.length == 0) {
			this.detachRoot()
			if (!detached) {
				this.restoreRootFromLastInsertedNode();
			}
		} else {
			//console.log('test2')
			//console.log(detached.priority)
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root)
			//console.log(this)
		}

		// console.log(this.root.left.priority)
		// console.log(this.root.right.priority)


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

		let CurrentRootLeft = detached.left;
		let CurrentRootRight = detached.right;

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

		this.root.left.parent = lastInsertedNode;
		this.root.right.parent = lastInsertedNode;

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
const h = new MaxHeap();
h.push(42, 15);
h.push(15, 14);
h.push(0, 16);
h.push(100, 100);
h.pop()