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
    }

});

const nombre_reg = document.getElementById("nombre");
const apellido_reg = document.getElementById("apellido");
const correo_reg = document.getElementById("correo");
const reg = document.getElementById("regis");
const ini = document.getElementById("inic");


reg/addEventListener("submit", () =>{

    fetch()



});
