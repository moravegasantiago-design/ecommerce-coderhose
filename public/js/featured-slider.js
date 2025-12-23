// ========================================
//    DULCE KIDS - JAVASCRIPT
// ========================================

// ========== CAROUSEL HERO ==========
let carouselIndex = 0;
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselTotal = carouselSlides.length;

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(-${carouselIndex * 100}%)`;
    updateCarouselIndicators();
}

function carouselNext() {
    carouselIndex = (carouselIndex + 1) % carouselTotal;
    updateCarousel();
}

function carouselPrev() {
    carouselIndex = (carouselIndex - 1 + carouselTotal) % carouselTotal;
    updateCarousel();
}

function updateCarouselIndicators() {
    const indicators = document.getElementById('carouselIndicators');
    indicators.innerHTML = '';
    for (let i = 0; i < carouselTotal; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator' + (i === carouselIndex ? ' active' : '');
        indicator.onclick = () => {
            carouselIndex = i;
            updateCarousel();
        };
        indicators.appendChild(indicator);
    }
}

// Autoplay carousel cada 5 segundos
setInterval(carouselNext, 5000);
updateCarouselIndicators();

// ========== FEATURED SLIDER "LO NUEVO DE LA SEMANA" ==========
class FeaturedSlider {
    constructor() {
        this.featuredGrid = document.querySelector('.featured-grid');
        this.section = document.querySelector('.featured-section');
        this.currentPage = 0;
        this.totalPages = 3;
        this.autoplayInterval = null;
        this.isTabletOrDesktop = window.innerWidth >= 481;
        
        // 9 PRODUCTOS DIVIDIDOS EN 3 PÁGINAS
        this.products = [
            // ===== PÁGINA 1 =====
            [
                {
                    size: 'large',
                    img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&h=800&fit=crop',
                    title: 'Vestidos de Verano',
                    desc: 'Frescos y coloridos',
                    alt: 'Vestidos de Verano'
                },
                {
                    size: 'normal',
                    img: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=400&fit=crop',
                    title: 'Camisetas Cool',
                    desc: 'Desde $15',
                    alt: 'Camisetas Cool'
                },
                {
                    size: 'normal',
                    img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop',
                    title: 'Jeans Confort',
                    desc: 'Calidad premium',
                    alt: 'Jeans Confort'
                }
            ],
            // ===== PÁGINA 2 =====
            [
                {
                    size: 'large',
                    img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=800&fit=crop',
                    title: 'Colección Deportiva',
                    desc: 'Para los más activos',
                    alt: 'Colección Deportiva'
                },
                {
                    size: 'normal',
                    img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
                    title: 'Buzos con Capucha',
                    desc: 'Comodidad total',
                    alt: 'Buzos con Capucha'
                },
                {
                    size: 'normal',
                    img: 'https://images.unsplash.com/photo-1509319117902-75d9cfb88c8c?w=400&h=400&fit=crop',
                    title: 'Accesorios',
                    desc: 'El toque final',
                    alt: 'Accesorios'
                }
            ],
            // ===== PÁGINA 3 =====
            [
                {
                    size: 'large',
                    img: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600&h=800&fit=crop',
                    title: 'Ropa de Dormir',
                    desc: 'Dulces sueños',
                    alt: 'Ropa de Dormir'
                },
                {
                    size: 'normal',
                    img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop',
                    title: 'Shorts y Bermudas',
                    desc: 'Para el verano',
                    alt: 'Shorts y Bermudas'
                },
                {
                    size: 'normal',
                    img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
                    title: 'Sets Completos',
                    desc: 'Combina perfecto',
                    alt: 'Sets Completos'
                }
            ]
        ];
        
        this.init();
    }
    
    init() {
        if (!this.featuredGrid) {
            console.warn('FeaturedSlider: No se encontró .featured-grid');
            return;
        }
        
        if (this.isTabletOrDesktop) {
            // Tablet y Desktop: usar slider con paginación
            this.renderPage(0);
            this.addNavigationButtons();
            this.startAutoplay();
        } else {
            // Móvil: mostrar todos los productos en scroll horizontal
            this.renderAllProducts();
        }
        
        // Detectar cambios de tamaño de pantalla
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const wasTabletOrDesktop = this.isTabletOrDesktop;
                this.isTabletOrDesktop = window.innerWidth >= 481;
                
                if (wasTabletOrDesktop !== this.isTabletOrDesktop) {
                    if (this.isTabletOrDesktop) {
                        // Cambió a tablet/desktop
                        this.renderPage(this.currentPage);
                        this.addNavigationButtons();
                        this.startAutoplay();
                    } else {
                        // Cambió a móvil
                        this.stopAutoplay();
                        this.removeNavigationButtons();
                        this.renderAllProducts();
                    }
                }
            }, 250);
        });
    }
    
    // Renderizar todos los productos para móvil (scroll horizontal)
    renderAllProducts() {
        this.featuredGrid.innerHTML = '';
        this.featuredGrid.style.display = 'flex';
        this.featuredGrid.style.gridTemplateColumns = '';
        this.featuredGrid.style.gridTemplateRows = '';
        
        // Aplanar el array de productos (de 3 arrays a 1 array de 9 productos)
        const allProducts = this.products.flat();
        
        allProducts.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = `featured-card ${product.size === 'large' ? 'large' : ''}`;
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.alt}" loading="lazy">
                <div class="featured-overlay">
                    <h3>${product.title}</h3>
                    <p>${product.desc}</p>
                    <button class="featured-btn">Ver Más</button>
                </div>
            `;
            this.featuredGrid.appendChild(card);
            
            // Animación de entrada escalonada
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Renderizar página específica para tablet/desktop CON ANIMACIÓN DE SLIDE
    renderPage(pageIndex) {
        if (pageIndex < 0 || pageIndex >= this.totalPages) return;
        
        const pageProducts = this.products[pageIndex];
        const direction = pageIndex > this.currentPage ? 1 : -1;
        
        this.currentPage = pageIndex;
        
        this.featuredGrid.style.display = 'grid';
        
        // ANIMACIÓN DE SALIDA: deslizar a la izquierda/derecha con fade
        this.featuredGrid.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        this.featuredGrid.style.opacity = '0';
        this.featuredGrid.style.transform = `translateX(${direction === 1 ? '-50px' : '50px'})`;
        
        setTimeout(() => {
            // Limpiar y agregar nuevos productos
            this.featuredGrid.innerHTML = '';
            
            pageProducts.forEach((product) => {
                const card = document.createElement('div');
                card.className = `featured-card ${product.size === 'large' ? 'large' : ''}`;
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.innerHTML = `
                    <img src="${product.img}" alt="${product.alt}" loading="lazy">
                    <div class="featured-overlay">
                        <h3>${product.title}</h3>
                        <p>${product.desc}</p>
                        <button class="featured-btn">Ver Más</button>
                    </div>
                `;
                this.featuredGrid.appendChild(card);
            });
            
            // Reset position: colocar en el lado opuesto para la entrada
            this.featuredGrid.style.transition = 'none';
            this.featuredGrid.style.transform = `translateX(${direction === 1 ? '50px' : '-50px'})`;
            
            // Forzar reflow
            void this.featuredGrid.offsetWidth;
            
            // ANIMACIÓN DE ENTRADA: deslizar desde la derecha/izquierda
            setTimeout(() => {
                this.featuredGrid.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                this.featuredGrid.style.transform = 'translateX(0)';
                this.featuredGrid.style.opacity = '1';
                
                // Animar cada card individualmente
                const cards = this.featuredGrid.querySelectorAll('.featured-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 50);
            
            this.updateIndicators();
        }, 500);
    }
    
    next() {
        const nextPage = (this.currentPage + 1) % this.totalPages;
        this.renderPage(nextPage);
    }
    
    prev() {
        const prevPage = (this.currentPage - 1 + this.totalPages) % this.totalPages;
        this.renderPage(prevPage);
    }
    
    startAutoplay() {
        this.stopAutoplay();
        
        if (!this.isTabletOrDesktop) return;
        
        // Cambiar de página cada 5 segundos
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, 5000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    addNavigationButtons() {
        if (!this.isTabletOrDesktop) return;
        
        this.removeNavigationButtons();
        
        if (!this.section) return;
        
        // Botón anterior
        const prevBtn = document.createElement('button');
        prevBtn.className = 'featured-slider-arrow featured-slider-prev';
        prevBtn.innerHTML = '‹';
        prevBtn.setAttribute('aria-label', 'Anterior');
        prevBtn.onclick = () => {
            this.prev();
            this.startAutoplay(); // Reiniciar autoplay al hacer clic
        };
        
        // Botón siguiente
        const nextBtn = document.createElement('button');
        nextBtn.className = 'featured-slider-arrow featured-slider-next';
        nextBtn.innerHTML = '›';
        nextBtn.setAttribute('aria-label', 'Siguiente');
        nextBtn.onclick = () => {
            this.next();
            this.startAutoplay(); // Reiniciar autoplay al hacer clic
        };
        
        // Indicadores
        const indicators = document.createElement('div');
        indicators.className = 'featured-slider-indicators';
        
        for (let i = 0; i < this.totalPages; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'featured-slider-indicator';
            if (i === this.currentPage) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Ir a página ${i + 1}`);
            indicator.onclick = () => {
                this.renderPage(i);
                this.startAutoplay(); // Reiniciar autoplay al hacer clic
            };
            indicators.appendChild(indicator);
        }
        
        this.section.appendChild(prevBtn);
        this.section.appendChild(nextBtn);
        this.section.appendChild(indicators);
    }
    
    removeNavigationButtons() {
        const existingPrev = document.querySelector('.featured-slider-prev');
        const existingNext = document.querySelector('.featured-slider-next');
        const existingIndicators = document.querySelector('.featured-slider-indicators');
        
        if (existingPrev) existingPrev.remove();
        if (existingNext) existingNext.remove();
        if (existingIndicators) existingIndicators.remove();
    }
    
    updateIndicators() {
        const indicators = document.querySelectorAll('.featured-slider-indicator');
        indicators.forEach((indicator, index) => {
            if (index === this.currentPage) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
}

// Inicializar el slider cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('Iniciando FeaturedSlider...');
    new FeaturedSlider();
});

// ========== FILTROS POR EDAD ==========
document.addEventListener('DOMContentLoaded', () => {
    const ageFilters = document.querySelectorAll('.age-filter');
    
    ageFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remover clase active de todos los filtros
            ageFilters.forEach(f => f.classList.remove('active'));
            // Agregar clase active al filtro clickeado
            this.classList.add('active');
        });
    });
});