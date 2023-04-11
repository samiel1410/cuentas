<?php  
require_once  ("../../../php/clases/inscripciones_web/inscripcion_web.php");


$id_inscripcion =$_POST['id_inscripcion_web'];



$eliminar= new metodosWeb();
$eliminar->actualizarEstado($id_inscripcion);

?>
