<?php

class pelicula{

public int $id,  $duracion;
public string $titulo, $sinopsis, $genero, $clasi, $cartel;

public function __construct(int $id, string $titulo, string $sinopsis, int $duracion, string $genero, string $clasi, string $cartel){

$this->id = $id;
$this->titulo = $titulo;
$this->sinopsis = $sinopsis;
$this->duracion = $duracion;
$this->genero = $genero;
$this->clasi = $clasi;
$this->cartel = $cartel;

}

}


class funcion{

public int $id;
public string $titulo, $sala, $fecha, $hora, $cartel;

public function __construct(int $id, string $titulo, string $sala, string $fecha, string $hora, string $cartel){

$this->id = $id;
$this->titulo = $titulo;
$this->sala = $sala;
$this->fecha = $fecha;
$this->hora = $hora;
$this->cartel = $cartel;

}





}







?>