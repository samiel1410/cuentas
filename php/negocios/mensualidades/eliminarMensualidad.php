<?php  

require_once  ("../../../php/clases/mensualidades/mensualidad.php");

$id_mensualidad=$_POST['id_mensualidad'];
$eliminar= new metodosMensualidades();
$eliminar->eliminarMensualidad($id_mensualidad);
?>
