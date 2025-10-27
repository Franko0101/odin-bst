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

    delete(value) {
        if (!this.find(value)) {
            console.log("Impossibile rimuoverlo");
            return null;
        } else
            console.log("Lo cancello");

        let current = this.root;
        while (current) {
            if (value > current.data && current.right) {
                if (value == current.right.data)
                    break;
                else
                    current = current.right;
            }
            else if (value < current.data && current.left) {
                if (value == current.left.data)
                    break;
                else
                    current = current.left;
            }
            else break;
        }

        if (value == current.right.data) {
            if (!current.right.right && !current.right.left)
                current.right = null;
        } else {
            if (!current.left.right && !current.left.left)
                current.left = null;
        }
    }

    deleteRec(root, value) {
        if (!root)
            return null;

        if (value > root.data)
            root.right = this.deleteRec(root.right, value);
        else if (value < root.data)
            root.left = this.deleteRec(root.left, value);
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
}

const array = [6, 2, 8, 5, 10, 4];
const bst = new Tree(array);

bst.prettyPrint(bst.root);
bst.find(7);

bst.insert(7);
bst.insert(3);
bst.prettyPrint(bst.root);

bst.deleteRec(bst.root, 7);
bst.prettyPrint(bst.root);