import Tree from './tree.js';
import { prettyPrint, generateRandomArray } from './utils.js';

console.log("Creating initial tree...");
const initialArray = generateRandomArray(15);
console.log("Initial Array:", initialArray);
const bst = new Tree(initialArray);

console.log("\n--- Checking Initial Balance ---");
console.log("Is balanced?", bst.isBalanced());

console.log("\n--- Printing Elements (Initial) ---");
console.log("Level Order:", bst.levelOrderForEach(val => process.stdout.write(val + " ")) || console.log());
console.log("Pre Order:  ", bst.preOrderForEach(val => process.stdout.write(val + " ")) || console.log());
console.log("Post Order: ", bst.postOrderForEach(val => process.stdout.write(val + " ")) || console.log());
console.log("In Order:   ", bst.inOrderForEach(val => process.stdout.write(val + " ")) || console.log());

console.log("\n--- Unbalancing the Tree ---");
const unbalancingNumbers = [150, 200, 250, 300, 350];
unbalancingNumbers.forEach(num => bst.insert(num));
console.log(`Inserted: ${unbalancingNumbers.join(", ")}`);

console.log("\n--- Checking Unbalanced State ---");
console.log("Is balanced?", bst.isBalanced());

console.log("\n--- Rebalancing the Tree ---");
bst.rebalance();

console.log("\n--- Checking Rebalanced State ---");
console.log("Is balanced?", bst.isBalanced());

console.log("\n--- Printing Elements (Rebalanced) ---");
console.log("Level Order:", bst.levelOrderForEach(val => process.stdout.write(val + " ")) || console.log());
console.log("Pre Order:  ", bst.preOrderForEach(val => process.stdout.write(val + " ")) || console.log());
console.log("Post Order: ", bst.postOrderForEach(val => process.stdout.write(val + " ")) || console.log());
console.log("In Order:   ", bst.inOrderForEach(val => process.stdout.write(val + " ")) || console.log());