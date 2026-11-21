<?php

header("Access-Control-Allow-Origin: https://adriromero24.github.io");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); //Permite la llegada y/o envio de cookies HttpOnly (Token JWT)

include("conexion.php");
include("veri_sesion.php");

//ob_clean();


header("Content-Type: application/json; charset=utf-8");
$json_recib = file_get_contents("php://input");
$orden = json_decode($json_recib);

function conf_orden_bd($id, $orden_cod, $conec){

$id_s = intval($id);

$sql = "SELECT * FROM `entrada_memoria` WHERE `usuario` = ? AND `uuid` = ?;";

$consul = $conec->prepare($sql);
$consul->bind_param("is", $id_s, $orden_cod);
$consul->execute();

  if($res = $consul->get_result()){

    $fila = mysqli_fetch_all($res, MYSQLI_ASSOC);

    return $fila;


  }

  
}

function generar_compra($tot, $id, $conec){

$id_s = intval($id);


 $sql = "INSERT INTO `compra` (usuario, fecha, total) VALUES (?, NOW(), ?);";

 $consul = $conec->prepare($sql);
$consul->bind_param("id", $id_s, $tot);
$consul->execute();



return $consul->insert_id;
}






if(isset($orden->uuid) && !empty($orden->uuid)){

$id_bus = verif_token($_COOKIE['auth_token'], $conexion);


$ver_or = conf_orden_bd($id_bus, $orden->uuid, $conexion);

 if($ver_or){ // Se condiciona si $ver_or es verdadero, ya que: Si $ver_or obtiene una fila de la bd , su valor seria verdadero; Si en cambio, $ver_or no obtiene ninguna fila (No existe la fila bajo los parametros), su valor seria falso, y por ende, no cumple la condicion (Se recuerda) [No usar count para corroborar variables que devuelven una fila de db sql, ya que no funciona correctamente]

 $total = $ver_or[0]['precio'];

 $id_fila = generar_compra($total, $id_bus, $conexion);

 $sql = "INSERT INTO `entrada` (compra, funcion, butaca, precio) VALUES (?, ?, ?, ?);";  //Codigo para registrar entradas
 
  $consul = $conexion->prepare($sql);


 foreach($ver_or as $entrada){

  
   $consul->bind_param("iisd", $id_fila, $entrada['funcion'], $entrada['butaca'], $total);
   $consul->execute();

 }

 echo json_decode("1");
 exit;





    
 }




   
}


?>