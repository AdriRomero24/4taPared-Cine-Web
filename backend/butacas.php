<?php

include("conexion.php");


ob_clean();

function id_sala($id, $conec){

 $sql = "SELECT `sala` FROM `funcion` WHERE `id` = ?;";

 $consul = $conec->prepare($sql); 
 $consul->bind_param("i", $id); 
 $consul->execute();

 if($respuesta = $consul->get_result()){

   $fila =  mysqli_fetch_assoc($respuesta);

   return $fila['sala'];
 }

}

function butaca_sala($id, $conec){

$id_final = intval($id);

$sql = "SELECT `id` FROM `butaca` WHERE `sala` =?;";

$consul = $conec->prepare($sql); 
$consul->bind_param("i", $id_final); 
$consul->execute();

  if($respuesta = $consul->get_result()){

    $fila = mysqli_fetch_all($respuesta, MYSQLI_ASSOC);

    

    return $fila;
  }
}

function butaca_verificar($idbut, $id_fun, $conec){

   

   $id_b = intval($idbut);
   

   $sql = "SELECT `butaca` FROM `entrada` WHERE `butaca` =? AND `funcion` =? UNION SELECT `butaca` FROM `entrada_memoria` WHERE `butaca` =? AND `funcion` =?";

   $consul = $conec->prepare($sql); 
   $consul->bind_param("iiii", $id_b, $id_fun, $id_b, $id_fun); 
   $consul->execute();


   if($respuesta = $consul->get_result()){

      $fila = mysqli_fetch_assoc($respuesta);

      if($fila == 0){

      return 1;

      } else {

       return 2;
      }

   } 
}



if(isset($_GET['fun']) && !empty($_GET['fun'])){

$idfun = intval($_GET['fun']);

$idsala = id_sala($idfun, $conexion);

$butaca_array = butaca_sala($idsala, $conexion);


$conta_but = 0;
$butaca_resp = array_fill(0, 10, array_fill(0, 9, null));

for($i = 0; $i <= 9; $i++){
    
    

   for($j = 0; $j <= 8; $j++){
    
     
     $butaca_resp[$i][$j] = butaca_verificar($butaca_array[$conta_but]['id'], $idfun, $conexion);
     
     $conta_but++;
   }
}



$jsonstring = json_encode($butaca_resp);

echo $jsonstring;
exit;


}





?>
