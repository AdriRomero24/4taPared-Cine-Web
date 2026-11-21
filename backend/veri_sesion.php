<?php

header("Access-Control-Allow-Origin: https://adriromero24.github.io");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once './php-jwt-master/src/JWTExceptionWithPayloadInterface.php';
require_once './php-jwt-master/src/JWT.php';
require_once './php-jwt-master/src/Key.php';
require_once './php-jwt-master/src/SignatureInvalidException.php';
require_once './php-jwt-master/src/BeforeValidException.php';
require_once './php-jwt-master/src/ExpiredException.php';

include("conexion.php");


function verif_token($toke, $conec){

$key = "AwmndFgrlCMMM349_SDCa@KCS(DhsCDC98%@caRRxdc)cjcZZdf0&7";

 $token_deco = JWT::decode($toke, new key($key, 'HS256'));

 $idusu = intval($token_deco->idUsuario);

 

 $sql = "SELECT `id` FROM `usuario` WHERE `id` = ?;";

 $consul = $conec->prepare($sql); 
 $consul->bind_param("i", $idusu); 
 $consul->execute();

 if($resp = $consul->get_result()){

   $fila = mysqli_fetch_assoc($resp);

   return $fila['id'];
 }
}



?>