export const cogerDatos = ()=>{
    const btnAplicar = document.querySelector(".apply-filters-btn")
    if(!btnAplicar) return;
    const datos = ()=>{
        let filtros = [];
        const grupoDeFiltro = document.querySelectorAll(".filter-group");
        if(!grupoDeFiltro) return;
        for( const filtro of grupoDeFiltro){
            if(!filtro.querySelector("input"))return;
            const type = filtro.querySelector("input").type;
            const nombreDelFiltro = filtro.querySelector(".filter-title").textContent;
            const inputs = filtro.querySelectorAll(`input[type='${type}']:checked`)
            if(type === "number"){
                const input = document.querySelectorAll("[data-precio]")
                const inputMin = Number(input[0].value);
                const inputMax = Number(input[1].value);
                if(input[0].value.trim() === "" && input[1].value.trim() === "") continue;
                
                if(input[0].value.trim() === "" || input[1].value.trim() === ""){
                    errorInput("No puede estar vacio", input)
                    filtros = [];
                    return filtros;
                }else if(inputMin > inputMax){
                    errorInput("El precio mínimo no puede ser mayor que el máximo", input)
                    filtros = [];
                    return filtros;
                }
                
                filtros.push({
                    precioMin : inputMin, precioMax : inputMax
                })
                continue;
            }
            if(!inputs) continue;
            let valores = Array.from(inputs).map(i => i.value);
            if(valores.some(v => !Number.isNaN(Number(v)))){
                valores = valores.map(v => Number(v));
            }
            
            if(valores.length === 0)continue;
                filtros.push({
                    [nombreDelFiltro] : valores
                })
        }
        return filtros;
        
    }
    return datos();
    
}

const errorInput = (text, inputs)=>{
    if(!document.querySelector(".price-error"))return;
    const textError = document.querySelector(".price-error")
    textError.textContent = "";
    inputs.forEach(input => {
        input.classList.add("error");
    });
    textError.classList.add("show");
    textError.textContent = `${text}`;
}
export const eliminarClase = (inputs, textError)=>{
    const validador = inputs[0].classList.contains("error") || inputs[1].classList.contains("error");
    if(validador){
        const min = Number(inputs[0].value);
        const max = Number(inputs[1].value);
        if(inputs[0].value !== "" && inputs[1].value !== "" && min <= max){
            inputs[0].classList.remove("error");
            inputs[1].classList.remove("error")
            textError.classList.remove("show");
            return;
        }
    }  
}

class RenderizadorDeFiltros{
    constructor (filtros){
        this.arraydeFiltros = filtros;
        this.agregarFiltros();
    }
    crearFiltro(filtro, clave, contenido){
        const contenedor = document.createElement("div");
        contenedor.classList.add("active-filter-tag");
        contenedor.id = `${contenido}-filtro`;
        const span = document.createElement("span");
        if(Array.isArray(clave) && Array.isArray(contenido)){
            span.textContent = `${clave[0]}: ${contenido[0]}, ${clave[1]}: ${contenido[1]}`;
        }else{
            span.textContent = `${clave}: ${contenido}`;
        }
        const btn = document.createElement("button");
        btn.textContent = `✕`;
        btn.classList.add("remover-filter");
        btn.removeEventListener("click", () => this.eliminarFiltro(contenedor, filtro, clave, contenido))
        btn.addEventListener("click", () => this.eliminarFiltro(contenedor, filtro, clave, contenido));
        contenedor.appendChild(span);
        contenedor.appendChild(btn);
        return contenedor;
    }
    eliminarFiltro(div, element, clave, contenido){
        const index = this.arraydeFiltros.findIndex(e => e === element);
        if(index !== -1){
            if(Array.isArray(element[clave])){
                const indexArray = element[clave].findIndex(x => x === contenido);
                const obj = this.arraydeFiltros[index];
                obj[clave].splice(indexArray, 1);
                if(obj[clave].length === 0) this.arraydeFiltros.splice(index, 1);
                div.remove();
                return this.arraydeFiltros;
            }else{
                this.arraydeFiltros.splice(index, 1);
                div.remove();
                return this.arraydeFiltros;
            }
        }
                
    }
    aggAlContenedor(filtro, clave, contenido){
        const div = document.querySelector(".active-filters");
        const contenedor = this.crearFiltro(filtro, clave, contenido);
        div.appendChild(contenedor)
    }
    agregarFiltros(){
        this.arraydeFiltros.forEach(filtro =>{
            let clave = Object.keys(filtro)[0]
            let contenido = filtro[clave];
            if (clave === "precioMin"){
                clave = ["precioMin", "precioMax"];
                contenido = [contenido, Object.values(filtro)[1]];
            }
            if(Array.isArray(contenido) && Array.isArray(clave)) {
                this.aggAlContenedor(filtro, clave, contenido);
                return;
            }
            contenido.forEach(e => {
                if(document.getElementById(`${e}-filtro`)) return;
                this.aggAlContenedor(filtro, clave, e)
            })

        })
    }

}

class filtrado {
    constructor (filtros, productosOriginales){
        this.filtros = filtros;
        this.productos = productosOriginales;
    }
    
    estruturarFiltro(){
        const filtrado = [];
        this.filtros.forEach(f => {
            const claves = Object.keys(f)
            const filtroIndependiente = Object.values(f)[0];
            if(claves[0] === "Categoria"){
                const filtradoCategoria = this.productos.filter(p => filtroIndependiente.every(x => 
                    p.categorias.some(c => c.includes(x)) || p.tags.some(c => c.includes(x))));
                filtradoCategoria.forEach(f => {
                    filtrado.push(f)
                });
            }
            if (claves[0] === "precioMin" && claves[0] === "precioMax"){
                const productosData = filtrado.length > 0 ? filtrado : this.productos;
                const filtradoPrecio = productosData.filter(p => p.precio >= filtroIndependiente[0] 
                    && p.precio < filtroIndependiente[1])
                filtrado.splice(0, filtrado.length);
                filtradoPrecio.forEach(f => {
                    filtrado.push(f)
                });   
                    
            }
            if (claves[0] === "Talla"){
                const productosData = filtrado.length > 0 ? filtrado : this.productos;
                const filtradoTalla = productosData.filter(p => filtroIndependiente.every(x => 
                    p.tallas.includes(x)))
                filtrado.splice(0, filtrado.length);
                filtradoTalla.forEach(f => {
                    filtrado.push(f)
                });   
                    
            }
            if (claves[0] === "Color"){
                const productosData = filtrado.length > 0 ? filtrado : this.productos;
                const filtradoTalla = productosData.filter(p => filtroIndependiente.every(x => 
                    p.colores.some(c => c.includes(x))))
                filtrado.splice(0, filtrado.length);
                filtradoTalla.forEach(f => {
                    filtrado.push(f)
                });
                 
                    
            }
            
        })
        return this.filtros.length === 0 ? this.productos : filtrado;
    }
}
export class agregarMenuDeOpciones {
    constructor(productosFiltrados){
        this.productos = productosFiltrados;
    }
    templanteDeCategorias(categoria){
        const templante =`<label class="filter-option">
                                    <input type="radio" name="category" value="${categoria[0]}">
                                    <span>${categoria[0]}</span>
                                    <span class="filter-count">(${categoria[1]})</span>
                                </label>`;
        return templante;
                            
    }
    templanteDeTalla(talla){
        const templante =`<label class="size-option">
                                <input type="checkbox" name="size" value="${Number(talla)}">
                                <span>${talla}</span>
                            </label>`;
        return templante;
                            
    }
    templanteDeColor(color){
        const templante =`<label class="color-option" title="${color}">
                                <input type="checkbox" name="color" value="${color}">
                                <span class="color-swatch" style="background: ${color};"></span>
                            </label>`;
        return templante;
                            
    }
    templanteNoResultado(tipo){
        const templante = `<div class="filter-empty" id="categoryEmpty">
                            <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <p>No hay ${tipo} disponibles</p>
                        </div>`;
        return templante;
    }
    retornarArrayDeCategorias(){
        const categoriaYtags = this.productos.flatMap(p => [...p.categorias, ...p.tags]);
        const conteoDeCategoriaYTags = categoriaYtags.reduce((acumulador, producto) =>{
            acumulador[producto] = (acumulador[producto] ? acumulador[producto] : 0)+ 1
            return acumulador;
        }, {})
        const convertirArray = Object.entries(conteoDeCategoriaYTags)
        const ordenarDeMayorMenor = convertirArray.sort((a, b) => b[1] - a[1])
        const arrayCategoriaYtags = [];
        const paginadoTotal = this.agregarBotones(ordenarDeMayorMenor, [4, 5]);
        this.cortarArray(ordenarDeMayorMenor, paginadoTotal, arrayCategoriaYtags);
        const arrayDeSeccion = this.clickBoton(arrayCategoriaYtags, [4, 5], ordenarDeMayorMenor);
        return arrayDeSeccion;
    }
    retornarArrayDeTallaYColor(opcion){
        if(this.productos.length === 0) return undefined;
        const aplanarArray = [ ...new Set( this.productos.flatMap(p => p[opcion]))]
        if(opcion === "tallas") aplanarArray.sort((a, b) => b - a);
        return aplanarArray;
    }
    insertarMenu(arrays, document, arrayDeTemplantes){
        document.innerHTML = "";
        if(!arrays) return;
        arrays.forEach(a => {
            document.insertAdjacentHTML("beforeend", arrayDeTemplantes(a))
        })
    }
    renderizarMenu(){
        const secciones = [
            {
                seccion : this.retornarArrayDeCategorias()??["categorias"],
                documento : document.querySelector(".filter-options"),
                templante : !this.retornarArrayDeCategorias() ? this.templanteNoResultado : this.templanteDeCategorias
            },
            {
                seccion : this.retornarArrayDeTallaYColor("tallas")??["tallas"],
                documento : document.querySelector(".size-grid"),
                templante : !this.retornarArrayDeTallaYColor() ? this.templanteNoResultado : this.templanteDeTalla
            },
            {
                seccion : this.retornarArrayDeTallaYColor("colores")??["colores"],
                documento : document.querySelector(".color-grid"),
                templante : !this.retornarArrayDeTallaYColor() ? this.templanteNoResultado : this.templanteDeColor
            }
        ]
        secciones.forEach(sec => {
            this.insertarMenu(sec.seccion, sec.documento, sec.templante)
        });
    }
    calcularPaginas(array){
        const numeroDeFiltro = 6;
        const paginaTotales = Math.ceil(array.length / numeroDeFiltro);
        return paginaTotales;
    }
    clickBoton(array, numero, arrayOriginal){
        const contenedor = document.querySelector(".filter-pagination");
        if(!contenedor) return;
        let retornarArray = array[0];
        contenedor.onclick = (e) => {
            const btnClick = e.target.closest(".filter-page-btn");     
            if(!btnClick) return;
            if(Number(e.target.closest(".filter-page-btn").textContent) +1 === numero[0]){
                numero[0] += 1;
                numero[1] += 1;
                this.agregarBotones(arrayOriginal, numero);
            }
            const convertirArray = Array.from(contenedor.querySelectorAll(".filter-page-btn"));
            const buscarActivo = convertirArray.find(a => a.classList.contains("active"));
            const buscarTarget = convertirArray.find(a => JSON.stringify(a.textContent) === JSON.stringify(btnClick.textContent))
            if(!buscarActivo) return;
            buscarActivo.classList.remove("active");
            buscarTarget.classList.add("active");
            const indice = (e.target.textContent) -1;
            retornarArray = array[indice];
            this.insertarMenu(retornarArray, document.querySelector(".filter-options"), this.templanteDeCategorias)
        }
        
        return retornarArray;
    }
    agregarBotones(array, numero){
        const div = document.querySelector(".filter-pagination")
        div.innerHTML = "";
        const paginaTotales = this.calcularPaginas(array);
        for(let i = 1; i <= paginaTotales; i++){
            let verificador = null;
            let templante = `<button class="filter-page-btn">${i}</button>`;
            if (i === 1) templante = `<button class="filter-page-btn active">${i}</button>`;
            if (i === numero[0] && paginaTotales > 4) templante = `<span class="filter-page-dots">...</span>`;
            if (i === numero[1]) {
                verificador = true;
                templante = `<button class="filter-page-btn">${paginaTotales}</button>`;
            }
            div.insertAdjacentHTML("beforeend", templante);
            if(verificador) break;
        }
        return paginaTotales;
    }
    cortarArray(array, numeroDePaginas, arrayCortado){
        for (let i = 0; i < numeroDePaginas; i++){
            const inicioDelArray = i * 6;
            let finalDeArray = inicioDelArray + 6;
            if(i === numeroDePaginas){
                finalDeArray = array.length;
            }
            const arrayDividido = array.slice(inicioDelArray, finalDeArray)
            arrayCortado.push([
                ...arrayDividido
            ])

        }
    }
}
export const sistemaDeFiltrado = (filtrosActivos, productos, productosOriginal) => {
    const arrayRemplazado = new RenderizadorDeFiltros(filtrosActivos);
    if (arrayRemplazado.length > 0) filtrosActivos = arrayRemplazado;
    const constructorDeFiltrado = new filtrado(filtrosActivos, productosOriginal);
    const productosActulizado = constructorDeFiltrado.estruturarFiltro();
    productos.splice(0, productos.length);
    productosActulizado.forEach(e => {
        productos.push(e);
    });
}
