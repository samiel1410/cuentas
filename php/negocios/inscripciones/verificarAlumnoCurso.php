<?php  
require_once  ("../../../php/clases/inscripciones/inscripcion.php");


$id_alumno =  (isset($_POST['id_alumno']) ? $_POST['id_alumno'] : $_GET['id_alumno']);
$id_curso=  (isset($_POST['id_curso']) ? $_POST['id_curso'] : $_GET['id_curso']);

$id= new metodoInscripcion();
$id->recuperarAlumnoCurso(
$id_alumno,$id_curso
);

?>
