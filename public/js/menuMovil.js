import { clickFuera } from "./utils.js";
const aparecerMenu = ()=> {
    const menuHamb = document.querySelector(".menu-toggle");
    const menuMobil = document.querySelector(".nav-menu");
    const navOverlay = document.querySelector(".nav-overlay");
    menuHamb.addEventListener("click", ()=>{
        menuHamb.classList.toggle("active");
        navOverlay.classList.toggle("active");
        menuMobil.classList.toggle("active");
    })

}

aparecerMenu()
const quitarMenu = ()=>{
    const navClose = document.querySelector(".nav-close");
    const menuHamb = document.querySelector(".menu-toggle");
    const menuMobil = document.querySelector(".nav-menu");
    const navOverlay = document.querySelector(".nav-overlay")
    clickFuera()
    navClose.addEventListener("click", ()=>{
        menuMobil.classList.remove("active");
        navOverlay.classList.remove("active");
        setTimeout(()=>{
            menuHamb.classList.remove("active");
        },200)
    })

}
quitarMenu()
