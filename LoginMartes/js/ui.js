export class UI {
    constructor() {
        this.loginBox = document.getElementById('loginBox');
        this.registerBox = document.getElementById('registerBox');
        this.message = document.createElement('div');
        this.message.id = 'message';
        const passwordField = document.getElementById('loginPassword');
        passwordField.parentNode.insertBefore(this.message, passwordField.nextSibling);
    }

    showRegister() {
        this.loginBox.style.display = 'none';
        this.registerBox.style.display = 'block';
    }

    showLogin() {
        this.registerBox.style.display = 'none';
        this.loginBox.style.display = 'block';
    }

    showMessage(text) {
        this.message.textContent = text;
        this.message.style.display = 'block';
        setTimeout(() => {
            this.message.style.display = 'none';
        }, 5000); // Mostrar el mensaje durante 5 segundos
    }

    showBlockMessage(seconds) {
        this.message.style.display = 'block';
        const interval = setInterval(() => {
            this.message.textContent = `Usuario bloqueado. Inténtelo de nuevo en ${seconds} segundos`;
            seconds--;
            if (seconds < 0) {
                clearInterval(interval);
                this.message.style.display = 'none';
            }
        }, 1000);
    }
}
