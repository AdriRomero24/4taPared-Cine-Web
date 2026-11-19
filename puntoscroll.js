//Logica de los puntos del scroll

import {banner_slider as banner } from "./script.js";

const imagenes_scroll = document.getElementsByClassName("imagen");
const pcarrusel = document.getElementById("puntos_carrusel");

let puntos_slider = () => {

    for (let i = 0; i <= (imagenes_scroll.length - 1); i++){
     
     
     const punto = document.createElement("div");
     punto.classList.add("punto_scroll");

     pcarrusel.appendChild(punto);

    }

    


    
}

puntos_slider();
const puntos = document.getElementsByClassName("punto_scroll");

for(let i = 0; i <= (puntos.length - 1); i++){

    

    puntos[i].addEventListener("click", () =>{

    
    
    banner(true, i);
    
    });
}