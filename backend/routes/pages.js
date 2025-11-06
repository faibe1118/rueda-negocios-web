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
            title: 'Conferencia Anual de Innovación',
            description: 'Únete a los líderes de la industria para discutir las últimas tendencias en tecnología e innovación.',
            fullDescription: 'Esta conferencia reúne a los principales innovadores y líderes tecnológicos para compartir sus experiencias y visiones sobre el futuro de la tecnología. Un evento imperdible para profesionales del sector que buscan mantenerse al día con las últimas tendencias en innovación digital.',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            date: '20 de Julio, 2024',
            location: 'Centro de Convenciones',
            category: 'Conferencia',
            participants: '250'
        },
        '2': {
            title: 'Meetup de Startups',
            description: 'Networking y presentaciones de las startups más prometedoras del ecosistema local.',
            fullDescription: 'Un espacio único para conectar con emprendedores, inversores y mentores. Descubre las startups más innovadoras y las oportunidades de colaboración. Perfecto para emprendedores que buscan expandir su red y encontrar oportunidades de inversión.',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            date: '25 de Julio, 2024',
            location: 'Coworking Space',
            category: 'Networking',
            participants: '80'
        },
        '3': {
            title: 'Workshop de Diseño UX/UI',
            description: 'Aprende las mejores prácticas en diseño de experiencia de usuario con expertos de la industria.',
            fullDescription: 'Un workshop intensivo donde aprenderás las metodologías más efectivas para crear experiencias de usuario excepcionales. Incluye ejercicios prácticos y feedback personalizado de diseñadores senior con años de experiencia en la industria.',
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            date: '1 de Agosto, 2024',
            location: 'Estudio de Diseño',
            category: 'Workshop',
            participants: '30'
        },
        '4': {
            title: 'Exposición de Arte Digital',
            description: 'Explora las fronteras del arte y la tecnología en esta exposición inmersiva con artistas internacionales.',
            fullDescription: 'Una exposición única que combina arte tradicional con tecnología de vanguardia. Explora instalaciones interactivas, realidad virtual y arte generativo creado por artistas reconocidos internacionalmente. Una experiencia inmersiva que te transportará a nuevos mundos artísticos.',
            image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            date: '5 de Agosto, 2024',
            location: 'Museo de Arte',
            category: 'Arte',
            participants: '120'
        },
        '5': {
            title: 'Festival de Música Indie',
            description: 'Disfruta de una noche llena de música indie con artistas emergentes y establecidos del panorama local.',
            fullDescription: 'Un festival al aire libre con lo mejor de la escena indie local e internacional. Disfruta de múltiples escenarios, food trucks, y un ambiente único donde la música se convierte en una experiencia compartida. Perfecto para amantes de la música independiente.',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            date: '15 de Agosto, 2024',
            location: 'Parque Central',
            category: 'Música',
            participants: '500'
        },
        '6': {
            title: 'Seminario de Marketing Digital',
            description: 'Domina las estrategias de marketing digital más efectivas con casos de estudio reales y herramientas prácticas.',
            fullDescription: 'Un seminario completo donde aprenderás las estrategias de marketing digital más efectivas del mercado. Incluye casos de estudio reales, herramientas prácticas, y sesiones de Q&A con expertos en SEO, redes sociales, email marketing y publicidad digital.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            date: '20 de Agosto, 2024',
            location: 'Centro de Negocios',
            category: 'Marketing',
            participants: '150'
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

// Moderator dashboard - Vista independiente
router.get('/moderator', (req, res) => {
    res.locals.layout = 'layouts/moderator';
    res.render('pages/moderator-dashboard', {
        title: 'Panel de Moderador - WorkSide',
        currentPage: 'moderator'
    });
});

// Moderator - Users management - Vista independiente
router.get('/moderator/usuarios', (req, res) => {
    res.locals.layout = 'layouts/moderator';
    res.render('pages/moderator-usuarios', {
        title: 'Gestión de Usuarios - WorkSide',
        currentPage: 'moderator-usuarios'
    });
});

// Moderator - Events management - Vista independiente
router.get('/moderator/eventos', (req, res) => {
    res.locals.layout = 'layouts/moderator';
    res.render('pages/moderator-eventos', {
        title: 'Gestión de Eventos - WorkSide',
        currentPage: 'moderator-eventos'
    });
});

// Moderator - PQRS management - Vista independiente
router.get('/moderator/pqrs', (req, res) => {
    res.locals.layout = 'layouts/moderator';
    res.render('pages/moderator-pqrs', {
        title: 'Gestión de PQRS - WorkSide',
        currentPage: 'moderator-pqrs'
    });
});

// Moderator - Profile - Vista independiente
router.get('/moderator/profile', (req, res) => {
    res.locals.layout = 'layouts/moderator';
    res.render('pages/moderator-profile', {
        title: 'Mi Perfil - WorkSide',
        currentPage: 'moderator-profile'
    });
});

module.exports = router;
