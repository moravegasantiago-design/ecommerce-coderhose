export const templanteFiltro = (opcion)=>{
    const templante = `<section class="search-results-section">
        <div class="container">            
            <!-- ✅ BACKDROP OSCURO PARA MÓVIL -->
            <div class="nav-overlay" id="navOverlay"></div>
            
            <!-- Panel de Filtros (Lateral en desktop, desplegable en móvil) -->
            <div class="search-content">
                <aside class="filters-sidebar" id="filtersSidebar">
                    <div class="filters-header">
                        <h3>Filtrar por</h3>
                        <button class="filters-close" id="filtersClose">✕</button>
                    </div>
                    
                    <!-- Categorías -->
                    <div class="filter-group">
                        <h4 class="filter-title">Categoria</h4>
                        <div class="filter-options" id="categoryFilters">
                            <!-- Se llenarán dinámicamente con JS -->
                        </div>
                        <div class="filter-pagination">
                            
                        </div>
                    </div>

                    <!-- Rango de Precios -->
                    <div class="filter-group">
                        <h4 class="filter-title">Precio</h4>
                        <div class="price-range">
                            <input type="number" class="price-input" data-precio="min" placeholder="Mín" min="0">
                            <span>-</span>
                            <input type="number" class="price-input" data-precio="max" placeholder="Máx">
                        </div>
                        <span class="price-error" id="priceError"></span>
                    </div>

                    <!-- Tallas -->
                    <div class="filter-group">
                        <h4 class="filter-title">Talla</h4>
                        <div class="size-grid">
                        </div>
                    </div>

                    <!-- Colores -->
                    <div class="filter-group">
                        <h4 class="filter-title">Color</h4>
                        <div class="color-grid">
                        </div>
                    </div>

                    <!-- Botones de acción -->
                    <div class="filter-actions">
                        <button class="clear-filters-btn filtro">Limpiar filtros</button>
                        <button class="apply-filters-btn filtro">Aplicar filtros</button>
                    </div>
                </aside>
                
                
                <!-- Grid de Resultados -->
                <div class="results-grid">
                <div class="active-filters" id="activeFilters">
                    <!-- Filtros activos -->
                    <!-- Se llenarán dinámicamente -->
        
                </div>
                <!-- Controles de búsqueda y título -->
            <div class="search-controls">
                <div class="filter-section">
                    <button class="filter-toggle" id="filterToggle">
                        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                        Filtros
                    </button>
                    
                    <select class="sort-select" id="sortSelect">
                        <option value="relevance">Más relevante</option>
                        <option value="price-low">Precio: Menor a Mayor</option>
                        <option value="price-high">Precio: Mayor a Menor</option>
                        <option value="newest">Más nuevos</option>
                        <option value="popular">Más populares</option>
                    </select>
                </div>
                    <!-- Encabezado de Categoría -->
                    <div class="category-header">
                        <h1 class="category-title">${opcion}</h1>
                    </div>
                    <!-- Mensaje sin resultados -->
                    <!-- Productos - se llenarán dinámicamente con JS -->
                    <div class= "productos-contenedor" id="productsContainer">
                        <!-- aca van los productos -->
                    </div>

    

                    <!-- Loading State -->
                    <div class="loading-state" id="loadingState" style="display: none;">
                        <div class="loading-spinner"></div>
                        <p>Buscando productos...</p>
                    </div>
                </div>
            </div>

            <!-- Paginación -->
            <div class="pagination" id="pagination">
                <button class="pagination-btn" disabled>
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Anterior
                </button>
                <div class="pagination-numbers">
                    <button class="pagination-number active">1</button>
                    <button class="pagination-number">2</button>
                    <button class="pagination-number">3</button>
                    <span class="pagination-dots">...</span>
                    <button class="pagination-number">8</button>
                </div>
                <button class="pagination-btn">
                    Siguiente
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </div>
            </section>`;
    return templante;
}
export const sugerenciaTemplante = (texto, categoria, cantidad)=>{
    const templante = `<div class="suggestion-item" id="${texto}">
                    <div class="suggestion-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </div>
                    <div class="suggestion-content">
                        <div class="suggestion-text"><span class="suggestion-highlight">${texto}</span></div>
                        <div class="suggestion-category">${categoria}</div>
                    </div>
                    <span class="suggestion-badge">${cantidad}</span>
                </div>`;
                return templante;
}
export const templanteBusqueda = (opcion, cantidad)=>{
    const templante = `<!-- Sección de Resultados de Búsqueda -->
            <section class="search-results-section">
                <div class="container">
                    <!-- ✅ BACKDROP OSCURO PARA MÓVIL -->
                    <div class="nav-overlay" id="navOverlay"></div>
                    
                    <!-- Panel de Filtros (Lateral en desktop, desplegable en móvil) -->
                    <div class="search-content">
                        <aside class="filters-sidebar" id="filtersSidebar">
                            <div class="filters-header">
                                <h3>Filtrar por</h3>
                                <button class="filters-close" id="filtersClose">✕</button>
                            </div>
                            
                            <!-- Categorías -->
                            <div class="filter-group">
                                <h4 class="filter-title">Categoria</h4>
                                <div class="filter-options" id="categoryFilters">
                                    <!-- Se llenarán dinámicamente con JS -->
                                </div>
                                <div class="filter-pagination">
                                    
                                </div>
                            </div>

                            <!-- Rango de Precios -->
                            <div class="filter-group">
                                <h4 class="filter-title">Precio</h4>
                                <div class="price-range">
                                    <input type="number" class="price-input" data-precio="min" placeholder="Mín" min="0">
                                    <span>-</span>
                                    <input type="number" class="price-input" data-precio="max" placeholder="Máx">
                                </div>
                                <span class="price-error" id="priceError"></span>
                            </div>

                            <!-- Tallas -->
                            <div class="filter-group">
                                <h4 class="filter-title">Talla</h4>
                                <div class="size-grid">
                                </div>
                            </div>

                            <!-- Colores -->
                            <div class="filter-group">
                                <h4 class="filter-title">Color</h4>
                                <div class="color-grid">
                                </div>
                            </div>

                            <!-- Botones de acción -->
                            <div class="filter-actions">
                                <button class="clear-filters-btn buscador">Limpiar filtros</button>
                                <button class="apply-filters-btn buscador">Aplicar filtros</button>
                            </div>
                        </aside>
                        
                        
                        <!-- Grid de Resultados -->
                        <div class="results-grid">
                        <div class="active-filters" id="activeFilters">
                            <!-- Filtros activos -->
                            <!-- Se llenarán dinámicamente -->
                
                        </div>
                        <!-- Controles de búsqueda y título -->
                    <div class="search-controls">
                        <div class="filter-section">
                            <button class="filter-toggle" id="filterToggle">
                                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                </svg>
                                Filtros
                            </button>
                            
                            <select class="sort-select" id="sortSelect">
                                <option value="relevance">Más relevante</option>
                                <option value="price-low">Precio: Menor a Mayor</option>
                                <option value="price-high">Precio: Mayor a Menor</option>
                                <option value="newest">Más nuevos</option>
                                <option value="popular">Más populares</option>
                            </select>
                        </div>
                            <!-- Encabezado de Búsqueda -->
                            <div class="search-header">
                                <div class="search-info">
                                    <h1 class="search-title">Resultados para "${opcion}"</h1>
                                    <p class="search-count"><span id="resultsCount">${cantidad}</span> productos encontrados</p>
                                </div>
                            </div>
                            <!-- Mensaje sin resultados -->
                            <!-- Productos - se llenarán dinámicamente con JS -->
                            <div class= "productos-contenedor" id="productsContainer">
                                <!-- aca van los productos -->
                            </div>

                            <!-- Loading State -->
                            <div class="loading-state" id="loadingState" style="display: none;">
                                <div class="loading-spinner"></div>
                                <p>Buscando productos...</p>
                            </div>
                        </div>
                    </div>

            <!-- Paginación -->
            <div class="pagination" id="pagination">
                <button class="pagination-btn" disabled>
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Anterior
                </button>
                <div class="pagination-numbers">
                    <button class="pagination-number active">1</button>
                    <button class="pagination-number">2</button>
                    <button class="pagination-number">3</button>
                    <span class="pagination-dots">...</span>
                    <button class="pagination-number">8</button>
                </div>
                <button class="pagination-btn">
                    Siguiente
                    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </div>
            </section>`;
    return templante;
}
export const templanteProductos = (producto)=>{
    const templante = `<div class="product-card" id = "${producto.id}">
                            <div class="product-image-wrapper">
                                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img">
                                <div class="product-quick-actions">
                                    <button class="quick-view-btn" title="Vista rápida">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                    <button class="wishlist-btn" title="Agregar a favoritos">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="product-info">
                                <span class="product-category">${producto.categorias}</span>
                                <h3 class="product-name">${producto.nombre}</h3>
                                <div class="product-rating">
                                    <span class="stars">★★★★★</span>
                                    <span class="rating-text">(145)</span>
                                </div>
                                <div class="product-price-row">
                                    <div class="product-prices">
                                        <span class="price-new">${producto.precio.toLocaleString()}</span>
                                    </div>
                                    <button class="btn-add-to-cart" title="Agregar al carrito">
                                        <svg width="20" height="20" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
            </div>`
            return templante;
}
export const templanteSinResultado = () => {
    const templante = `<div class="no-results" id="noResults">
                        <div class="no-results-icon">
                            <svg width="80" height="80" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                        </div>
                        <h3>No encontramos resultados</h3>
                        <p>Intenta con otras palabras clave o explora nuestras categorías o filtros</p>
                        <div class="no-results-actions">
                            <button class="btn-primary" onclick="window.location.href='index.html'">Volver al inicio</button>
                            <button class="btn-secondary" onclick="document.getElementById('searchInput').focus()">Nueva búsqueda</button>
                        </div>
                    </div>`
        return templante;
}
export const templanteProductoCarrito = (producto) => {
    return `<div class="cart-item" data-id="${producto.id}">
            <div class="item-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="item-details">
                <h3 class="item-name">${producto.nombre}</h3>
                <p class="item-size">Talla: ${producto.talla}</p>
                <p class="item-size">
                    Color: 
                    <span style="display: inline-block; width: 16px; height: 16px; background: ${producto.color}; border-radius: 50%; vertical-align: middle; border: 1px solid #ddd; margin-left: 4px;"></span>
                </p>
                <p class="item-price">$ ${(producto.precio * producto.cantidad).toLocaleString()}</p>
                
                <div class="item-actions">
                    <div class="quantity-control" id="${producto.id}">
                        <button class="qty-btn minus" data-control= "${producto.id}">−</button>
                        <input type="number" class="qty-input" data-input = "${producto.id}"value="${producto.cantidad}" min="1" readonly>
                        <button class="qty-btn plus" data-control= "${producto.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${producto.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}
export const templanteCarritoVacio = () => {
    return `<div style="text-align: center; padding: 30px 20px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFB6D9" stroke-width="1" style="opacity: 0.3; margin-bottom: 12px;">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <h3 style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin-bottom: 6px;">
                No hay productos disponibles
            </h3>
            <p style="color: #737373; font-size: 13px; line-height: 1.4;">
                Vuelve pronto para ver novedades
            </p>
        </div>`;
    
}
export const templanteBarraDeProductos = (producto) => {
    return `<div class="product-drawer-related-card" id="${producto.id}">
                    <div class="product-drawer-related-image">
                        <img src="${producto.imagen}" 
                             alt="${producto.nombre}" 
                             loading="lazy">
                    </div>
                    <div class="product-drawer-related-info">
                        <p class="product-drawer-related-name">${producto.nombre}</p>
                        <p class="product-drawer-related-price">$${producto.precio.toLocaleString()}</p>
                    </div>
                </div>`;
}
