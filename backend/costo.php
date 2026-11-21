<?php

function coste($bo){

  
 $prec_general = $bo[0] * 3;

 $prec_tercero = $bo[1] * 1.5;

 $iva = ($prec_general + $prec_tercero) * 0.16;

 $total = ($prec_general + $prec_tercero + $iva);

 $coste = [

   'general' => $prec_general,
   'tercero' => $prec_tercero,
   'iva' => $iva,
   'total' => $total
 ];

 return $coste;
}


?>