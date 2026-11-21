<?php

header("Access-Control-Allow-Origin: https://adriromero24.github.io");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


include("conexion.php");
include("pelicula.php");
include("veri_sesion.php");
include("costo.php");

//ob_clean();


header("Content-Type: application/json; charset=utf-8");
$json_recib = file_get_contents("php://input");
$butacas = json_decode($json_recib);

function verificar_asientos($lista, $sala, $conect){

  $fila = strval($lista[0]);
  $columna;

  if (strlen($lista) == 3){

    $num = "'$lista[1]''$lista[2]'";
    $columna = intval($num);
    
  } else{

  $columna = intval($lista[1]);

  }



  $sql = "SELECT `id` FROM `butaca` WHERE `sala` = ? AND `fila` = ? AND `columna` = ?;";
  
  $consul = $conect->prepare($sql); // Se crea objeto de preparar consulta, mendiante el metodo de prepare que maneja el objeto de conexion de mysqli
   
  $consul->bind_param("isi", $sala, $fila, $columna); // Se establece parametro de la consulta mediante el metodo de bind_param en el objeto de preparar (S para string, I para int, D para float/double); se coloca las variables en orden
  
  $consul->execute();  // Se ejecuta la consulta en el objeto preparar, una vez parametrizado el comando sql

  
  if($resul = $consul->get_result()){  //Se evalua si el resultado se la consulta fue verdadera (se realizo con exito) o no.

    $respu = mysqli_fetch_assoc($resul);


    if($respu == 0){

     return 0;

    } else {

    return $respu['id'];

    }
 }
}

function ver_sala($fun, $conec){

  $id = intval($fun);

  $sql = "SELECT `sala` FROM `funcion` WHERE `id` = ?;";

  $consul = $conec->prepare($sql); // Se crea objeto de preparar consulta, mendiante el metodo de prepare que maneja el objeto de conexion de mysqli
  
  $consul->bind_param("i", $id); // Se establece parametro de la consulta mediante el metodo de bind_param en el objeto de preparar (S para string, I para int, D para float/double); se coloca las variables en orden
  
  $consul->execute();  // Se ejecuta la consulta en el objeto preparar, una vez parametrizado el comando sql



  if($resp = $consul->get_result()){

    $resu = mysqli_fetch_assoc($resp); // Si se recibe una fila (Si se desea) como respuesta, se inserta fetch_assoc / Si son varias, se coloca fetch_all (con MYSQLI_ASSOC como 2do parametro de dicha funcion)

    if($resu == 0){

      return 0;

    } else {

      return $resu['sala'];
    }
  }
}

function entrada_memory($but, $fun, $usu, $conec, $ui, $cos){

  $sql = "INSERT INTO `entrada_memoria` (id, funcion, butaca, usuario, precio, expira_en, uuid) VALUES (UUID(), ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE), ?);";
  $i = 0;

  foreach($but as $bu){

  $cost = $cos['total'];

  

  $consul = $conec->prepare($sql);
  $consul->bind_param("sssds", $fun, $bu, $usu, $cost, $ui);
  $consul->execute();
  $i++;

  }

}


if(isset($butacas->butaca) && !empty($butacas->butaca) && isset($_COOKIE['auth_token'])){

 $id_sala = ver_sala($butacas->funcion, $conexion);

 if ($id_sala == 0){

   echo json_encode("Error en el ingreso de la sala");
   exit;
 }

 $id_sala = intval($id_sala);


 

 

 


 $butaca_select = [];

  for($i = 0; $i <= (count($butacas->butaca) - 1); $i++){

    $verifi = verificar_asientos($butacas->butaca[$i],$id_sala,$conexion);

    if($verifi == 0){

      echo json_encode("Error, No existe los asientos asignados");
      exit;
    }
     else{

       $butaca_select[$i] = $verifi;
     }

   
  }
  
  $id_bus = verif_token($_COOKIE['auth_token'], $conexion);

  $uuid_corto = bin2hex(random_bytes(6));

  $costos = coste($butacas->boleto);

  

  



  $json = [

     'dato' => "1",
     'uuid' => $uuid_corto,
     'butacas' => $butaca_select,
     'numbut' => $butacas->butaca,
     'funcion' => $butacas->funcion,
     'costes' => $costos
  ];


  entrada_memory($butaca_select, $butacas->funcion, $id_bus, $conexion, $uuid_corto, $costos);



  
   
  $json_enviar = json_encode($json);
  echo $json_enviar;
  exit;

  
}

else if(!isset($_COOKIE['auth_token'])){

echo json_decode("2");
exit;
}




?>