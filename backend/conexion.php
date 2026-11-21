<?php


$servidor = "mysql-25f65807-cine4tapared.j.aivencloud.com";
$usuario = "avnadmin";
$password = "AVNS_2bmnG3eMAKat9U4eu-1";
$db = "defaultdb";
$port = "28253"; 


$conexion = new mysqli($servidor, $usuario, $password, $db, $port);


if($conexion->connect_errno){

die("Conexion fallida");

}

?>
