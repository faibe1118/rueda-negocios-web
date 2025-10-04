        // Loader
    window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const main = document.getElementById("mainContent");

    loader.classList.add("animate__animated", "animate__fadeOut");
    setTimeout(() => {
        loader.style.display = "none";
        main.classList.remove("opacity-0");
    }, 800);
    });

    // Logo → volver al dashboard
    document.getElementById("logo").addEventListener("click", () => {
    window.location.href = "/frontend/js/modules/logueado/logueado.html";
    });

    // Cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "/frontend/js/modules/dashboard/dashboard.html";
    });

    // Cargar datos del usuario
    document.addEventListener("DOMContentLoaded", () => {
    const userData = localStorage.getItem("user");
    if (userData) {
        try {
        const user = JSON.parse(userData);
        if (user.username) document.getElementById("profileName").textContent = user.username;
        if (user.email) document.getElementById("profileEmail").textContent = user.email;
        if (user.avatar) document.getElementById("profileImage").src = user.avatar;
        } catch (error) {
        console.error("Error al cargar el perfil:", error);
        }
    }
    });

    // Editar perfil (placeholder)
    document.getElementById("editProfileBtn").addEventListener("click", () => {
    alert("Funcionalidad de edición en desarrollo 🚧");
    });
