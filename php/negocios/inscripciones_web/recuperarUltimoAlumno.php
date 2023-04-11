<?php  

session_start();
require_once  ("../../../php/clases/inscripciones_web/inscripcion_web.php");

$id_usuario = $_SESSION['id_usuario'];
$id_curso = $_POST['id_curso'];




$recuperar= new metodosWeb();
$recuperar->recuperarAlumno($id_usuario,$id_curso);

?>
