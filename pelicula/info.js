
let conect_func = (id, fecha) => {

    fetch(`https://backend-4tapared.onrender.com/funciones.php?id=${id}&fecha=${fecha}`)

    .then(response => {
     
         return response.json();

    })
    .then(data =>{
        
        console.log("Datos recibidos:", data);

        const funciones_cont = document.getElementById("funciones_cont");
        

        funciones_cont.innerHTML = "";

        data.forEach(info => {

            let div_func = `<div class="funcion"><div class="func_info"> <span>Sala ${info.sala}</span><span>${info.hora}</span></div><a href="../seleccion?id=${id}&fun=${info.id}" style="text-decoration: none; color: inherit;"><div class="boton_entrar"><span>Entrar</span></div></a></div>`;

            funciones_cont.innerHTML += div_func;
            
        });
    })
    .catch(error => {

      console.error("Ocurrio error de conexion: ", error);
    });
}

const fechas = document.getElementsByClassName("fecha");  // Divs de fechas

const urlpara = new URLSearchParams(window.location.search);
const idselect = urlpara.get('id');

 const titulo_peli = document.getElementById("titulo");
 const genero_peli = document.getElementById("gen");
 const duracion_peli = document.getElementById("dur");
 const clasificacion_peli = document.getElementById("cla");
 const poster_peli = document.getElementById("poster");





document.addEventListener("DOMContentLoaded", () =>{
   
    console.log("hola");

    titulo_peli.classList.add("carga");
    genero_peli.classList.add("carga");
    duracion_peli.classList.add("carga");
    clasificacion_peli.classList.add("carga");
    poster_peli.classList.add("carga");

    

     if (!idselect){

     window.location.href = "../index.html";


     }

    const datos_pet = {id: idselect};

    fetch("https://backend-4tapared.onrender.com/info_peli.php",{

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos_pet)
    })
    .then(response => {

        return response.json();
    })
    .then(data => {

        console.log("datos de la pelicula: ", data);


       

        titulo_peli.textContent = data.titulo;
        duracion_peli.textContent = data.duracion + " Min";
        genero_peli.textContent = data.genero;
        clasificacion_peli.textContent = data.clasificacion;
        poster_peli.style.backgroundImage = `url(../${data.cartel})`;

        titulo_peli.classList.remove("carga");
        genero_peli.classList.remove("carga");
        duracion_peli.classList.remove("carga");
        clasificacion_peli.classList.remove("carga");
        poster_peli.classList.remove("carga");
        

    })
    .catch(error => {

        console.error("hubo error: ", error);
    });

    console.log (fechas[0].getAttribute("id"));

    for(let i = 0; i <= (fechas.length - 1); i++){

        if(fechas[i].classList.contains("sele")){

            const dia = fechas[i].getAttribute("id");
            conect_func(idselect, dia);

            break;
        }
    }

    
    

});


for(let i = 0; i <= (fechas.length - 1); i++){

    fechas[i].addEventListener("click", () =>{

      if(fechas[i].classList.contains("sele")){

        return;

      }else{
          
        for(let j = 0; j <= (fechas.length - 1); j++){

            if(fechas[j] != fechas[i]){

                fechas[j].classList.remove("sele");
        
            } else{

               
               fechas[j].classList.add("sele");
            }
        }

        const dia = fechas[i].getAttribute("id");
        conect_func(idselect, dia);
      }

    });
}







