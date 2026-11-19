document.addEventListener("DOMContentLoaded", ()=>{

const url = new URLSearchParams(window.location.search);

const id_peli = url.get('id');
const id_func = url.get('fun');

fetch(`https://thirty-campaign-creek-scsi.trycloudflare.com/4tapared/sala.php?id=${id_peli}&fun=${id_func}`)

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
});

fetch(`https://thirty-campaign-creek-scsi.trycloudflare.com/4tapared/butacas.php?fun=${id_func}`)

.then(response =>{

    return response.json();

})

.then(data => {

    console.log(data);

    const butaca_div = document.getElementsByClassName("butaca");
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
})


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


 fetch('https://ve.dolarapi.com/v1/dolares/oficial')
  
 .then(response => {

    return response.json();

 })

 .then(data => {

   console.log(data.promedio);
 });
});
