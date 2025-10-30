const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'WorkSide - Conecta con Eventos que te Inspiran',
        currentPage: 'home',
        logoutMsg: req.query.logout || ''
    });
});

// Alias: /home → renderiza la misma página de inicio
router.get('/home', (req, res) => {
    res.render('pages/home', {
        title: 'WorkSide - Conecta con Eventos que te Inspiran',
        currentPage: 'home',
        logoutMsg: req.query.logout || ''
    });
});

// Login page
router.get('/login', (req, res) => {
    res.render('pages/login', {
        title: 'WorkSide - Iniciar Sesión',
        currentPage: 'login'
    });
});

// Events page
router.get('/events', (req, res) => {
    res.render('pages/events', {
        title: 'WorkSide - Eventos',
        currentPage: 'events'
    });
});

// Profile page
router.get('/profile', (req, res) => {
    res.render('pages/profile', {
        title: 'WorkSide - Perfil',
        currentPage: 'profile'
    });
});

// Dashboard page (único punto donde se marca autenticado)
router.get('/dashboard', (req, res) => {
    res.cookie('auth', '1', { httpOnly: false, sameSite: 'lax', path: '/' });
    res.render('pages/dashboard', {
        title: 'WorkSide - Dashboard',
        currentPage: 'dashboard'
    });
});

// Cerrar sesión: siempre quita cookie y redirige a /home con mensaje
router.get('/logout', (req, res) => {
    res.clearCookie('auth', { path: '/' });
    res.redirect('/home?logout=1');
});

// Event detail page
router.get('/event/:id', (req, res) => {
    const eventId = req.params.id;
    
    // Mock event data based on ID
    const events = {
        '1': {
            title: 'Conferencia de Innovación Tech',
            description: 'Únete a los líderes de la industria para discutir las últimas tendencias en tecnología e innovación.',
            fullDescription: 'Esta conferencia reúne a los principales innovadores y líderes tecnológicos para compartir sus experiencias y visiones sobre el futuro de la tecnología. Un evento imperdible para profesionales del sector.',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            date: '20 de Diciembre, 2024',
            location: 'Centro de Convenciones',
            category: 'Tecnología',
            participants: '250'
        },
        '2': {
            title: 'Meetup de Startups',
            description: 'Networking y presentaciones de las startups más prometedoras del ecosistema local.',
            fullDescription: 'Un espacio único para conectar con emprendedores, inversores y mentores. Descubre las startups más innovadoras y las oportunidades de colaboración.',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            date: '25 de Diciembre, 2024',
            location: 'Coworking Space',
            category: 'Emprendimiento',
            participants: '80'
        },
        '3': {
            title: 'Workshop de Diseño UX/UI',
            description: 'Aprende las mejores prácticas en diseño de experiencia de usuario con expertos de la industria.',
            fullDescription: 'Un workshop intensivo donde aprenderás las metodologías más efectivas para crear experiencias de usuario excepcionales. Incluye ejercicios prácticos y feedback personalizado.',
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            date: '1 de Enero, 2025',
            location: 'Estudio de Diseño',
            category: 'Diseño',
            participants: '30'
        }
    };
    
    const event = events[eventId] || events['1'];
    
    res.render('pages/event-detail', {
        title: `${event.title} - WorkSide`,
        currentPage: 'event-detail',
        event: event
    });
});

// Sign up page
router.get('/signup', (req, res) => {
    res.render('pages/signup', {
        title: 'WorkSide - Registro',
        currentPage: 'signup'
    });
});

module.exports = router;
