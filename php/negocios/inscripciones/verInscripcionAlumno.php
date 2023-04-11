<?php  

require_once  ("../../../php/clases/inscripciones/inscripcion.php");


$id_inscripcion= $_POST['id_inscripcion'];
$inicio= $_POST['inicio'];
$limite= $_POST['limite'];

$ver= new metodoInscripcion();
$ver->verInscripcionalumno($id_inscripcion,$inicio,$limite);

?>
