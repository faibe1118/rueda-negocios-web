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

        // Animaciones al hacer scroll
        const animateOnScroll = (el) => {
        const animation = el.dataset.animate || "fadeInUp";
        const delay = parseInt(el.dataset.delay || "0", 10);
        setTimeout(() => {
            el.classList.remove("opacity-0");
            el.classList.add("animate__animated", `animate__${animation}`);
            const onAnimEnd = () => {
            el.classList.remove("animate__animated", `animate__${animation}`);
            el.removeEventListener("animationend", onAnimEnd);
            };
            el.addEventListener("animationend", onAnimEnd);
        }, delay);
        };

        const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            animateOnScroll(entry.target);
            observer.unobserve(entry.target);
            }
        });
        }, { threshold: 0.2 });

        document.querySelectorAll("[data-animate]").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            animateOnScroll(el);
        } else {
            observer.observe(el);
        }
        });

        // Logo clic → recargar la misma vista logueado
        document.getElementById("logo").addEventListener("click", () => {
        window.location.reload();
        });
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

    // Toggle menú al dar clic en Mi Cuenta
    const btnMiCuenta = document.getElementById("btnMiCuenta");
    const menuCuenta = document.getElementById("menuCuenta");
    const iconArrow = document.getElementById("iconArrow");

    btnMiCuenta.addEventListener("click", () => {
    menuCuenta.classList.toggle("hidden");
    iconArrow.classList.toggle("rotate-180");
    });

    // Cerrar menú si se hace clic fuera
    window.addEventListener("click", (e) => {
    if (!btnMiCuenta.contains(e.target) && !menuCuenta.contains(e.target)) {
        menuCuenta.classList.add("hidden");
        iconArrow.classList.remove("rotate-180");
    }
    });

    // Cerrar sesión
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/logout";
      });
    }

    // Logo → recargar página
    document.getElementById("logo").addEventListener("click", () => {
    window.location.reload();
    });

    // Mostrar nombre del usuario en el Hero y en el menú
    document.addEventListener("DOMContentLoaded", () => {
    const userData = localStorage.getItem("user");
    if (userData) {
        try {
        const user = JSON.parse(userData);

        // Hero
        const welcomeUser = document.getElementById("welcomeUser");
        if (user.username) {
            welcomeUser.textContent = `Hola, ${user.username}`;
        }

        // Menú desplegable
        const menuUserName = document.getElementById("menuUserName");
        const menuUserEmail = document.getElementById("menuUserEmail");
        if (user.username) menuUserName.textContent = user.username;
        if (user.email) menuUserEmail.textContent = user.email;

        } catch (e) {
        console.error("Error al leer datos del usuario:", e);
        }
    }
    });
