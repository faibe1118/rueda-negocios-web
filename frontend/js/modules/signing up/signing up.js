        window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        const main = document.getElementById("mainContent");

        loader.classList.add("animate__animated", "animate__fadeOut");
        setTimeout(() => {
            loader.style.display = "none";
            main.classList.remove("opacity-0");
        }, 800);
        });

        // Logo → volver a inicio (puedes cambiar la ruta)
        document.getElementById("logo").addEventListener("click", () => {
        window.location.href = "/frontend/js/modules/dashboard/dashboard.html";
        });