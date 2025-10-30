// Performance optimization configuration
const performanceConfig = {
    // Animation settings
    animations: {
        // Reduce animations on low-end devices
        reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        
        // Disable animations on slow connections
        slowConnection: navigator.connection && navigator.connection.effectiveType === 'slow-2g',
        
        // Animation duration multipliers
        durationMultiplier: 1,
        
        // Enable hardware acceleration
        hardwareAcceleration: true
    },
    
    // Image optimization
    images: {
        // Lazy loading threshold
        lazyLoadThreshold: 100,
        
        // Image quality (0-1)
        quality: 0.8,
        
        // Enable WebP format
        webpSupport: document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
    },
    
    // Preloading
    preload: {
        // Preload critical resources
        criticalResources: [
            '/css/enhanced-animations.css',
            'https://unpkg.com/aos@2.3.1/dist/aos.css'
        ],
        
        // Preload next page on hover
        nextPageOnHover: true
    },
    
    // Caching
    cache: {
        // Enable service worker
        serviceWorker: 'service-worker.js',
        
        // Cache duration (in seconds)
        cacheDuration: 3600,
        
        // Cache strategies
        strategies: {
            images: 'cache-first',
            css: 'stale-while-revalidate',
            js: 'network-first'
        }
    }
};

// Initialize performance optimizations
function initPerformanceOptimizations() {
    // Adjust animations based on device capabilities
    if (performanceConfig.animations.reduceMotion || performanceConfig.animations.slowConnection) {
        document.documentElement.style.setProperty('--duration-fast', '0.01ms');
        document.documentElement.style.setProperty('--duration-normal', '0.01ms');
        document.documentElement.style.setProperty('--duration-slow', '0.01ms');
    }
    
    // Enable hardware acceleration
    if (performanceConfig.animations.hardwareAcceleration) {
        document.querySelectorAll('.card, .btn-primary, .hover-lift').forEach(el => {
            el.classList.add('animate-gpu');
        });
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize preloading
    initPreloading();
    
    // Initialize caching
    initCaching();
}

// Lazy loading implementation
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Preloading implementation
function initPreloading() {
    // Preload critical resources
    performanceConfig.preload.criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
    
    // Preload next page on hover
    if (performanceConfig.preload.nextPageOnHover) {
        document.querySelectorAll('a[href^="/"]').forEach(link => {
            link.addEventListener('mouseenter', function() {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = this.href;
                document.head.appendChild(prefetchLink);
            }, { once: true });
        });
    }
}

// Caching implementation
function initCaching() {
    if ('serviceWorker' in navigator && performanceConfig.cache.serviceWorker) {
        navigator.serviceWorker.register(performanceConfig.cache.serviceWorker)
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Image optimization
function optimizeImages() {
    document.querySelectorAll('img').forEach(img => {
        // Add lazy loading
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Convert to WebP if supported
        if (performanceConfig.images.webpSupport && !img.src.includes('.webp')) {
            const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            img.src = webpSrc;
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
}

// Animation performance monitoring
function monitorAnimationPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function countFrames() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Adjust animations if FPS is too low
            if (fps < 30) {
                document.documentElement.style.setProperty('--duration-multiplier', '0.5');
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(countFrames);
    }
    
    requestAnimationFrame(countFrames);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initPerformanceOptimizations();
    optimizeImages();
    monitorAnimationPerformance();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = performanceConfig;
}


