<?php

header("Access-Control-Allow-Origin: https://adriromero24.github.io");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); //Permite la llegada y/o envio de cookies HttpOnly (Token JWT)


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
$datos_ini = json_decode($json_llegar);


function consul_token ($id, $conec){

 
 $ide = intval($id);

 $sql = "SELECT `token` FROM `usuario` WHERE `id` = ?;";

  $consul = $conec->prepare($sql);
  $consul->bind_param("i", $ide);
  $consul->execute();

  if ($resu = $consul->get_result()){

     $fila = mysqli_fetch_assoc($resu);

     return $fila['token'];
  }


}


if((isset($datos_ini->corr) && isset($datos_ini->contr)) && (!empty($datos_ini->corr) && !empty($datos_ini->contr))){

   $sql = "SELECT * FROM `usuario` WHERE `correo` = ? AND `contrasena` = ?;";

   $consul = $conexion->prepare($sql);
   $consul->bind_param("ss", $datos_ini->corr, $datos_ini->contr);
   $consul->execute();

   if($resul = $consul->get_result()){

      $fila = mysqli_fetch_assoc($resul);

      if($fila){  // Se condiciona si $ver_or es verdadero, ya que: Si $fila obtiene una fila de la bd , su valor seria verdadero; Si en cambio, $fila no obtiene ninguna fila (No existe la fila bajo los parametros), su valor seria falso, y por ende, no cumple la condicion (Se recuerda) [No usar count para corroborar variables que devuelven una fila de db sql, ya que no funciona correctamente]

      
      $jwt = consul_token($fila['id'], $conexion);

    

    setcookie(
        "auth_token",
        $jwt,
        [
            'expires'  => time() + (60 * 60 * 168), 
              'path'     => '/',
             'secure'   => true, 
             'httponly' => true,
            'samesite' => 'None' // Al estar la backend y el frontend en diferentes dominios o hostings, se declara None
        ]
    );




     $resp = "1";
     $json_resp = json_encode($resp);

     echo $json_resp;
     exit;


      }  else  {

        $resp = "2";
        $json_resp = json_encode($resp);

        echo $json_resp;
        exit;
         
         
      }
   }

}



?>