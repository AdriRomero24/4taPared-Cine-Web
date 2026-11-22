const contra = document.getElementById("con1");
const cont_comp = document.getElementById("con2");
const contra_inic = document.getElementById("con3")
const ojo = document.getElementsByClassName("ojo");

for(let i = 0; i <= (ojo.length - 1); i++){

    ojo[i].addEventListener("click" , () => {

        if(!ojo[i].classList.contains("most")){

            ojo[i].classList.add("most");

            if(ojo[i] == ojo[0]){

                contra.setAttribute("type", "text");

            } else if (ojo[i] == ojo[1]) {

                cont_comp.setAttribute("type", "text");


            } else {

               contra_inic.setAttribute("type", "text");
            }
        

        } else{

            ojo[i].classList.remove("most");

            if(ojo[i] == ojo[0]){

                contra.setAttribute("type", "password");

            } else if (ojo[i] == ojo[1]) {


                cont_comp.setAttribute("type", "password");


            } else {

                contra_inic.setAttribute("type", "password");
            }
        }
    });
}

const regis_tit = document.getElementById("reg");
const inic_tit = document.getElementById("ini");
const inic_cont = document.getElementById("inicio");
const regis_cont = document.getElementById("registro");

regis_tit.addEventListener("click", () => {
   
    if(inic_cont.classList.contains("act")){

        inic_cont.classList.remove("act");
        regis_cont.classList.remove("dif");
    }

});

inic_tit.addEventListener("click", () => {
   
    if(!inic_cont.classList.contains("act")){

        inic_cont.classList.add("act");
        regis_cont.classList.add("dif");

        window.scrollTo({

        behavior: "smooth",
        top: 130
        });
    }

});

const nombre_reg = document.getElementById("nombre");
const apellido_reg = document.getElementById("apellido");
const correo_reg = document.getElementById("correo");
const reg = document.getElementById("regis");
const ini = document.getElementById("inic");
const corr_ini = document.getElementById("correoini");


reg.addEventListener("submit", (e) =>{

    e.preventDefault();

    if(contra.value != cont_comp.value){

        alert("Ambas contraseñas deben ser iguales. Intenta de nuevo");
        return;
    }

    const datos_usu_reg = {nombre: nombre_reg.value, apellido: apellido_reg.value, correo: correo_reg.value, contraseña: contra.value};
    console.log(datos_usu_reg);

    fetch("https://backend-4tapared.onrender.com/registro.php", {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: 'include', //Esto permite el guardado y envio de cookies para el codigo backend
        body: JSON.stringify(datos_usu_reg)


    })
    .then(response => {

        return response.json();

    })
    .then(data => {
      
        console.log(data);

        if(data == "1"){

            window.location.href = "../"
        }

        else if(data == "2"){

            alert("Es posible que tu usuario exista. Intenta de nuevo!");
            return;
        }



    });



});


ini.addEventListener("submit", (e) =>{

    e.preventDefault();



    const datos_usu_ini = {corr: corr_ini.value, contr: contra_inic.value};
    console.log(datos_usu_ini);

    fetch("https://backend-4tapared.onrender.com/inicio.php", {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: 'include', //Esto permite el guardado y envio de cookies para el codigo backend
        body: JSON.stringify(datos_usu_ini)


    })
    .then(response => {

        return response.json();

    })
    .then(data => {
      
        console.log(data);

        if(data == "1"){

            window.location.href = "../"
        }

        else if(data == "2"){

            alert("El correo o la contraseña son incorrectos. Intenta de nuevo!");
            return;
        }



    });



});
