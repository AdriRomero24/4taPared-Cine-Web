<?php

header("Access-Control-Allow-Origin: https://adriromero24.github.io");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");



include("conexion.php");
include("pelicula.php");



header("Content-Type: application/json; charset=utf-8");


$json_recibido = file_get_contents("php://input");
$dato = json_decode($json_recibido);

if (isset($dato->id) && !empty($dato->id)){

 $id = intval($dato->id);


 $sql = "SELECT * FROM `pelicula` WHERE `id` =?;";


 $consul = $conexion->prepare($sql); 
 $consul->bind_param("i", $id); 
 $consul->execute();

 if($resultado = $consul->get_result()){

       $fila = mysqli_fetch_assoc($resultado);
       

    
    
    $jsonString = json_encode($fila);

    echo $jsonString;
    exit;

     
   }

}







?>
