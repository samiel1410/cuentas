<?php  
require_once  ("../../../php/clases/cursos/curso.php");
$ver= new metodosCurso();
$id_curso = $_POST['id_curso'];
$ver->verificarCursoAlumno($id_curso);

?>
