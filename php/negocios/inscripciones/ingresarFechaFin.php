<?php  
require_once  ("../../../php/clases/inscripciones/inscripcion.php");


$id_inscripcion =  (isset($_POST['id_inscripcion']) ? $_POST['id_inscripcion'] : $_GET['id_inscripcion']);
$fecha_fin =   $_POST['fecha_fin'] ;


$id= new metodoInscripcion();
$id->agregarFechaFin(
   $id_inscripcion,
   $fecha_fin
);

?>
