import { crearTemplate, filtrosMobil, quitMenu, modificarFiltros, reiniciarScroll} from "./utils.js";
import { templanteFiltro } from "./templantes.js";
import { agregarMenuDeOpciones, sistemaDeFiltrado } from "./sistema-de-filtrado.js"
import { filtrarProductos, aggProductos } from "./search.js";
const productos = JSON.parse(localStorage.getItem("productos"))||[];
let filtrosActivosNav = [];
let productosFiltrados = [];
let productosOriginal = [];
const diccionarioTitulos = (opcion) => {
    const diccionario = {
        'nuevo': 'Lo más reciente',
        'denim': 'Moda infantil denim',
        'sets': 'Conjuntos de ropa infantil',
        'comfy': 'Ropa cómoda Infantil',
        'rebaja': 'Ofertas en ropa infantil',
        'ninas': 'Tendencias para niñas',
        'todo-ninas': 'Tendencias para niñas',
        'vestido-ninas': 'Vestidos para niñas',
        'jeans-ninas': 'Jeans para niñas',
        'camisetas-ninas': 'Camisetas para niñas',
        'buzos-ninas': 'Buzos para niña',
        'comfy-ninas': 'Ropa cómoda para niña',
        'ninos': 'Tendencias para niño',
        'todo-ninos': 'Tendencias para niño',
        'camisetas-ninos': 'Camisas para niños',
        'jeans-ninos': 'Jeans para niño',
        'buzos-ninos': 'Buzos para niños',
        'comfy-ninos': 'Ropa cómoda para niño'
    };
    return diccionario[opcion];
}
const rederizarMenuDeFiltros = new agregarMenuDeOpciones([]);
class rederizadoDeNav {
    constructor(opcion){
        this.opcion = opcion;
    }
    rederizadoNav(){
        reiniciarScroll(window)
        filtrosActivosNav = [];
        productosOriginal = [];
        productosFiltrados = [];
        const titulos = diccionarioTitulos(this.opcion);
        crearTemplate(templanteFiltro(titulos));
        productosOriginal = filtrarProductos(this.opcion, productos);
        productosFiltrados = filtrarProductos(this.opcion, productos);
        rederizarMenuDeFiltros.productos = productosFiltrados;
        rederizarMenuDeFiltros.renderizarMenu();
        aggProductos(productosOriginal);
        filtrosMobil();
    }
}
const rederizado = new rederizadoDeNav([])
class opcionMenu {
    constructor(menuDesklop, menuMovil){
        this.menuDesklop = menuDesklop
        this.menuMovil = menuMovil;
        this.iniciarEventoDesklop();
        this.iniciarEventoMovil();
    }
    iniciarEventoMovil(){
        this.menuMovil.forEach(li => {
            li.addEventListener("click", (e)=> {
                const opcion = this.buscarEventoClickeado(e);
                if(this.desplegarSubMenu(opcion, e))return;
                if(!opcion) return;
                rederizado.opcion = opcion;
                rederizado.rederizadoNav();
                quitMenu();
            })
        })
    }
    iniciarEventoDesklop(){
        this.menuDesklop.forEach((li) =>{
            li.addEventListener("click", (e)=> {
               const opcion = this.buscarEventoClickeado(e);
               if(!opcion) return;
               rederizado.opcion = opcion
               rederizado.rederizadoNav()
            })

        })
    }
    buscarEventoClickeado(evento){
        const divClickeado = evento.target.closest("a")
        if(!divClickeado) return;
        const opcion = divClickeado.classList[divClickeado.classList.length -1];
        return opcion;
    }
    desplegarSubMenu(opcion, evento){
        if(opcion === "ninas" || opcion === "ninos"){
        const buscarConte = evento.target.closest(".nav-item-dropdown")
        buscarConte.classList.toggle("active")
        return true;
        }
    }
}

const limpiarContenidoNav =()=>{
    sistemaDeFiltrado(filtrosActivosNav, productosFiltrados, productosOriginal);
    aggProductos(productosFiltrados)
    const cantidad = document.getElementById("resultsCount");
    rederizarMenuDeFiltros.productos = productosFiltrados;
    rederizarMenuDeFiltros.renderizarMenu();
    if(!cantidad) return;
    cantidad.textContent = productosFiltrados.length
}

new opcionMenu(document.querySelectorAll(".desktop-nav-list li"), document.querySelectorAll(".nav-list"));
document.addEventListener("click", (e) => {
    if(!e.target.closest(".apply-filters-btn.filtro") && !e.target.closest(".remover-filter")) return;
    if(!document.querySelector(".apply-filters-btn.filtro")) return;
    if(!filtrosActivosNav.length === 0) return
    modificarFiltros(filtrosActivosNav);
    limpiarContenidoNav()
})