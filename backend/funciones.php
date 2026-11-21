<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include("conexion.php");
include("pelicula.php");



header("Content-Type: application/json");


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

if ((isset($_GET['id']) && isset($_GET['fecha'])) && (!empty($_GET['id']) && !empty ($_GET['fecha']))){

$id = intval($_GET['id']);
$fecha = strval($_GET['fecha']);



$array_funcion = [];

$sql = "SELECT * FROM `funcion` WHERE `pelicula` =? AND `fecha` =?;";

$consul = $conexion->prepare($sql); 
$consul->bind_param("is", $id, $fecha); 
$consul->execute();

if($resultado = $consul->get_result()){

       $fila = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
       
       

    foreach($fila as $dato){
     
    $array_funcion[] = new funcion($dato['id'], nomb_peli($dato['pelicula'], $conexion), $dato['sala'], $dato['fecha'], $dato['hora'], "null");
    

    }

    
    
    $jsonString = json_encode($array_funcion);

    echo $jsonString;
    exit;

     
   }
}   








?>


