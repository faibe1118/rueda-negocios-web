        window.addEventListener("load", () => {
        const loader = document.getElementById("loader");
        const main = document.getElementById("mainContent");

        loader.classList.add("animate__animated", "animate__fadeOut");
        setTimeout(() => {
            loader.style.display = "none";
            main.classList.remove("opacity-0");
        }, 800);
        });



        // Animar elementos al hacer scroll
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

        // Logo clic → ir al dashboard
        document.getElementById("logo").addEventListener("click", () => {
        window.location.href = "/frontend/js/modules/dashboard/dashboard.html"; 
        });
        document.getElementById("btnCrearUsuario").addEventListener("click", () => {
    window.location.href = "/frontend/js/modules/login/login.html";
    });

        