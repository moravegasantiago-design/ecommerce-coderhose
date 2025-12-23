import { reiniciarScroll, ajustarCantidad } from "./utils.js";
import { valueInputProducto } from "./utils.js";
import { templanteProductoCarrito, templanteCarritoVacio } from "./templantes.js";
const productos = JSON.parse(localStorage.getItem("productos"));
class notificacionEcommerce {
    

    static productoAgregado(producto) {
        const isMobile = window.innerWidth <= 640;
        
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.style.width = isMobile ? '90%' : '340px';
                toast.style.maxWidth = '340px';
                toast.style.borderRadius = '12px';
                toast.style.padding = '0';
                toast.style.overflow = 'hidden';
                toast.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.12)';
                toast.style.background = 'white';
                toast.style.marginTop = isMobile ? '1rem' : '0';
                toast.style.marginRight = isMobile ? '1rem' : '0';
                toast.style.zIndex = "9999";
            },
            html: `
                <!-- Contenido principal -->
                <div style="padding: 1rem; padding-bottom: 0.8rem;">
                    <div style="display: flex; align-items: center; gap: 0.8rem;">
                        <!-- Check verde -->
                        <div style="width: 36px; height: 36px; background: #4CAF50; 
                                    border-radius: 50%; display: flex; align-items: center; 
                                    justify-content: center; flex-shrink: 0;">
                            <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                        </div>
                        
                        <!-- Imagen -->
                        <img src="${producto.imagen}" 
                             style="width: 45px; height: 45px; object-fit: cover; 
                                    border-radius: 8px; flex-shrink: 0;">
                        
                        <!-- Info y Precio (columna) -->
                        <div style="flex: 1; text-align: left; min-width: 0;">
                            <div style="font-weight: 600; font-size: 0.9rem; color: #1a1a1a; 
                                        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                ${producto.nombre}
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between; 
                                        gap: 0.5rem; margin-top: 0.2rem;">
                                <span style="font-size: 0.8rem; color: #4CAF50; font-weight: 600;">
                                    Agregado al carrito
                                </span>
                                <span style="font-weight: 700; font-size: 0.95rem; color: #FF69B4; 
                                             white-space: nowrap;">
                                    $${(producto.precio * producto.cantidad).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Botón Ver Carrito -->
                <div style="border-top: 1px solid #F0F0F0; padding: 0;">
                    <button onclick="window.location.href='carrito.html'; Swal.close();" 
                            style="width: 100%; padding: 0.8rem; background: transparent; 
                                   border: none; color: #FF69B4; font-weight: 600; 
                                   font-size: 0.85rem; cursor: pointer; transition: all 0.2s;
                                   display: flex; align-items: center; justify-content: center; gap: 0.4rem;"
                            onmouseover="this.style.background='#FFF5FB';"
                            onmouseout="this.style.background='transparent';">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                        Ver carrito
                    </button>
                </div>
            `
        });
    }


    static yaExiste() {
        const isMobile = window.innerWidth <= 640;
        
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.style.width = isMobile ? '90%' : '300px';
                toast.style.maxWidth = '300px';
                toast.style.borderRadius = '10px';
                toast.style.padding = '0.8rem';
                toast.style.background = '#FFF9E6';
                toast.style.border = '1px solid #FFB84D';
                toast.style.boxShadow = '0 4px 12px rgba(255, 184, 77, 0.12)';
                toast.style.marginTop = isMobile ? '1rem' : '0';
                toast.style.marginRight = isMobile ? '1rem' : '0';
                toast.style.zIndex = "9999";
                
            },
            html: `
                <div style="display: flex; align-items: center; gap: 0.7rem;">
                    <div style="width: 32px; height: 32px; background: #FFB84D; 
                                border-radius: 50%; display: flex; align-items: center; 
                                justify-content: center; flex-shrink: 0;">
                        <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                        </svg>
                    </div>
                    <div style="text-align: left; flex: 1;">
                        <div style="font-weight: 600; font-size: 0.85rem; color: #1a1a1a;">
                            Ya está en el carrito
                        </div>
                    </div>
                </div>
            `
        });
    }



    static eliminado() {
        const isMobile = window.innerWidth <= 640;
        
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.style.width = isMobile ? '90%' : '260px';
                toast.style.maxWidth = '260px';
                toast.style.borderRadius = '10px';
                toast.style.padding = '0.7rem';
                toast.style.background = '#F5F5F5';
                toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                toast.style.marginTop = isMobile ? '1rem' : '0';
                toast.style.marginRight = isMobile ? '1rem' : '0';
                toast.style.zIndex = "9999";
            },
            html: `
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <div style="font-size: 1.2rem;">🗑️</div>
                    <div style="font-weight: 600; color: #666; font-size: 0.85rem;">
                        Eliminado del carrito
                    </div>
                </div>
            `
        });
    }

    static error(mensaje = 'Hubo un problema') {
        const isMobile = window.innerWidth <= 640;
        
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.style.width = isMobile ? '90%' : '300px';
                toast.style.maxWidth = '300px';
                toast.style.borderRadius = '10px';
                toast.style.padding = '0.8rem';
                toast.style.background = '#FFE5E5';
                toast.style.border = '1px solid #FF4444';
                toast.style.boxShadow = '0 4px 12px rgba(255, 68, 68, 0.12)';
                toast.style.marginTop = isMobile ? '1rem' : '0';
                toast.style.marginRight = isMobile ? '1rem' : '0';
                toast.style.zIndex = "9999";
            },
            html: `
                <div style="display: flex; align-items: center; gap: 0.7rem;">
                    <div style="font-size: 1.3rem;">⚠️</div>
                    <div style="text-align: left; flex: 1;">
                        <div style="font-weight: 600; color: #FF4444; font-size: 0.85rem;">
                            ${mensaje}
                        </div>
                    </div>
                </div>
            `
        });
    }
}
class seleccionProducto {
    
    static async mostrar(producto) {
        const isMobile = window.innerWidth <= 640;
        
        const style = document.createElement('style');
        style.textContent = `
            .swal2-popup {
                border-radius: 8px !important;
                padding: ${isMobile ? '1.5rem' : '2rem'} !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
                background: white !important;
            }
            .modal-content {
                text-align: center;
            }
            .modal-image {
                width: ${isMobile ? '110px' : '130px'};
                height: ${isMobile ? '110px' : '130px'};
                object-fit: cover;
                border-radius: 4px;
                margin: 0 auto 1rem;
                border: 1px solid #f0f0f0;
            }
            .modal-category {
                font-size: 0.7rem;
                color: #999;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                margin-bottom: 0.5rem;
            }
            .modal-price {
                font-size: 1.4rem;
                font-weight: 600;
                color: #FF69B4;
                margin: 0.8rem 0 1.5rem;
            }
            .modal-divider {
                height: 1px;
                background: #f0f0f0;
                margin: 1.5rem 0;
            }
            .field-group {
                margin-bottom: 1.3rem;
                text-align: left;
            }
            .field-label {
                display: block;
                font-size: 0.75rem;
                font-weight: 600;
                color: #666;
                text-transform: uppercase;
                letter-spacing: 0.3px;
                margin-bottom: 0.7rem;
            }
            .color-options {
                display: flex;
                gap: 0.5rem;
            }
            .color-item {
                width: 38px;
                height: 38px;
                border-radius: 50%;
                cursor: pointer;
                border: 2px solid #fff;
                box-shadow: 0 0 0 1px #e0e0e0;
                transition: box-shadow 0.15s;
            }
            .color-item:hover {
                box-shadow: 0 0 0 2px #FF69B4;
            }
            .color-item.active {
                box-shadow: 0 0 0 2px #FF69B4;
            }
            .size-options {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            .size-item {
                min-width: 50px;
                padding: 0.6rem 0.8rem;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                text-align: center;
                font-size: 0.85rem;
                font-weight: 500;
                color: #333;
                cursor: pointer;
                background: white;
                transition: all 0.15s;
            }
            .size-item:hover {
                border-color: #FF69B4;
            }
            .size-item.active {
                background: #FF69B4;
                color: white;
                border-color: #FF69B4;
            }
            .qty-wrapper {
                display: inline-flex;
                align-items: center;
                gap: 1rem;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                padding: 0.4rem 0.8rem;
                background: #fafafa;
            }
            .qty-button {
                width: 28px;
                height: 28px;
                border: none;
                background: white;
                border-radius: 3px;
                cursor: pointer;
                font-size: 1rem;
                color: #666;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #e0e0e0;
            }
            .qty-button:hover {
                color: #FF69B4;
                border-color: #FF69B4;
            }
            .qty-value {
                font-size: 0.95rem;
                font-weight: 500;
                color: #333;
                min-width: 25px;
                text-align: center;
            }
            .swal2-title {
                font-size: ${isMobile ? '1.05rem' : '1.2rem'} !important;
                font-weight: 600 !important;
                color: #1a1a1a !important;
                padding: 0 !important;
                margin: 0 0 0.3rem 0 !important;
            }
            .swal2-html-container {
                margin: 0 !important;
                padding: 0 !important;
            }
            .swal2-actions {
                gap: 0.7rem !important;
                margin-top: 1.5rem !important;
            }
            .swal2-confirm, .swal2-cancel {
                margin: 0 !important;
                padding: 0.8rem 1.3rem !important;
                font-size: 0.85rem !important;
                font-weight: 600 !important;
                border-radius: 4px !important;
                flex: 1 !important;
            }
            .swal2-confirm {
                background: #FF69B4 !important;
                border: none !important;
            }
            .swal2-confirm:hover {
                background: #ff5aa5 !important;
            }
            .swal2-cancel {
                background: white !important;
                color: #666 !important;
                border: 1px solid #e0e0e0 !important;
            }
            .swal2-cancel:hover {
                border-color: #ccc !important;
            }
        `;
        document.head.appendChild(style);
        
        let selectedColor = producto.colores[0];
        let selectedSize = producto.tallas[0];
        let quantity = 1;
        
        const result = await Swal.fire({
            title: producto.nombre,
            html: `
                <div class="modal-content">
                    <div class="modal-category">${producto.categorias[0]}</div>
                    <img src="${producto.imagen}" class="modal-image" alt="${producto.nombre}">
                    <div class="modal-price">$${producto.precio.toLocaleString()}</div>
                </div>
                
                <div class="modal-divider"></div>
                
                <div class="field-group">
                    <label class="field-label">Color</label>
                    <div class="color-options" id="colorOptions">
                        ${producto.colores.map((color, i) => `
                            <div class="color-item ${i === 0 ? 'active' : ''}" 
                                 data-color="${color}"
                                 style="background: ${color};">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="field-group">
                    <label class="field-label">Talla</label>
                    <div class="size-options" id="sizeOptions">
                        ${producto.tallas.map((talla, i) => `
                            <div class="size-item ${i === 0 ? 'active' : ''}" 
                                 data-size="${talla}">
                                ${talla}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="field-group">
                    <label class="field-label">Cantidad</label>
                    <div class="qty-wrapper">
                        <button type="button" class="qty-button" id="qtyMinus">−</button>
                        <span class="qty-value" id="qtyValue">1</span>
                        <button type="button" class="qty-button" id="qtyPlus">+</button>
                    </div>
                </div>
            `,
            width: isMobile ? '90%' : '420px',
            showCancelButton: true,
            confirmButtonText: 'Agregar al carrito',
            cancelButtonText: 'Cancelar',
            buttonsStyling: true,
            didOpen: () => {
                document.querySelectorAll('.color-item').forEach(item => {
                    item.addEventListener('click', function() {
                        document.querySelectorAll('.color-item').forEach(i => i.classList.remove('active'));
                        this.classList.add('active');
                        selectedColor = this.dataset.color;
                    });
                });
                
                document.querySelectorAll('.size-item').forEach(item => {
                    item.addEventListener('click', function() {
                        document.querySelectorAll('.size-item').forEach(i => i.classList.remove('active'));
                        this.classList.add('active');
                        selectedSize = this.dataset.size;
                    });
                });
                
                const qtyValue = document.getElementById('qtyValue');
                document.getElementById('qtyMinus').addEventListener('click', () => {
                    if (quantity > 1) {
                        quantity--;
                        qtyValue.textContent = quantity;
                    }
                });
                document.getElementById('qtyPlus').addEventListener('click', () => {
                    if (quantity < 10) {
                        quantity++;
                        qtyValue.textContent = quantity;
                    }
                });
            },
            preConfirm: () => {
                return {
                    id: `${producto.id}-talla:${selectedSize}-color:${selectedColor}`,
                    nombre: producto.nombre,
                    imagen: producto.imagen,
                    color: selectedColor,
                    precio : producto.precio,
                    talla: selectedSize,
                    cantidad: quantity
                };
            },
            willClose: () => {
                document.head.removeChild(style);
            }
        });
        
        if (result.isConfirmed) {
            return result.value;
        }
        
        return null;
    }
}

class logicaCarrito {
    constructor(id, producto){
        this.carrito = [];
        this.id = id;
        this.producto = producto;
    }
    buscarProducto (){
        const producto = this.producto.find(p => p.id === this.id);
        return producto;
    }
    verificarExistencia(){
        const buscarProductoCarrito = this.carrito.findIndex(p => JSON.stringify(p.id) === JSON.stringify(this.producto.id));
        const verificador = buscarProductoCarrito !== -1;
        return {
            existencia : verificador,
            producto :  this.producto
        };
    }
    iconoDecarito(){
        const contenedor = document.querySelector(".icon-badge");
        contenedor.style.display = this.carrito.length === 0 ? "none" : "block";
        contenedor.textContent = `${this.carrito.length}`;
    }
    aggProducto(producto){
        this.carrito.push(producto)
        this.iconoDecarito();
    }
    
}

const carrito = new logicaCarrito([]);
const buscarProducto = (id, productos) => {
    carrito.id =  id;
    carrito.producto = productos;
    const producto = carrito.buscarProducto()
    return producto;
}
const sistemaDeNotificacionesYExistencia =(id, seleccion)=>{
    carrito.id =  id;
    carrito.producto = seleccion;
    const obj = carrito.verificarExistencia()
    if(!obj.existencia){
        carrito.aggProducto(seleccion)
        notificacionEcommerce.productoAgregado(seleccion)
    }else if(!obj.producto){
        notificacionEcommerce.error()
    }else{
        notificacionEcommerce.yaExiste()
    }
}
export const agregarCarritoDeCompras = async(productos, id) => {
    const seleccion = await seleccionProducto.mostrar(buscarProducto(id, productos))
    if(!seleccion) return;
    sistemaDeNotificacionesYExistencia(id, seleccion)
}

class verCarritoDeCompra{
    constructor(carrito){
        this.carritoArray = carrito;
        this.totalDeCompra = {};
        this.overlay = document.querySelector(".cart-overlay");
        this.contenedor = document.querySelector(".cart-panel");
        this.carta = document.querySelector(".cart-content");
    }
    alternarCarrito(){
        if(!this.overlay && !this.contenedor && !this.carta) return;
        reiniciarScroll(this.carta);
        this.overlay.classList.toggle("active")
        this.contenedor.classList.toggle("active")
    }
    
    
    rederizadoCarrito(){
        const templante = this.carritoArray.length === 0 ? templanteCarritoVacio : templanteProductoCarrito;
        const array = this.carritoArray.length === 0 ? [1] : this.carritoArray;
        this.carta.innerHTML = "";
        array.forEach(p =>  {
            this.carta.insertAdjacentHTML("beforeend", templante(p));
        })
    }
    verCarrito(){
        this.rederizadoCarrito();
        this.alternarCarrito();
    }
    aggTotales(obj){
        if(!obj) return;
        const totalText = document.querySelector(obj.id)
        if(!totalText) return;
        totalText.textContent = `${obj.numero}`;
    }
    rederizarTotales(objs){
        if(!objs) return;
        objs.forEach(obj => {
            this.aggTotales(obj)
        })
    }
    textoEnvio(obj){
        const textoEnvio = document.querySelector("#shippingAmount");
        const textoBarra = document.querySelector(".shipping-text");
        if(!textoBarra) return;
        textoBarra.textContent = "";
        textoBarra.textContent = `${obj.texto}`;
        if(!textoEnvio) return;
        textoEnvio.textContent = "";
        textoEnvio.classList[obj.funcion]("success")
        textoBarra.classList[obj.funcion]("success");
    }
    envioGratis(progreso, precioEnvioGratis, objs, subTotal){
        if(progreso < 100){
            const PrecioAFaltar = precioEnvioGratis - subTotal;
            this.textoEnvio({
                texto: `Te faltan $${PrecioAFaltar.toLocaleString()} para envío gratis`,
                funcion : "remove"
            });
            return;
        }
        objs[1].numero = "GRATIS";
        this.textoEnvio({
            texto: `¡Felicidades! Tu compra supera ${precioEnvioGratis} - Envío GRATIS`,
            funcion : "add"
        });
    }
    barraDeEnvioGratis(subTotal, objs){
        const precioEnvioGratis = 150000;
        const porcentajeActual = parseInt((subTotal / precioEnvioGratis)*100);
        const barraProgreso = document.querySelector(".progress-fill");
        if(!barraProgreso) return;
        barraProgreso.style.width = `${porcentajeActual}%`;
        this.envioGratis(porcentajeActual, precioEnvioGratis, objs, subTotal)

    }

    calcularTotal(){
        const subTotal = this.carritoArray.reduce((acum, producto) => {
            const subTotal = producto.precio * producto.cantidad;
            return subTotal + acum;
        }, 0);
        const envio =  this.carritoArray.length === 0 ? 0 : 15900;
        const total = envio + subTotal;
        const objs = [
            {
                numero : `$${subTotal.toLocaleString()}`, id: "#subtotalAmount"
            },
            {
                numero : `$${envio.toLocaleString()}`, id: "#shippingAmount"
            },
            {
                numero : `$${total.toLocaleString()}`, id: "#totalAmount"
            },

        ];
        this.barraDeEnvioGratis(subTotal, objs);
        this.rederizarTotales(objs);



    }
}
const productoValue = new valueInputProducto([], []);
const eventoDeClick = (click) => {
    const indice = carrito.carrito.findIndex(p => JSON.stringify(p.id) === JSON.stringify(click.dataset.id));
    if(indice === -1) return;
    carrito.carrito.splice(indice, 1);
    click.closest(".cart-item").remove();
    notificacionEcommerce.eliminado();
}
const sistemaDeBarraProducto = (idProdut) => {
    productoValue.id = idProdut;
    productoValue.productos = productos;
    productoValue.objProducto = {};
    productoValue.recorrerObj();
    const objeto = productoValue.objProducto;
    if(Object.keys(objeto).some(o => o === undefined))return;
    sistemaDeNotificacionesYExistencia(idProdut, objeto);
}
const sistemaAjusteDeCantidad = (evento, id) => {
    const verificador = ajustarCantidad(evento, `[data-input= "${id}"]`, `.qty-btn.minus[data-control = "${id}"]`, `.qty-btn.plus[data-control = "${id}"]`);
    const cantidad = document.querySelector(`[data-input= "${id}"]`).value;
    const buscarProdutoCantidad = carrito.carrito.find(p => p.id === id);
    if(!buscarProdutoCantidad) return;
    buscarProdutoCantidad.cantidad = cantidad;
    return verificador;
}
const verCarrito = new verCarritoDeCompra([]);
document.addEventListener("click", (e) => {
    if(e.target.closest(".remove-btn") || e.target.closest(".qty-btn.minus") ||e.target.closest(".qty-btn.plus")){
        if(e.target.closest(".remove-btn")) eventoDeClick(e.target.closest(".remove-btn"));
        if(e.target.closest(".quantity-control")) if(sistemaAjusteDeCantidad(e.target, e.target.closest(".quantity-control").id)) return;
        verCarrito.carritoArray = carrito.carrito;
        verCarrito.calcularTotal();
        verCarrito.rederizadoCarrito();
        carrito.iconoDecarito();

        return;
    }else if(e.target.closest(".product-drawer-add-cart")){
        const btn = e.target.closest(".product-drawer-add-cart");
        if(!btn) return;
        const idProdut = btn.closest(".product-drawer-content").id;
        if(!idProdut) return;
        sistemaDeBarraProducto(idProdut);
    }
    if(!e.target.closest("#carrito") && !e.target.closest(".cart-close") 
        && !e.target.closest(".cart-overlay")) return;
        verCarrito.carritoArray = carrito.carrito;
        verCarrito.verCarrito();
        verCarrito.calcularTotal();
});
