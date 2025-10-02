// app.js (frontend)
const API_URL = "http://localhost:4000/api/users";

// Referencias al DOM
const form = document.getElementById("userForm");
const lista = document.getElementById("lista");

// Cargar usuarios al iniciar
async function cargarUsuarios() {
  lista.innerHTML = ""; // limpiar lista
  const res = await fetch(API_URL);
  const data = await res.json();

  data.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `${u.nombre} (${u.email})`;
    lista.appendChild(li);
  });
}

// Manejar envío del formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  // Enviar al backend
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email })
  });

  // Limpiar formulario
  form.reset();

  // Recargar lista
  cargarUsuarios();
});

// Inicializar
cargarUsuarios();
