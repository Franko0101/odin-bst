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
        if (!this.root) return;

        const queue = [this.root];

        while (queue.length != 0) {
            if(queue[0].left)
                queue.push(queue[0].left)
            if(queue[0].right)
                queue.push(queue[0].right);
            if(queue.length != 0)
                callback(queue.shift());
        }
    }

    levelOrderForEachRec(callback) {
        if (typeof callback !== 'function')
            throw new Error("Argument is not a function");
        if (!this.root) return;

        const queue = [this.root];

        function levelOrderRec(queue, cb) {
            if (queue.length == 0)
            return;

            const node = queue[0];
            cb(node);
            queue.shift();
            
            if(node.left)
                queue.push(node.left);
            
            if(node.right) 
                queue.push(node.right);

            return levelOrderRec(queue, cb);
        }
        levelOrderRec(queue, callback);
    }

    preOrderForEach(root, callback) {
        if (typeof callback !== 'function')
            throw new Error("Argument is not a function");
        if (!root)
            return;

        callback(root);

        this.preOrderForEach(root.left, callback);
        this.preOrderForEach(root.right, callback);
    }

    inOrderForEach(root, callback) {
        if (typeof callback !== 'function')
            throw new Error("Argument is not a function");
        if (!root)
            return;

        this.inOrderForEach(root.left, callback);
        callback(root);
        this.inOrderForEach(root.right, callback);
    }

    postOrderForEach(root, callback) {
        if (typeof callback !== 'function')
            throw new Error("Argument is not a function");
        if (!root)
            return;

        this.postOrderForEach(root.left, callback);
        this.postOrderForEach(root.right, callback);
        callback(root);
    }

    height(value) {
        let current = this.root;
        let height = 0;
        while (current) {
            if (value == current.data) {
                console.log(`Altezza del Nodo: ${height}`)
                return height;
            }

            if (value > current.data) {
                current = current.right
                height++;
            }
            else{
                current = current.left;
                height++;
            }
        }
        console.log("Valore non presente")
        return null;
    }

    heightRec(root, value, height = 0) {
        if (!root) {
            console.log("Valore non presente");
            return null;
        }

        if(value == root.data) {
            console.log(`Altezza del Nodo: ${height}`)
            return height;
        }
        else if (value > root.data) {
            this.heightRec(root.right, value, height+1)
        }
        else{
            this.heightRec(root.left, value, height+1)
        }
    }

    static printNode(node) {
        process.stdout.write(`${node.data} `);
    }
}

const bst = new Tree([6, 2, 8, 5, 10, 4, 1]);

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

// bst.levelOrderForEachRec(Tree.printNode);
// console.log();
// bst.preOrderForEach(bst.root, Tree.printNode);
// console.log();
// bst.inOrderForEach(bst.root, Tree.printNode);
// console.log();
// bst.postOrderForEach(bst.root, Tree.printNode);
// console.log();
bst.heightRec(bst.root, 6)