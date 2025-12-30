# DULCE KIDS - Tienda de Moda Infantil

E-commerce de ropa infantil desarrollado con HTML, CSS y JavaScript vanilla.


## Sobre el Proyecto

DULCE KIDS es una tienda en línea de moda infantil con sistema de búsqueda inteligente, filtros avanzados, carrito de compras y checkout por WhatsApp.


## Características

Navegación
- Menú de categorías (Niñas, Niños, Vestidos, Denim, Comfy, Sets, Rebajas)
- Submenús desplegables
- Menú móvil responsive

Buscador
- Sugerencias en tiempo real mientras escribes
- Búsqueda por nombre, categoría, color o tags
- Contador de productos por sugerencia

Sistema de Filtros
- Filtro por categoría con paginación
- Filtro por rango de precio (mínimo y máximo)
- Filtro por tallas (selección múltiple)
- Filtro por colores (selector visual)
- Tags de filtros activos con opción de eliminar
- Botón para limpiar todos los filtros

Carrito de Compras
- Panel lateral deslizante
- Selector de color, talla y cantidad
- Modificar cantidades desde el carrito
- Eliminar productos
- Barra de progreso para envío gratis (compras mayores a $150,000)
- Cálculo automático de subtotal, envío y total
- Notificaciones de acciones (agregado, eliminado, ya existe)

Checkout
- Resumen del pedido con confirmación
- Integración con WhatsApp
- Mensaje automático con lista de productos, tallas, colores, cantidades y totales

Vista de Producto
- Panel lateral con información del producto
- Galería de colores disponibles
- Selector de tallas
- Selector de cantidad
- Productos relacionados basados en tags similares


## Tecnologías

- HTML5
- CSS3 (Flexbox, Grid, animaciones)
- JavaScript ES6+ (módulos)
- Firebase Firestore (base de datos)
- Firebase Storage (imágenes)
- LocalStorage (caché de productos)
- SweetAlert2 (notificaciones y modales)
- WhatsApp API (checkout)


## Estructura del Proyecto

dulce-kids/
    index.html
    css/
        style.css
        normalize.css
        nav-results.css
        buscador.css
        carrito-de-compras.css
        contenedor-productos.css
        producto.css
        vendor.css
    js/
        firebase-config.js
        search.js
        nav.js
        menuMovil.js
        sistema-de-filtrado.js
        agregar-carrito-logica.js
        logica-barra-producto.js
        templantes.js
        utils.js
    images/
        logo/


## Instalación

1. Clona el repositorio
   git clone https://github.com/moravegasantiago-design/ecommerce-coderhose

2. Configura Firebase en js/firebase-config.js con tus credenciales

3. Abre index.html en el navegador o usa Live Server


## Configuración

WhatsApp
En js/agregar-carrito-logica.js cambia el número:
const numeroWhatsApp = "3232292002";

Envío Gratis
En la función calcularTotal() puedes cambiar el monto mínimo:
const precioEnvioGratis = 150000;

Precio del Envío
const envio = 15900;


## Estructura de Productos en Firebase

Cada producto en Firestore debe tener:

id: "producto-001"
nombre: "Vestido Floral Rosa"
precio: 89900
imagen: "url-de-imagen"
categorias: ["vestido-ninas", "nuevo"]
tags: ["floral", "verano", "elegante"]
colores: ["#FFB6C1", "#FFFFFF"]
tallas: [2, 4, 6, 8, 10, 12]


## Archivos JavaScript

firebase-config.js - Conexión a Firebase
search.js - Lógica del buscador y sugerencias
nav.js - Navegación por categorías desde el menú
menuMovil.js - Funcionamiento del menú en móvil
sistema-de-filtrado.js - Toda la lógica de filtros (categoría, precio, talla, color)
agregar-carrito-logica.js - Carrito de compras y checkout
logica-barra-producto.js - Panel lateral de producto y productos relacionados
templantes.js - Templates HTML para productos, filtros y carrito
utils.js - Funciones utilitarias compartidas


## Autor

DULCE KIDS - Moda Infantil


## Licencia

MIT