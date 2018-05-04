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
    getChildren(){
        return this.children;
    }
    removeChildren(index) {
        return this.children.splice(index, 1)
    }

}

module.exports = Node;