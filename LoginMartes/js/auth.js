export class Auth {
    constructor(storage) {
        this.storage = storage;
        this.failedAttempts = 0;
        this.lockedUntil = null;
    }

    register(email, password) {
        if (this.storage.userExists(email)) {
            return false;
        }
        this.storage.addUser(email, password);
        return true;
    }

    login(email, password) {
        if (this.isLocked()) {
            const remainingTime = Math.ceil((this.lockedUntil - new Date().getTime()) / 1000);
            return { status: 'locked', remainingTime };
        }

        const isValid = this.storage.checkCredentials(email, password);
        if (isValid) {
            const expirationTime = new Date().getTime() + 60000; // Tiempo actual + 1 minuto
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('sessionExpiration', expirationTime.toString());
            this.startExpirationTimer();
            this.failedAttempts = 0;
            return { status: 'success' };
        } else {
            this.failedAttempts++;
            if (this.failedAttempts >= 3) {
                this.lockedUntil = new Date().getTime() + 60000; // Bloquear por 1 minuto
                return { status: 'locked', remainingTime: 60 };
            }
            return { status: 'fail', attempts: this.failedAttempts };
        }
    }

    logout() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('sessionExpiration');
    }

    isLoggedIn() {
        const loggedIn = localStorage.getItem('loggedIn') === 'true';
        if (loggedIn) {
            const expirationTime = parseInt(localStorage.getItem('sessionExpiration'));
            if (new Date().getTime() > expirationTime) {
                this.logout();
                return false;
            }
            return true;
        }
        return false;
    }

    isLocked() {
        if (this.lockedUntil && new Date().getTime() < this.lockedUntil) {
            return true;
        }
        return false;
    }

    startExpirationTimer() {
        setTimeout(() => {
            this.logout();
            window.location.href = 'login.html';
        }, 60000); // 1 minuto
    }
}
