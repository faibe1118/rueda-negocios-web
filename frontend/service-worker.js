// Service Worker for performance optimization
const CACHE_NAME = 'workside-v1';
const STATIC_CACHE = 'workside-static-v1';
const DYNAMIC_CACHE = 'workside-dynamic-v1';

// Resources to cache immediately
const STATIC_RESOURCES = [
    '/',
    '/css/enhanced-animations.css',
    '/js/performance.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Install event - cache static resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static resources');
                return cache.addAll(STATIC_RESOURCES);
            })
            .then(() => {
                console.log('Static resources cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Failed to cache static resources:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        handleRequest(request)
    );
});

// Handle different types of requests with appropriate strategies
async function handleRequest(request) {
    const url = new URL(request.url);
    
    // Static resources - cache first
    if (isStaticResource(url)) {
        return cacheFirst(request, STATIC_CACHE);
    }
    
    // Images - cache first with fallback
    if (isImage(url)) {
        return cacheFirst(request, DYNAMIC_CACHE);
    }
    
    // API requests - network first
    if (isApiRequest(url)) {
        return networkFirst(request, DYNAMIC_CACHE);
    }
    
    // HTML pages - stale while revalidate
    if (isHtmlPage(url)) {
        return staleWhileRevalidate(request, DYNAMIC_CACHE);
    }
    
    // Default - network first
    return networkFirst(request, DYNAMIC_CACHE);
}

// Cache first strategy
async function cacheFirst(request, cacheName) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Cache first failed:', error);
        return new Response('Offline', { status: 503 });
    }
}

// Network first strategy
async function networkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('Network failed, trying cache:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('Offline', { status: 503 });
    }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(error => {
        console.log('Network failed:', error);
        return cachedResponse || new Response('Offline', { status: 503 });
    });
    
    return cachedResponse || fetchPromise;
}

// Helper functions to identify resource types
function isStaticResource(url) {
    return STATIC_RESOURCES.includes(url.pathname) ||
           url.hostname === 'cdn.tailwindcss.com' ||
           url.hostname === 'cdnjs.cloudflare.com' ||
           url.hostname === 'unpkg.com';
}

function isImage(url) {
    return url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
}

function isApiRequest(url) {
    return url.pathname.startsWith('/api/');
}

function isHtmlPage(url) {
    return url.pathname.endsWith('.html') || 
           (!url.pathname.includes('.') && url.pathname !== '/api/');
}

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Handle offline actions when connection is restored
    console.log('Background sync triggered');
    
    try {
        // Get pending actions from IndexedDB
        const pendingActions = await getPendingActions();
        
        for (const action of pendingActions) {
            try {
                await fetch(action.url, action.options);
                await removePendingAction(action.id);
            } catch (error) {
                console.error('Failed to sync action:', error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notifications
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        
        const options = {
            body: data.body,
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Ver evento',
                    icon: '/icon-192x192.png'
                },
                {
                    action: 'close',
                    title: 'Cerrar',
                    icon: '/icon-192x192.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/events')
        );
    }
});

// IndexedDB helpers (simplified)
async function getPendingActions() {
    // Implementation would depend on your IndexedDB setup
    return [];
}

async function removePendingAction(id) {
    // Implementation would depend on your IndexedDB setup
    console.log('Removing pending action:', id);
}
