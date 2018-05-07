const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//direction to User.js
const Users = require('./Users');
const User = require('./User');
const Tree = require('./Tree');
let users = new Users();
let groups = null;

var choice=1;

menuOptions();

function menuOptions(){
    r1.question('0) Enter 0 to exit\n1) Enter 1 to create a name\n2) Enter 2 to delete a name.\n3) Enter 3 to print the list of users\n' +
        '4) Enter 4 to create a group\n5) Enter 5 to delete a group\n6) Enter 6 to print the list of groups\n' +
        '7) Enter 7 to add name to group\n8) Enter 8 to remove name from group\n9) Enter 9 to flattening all the group\n' +
        '10) Enter 10 to update name password and age\n', main);
    function main(input){
        choice = parseInt(input);
        switch (choice) {
            case 0:
                process.exit(1);
                break;
            case 1:
                createUser();
                break;
            case 2:
                deleteUser();
                break;
            case 3:
                printUsernames();
                break;
            case 4:
                createGroup();
                break;
            case 5:
                deleteGroup();
                break;
            case 6:
                printGroups();
                break;
            case 7:
                addUserToGroup();
                break;
            case 8:
                removeUserFromGroup();
                break;
            case 9:
                flatteningGroupUsers();
                break;
            case 10:
                updateUserOption();
                break;
            default:
                console.log("Wrong answer, please try again!!");
                menuOptions();
                break;
        }
    }
}

function updateUserOption() {
    var username,age,password;
    r1.question('input the username that you want to change it: ',updateUser);
    function updateUser(input) {
        username = input;
        if (users.checkIfExist(username)){
            r1.question('input a new password to change it: ', updatePassword);
        }
        else {
            console.log("the name name doesn't exist!\n");
            menuOptions();
        }
    }
    function updatePassword(input) {
        password = input;
        r1.question('input your age: ',updateAge);
    }
    function updateAge(input) {
        age = input;
        users.updateUser(username,password,age);
        menuOptions();
    }

}

function flatteningGroupUsers() {
    groups.flatting(groups.traverseBF);
    menuOptions();
}
function removeUserFromGroup() {
    var nameOfGroup, username;
    r1.question('input the username to delete: ',removeUser);
    function removeUser(input) {
        username = input;
        if (users.checkIfExist(username)) {
            r1.question('input the group name: ', groupName);
        }else{
            console.log("there was no username like: "+username);
            console.log('please try again\n');
            menuOptions();
        }
    }
    function groupName(input) {
        nameOfGroup = input;
        groups.removeUserFromGroup(username, nameOfGroup,groups.traverseBF);
        menuOptions();
    }
}


function addUserToGroup() {
    var nameOfGroup, username,user;
    r1.question('input the username: ',addUser);
    function addUser(input) {
        username = input;
        if (user = users.checkIfExist(username)) {
            r1.question('input the group name: ', addGroupName);
        }else{
            console.log("there was no username like: "+username);
            console.log('please try again\n');
            menuOptions();
        }
    }
    function addGroupName(input) {
        nameOfGroup = input;
        groups.addUserToGroup(user,nameOfGroup,groups.traverseBF);
        menuOptions();
    }

}

/////////////////////////////////
function createUser() {
    var username, password, age;
    r1.question('input your username: ', passwordQuestion);

    function passwordQuestion(input) {
        username = input;
        r1.question('input your password: ', ageQuestion);
    }

    function ageQuestion(input) {
        password = input;
        r1.question('input your age: ', lastThing);
    }

    function lastThing(input) {
        age = input;
        users.addUser(username, password, age);
        menuOptions();
    }
}
function deleteUser() {
    var username;
    r1.question('input the username to delete: ',usernameToDelete);
    function usernameToDelete(input) {
        username = input;
        users.removeUser(username);
        //groups.removeUserFromGroup(username,'allGroups');
        menuOptions();

    }
}
function printUsernames() {
    users.print();
    menuOptions();
}
function deleteGroup() {
    var groupName;
    r1.question('input the group name to delete: ',groupToDelete);
    function groupToDelete(input) {
        groupName = input;
        if (groups.getLength()>0){
            r1.question('input another group that the first one exist under it: ',parentGroup);
        } else {
            if (groups.checkTheRootIfExist(groupName)){
                groups = null;
            }
        }
        menuOptions();
    }
    function parentGroup(input) {
        var parent = input;
        groups.remove(groupName,parent,groups.traverseBF);
        menuOptions();
    }

}
/////////////////////////////////////////////////////////
function createGroup() {
    var nameOfGroup;
    r1.question('input the group name: ', addGroupName);

    function addGroupName(input) {
        nameOfGroup = input;
        if (groups === null) {
            groups = new Tree(nameOfGroup);
            menuOptions();
        }
        else{
            r1.question('please input name of group to putted under it: ',parentGroup );
        }
    }
    function parentGroup(input) {
        var parent = input;
        groups.add(nameOfGroup,parent,groups.traverseBF);
        menuOptions();
    }
}
function printGroups() {

    if (groups!==null) {
        groups.traverseBF(function (node) {
            if (node instanceof User) {
                console.log(node.getName());
            }else {
                console.log(node.getNameOfData()+' ('+node.getLength()+')');
            }
        });
    }else {
        console.log("There no group in the list!!");
    }
    menuOptions();

}
