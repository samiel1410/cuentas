<?php  
require_once  ("../../../php/clases/instructores/instructor.php");

$id_instructor=$_POST['id_instructor'];
$eliminar= new metodosInstructor();
$eliminar->eliminarInstructor($id_instructor);

?>
