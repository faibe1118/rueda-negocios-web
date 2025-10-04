window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        const main = document.getElementById("mainContent");
        loader.classList.add("animate__animated", "animate__fadeOut");
        setTimeout(() => {
            loader.style.display = "none";
            main.classList.remove("opacity-0");
        }, 800);
        });

        // Manejo de login normal
        document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/dashboard"; // redirige al dashboard
        } else {
            alert(data.message);
        }
        });
        document.getElementById("btnIngresar").addEventListener("click", () => {
    window.location.href = "/frontend/js/modules/logueado/logueado.html";
    });

        // Logo → volver a inicio
        document.getElementById("logo").addEventListener("click", () => {
        window.location.href = "/frontend/js/modules/dashboard/dashboard.html";
        });