<?php  
require_once  ("../../../php/clases/inscripciones/inscripcion.php");


$id_inscripcion =  (isset($_POST['id_inscripcion']) ? $_POST['id_inscripcion'] : $_GET['id_inscripcion']);
$nota =  (isset($_POST['nota']) ? $_POST['nota'] : $_GET['nota']);



$id= new metodoInscripcion();
$id->agregarCalificacion(
   $id_inscripcion,
   $nota
);

?>
