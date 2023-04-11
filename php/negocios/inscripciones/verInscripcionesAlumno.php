<?php  

require_once  ("../../../php/clases/inscripciones/inscripcion.php");


$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$id_alumno =  (isset($_POST['id_alumno']) ? $_POST['id_alumno'] : $_GET['id_alumno']);


$ver= new metodoInscripcion();
$ver->verInscripcionesAlumno($inicio,$limite,$id_alumno);

?>
