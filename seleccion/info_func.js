let dato_peli = {};

document.addEventListener("DOMContentLoaded", ()=>{

const url = new URLSearchParams(window.location.search);

const id_peli = url.get('id');
const id_func = url.get('fun');

fetch(`https://backend-4tapared.onrender.com/sala.php?id=${id_peli}&fun=${id_func}`)

.then(response => {

    return response.json();
})
.then (data => {

    console.log("Datos Recibidos: ",data);

    const titu = document.getElementById("titulo");
    const fecha = document.getElementById("fecha");
    const hora = document.getElementById("hora");
    const sala = document.getElementById("sala");

    titu.textContent = data.titulo;
    fecha.textContent = data.fecha;
    hora.textContent = data.hora;
    sala.textContent = "Sala " + data.sala;

    dato_peli = {

        titu: data.titulo,
    fecha: data.fecha,
    hora: data.hora,
    sala: "Sala " + data.sala,
    cartel: data.cartel


    };

    console.log(dato_peli);
});

const butaca_div = document.getElementsByClassName("butaca");

for(let i = 0; i <= (butaca_div.length - 1); i++){

      butaca_div[i].classList.add("carga");
}



async function butacas_estado() {

    await fetch(`https://backend-4tapared.onrender.com/butacas.php?fun=${id_func}`)

    .then(response =>{

    return response.json();

    })

    .then(data => {

    console.log(data);

    
    console.log(butaca_div.length);
    let butaca_cont = 0;
    const filas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    for(let i = 0; i <= 9; i++){

        let fila = filas[i];
        

        for(let j = 0; j <= 8; j++){


           if(data[i][j] == 1){

            butaca_div[butaca_cont].setAttribute("id", fila+(j+1));

           } else if(data[i][j] == 2){

            butaca_div[butaca_cont].classList.add("ocu");

           }

           butaca_cont++;
             
        }
    }

    
  });

  for(let i = 0; i <= (butaca_div.length - 1); i++){

      butaca_div[i].classList.remove("carga");
   }

   

    
}



butacas_estado(); // Ejecutar funcion de fetch de las butacas


 const volver = document.getElementById("volv");
 const url_ante = document.referrer;

 volver.addEventListener("click", () => {

    console.log(url_ante);
    

    if(url_ante != window.location.href && url_ante != 0){

       window.location.href = url_ante;
       

    }else{

       window.location.href = "../index.html"
       
    }

 });


 
});