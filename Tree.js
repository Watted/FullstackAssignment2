const Node = require('./Node');
const Queue = require('./Queue');
const Group = require('./Group');
const User = require('./User');
class Tree {
    constructor(data) {

        this._root =  new Node(data);
    }
    removeUserFromGroup(data, nameOfGroup,traversal){
        var tree = this,
            parent = null,
            childToRemove = null,
            index;

        var callback = function(node) {
            if (node instanceof User){

            }else if (node.getNameOfData() === nameOfGroup) {
                parent = node;
            }
        };

        this.contains(callback, traversal);

        if (parent) {
            index = this.findIndex(parent.getChildren(), data);

            if (index === undefined) {
                console.log('User to remove does not exist in this group.');
            } else {
                childToRemove = parent.removeChildren(index);
            }
        } else {
            console.log('Group does not exist');
        }

        return childToRemove;
    }

    flatting(traversal){
        var tree = this,
            parent = null,
            childToRemove = null,
            index;

        var callback = function(node) {
            if (node instanceof User){

            }else {
                parent = node;
            }
        };

        this.contains(callback, traversal);

        if (parent) {
            var children = parent.getChildren();
            var dataOfParent = parent.getParent();
            this.remove(parent.getNameOfData(),parent.getNameOfParent(),this.traverseBF);
            for (var i =0; i<children.length;i++){
                dataOfParent.setChild(children[i]);
            }
        }

    }


    addUserToGroup(user,nameOfGroup,traversal){
        var parent = null,
            callback = function(node) {
                if (node instanceof User){

                }else if (node.getNameOfData() === nameOfGroup) {
                    parent = node;
                }
            };

        this.contains(callback, traversal);
        if (parent) {
            var flag = this.checkGroup(parent);
            if ( flag ===0 || flag===2){
                parent = parent.getChildOthers();
            }
            parent.setChildUser(user);
        } else {
            console.log('Cannot add user to a non-existent group.');
        }
    }

    checkGroup(parent){
        var arr = parent.getChildren();
        var flag = 1;
        for (var i= 0;i<arr.length;i++) {
            if (arr[i].getData() instanceof Group){
                flag = 0;
                if (arr[i].getNameOfData() === "other"){
                    flag=2;
                    break;
                }

            }
        }
        if (flag ===0) {
            this.add("other", parent.getNameOfData(), this.traverseBF);
        }
        return flag;
    }


    ///////////////////////////////
    add(data, toData, traversal) {
        var child = new Node(data),
            parent = null,
            callback = function(node) {
                if (node instanceof User){

                }else {
                    if (node.getNameOfData() === toData) {
                        parent = node;
                    }
                }
            };

        this.contains(callback, traversal);

        if (parent) {
            /////////
            if (!parent.checkIfExist(child.getNameOfData())){
                if ( !parent.checkIfUser()) {
                    parent.setChild(child);
                    child.setParent(parent);
                }else {
                    var children = parent.getChildren();
                    parent.removeAllChildren();
                    this.add("other", parent.getNameOfData(), this.traverseBF);
                    parent.setChild(child);
                    child.setParent(parent);
                    parent = parent.getChildOthers();
                    for (var i =0 ;i<children.length;i++) {
                        parent.setChild(children[i]);
                    }
                }
            }else {
                console.log('Cannot add this group, There is group name like it.');
            }
        } else {
            console.log('Cannot add group to a non-existent group.');
        }
    }
    traverseDF(callback) {

        // this is a recurse and immediately-invoking function
        (function recurse(currentNode) {
            // step 2
            for (var i = 0; i < currentNode.getLength(); i++) {

                // step 3
                recurse(currentNode.getChild(i));
            }

            // step 4
            callback(currentNode);

            // step 1
        })(this._root);

    }
    traverseBF(callback) {
        var queue = new Queue();

        queue.enqueue(this._root);

        var currentTree = queue.dequeue();
        var flag =0;
        while(currentTree){
            if (currentTree instanceof User) {
                flag = 1;
            }
            if (flag === 0) {
                for (var i = 0; i < currentTree.getLength(); i++) {
                    queue.enqueue(currentTree.children[i]);
                }
            }


            callback(currentTree);
            currentTree = queue.dequeue();
        }
    }
    contains(callback, traversal) {
        traversal.call(this, callback);
    }



    remove(data, fromData, traversal) {
        var tree = this,
            parent = null,
            childToRemove = null,
            index;

        var callback = function(node) {
            if (node instanceof User){

            } else {
                if (node.getNameOfData() === fromData) {
                    parent = node;
                }
            }
        };


        this.contains(callback, traversal);

        if (parent) {
            index = this.findIndex(parent.getChildren(), data);

            if (index === undefined) {
                console.log('group to remove does not exist.');
            } else {
                childToRemove = parent.removeChildren(index);
            }
        } else {
            console.log('group does not exist.');
        }

        return childToRemove;
    }

    findIndex(arr, data) {
        var index;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] instanceof User){
                if (arr[i].getName()===data){
                    index = i;
                }
            }else {
                if (arr[i].getNameOfData() === data) {
                    index = i;
                }
            }
        }

        return index;
    }
    checkTheRootIfExist(groupName){
        return groupName === this._root.getNameOfData()?true:false;
    }
    getLength(){
        return this._root.getLength();
    }

}
module.exports = Tree;
