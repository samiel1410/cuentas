<?php  

require_once  ("../../../php/clases/cursos/curso.php");



$instructor_busqueda = (isset($_POST['instructor_busqueda']) ? $_POST['instructor_busqueda'] : $_GET['instructor_busqueda']);
$ver= new metodosCurso();
$ver->seleccionarInstructor($instructor_busqueda);

?>
