export class Storage {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    addUser(email, password) {
        this.users.push({ email, password });
        this.saveUsers();
    }

    userExists(email) {
        return this.users.some(user => user.email === email);
    }

    checkCredentials(email, password) {
        return this.users.some(user => user.email === email && user.password === password);
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
}
