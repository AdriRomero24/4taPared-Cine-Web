const ico = document.getElementById("ico");

const pe = document.getElementById("pelicula");

const ca = document.getElementById("carameleria");


let comprobar_accion = () => {


    let respuesta = confirm('Estas seguro? Se perderá todo tu progreso');
    
    return respuesta;
    
}

ico.addEventListener("click", () => {

    

    if(comprobar_accion()){

        sessionStorage.clear();

        window.location.href = "../../"
        
    }
});


pe.addEventListener("click", () => {

  

    if(comprobar_accion()){

        sessionStorage.clear();

        window.location.href = "../../#sec_peli"
    }
});



ca.addEventListener("click", () => {

    

    if(comprobar_accion()){

        sessionStorage.clear();

        window.location.href = "../../#sec_caram"
    }
});