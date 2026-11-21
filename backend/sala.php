<?php

include("conexion.php");
include("pelicula.php");

ob_clean();

header("Content-Type: application/json; charset=utf-8");

function nomb_peli($id, $conexion){

$sql = "SELECT * FROM `pelicula` WHERE `id` =?;";

$consul = $conexion->prepare($sql); 
$consul->bind_param("i", $id); 
$consul->execute();

if($resultado = $consul->get_result()){

       $fila = mysqli_fetch_assoc($resultado);

       return $fila['titulo'];
   } 
}  

function asset_peli($id, $conexion){

$sql = "SELECT * FROM `pelicula` WHERE `id` =?;";

$consul = $conexion->prepare($sql); 
$consul->bind_param("i", $id); 
$consul->execute();

if($resultado = $consul->get_result()){

       $fila = mysqli_fetch_assoc($resultado);

       return $fila['cartel'];
   } 
}  

if((isset($_GET['id']) && isset($_GET['fun'])) && (!empty($_GET['id']) && !empty($_GET['fun']))){

    $id_p = intval($_GET['id']);
    $id_f = intval($_GET['fun']);

    $sql = "SELECT * FROM `funcion` WHERE `id` = ?;";

    
    $consul = $conexion->prepare($sql); 
    $consul->bind_param("i", $id_f); 
    $consul->execute();



    if($respuesta = $consul->get_result()){

      $fila = mysqli_fetch_assoc($respuesta);

      $funcion = new funcion($fila['id'], nomb_peli($id_p, $conexion), $fila['sala'], $fila['fecha'], $fila['hora'], asset_peli($id_p, $conexion));

      $jsonString = json_encode($funcion);

      echo $jsonString;
      exit;
    }
}



?>