//logica de contador_butacas

const cont_gene = document.getElementById("con_gen");
const cont_terc = document.getElementById("con_ter");
const btnder_g = document.getElementById("de_g");
const btnder_t = document.getElementById("de_t");
const btnizq_g = document.getElementById("iz_g");
const btnizq_t = document.getElementById("iz_t");



let bol_g = 0;
let bol_t = 0;


let verificar_conteo = (num) => {

    if(num < 0){

        return 0;
    } else if((bol_g + bol_t) > butaca_select.length){

        return num - 1;

    } else{

        return num;
    }


}

let verificar_select = () =>{

    if((bol_g + bol_t) > butaca_select.length){

        if(bol_g > bol_t){

            bol_g -= 1;

        } else if (bol_g < bol_t){

            bol_t -= 1;

        } else {

            bol_g -= 1;
        }

        cont_gene.textContent = bol_g;
        cont_terc.textContent = bol_t;

    }
}

let contador = (e) =>{

    

    if (e.target == btnder_g || e.target == btnizq_g){

        bol_g = verificar_conteo(bol_g);

        cont_gene.textContent = bol_g;
    }

    else if (e.target == btnder_t || e.target == btnizq_t){

        bol_t = verificar_conteo(bol_t);

        cont_terc.textContent = bol_t;
    }

}


btnder_g.addEventListener("click", (e) =>{


    console.log(e.target);
    console.log(bol_g);
    bol_g++;
    

    contador(e);
});

btnder_t.addEventListener("click", (e) =>{

    bol_t++;
    
    contador(e);
});

btnizq_g.addEventListener("click", (e) =>{

    bol_g--;
    console.log(bol_g);
    contador(e);
});

btnizq_t.addEventListener("click", (e) =>{

    bol_t--;

    contador(e);
});