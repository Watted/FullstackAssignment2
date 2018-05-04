class User {
    constructor(username, password, age) {
        //private property
        this.username = username;
        this.password = password;
        this.age = age;
    }

    getName() {
        return this.username;
    }

    getAge() {
        return this.age;
    }

    setAge(age) {
        this.age = age;
    }

    setPassword(password) {
        this.password = password;
    }
}

module.exports = User;





