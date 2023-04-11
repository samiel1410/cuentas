<?php  

require_once  ("../../../php/clases/alumnos/alumno.php");

$ver= new metodosAlumno();

$id_alumno = (isset($_POST['id_alumno']) ? $_POST['id_alumno'] : $_GET['id_alumno']);
$ver->recuperarImagen($id_alumno);

?>
