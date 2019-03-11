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
		let OldChild = this;
		let OldChildLeft = this.left;
		let OldChildRight = this.right;
		let OldParentLeft = this.parent.left;
		let OldParentRight = this.parent.right;
		
		if (this == this.parent.right && this.parent.left !== null) {
			OldChild.parent = OldParent.parent;
			OldChild.right = OldParent;
			OldChild.left = OldParentLeft;
			OldParentLeft.parent = OldChild;
			OldParent.left = OldChildLeft;
			OldParent.right = OldChildRight;
			OldParent.parent = this;
		} else if (this == this.parent.left && this.parent.right !== null) {
			OldChild.parent = OldParent.parent;
			OldChild.left = OldParent;
			OldChild.right = OldParentRight;

			OldParentRight.parent = OldChild;
			OldParent.left = OldChildLeft;
			OldParent.right = OldChildRight;
			OldParent.parent = this;
		} else {
			OldChild.parent = OldParent.parent;
			OldParent.parent = OldChild;
			OldParent.left = OldChildLeft;
			OldParent.right = OldChildRight;
		}
		if (grandParent) {
			if (grandParent.left == OldParent) {
				grandParent.left = OldChild;
			} else if (grandParent.right == OldParent){
				grandParent.right = OldChild ;
			}
		}	
	}
	
}

module.exports = Node;