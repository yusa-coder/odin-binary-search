import Node from './node.js';

export default class Tree {
  constructor(array) {
    const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = Tree.buildTree(sortedUniqueArray);
  }

  static buildTree(array) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = Tree.buildTree(array.slice(0, mid));
    node.right = Tree.buildTree(array.slice(mid + 1));
    return node;
  }

  includes(value) {
    let current = this.root;
    while (current) {
      if (value === current.data) return true;
      if (value < current.data) current = current.left;
      else current = current.right;
    }
    return false;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) { this.root = newNode; return; }
    let current = this.root;
    while (true) {
      if (value === current.data) return;
      if (value < current.data) {
        if (!current.left) { current.left = newNode; return; }
        current = current.left;
      } else {
        if (!current.right) { current.right = newNode; return; }
        current = current.right;
      }
    }
  }

  deleteItem(value) {
    this.root = this._deleteNode(this.root, value);
  }

  _deleteNode(node, value) {
    if (!node) return null;
    if (value < node.data) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteNode(node.right, value);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let successor = node.right;
      while (successor.left) successor = successor.left;
      node.data = successor.data;
      node.right = this._deleteNode(node.right, successor.data);
    }
    return node;
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required");
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      callback(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required");
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };
    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required");
    const traverse = (node) => {
      if (!node) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("Callback is required");
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };
    traverse(this.root);
  }

  height(value) {
    const node = this._findNode(value, this.root);
    if (!node) return undefined;
    return this._calcHeight(node);
  }

  _calcHeight(node) {
    if (!node) return -1;
    return 1 + Math.max(this._calcHeight(node.left), this._calcHeight(node.right));
  }

  depth(value) {
    return this._calcDepth(value, this.root, 0);
  }

  _calcDepth(value, node, currentDepth) {
    if (!node) return undefined;
    if (value === node.data) return currentDepth;
    if (value < node.data) return this._calcDepth(value, node.left, currentDepth + 1);
    return this._calcDepth(value, node.right, currentDepth + 1);
  }

  _findNode(value, node) {
    if (!node) return null;
    if (value === node.data) return node;
    if (value < node.data) return this._findNode(value, node.left);
    return this._findNode(value, node.right);
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (!node) return -1;
      const leftHeight = checkBalance(node.left);
      if (leftHeight === -1) return -1;
      const rightHeight = checkBalance(node.right);
      if (rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      return 1 + Math.max(leftHeight, rightHeight);
    };
    return checkBalance(this.root) !== -1;
  }

  rebalance() {
    const array = [];
    this.inOrderForEach((val) => array.push(val));
    this.root = Tree.buildTree(array);
  }
}