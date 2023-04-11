<?php  

require_once  ("../../../php/clases/alumnos/alumno.php");


$ver= new metodosAlumno();


$id_alumno= $_POST['id_alumno'];
$ver->verificarAlumnoInscripcion($id_alumno);

?>
