import { reiniciarScroll, ajustarCantidad } from "./utils.js";
import { agregarCarritoDeCompras } from "./agregar-carrito-logica.js";
import { templanteBarraDeProductos } from "./templantes.js";

class renderizarProducto {
    constructor(productos, evento){
        this.productos = productos; 
        this.evento = evento;
    }
    templanteImagen(producto){
        return `
            <img src="${producto.imagen}" 
                 alt="Producto" 
                 id="drawerProductImage">`;
    }
    templanteInfo(produto){
        const categorias = produto.categorias;
        return `
            <span class="product-drawer-category" id="drawerCategory">${categorias[0]}</span>
            <h1 class="product-drawer-name" id="drawerProductName">${produto.nombre}</h1>
            <div class="product-drawer-price" id="drawerProductPrice">${produto.precio.toLocaleString()}</div>
            <p class="product-drawer-description" id="drawerDescription">
                Hermoso vestido floral perfecto para el verano. Confeccionado en algodón ligero y transpirable. 
                Ideal para eventos casuales o salidas al aire libre. Diseño elegante con detalles únicos.
            </p>`;
    }
    templanteColor(color){
        return `<label class="product-drawer-color-option">
                    <input type="radio" class = "drawer-color-option" name="drawer-color" value="${color}" checked>
                    <span class="product-drawer-color-swatch" 
                          style="background: ${color};" 
                          title="Rosa">
                    </span>
                </label>`;
    }
    templantesTallas(talla){
        return `<label class="product-drawer-size-option">
                    <input type="radio" class = "drawer-size-option" name="drawer-size" value="${talla}" checked>
                    <span class="product-drawer-size-label">${talla}</span>
                </label>`;
    }
    buscarProducto(){
        const producto = this.productos.find(p => p.id === this.evento);
        return producto;
    }
    arrayProducto(){
        const productoClick = this.buscarProducto()
        if(!productoClick) return;
        const dividirProducto = [
            {
                doc : document.querySelector(".product-drawer-image"),
                templante : this.templanteImagen,
                array : [null]
            },
            {
                doc : document.querySelector(".product-drawer-info"),
                templante : this.templanteInfo,
                array : [null]
            },
            {
                doc : document.querySelector(".product-drawer-color-grid"),
                templante : this.templanteColor,
                array : productoClick.colores
            },
            {
                doc : document.querySelector(".product-drawer-size-grid"),
                templante : this.templantesTallas,
                array : productoClick.tallas

            }
        ]
        return{
                array:  dividirProducto,
                producto : productoClick
              };

    }

    renderizado(doc, templante, array, producto){
        doc.innerHTML = "";
        const contenedor = document.querySelector(".product-drawer-content");
        contenedor.id = this.buscarProducto().id;
        array.forEach(a => {
            const contenido = !a ? producto : a;
            doc.insertAdjacentHTML("beforeend", templante(contenido))
        })
    }
    recorrerArray(){
        const obj = this.arrayProducto();
        const arrayProductos = obj.array;
        const producto = obj.producto
        if(!arrayProductos) return;
        arrayProductos.forEach(seleccion => {
            const doc = seleccion.doc;
            const templante = seleccion.templante;
            const array = seleccion.array;
            this.renderizado(doc, templante, array, producto)
        })
    }
    
}
class productoRelacionados {
    constructor(idCliqueado, productos){
        this.id = idCliqueado;
        this.productos = productos;
    }
    buscarTagsProducto(){
        const tags = this.productos.find(p => p.id === this.id).tags;
        if(!tags) return;
        return tags;
    }
    masRelacionado(tagsProducto, productosA){
        const productos = productosA.sort((a, b) => {
            const A = a.tags.filter(tag => tagsProducto.includes(tag)).length;
            const B = b.tags.filter(tag => tagsProducto.includes(tag)).length;
            return B - A;
        }).slice(0, 10);
        return productos;

    }
    eliminarRepetido(){
        const indice = this.productos.findIndex(p => p.id === this.id);
        if(!indice) return;
        const productosCopia = [... this.productos];
        productosCopia.splice(indice, 1)
        return productosCopia;
    }
    productoRelaccionado(){
        const productosCopia = this.eliminarRepetido();
        const tags = this.buscarTagsProducto();
        const productoFiltrado = productosCopia.filter(p => tags.some(x => p.tags.includes(x)));
        if(!productoFiltrado)return;
        const productoRelacionado = this.masRelacionado(tags, productoFiltrado);
        return productoRelacionado;
    }
    renderizadoDeProducto(){
        const productos = this.productoRelaccionado();
        const contenedor = document.querySelector(".product-drawer-related-grid");
        if(!contenedor) return;
        contenedor.innerHTML = "";
        productos.forEach(p => {
            contenedor.insertAdjacentHTML("beforeend", templanteBarraDeProductos(p))
        });
    }
}
const renderizadoDeBarraLateral = new productoRelacionados([], [])
const funcionBarra = () => {
    const contenedor = document.querySelector(".product-drawer");
    const overlay = document.querySelector(".product-drawer-overlay");
    const input = document.querySelector(".quantity-input");
    input.value = "1";
    contenedor.classList.toggle("active");
    document.body.classList.toggle("drawer-open");
    overlay.classList.toggle("active");
}

const rederizadoProd = new renderizarProducto([], []);
const rederizadoCompletoBarra = (productosBd, productoClickeado, verificador)=> {
    reiniciarScroll(document.querySelector(".product-drawer-content"));
    rederizadoProd.productos = productosBd;
    rederizadoProd.evento = productoClickeado;
    rederizadoProd.recorrerArray();
    renderizadoDeBarraLateral.productos = productosBd;
    renderizadoDeBarraLateral.id = productoClickeado;
    renderizadoDeBarraLateral.renderizadoDeProducto()
    if(verificador) return;
    funcionBarra();
}
document.addEventListener("click", async (e) => {
    const relatedCard = e.target.closest(".product-drawer-related-card");
    const decreaseBtn = e.target.closest("#drawerDecreaseQty");
    const increaseBtn = e.target.closest("#drawerIncreaseQty");
    const productCard = e.target.closest(".product-card");
    if (decreaseBtn || increaseBtn) {
        ajustarCantidad(e.target, ".quantity-input", "#drawerDecreaseQty", "#drawerIncreaseQty");
    }

    if (relatedCard || productCard) {
        const productosBd = JSON.parse(localStorage.getItem("productos"));
        const productoClickeado = productCard ? productCard.id : relatedCard.id ? relatedCard.id : null;
        if (e.target.closest(".btn-add-to-cart")) {
            await agregarCarritoDeCompras(productosBd, productoClickeado);
            return;
        };
        const verificador = relatedCard ? true : false;
        rederizadoCompletoBarra(productosBd, productoClickeado, verificador);
    };
});


document.querySelector(".product-drawer-overlay").addEventListener("click", funcionBarra);
document.querySelector(".product-drawer-close").addEventListener("click", funcionBarra);


