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








header("Content-Type: application/json; charset=utf-8");



$json_llegar = file_get_contents("php://input");
$datos_rec = json_decode($json_llegar);

function consul_usu($param, $conec){

  $sql = "SELECT `id` FROM `usuario` WHERE `correo` = ?;";
  $consul = $conec->prepare($sql);
  $consul->bind_param("s", $param);
  $consul->execute();

  if($respuesta = $consul->get_result()){

     $fila = mysqli_fetch_assoc($respuesta);

     return $fila;
  } 
  

  


}

function insert_token ($to, $conec, $id){

 $tok = strval($to);
 $ide = intval($id);

 $sql = "UPDATE `usuario` SET `token` = ? WHERE `id` = ?;";

  $consul = $conec->prepare($sql);
  $consul->bind_param("si", $tok, $ide);
  $consul->execute();


}


if((isset($datos_rec->nombre) && isset($datos_rec->apellido) && isset($datos_rec->correo) && isset($datos_rec->contraseña)) && (!empty($datos_rec->nombre) && !empty($datos_rec->apellido) && !empty($datos_rec->correo) && !empty($datos_rec->contraseña))){

  $nombre = strval($datos_rec->nombre);
  $apellido = strval($datos_rec->apellido);
  $correo= strval($datos_rec->correo);
  $contraseña = strval($datos_rec->contraseña);

  $ver_usua = consul_usu($correo, $conexion);

  if($ver_usua){  // Se condiciona si $ver_usua es verdadero, ya que: Si $ver_usua obtiene una fila de la bd , su valor seria verdadero; Si en cambio, $ver_or no obtiene ninguna fila (No existe la fila bajo los parametros), su valor seria falso, y por ende, no cumple la condicion (Se recuerda) [No usar count para corroborar variables que devuelven una fila de db sql, ya que no funciona correctamente]

    echo json_decode("2");
    exit;
  }
  
  
  $sql = "INSERT INTO `usuario` (`id`, `cedula`, `nombre`, `apellido`, `correo`, `contrasena`) VALUES (NULL, NULL, ?, ?, ?, ?);";
  $consul = $conexion->prepare($sql);
  $consul->bind_param("ssss", $nombre, $apellido, $correo, $contraseña);
  

  if($consul->execute()){

    $id = $consul->insert_id;

    

    $time = time();

    $key = "AwmndFgrlCMMM349_SDCa@KCS(DhsCDC98%@caRRxdc)cjcZZdf0&7";

    $token = array(

        'iat' => $time,
        'exp' => $time + (60*60*168),
        'idUsuario' => $id,
    );

    $jwt = JWT::encode($token, $key, 'HS256');

    

    insert_token($jwt, $conexion, $id);

    setcookie(
        "auth_token",
        $jwt,
        [
            'expires'  => $time + (60 * 60 * 168), 
              'path'     => '/',
             'secure'   => true, 
             'httponly' => true,
            'samesite' => 'Strict'
        ]
    );




     $resp = "1";
     $json_resp = json_encode($resp);

     echo $json_resp;
     exit;
  }


}





?>