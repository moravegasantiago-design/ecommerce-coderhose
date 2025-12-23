import { cogerDatos } from "./sistema-de-filtrado.js";
export const crearTemplate = (templante) => {
  const content = document.querySelector(".content");
  const htmlCategoria = templante;
  const div = document.createElement("div");
  div.innerHTML = htmlCategoria;
  content.classList.remove("oculto");
  content.classList.add("active");
  content.replaceChildren(div);
};
export const quitMenu = () => {
  const menuHamb = document.querySelector(".menu-toggle");
  const menuMobil = document.querySelector(".nav-menu");
  const navOverlay = document.querySelector(".nav-overlay");
  menuMobil.classList.remove("active");
  navOverlay.classList.remove("active");
  setTimeout(() => {
    menuHamb.classList.remove("active");
  }, 200);
};
export const modificarFiltros = (filtrosActivos) => {
  if (!cogerDatos()) return;
  cogerDatos().forEach((d) => {
    const verificarExistencia = filtrosActivos.findIndex(
      (f) => JSON.stringify(f) === JSON.stringify(d)
    );
    if (verificarExistencia !== -1) return;
    const clave = Object.keys(d);
    if (!Array.isArray(d[clave[0]])) {
      const indice = filtrosActivos.findIndex(
        (f) => f.precioMin || f.precioMax
      );
      if (indice !== -1) filtrosActivos.splice(indice, 1);
      filtrosActivos.push(d);
      return;
    }
    const verificarClaveIndex = filtrosActivos.findIndex((f) => f[clave[0]]);
    if (verificarClaveIndex === -1) {
      filtrosActivos.push(d);
      return;
    }
    const filtro = filtrosActivos[verificarClaveIndex];
    d[clave[0]].forEach((a) => {
      filtro[clave[0]].push(a);
    });
  });
};
export const filtrosMobil = () => {
  const searchContent = document.querySelector(".filters-sidebar");
  const filtersBackdrop = document.querySelector(".nav-overlay");
  if (!document.querySelector(".filter-toggle")) return;
  document.querySelector(".filter-toggle").addEventListener("click", () => {
    searchContent.classList.toggle("active");
    filtersBackdrop.classList.toggle("active");
  });
  document.querySelector(".filters-close").addEventListener("click", () => {
    searchContent.classList.remove("active");
    filtersBackdrop.classList.remove("active");
  });
};

export const clickFuera = () => {
  const navOverlay = document.querySelector(".nav-overlay");
  navOverlay.addEventListener("click", () => {
    if (document.querySelector(".nav-menu").classList.contains("active")) {
      const menuHamb = document.querySelector(".menu-toggle");
      const menuMobil = document.querySelector(".nav-menu");
      const navOverlay = document.querySelector(".nav-overlay");
      menuMobil.classList.remove("active");
      navOverlay.classList.remove("active");
      setTimeout(() => {
        menuHamb.classList.remove("active");
      }, 200);
    } else if (
      document.querySelector(".filters-sidebar").classList.contains("active")
    ) {
      const searchContent = document.querySelector(".filters-sidebar");
      const filtersBackdrop = document.querySelector(".nav-overlay");
      searchContent.classList.remove("active");
      filtersBackdrop.classList.remove("active");
    } else {
      return;
    }
  });
};

export const eliminarClase = () => {
  const inputPrice = document
    .querySelector(".price-range")
    .querySelectorAll("input");
  const textError = document.querySelector(".price-error");
  const validador =
    inputPrice[0].classList.contains("error") ||
    inputPrice[1].classList.contains("error");
  if (validador) {
    const min = Number(inputPrice[0].value);
    const max = Number(inputPrice[1].value);
    if (
      inputPrice[0].value !== "" &&
      inputPrice[1].value !== "" &&
      min <= max
    ) {
      inputPrice[0].classList.remove("error");
      inputPrice[1].classList.remove("error");
      textError.classList.remove("show");
      return;
    }
  }
};

export class valueInputProducto {
  constructor(productoClick, productos) {
    this.id = productoClick;
    this.productos = productos;
    this.objProducto = {};
  }
  valueInput(documento) {
    const inputOpcion = documento;
    if (!inputOpcion || inputOpcion.value === "") return;
    const value = inputOpcion.value;
    return value;
  }
  ObjInput() {
    const obj = {
      color: document.querySelector('input[name="drawer-color"]:checked'),
      talla: document.querySelector('input[name="drawer-size"]:checked'),
      cantidad: document.querySelector(".quantity-input"),
    };
    return obj;
  }
  buscarProducto() {
    const producto = this.productos.find((p) => p.id === this.id);
    return producto;
  }
  objContenido(producto) {
    this.objProducto.id = `${producto.id}-talla:${this.objProducto.talla}-color:${this.objProducto.color}`;
    this.objProducto.nombre = producto.nombre;
    this.objProducto.precio = producto.precio;
    this.objProducto.imagen = producto.imagen;
  }
  recorrerObj() {
    const objDocumento = this.ObjInput();
    if (!objDocumento) return;
    Object.keys(objDocumento).forEach((clave) => {
      const contenido = objDocumento[clave];
      const seleccion = this.valueInput(contenido);
      this.objProducto[clave] = seleccion;
    });
    if (!this.objProducto) return;
    const producto = this.buscarProducto();
    if (!producto) return;
    this.objProducto = { ...producto, ...this.objProducto };
    this.objContenido(producto);
  }
}
export const reiniciarScroll = (contenedor) => {
  if (!contenedor) return;
  contenedor.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const ajustarCantidad = (
  eventoClick,
  selectorInput,
  selectorDiminuir,
  selectorAumentar
) => {
  const input = document.querySelector(selectorInput);
  if (eventoClick === document.querySelector(`${selectorDiminuir}`)) {
    if (Number(input.value) === 1) return true;
    Number(input.value--);
  } else if (eventoClick === document.querySelector(`${selectorAumentar}`)) {
    Number(input.value++);
  }
};
