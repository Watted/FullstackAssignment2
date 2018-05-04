class Group {
    constructor(nameOfGroup) {
        this.nameOfGroup = nameOfGroup;
    }


    getName() {
        return this.nameOfGroup;
    }

    setGroupName(name) {
        this.nameOfGroup = name;
    }

}
module.exports = Group;