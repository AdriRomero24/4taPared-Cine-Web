const butacas = document.getElementsByClassName("butaca");
const butaca_texto = document.getElementById("butaca_texto");
let butaca_select = [];

for (let i = 0; i <= (butacas.length - 1); i++){

    butacas[i].addEventListener("click", () => {

      if (butacas[i].classList.contains("select")){

        butacas[i].classList.remove("select");
        let but = butacas[i].getAttribute("id");

        for(let i = 0; i <= (butaca_select.length - 1); i++){

            if(butaca_select[i] == but){

                butaca_select.splice(i, 1);
                break;
            }
        }

        verificar_select();

      } else if (!butacas[i].classList.contains("ocu") && !butacas[i].classList.contains("carga")){

        butacas[i].classList.add("select");
        let but = butacas[i].getAttribute("id");

        butaca_select.push(but);
      }

      butaca_texto.textContent = "";

      console.log(butaca_select);

       for(let i = 0; i <= (butaca_select.length - 1); i++){

        butaca_texto.textContent += butaca_select[i] +", ";
       }

    });

   
}

const continuar = document.getElementById("conti");

continuar.addEventListener("click", ()=>{

  const url = new URLSearchParams(window.location.search);
  const id_func = url.get('fun');

  if ((bol_g + bol_t) != butaca_select.length || butaca_select.length == 0){

    alert("Error, Ingresa los tipos de boletos");
    return;
  }
  

  const datos_env = {butaca: butaca_select, funcion: id_func, boleto: [bol_g, bol_t]};
  

  fetch("https://backend-4tapared.onrender.com/verifi_buta.php", {

    method: "POST",
    headers: {
            "Content-Type": "application/json"
        },
      credentials: 'include', //Esto permite el guardado y envio de cookies para el codigo backend
    body: JSON.stringify(datos_env)

  })
  .then(response => {

     return response.json();

  })
  .then(data => {

     console.log(data);

     if(data.dato == "1"){

      sessionStorage.setItem("Datos-Orden", JSON.stringify(data));
      sessionStorage.setItem("Datos-Funcion", JSON.stringify(dato_peli));

      window.location.href = `./pago/?orden=${data.uuid}`;
      

     } else if(data == "2"){

        alert("Tienes que registrarte para comprar entradas!");

        window.location.href = "../sesion";
     }


  })

});
