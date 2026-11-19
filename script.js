//Logica del banner

const imagenes = document.getElementsByClassName("imagen");
const puntos = document.getElementsByClassName("punto_scroll");


export let seleccion = 1;

export let banner_slider = (selepunto, n) => {

    if(selepunto){
         
      seleccion = n + 1;
      
    }

    if (seleccion > (imagenes.length)){

        seleccion = 1;
    } else if (seleccion < 0){

        seleccion = (imagenes.length);
    }
    

    let despla = seleccion - 1;


    for(let i = 0; i <= (imagenes.length - 1); i++){

            imagenes[i].style.translate = "-" + despla*100 + "%" + " 0px";

            if (i == despla){

                puntos[i].classList.add("acti");
            } else {

               puntos[i].classList.remove("acti"); 
            }
    }

    
    
   if (!selepunto){
    setTimeout(() => {

        seleccion++;
        banner_slider();

    }, 5000);
  } 
   
 }




    setTimeout(() => {

        
        banner_slider();

    }, 100);








// Logica de Cartelera; Carameleria Seleccion

const peliculas = document.getElementsByClassName("pelicula");
const productos = document.getElementsByClassName("producto");
const derechaP = document.getElementById("derecha");
const izquierdaP = document.getElementById("izquierda");
const derechaC = document.getElementById("derechac");
const izquierdaC = document.getElementById("izquierdac");

let selectP = 1;
let selectC = 1;

let slider_pelicula = () => {

    if(selectP > peliculas.length){

        selectP = 1;

    } else if(selectP < 1){

        selectP = peliculas.length;
    }

    let despla = selectP - 1;

    
    for(let i = 0; i <= (peliculas.length - 1); i++){

        peliculas[i].style.translate = "-" + despla*130 + "%" + " 0px";
    }
}

let slider_caram = () => {

    if(selectC > productos.length){

        selectC = 1;

    } else if(selectC < 1){

        selectC = productos.length;
    }

    let despla = selectC - 1;

    
    for(let i = 0; i <= (productos.length - 1); i++){

        productos[i].style.translate = "-" + despla*130 + "%" + " 0px";
    }
}


derechaP.addEventListener("click", () => {

    selectP++;
    slider_pelicula();
});

izquierdaP.addEventListener("click", () => {

    selectP--;
    slider_pelicula();
});

derechaC.addEventListener("click", () => {

    selectC++;
    slider_caram();
});

izquierdaC.addEventListener("click", () => {

    selectC--;
    slider_caram();
});





//logica para titulos de poster

const poster = document.getElementsByClassName("poster");
const titu = document.getElementsByClassName("proyec");

for(let i = 0; i <= (poster.length - 1); i++){

    

     poster[i].addEventListener("mouseenter", (e)=>{
         
      poster[i].classList.add("difu");
      titu[i].classList.add("mostrado");
     

     });

}

for(let i = 0; i <= (poster.length - 1); i++){

     poster[i].addEventListener("mouseout", (e)=>{

        if(e.target == titu[i]){
            
            return;
        }
      
      poster[i].classList.remove("difu");
      titu[i].classList.remove("mostrado");
      

     });
     
}


for(let i = 0; i <= (titu.length - 1); i++){

     titu[i].addEventListener("mouseenter", ()=>{
        
      poster[i].classList.add("difu");
      titu[i].classList.add("mostrado");
      

     });
     
}

for(let i = 0; i <= (titu.length - 1); i++){

    titu[i].addEventListener("mouseout", (e)=>{
      
      
      poster[i].classList.add("difu");
      titu[i].classList.add("mostrado");
      

     });
     
}









