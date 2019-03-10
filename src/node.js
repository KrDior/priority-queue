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
		if (this.parent == null) {
			return;
		} else if (this.parent.parent == null) {
			this.parent.parent = this;
		} else if (this.parent.parent !== null && this.parent.parent.parent == null){
			let elem = this.parent.parent;
	
			this.parent.parent = this;
			this.parent = elem;
		} 
	}
}

module.exports = Node;