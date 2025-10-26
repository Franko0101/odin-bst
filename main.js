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

    insert(value) {
        let current = this.root;
        if (this.find(value)) {
            console.log("Valore gia presente");
            return null;
        }

        while (current) {

        }
        if (value > current.data) {
            if (current.right)
                current = current.right;
            else
                current.right = new Node(value);
        }
            
        else if (current < current.data)
            current = current.left

    }

    find(value) {
        let current = this.root;
        while(current) {
            if (value == current.data)
                return current;

            if (value > current.data)
                current = current.right
            else
                current = current.left;
        }

        console.log("Valore non trovato");
        return null;
    }
}

const array = [6, 2, 8, 5, 10, 4];
const bst = new Tree(array);

bst.prettyPrint(bst.root);
console.log(bst.find(8));
bst.insert(5);