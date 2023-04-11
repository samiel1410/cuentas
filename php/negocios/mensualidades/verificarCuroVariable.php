<?php  

require_once  ("../../../php/clases/mensualidades/mensualidad.php");

$id_inscripcion=$_POST['id_inscripcion'];
$verificar= new metodosMensualidades();
$verificar->verificarCursoVariable($id_inscripcion);
?>
