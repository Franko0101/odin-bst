class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        const newArray = this.stripArray(array);
        this.root = this.buildTree(newArray, 0, newArray.length-1);
    }

    stripArray(array) {
        const set = new Set(array);
        const noDupsSorted = Array.from(set);
        return noDupsSorted.toSorted((a,b) => a - b);
    }

    buildTree(array, start, end) {
        if (start > end) return null;

        let mid = Math.trunc((start + end) / 2);
        const newRoot = new Node(array[mid]);

        newRoot.left = this.buildTree(array, start, mid-1);
        newRoot.right = this.buildTree(array, mid+1, end);

        return newRoot;
    }

    prettyPrint (node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    };

    //Time Complexity: O(h)
    //Space Complexity: O(1)
    insert(value) {
        console.log(`Provo ad aggiungere ${value}`);

        if (this.find(value)) {
            console.log("Non aggiungo nulla");
            return null;
        } else
            console.log("Lo aggiungo");

        let current = this.root;
        const newNode = new Node(value);

        while (current) {
            if (value > current.data && current.right)
                current = current.right;
            else if (value < current.data && current.left)
                current = current.left;
            else break;
        }

        if (value > current.data)
            current.right = newNode;
        else
            current.left = newNode;

        console.log("Valore aggiunto con successo");
    }

    //Time Complexity: O(h)
    //Space Complexity: O(h)
    insertRec(root, value) {
        if (!root)
            return new Node(value);

        if (value > root.data)
            root.right = this.insertRec(root.right, value);
        else
            root.left = this.insertRec(root.left, value);

        return root;
    }

    delete(root, value) {
        if (!root)
            return null;

        if (value > root.data)
            root.right = this.delete(root.right, value);
        else if (value < root.data)
            root.left = this.delete(root.left, value);
        else {
            if (!root.left) 
                return root.right

            if (!root.right) 
                return root.left

            let node = root.right;
            while (node.left)
                node = node.left;

            return node;
        }

        return root;
    }

    find(value) {
        console.log(`Cerco il valore ${value}`);
        let current = this.root;
        while(current) {
            if (value == current.data) {
                console.log("Valore trovato");
                return current;
            }

            if (value > current.data)
                current = current.right
            else
                current = current.left;
        }

        console.log("Valore non trovato");
        return null;
    }

    findRec(root, value) {
        if (!root) {
            console.log("Valore non trovato");
            return null;
        }

        if (value == root.data) {
            console.log("Valore trovato");
            return root;
        }
        else if (value < root.data)
            return this.findRec(root.left, value);
        else
            return this.findRec(root.right, value);
    }

    levelOrderForEach(callback) {
        if (typeof callback !== 'function')
            throw new Error("Argument is not a function");

        const queue = [];
        queue.push(this.root);

        while (queue.length != 0) {
            if(queue[0].left)
                queue.push(queue[0].left)
            if(queue[0].right)
                queue.push(queue[0].right);
            if(queue.length != 0)
                callback(queue.splice(0,1).at(0));
        }
    }

    static printNode(node) {
        process.stdout.write(`${node.data} `);
    }
}

const array = [6, 2, 8, 5, 10, 4];
const bst = new Tree(array);

bst.prettyPrint(bst.root);
//bst.findRec(bst.root, 6);

//bst.insert(7);
//bst.insert(3);
// bst.prettyPrint(bst.root);

// bst.delete(bst.root, 7);
// bst.prettyPrint(bst.root);

// bst.levelOrderForEach((node) => {
//     process.stdout.write(`${node.data} `);
// })

bst.levelOrderForEach(Tree.printNode);