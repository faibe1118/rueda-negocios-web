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
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "/logout"; // Redirección segura al backend
        });
    }

    // Cargar configuración guardada
    document.addEventListener("DOMContentLoaded", () => {
    const savedConfig = JSON.parse(localStorage.getItem("userConfig")) || {};

    // Tema
    if (savedConfig.theme === "dark") {
        document.querySelector('input[value="dark"]').checked = true;
        document.body.classList.add("bg-gray-900", "text-gray-100");
    }

    // Idioma
    if (savedConfig.language) {
        document.getElementById("languageSelect").value = savedConfig.language;
    }

    // Notificaciones
    if (savedConfig.notifications) {
        document.getElementById("notifCheckbox").checked = true;
    }
    });

    // Guardar configuración
    document.getElementById("saveConfigBtn").addEventListener("click", () => {
    const theme = document.querySelector('input[name="theme"]:checked').value;
    const language = document.getElementById("languageSelect").value;
    const notifications = document.getElementById("notifCheckbox").checked;

    const config = { theme, language, notifications };
    localStorage.setItem("userConfig", JSON.stringify(config));

    if (theme === "dark") {
        document.body.classList.add("bg-gray-900", "text-gray-100");
    } else {
        document.body.classList.remove("bg-gray-900", "text-gray-100");
    }

    alert("Configuración guardada correctamente ✅");
    });

    // Restablecer configuración
    document.getElementById("resetConfigBtn").addEventListener("click", () => {
    localStorage.removeItem("userConfig");
    alert("Configuración restablecida 🔄");
    window.location.reload();
    });
