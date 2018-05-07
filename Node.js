const Group = require('./Group');
const User = require('./User');

class Node {
    constructor(data){
        this.data = new Group(data);
        this.parent = null;
        this.children = [];
    }
    getNameOfParent(){
        return this.parent.data.getName();
    }

    getParent(){
        return this.parent;
    }
    getData()
    {
        return this.data;
    }
    getNameOfData(){
        return this.data.getName();
    }
    getLength(){
        return this.children.length;
    }
    getChild(i){
        return this.children[i];
    }
    setChild(child){
        this.children.push(child);
    }
    checkIfExist(child){
        if (child === this.data.getName()){
            return true;
        }
        for (var i =0; i<this.children.length;i++){
            if (!(this.children[i] instanceof User)) {
                if (child === this.children[i].data.getName()) {
                    return true;
                }
            }
        }
        return false;
    }
    checkIfUser(){
        for (var i =0; i<this.children.length;i++){
            if (this.children[i] instanceof User) {
                return true;
            }
        }
        return false;
    }
    setChildUser(user){
        this.children.push(user);
    }
    getChildOthers(){
        for (var i =0 ;i<this.children.length;i++){
            if (this.children[i].getNameOfData()==="other"){
                return this.children[i];
            }
        }
    }
    setParent(parent){
        this.parent = parent;
    }
    setChildren(arr){
        this.children = arr;
    }
    getChildren(){
        return this.children;
    }
    removeChildren(index) {
        return this.children.splice(index, 1)
    }
    removeAllChildren(){
        this.children = [];
    }

}

module.exports = Node;