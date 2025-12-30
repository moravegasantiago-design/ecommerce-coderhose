import {
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase-config.js";
import {
  templanteBusqueda,
  templanteProductos,
  sugerenciaTemplante,
  templanteSinResultado,
} from "./templantes.js";
import {
  crearTemplate,
  filtrosMobil,
  eliminarClase,
  reiniciarScroll,
} from "./utils.js";
import { cogerDatos } from "./sistema-de-filtrado.js";
import {
  sistemaDeFiltrado,
  agregarMenuDeOpciones,
  limpiarTodosFiltros,
} from "./sistema-de-filtrado.js";

let filtrosActivosBusqueda = [];
let productosFiltrados = [];
let productosOriginal = [];
const productos = JSON.parse(localStorage.getItem("productos")) || [];

const busquedaMovil = () => {
  const LupaSearch = document.querySelector(".search-mobile");
  const mobileSearch = document.querySelector(".mobile-search");
  LupaSearch.addEventListener("click", () => {
    mobileSearch.classList.toggle("active");
  });
  const searchClose = document.querySelector(".mobile-search-close");
  searchClose.addEventListener("click", () => {
    mobileSearch.classList.toggle("active");
  });
};

const cerrarBusquedaMovil = () => {
  const mobileSearch = document.querySelector(".mobile-search");
  if (mobileSearch.classList.contains("active")) {
    mobileSearch.classList.remove("active");
  }
};

busquedaMovil();

const inputDesktop = document.querySelector(".search-input");
const formDesktop = document.querySelector(".form-input");
const inputMovil = document.querySelector(".mobile-search-input");
const sugerenciaMovilActive = document.querySelector(
  ".search-suggestions.mobile"
);
const sugerenciaMovil = document.querySelector("#suggestionsListMobile");
const sugerenciaDesktop = document.querySelector("#suggestionsListDesktop");
const sugerenciaDesktopActive = document.querySelector(".search-suggestions");

export const traerProductos = async () => {
  try {
    if (productos.length === 0) {
      const productosSnap = await getDocs(collection(db, "productos-falsos"));
      productosSnap.forEach((p) => {
        productos.push({
          id: p.id,
          ...p.data(),
        });
      });

      localStorage.setItem("productos", JSON.stringify(productos));
    }
    return productos;
  } catch (err) {
    console.error(`Traer productos(serch): ${err}`);
    return [];
  }
};

const rederizarMenuDeFiltros = new agregarMenuDeOpciones([]);

class buscador {
  constructor(
    inputMovil,
    inputDesktop,
    formDesktop,
    sugerenciaMovil,
    sugerenciaMovilActive,
    sugerenciaDesktopActive,
    sugerenciaDesktop,
    lista,
    templante,
    mostrarBusqueda,
    cerrarBusquedaMovil,
    filtrosMovil
  ) {
    this.inputMovil = inputMovil;
    this.inputDesktop = inputDesktop;
    this.formDesktop = formDesktop;
    this.sugerenciaMovil = sugerenciaMovil;
    this.sugerenciaDesktop = sugerenciaDesktop;
    this.sugerenciaMovilActive = sugerenciaMovilActive;
    this.sugerenciaDesktopActive = sugerenciaDesktopActive;
    this.lista = lista;
    this.templante = templante;
    this.mostrarBusqueda = mostrarBusqueda;
    this.cerrarBusquedaMovil = cerrarBusquedaMovil;
    this.filtrosMovil = filtrosMobil;
  }
  eventoInput() {
    this.inputMovil.addEventListener("input", () => {
      const texto = this.inputMovil.value.trim().toLowerCase();
      if (texto === "") {
        this.sugerenciainput("remove", "movil");
        return;
      }
      this.sugerenciainput("add", "movil");
      this.sugerenciaMovil.innerHTML = "";
      this.mostrarSugerencias(texto, this.sugerenciaMovil, "movil");
    });
    this.inputDesktop.addEventListener("input", () => {
      const texto = this.inputDesktop.value.trim().toLowerCase();
      if (texto === "") {
        this.sugerenciainput("remove", "desktop");
        return;
      }
      this.sugerenciainput("add", "desktop");
      this.sugerenciaDesktop.innerHTML = "";
      this.mostrarSugerencias(texto, this.sugerenciaDesktop, "desktop");
    });
  }
  eventoTecla() {
    this.inputMovil.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const texto = this.inputMovil.value.trim().toLowerCase();
      if (texto === "") return;
      this.sugerenciainput("remove", "movil");
      this.cerrarBusquedaMovil();
      this.mostrarBusqueda(texto);
      this.filtrosMovil();
    });
    this.formDesktop.addEventListener("submit", (e) => {
      e.preventDefault();
      const texto = this.inputDesktop.value.trim().toLowerCase();
      if (texto === "") return;
      this.sugerenciainput("remove", "desktop");
      this.mostrarBusqueda(texto);
    });
  }
  eventoClick() {
    sugerenciaDesktopActive.addEventListener("click", (e) => {
      if (!e.target.closest(".suggestion-item")) return;
      const busqueda = e.target.closest(".suggestion-item").id;
      this.sugerenciainput("remove", "desktop");
      this.inputDesktop.value = busqueda;
      this.mostrarBusqueda(busqueda);
    });

    sugerenciaMovilActive.addEventListener("click", (e) => {
      if (!e.target.closest(".suggestion-item")) return;
      const busqueda = e.target.closest(".suggestion-item").id;
      this.sugerenciainput("remove", "movil");
      this.cerrarBusquedaMovil();
      this.inputMovil.value = busqueda;
      this.mostrarBusqueda(busqueda);
      this.filtrosMovil();
    });
  }

  sugerenciainput(accion, tipo) {
    if (tipo === "movil") {
      this.sugerenciaMovilActive.classList[accion]("active");
    } else {
      this.sugerenciaDesktopActive.classList[accion]("active");
    }
  }
  async filtradoArray(texto) {
    const arrayDeObjeto = await this.lista();
    const listaTagsIdColoresNombreCategoria = arrayDeObjeto.flatMap((obj) => [
      ...obj.categorias,
      obj.nombre,
      obj.id,
      ...obj.colores,
      ...obj.tags,
    ]);
    const removerDuplicado = [...new Set(listaTagsIdColoresNombreCategoria)];
    const filtrado = removerDuplicado.filter((obj) =>
      obj.trim().toLowerCase().includes(texto)
    );
    const filtradoRemove = filtrado.filter(
      (x) => !x.includes("-") && !x.includes("todo")
    );
    return filtradoRemove;
  }
  async mostrarSugerencias(texto, sugerencia, tipo) {
    const filtrado = await this.filtradoArray(texto);
    const listaProducto = await this.lista();
    let sugerencias = [];
    filtrado.forEach((objeto) => {
      const filtrarPorArray = listaProducto.filter(
        (obj) =>
          obj.categorias.some((categoria) => categoria.includes(objeto)) ||
          obj.nombre.includes(objeto) ||
          obj.id.includes(objeto) ||
          obj.colores.some((x) => x.includes(objeto)) ||
          obj.tags.some((tag) => tag.includes(objeto))
      );
      const cantidadDeCadaFiltrado = Number(filtrarPorArray.length);
      const categoria = [
        ...new Set(filtrarPorArray.flatMap((x) => x.categorias)),
      ];
      const filtradoCategorias = categoria.filter(
        (x) => x.includes("-") && !x.includes("todo")
      );
      sugerencias.push({
        nombre: objeto,
        categoria: filtradoCategorias[0] || "Ropa",
        cantidad: cantidadDeCadaFiltrado,
      });
    });
    sugerencias = sugerencias.filter((s) =>
      s.nombre.toLowerCase().startsWith(texto)
    );
    sugerencias = sugerencias.sort((a, b) => b.cantidad - a.cantidad);
    if (sugerencias.length === 0) {
      this.sugerenciainput("remove", tipo);
    }
    sugerencias.forEach((obj) => {
      const templanteModificado = this.templante(
        obj.nombre,
        obj.categoria,
        obj.cantidad
      );
      sugerencia.insertAdjacentHTML("beforeend", templanteModificado);
    });
  }
}

const cerrarSugerenciar = () => {
  document.addEventListener("click", (e) => {
    if (
      sugerenciaDesktopActive.classList.contains("active") ||
      sugerenciaMovilActive.classList.contains("active")
    ) {
      if (
        !e.target.closest(".search-suggestions") &&
        !e.target.closest(".form-input") &&
        !e.target.closest(".mobile-search-input")
      ) {
        if (sugerenciaDesktopActive.classList.contains("active")) {
          sugerenciaDesktopActive.classList.remove("active");
        } else if (sugerenciaMovilActive.classList.contains("active")) {
          sugerenciaMovilActive.classList.remove("active");
        }
      }
    }
  });
};

cerrarSugerenciar();

const eliminarSinResultado = (div) => {
  const siguiente = div.nextElementSibling;
  if (!siguiente || !siguiente.classList.contains("no-results")) return;
  siguiente.remove();
};

export const aggProductos = (productos) => {
  const div = document.querySelector("#productsContainer");
  div.innerHTML = "";
  eliminarSinResultado(div);
  if (productos.length === 0) {
    div.insertAdjacentHTML("afterend", templanteSinResultado());
  }
  productos.forEach((produt) => {
    div.insertAdjacentHTML("beforeend", templanteProductos(produt));
  });
};

export const filtrarProductos = (busqueda, productosFil) => {
  const productosFiltrados = productosFil.filter(
    (obj) =>
      obj.categorias.some((categoria) => categoria.includes(busqueda)) ||
      obj.nombre.includes(busqueda) ||
      obj.id.includes(busqueda) ||
      obj.colores.some((x) => x.includes(busqueda)) ||
      obj.tags.some((tag) => tag.includes(busqueda))
  );
  return productosFiltrados;
};

const mostrarBusqueda = (busqueda) => {
  reiniciarScroll(window);
  filtrosActivosBusqueda = [];
  productosFiltrados = [];
  productosOriginal = filtrarProductos(busqueda, productos);
  productosFiltrados = filtrarProductos(busqueda, productos);
  crearTemplate(templanteBusqueda(busqueda, productosFiltrados.length));
  rederizarMenuDeFiltros.productos = productosFiltrados;
  rederizarMenuDeFiltros.renderizarMenu();
  aggProductos(productosFiltrados);
};

const modificarFiltros = () => {
  if (!cogerDatos()) return;
  cogerDatos().forEach((d) => {
    const verificarExistencia = filtrosActivosBusqueda.findIndex(
      (f) => JSON.stringify(f) === JSON.stringify(d)
    );
    if (verificarExistencia !== -1) return;
    const clave = Object.keys(d);
    if (!Array.isArray(d[clave[0]])) {
      const indice = filtrosActivosBusqueda.findIndex(
        (f) => f.precioMin || f.precioMax
      );
      if (indice !== -1) filtrosActivosBusqueda.splice(indice, 1);
      filtrosActivosBusqueda.push(d);
      return;
    }
    const verificarClaveIndex = filtrosActivosBusqueda.findIndex(
      (f) => f[clave[0]]
    );
    if (verificarClaveIndex === -1) {
      filtrosActivosBusqueda.push(d);
      return;
    }
    const filtro = filtrosActivosBusqueda[verificarClaveIndex];
    d[clave[0]].forEach((a) => {
      if (!filtro[clave[0]].includes(a)) {
        filtro[clave[0]].push(a);
      }
    });
  });
};

const miBuscador = new buscador(
  inputMovil,
  inputDesktop,
  formDesktop,
  sugerenciaMovil,
  sugerenciaMovilActive,
  sugerenciaDesktopActive,
  sugerenciaDesktop,
  traerProductos,
  sugerenciaTemplante,
  mostrarBusqueda,
  cerrarBusquedaMovil,
  filtrosMobil
);

miBuscador.eventoInput();
miBuscador.eventoTecla();
miBuscador.eventoClick();

const limpiarContenido = () => {
  sistemaDeFiltrado(
    filtrosActivosBusqueda,
    productosFiltrados,
    productosOriginal
  );
  rederizarMenuDeFiltros.productos = productosFiltrados;
  rederizarMenuDeFiltros.renderizarMenu();
  aggProductos(productosFiltrados);
  const cantidad = document.getElementById("resultsCount");
  if (!cantidad) return;
  cantidad.textContent = productosFiltrados.length;
};

const resetearFiltrosBusqueda = () => {
  filtrosActivosBusqueda = [];
  limpiarTodosFiltros();
  productosFiltrados = [...productosOriginal];
  aggProductos(productosFiltrados);
  rederizarMenuDeFiltros.productos = productosFiltrados;
  rederizarMenuDeFiltros.renderizarMenu();
  const cantidad = document.getElementById("resultsCount");
  if (cantidad) {
    cantidad.textContent = productosFiltrados.length;
  }
};

document.addEventListener("click", (e) => {
  if (e.target.closest(".clear-filters-btn.buscador")) {
    resetearFiltrosBusqueda();
    return;
  }
  if (
    !e.target.closest(".apply-filters-btn.buscador") &&
    !e.target.closest(".remover-filter")
  )
    return;
  if (!filtrosActivosBusqueda.length === 0) return;
  if (!document.querySelector(".apply-filters-btn.buscador")) return;
  modificarFiltros(filtrosActivosBusqueda);
  limpiarContenido();
});
