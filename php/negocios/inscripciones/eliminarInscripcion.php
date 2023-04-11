<?php  
require_once  ("../../../php/clases/inscripciones/inscripcion.php");

$id_inscripcion=$_POST['id_inscripcion'];


$eliminar= new metodoInscripcion();
$eliminar->eliminarInscripcion(
    $id_inscripcion
);

?>
