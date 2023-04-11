<?php
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/instructores/instructor.php");
$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);

$nombre_busqueda= (isset($_POST['nombre_busqueda']) ? $_POST['nombre_busqueda'] : $_GET['nombre_busqueda']);
$cedula_busqueda= (isset($_POST['cedula_busqueda']) ? $_POST['cedula_busqueda'] : $_GET['cedula_busqueda']);
$estado= (isset($_POST['estado']) ? $_POST['estado'] : $_GET['estado']);


$ver= new metodosInstructor();
$ver->seleccionarInstructorPaginado($inicio,$limite,$nombre_busqueda,$cedula_busqueda,$estado);
?>
