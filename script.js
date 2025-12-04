// Actualiza la interfaz según si el usuario inició sesión
function updateUI() {
  const logged = localStorage.getItem('loggedUser');
  const authSection = document.getElementById('authSection');
  const main = document.getElementById('mainContent');
  const logoutBtn = document.getElementById('logoutBtn');

  if (logged) {
    authSection.style.display = 'none';
    main.style.display = 'block';
    logoutBtn.style.display = 'inline-block';
  } else {
    authSection.style.display = 'block';
    main.style.display = 'none';
    logoutBtn.style.display = 'none';
  }
}
updateUI();

// Selección de botones
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Registro de usuario
registerBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const authMessage = document.getElementById('authMessage');

  if (!email || !password) {
    authMessage.textContent = 'Completa todos los campos.';
    return;
  }

  if (localStorage.getItem('user_' + email)) {
    authMessage.textContent = 'El usuario ya existe.';
    return;
  }

  localStorage.setItem('user_' + email, password);
  authMessage.textContent = 'Registro exitoso. Ahora inicia sesión.';
});

// Inicio de sesión
loginBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const authMessage = document.getElementById('authMessage');

  const storedPass = localStorage.getItem('user_' + email);

  if (storedPass && storedPass === password) {
    localStorage.setItem('loggedUser', email);
    updateUI();
  } else {
    authMessage.textContent = 'Datos incorrectos.';
  }
});

// Cerrar sesión
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('loggedUser');
  updateUI();
});
