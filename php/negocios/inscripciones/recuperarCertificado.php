<?php  
require_once  ("../../../php/clases/inscripciones/inscripcion.php");


$id_inscripcion =  (isset($_POST['id_inscripcion']) ? $_POST['id_inscripcion'] : $_GET['id_inscripcion']);
$id= new metodoInscripcion();
$id->recuperarCertificado(
   $id_inscripcion
);

?>
