<?php  
session_start();

require_once  ("../../../php/clases/pdf/listadoCurso.php");




$id_curso = $_GET['id_curso'];


$nombre_curso = $_GET['nombre_curso'];
$listado= new metodoListado();
$listado->listado(
    $id_curso,$nombre_curso
    
);

?>