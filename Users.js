const User = require('./User');
class Users {
    constructor() {
        this.users = [];
    }

    updateUser(username, password, age) {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === username) {
                this.users[i].setPassword(password);
                this.users[i].setAge(age);
                console.log('Update complete\n');
                break;
            }
        }
    }

    checkIfExist(username) {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === username) {
                return this.users[i];
            }
        }
        return null;
    }

    getUserAge(user) {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === user) {
                return this.users[i].getAge();
            }
        }
    }

    addUser(username, password, age) {
        var user = new User(username, password, age);
        var flag = 0;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === user.getName()) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.users.push(user);
            console.log('name created\n');
        } else {
            console.log("The username is already exist!");
        }

    }

    removeUser(username) {
        var flag = 0;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === username) {
                flag = 1;
                this.users.splice(i, 1);
                console.log('the name removed\n');
                break;
            }
        }
        if (flag === 0) {
            console.log("The Username doesn't exist!!");
        }
    }

    print() {
        if (this.users.length) {
            for (var i = 0; i < this.users.length; i++) {
                console.log(this.users[i].getName());
            }
        } else {
            console.log("There is not users in the list\n");
        }
    }
}

module.exports = Users;