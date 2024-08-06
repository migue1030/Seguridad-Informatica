import { Auth } from './auth.js';
import { Storage } from './storage.js';
import { UI } from './ui.js';

const storage = new Storage();
const auth = new Auth(storage);
const ui = new UI();

// Verificar si el usuario ya está logueado
if (auth.isLoggedIn()) {
    window.location.href = 'index.html';
}

document.getElementById('registerSubmit').addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    if (auth.register(email, password)) {
        ui.showMessage('Registro exitoso');
        ui.showLogin();
    } else {
        ui.showMessage('El usuario ya existe');
    }
});

document.getElementById('loginSubmit').addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginResult = auth.login(email, password);
    if (loginResult.status === 'success') {
        window.location.href = 'index.html';
    } else if (loginResult.status === 'fail') {
        ui.showMessage(`Email o contraseña incorrectos. Intento ${loginResult.attempts} de 3`);
    } else if (loginResult.status === 'locked') {
        ui.showBlockMessage(loginResult.remainingTime);
    }
});

// Asignar funciones a los enlaces de "Sign up" y "Login"
document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    ui.showRegister();
});
document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    ui.showLogin();
});

// Prevenir el envío del formulario por defecto
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
});
