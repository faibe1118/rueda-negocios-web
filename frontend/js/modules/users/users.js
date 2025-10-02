const API_URL = "http://localhost:4000/api/users";

const form = document.getElementById("userForm");
const lista = document.getElementById("lista");

async function cargarUsuarios() {
  lista.innerHTML = "";
  const res = await fetch(API_URL);
  const data = await res.json();
  data.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `${u.nombre} (${u.email})`;
    lista.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email })
  });

  form.reset();
  cargarUsuarios();
});

cargarUsuarios();
