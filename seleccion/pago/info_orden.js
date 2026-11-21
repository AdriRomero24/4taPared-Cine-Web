const titulo = document.getElementById("titul");
const fecha = document.getElementById("fec");
const hora = document.getElementById("hor");
const sala = document.getElementById("sal");
const but = document.getElementById("numbut");
const cartel = document.getElementById("car");
const general = document.getElementById("gen");
const tercero = document.getElementById("ter");
const iva = document.getElementById("iva");
const total = document.getElementById("total");
const comp = document.getElementById("comp");
const volv = document.getElementById("volv");

document.addEventListener("DOMContentLoaded", () =>{

    
    

    

    

    
   

    const content = JSON.parse(sessionStorage.getItem("Datos-Funcion"));

    titulo.textContent = content.titu;
    fecha.textContent = content.fecha;
    hora.textContent = content.hora;
    sala.textContent = content.sala;
    cartel.style.backgroundImage = `url(../../${content.cartel})`;

    const coste = JSON.parse(sessionStorage.getItem("Datos-Orden"));

    coste.numbut.forEach(buta => {

      but.textContent += buta + " | ";
        
    });

    general.textContent = "$ " + coste.costes.general;
    tercero.textContent = "$ " + coste.costes.tercero;
    iva.textContent = "$ " + coste.costes.iva;



    async function definir_total() {

        let tasa;

        await fetch('https://ve.dolarapi.com/v1/dolares/oficial')
  
      .then(response => {

        return response.json();

        })

        .then(data => {

           console.log(data.promedio);

           tasa = parseFloat(data.promedio);

           console.log(tasa);
       });

       total.textContent = "$ " + coste.costes.total + " | Bs " + coste.costes.total * tasa;  //Si esta implementacion de texto en el HTML se ejecuta dentro de la data del fetch (Sin crear un async/await), se procesa una vez obtenido la promesa de respuesta de la conexion. Si se implementa fuera del fetch (Y no esta dentro de un async/await), pues se ejecutará primero la modif. Html; es decir, no esperará a que se procese el fetch hasta que haya una respuesta; el codigo seguirá su camino procedural y estructurado sin quedarse a esperar respuesta del fetch. Para ello se aplica la funcion async con un await fetch. Dentro de esta función, se detiene primero a esperar la respuesta del fetch await, y una vez obtenida, sigue ejecutando el bloque de código restante de la función correspondiente.
        
    }
    definir_total();
    
});

let intent = 0;

comp.addEventListener("click", () => {

    intent++;

    if(intent <= 1){
 
    fetch("https://backend-4tapared.onrender.com/orden.php",{

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: sessionStorage.getItem("Datos-Orden")

    })
    .then(response =>{

        return response.json();

    }).then(data => {
      
        console.log(data);

         if(data == "1"){
         
          
         alert("Compra Realizada");
         sessionStorage.clear(); 
         window.location.href = "../../";
         }
    });

    }

   
   

});

volv.addEventListener("click", () =>{
  
    window.location.href = document.referrer;

});

