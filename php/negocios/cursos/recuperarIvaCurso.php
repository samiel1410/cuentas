<?php  

require_once  ("../../../php/clases/cursos/curso.php");



$id_curso = (isset($_POST['id_curso']) ? $_POST['id_curso'] : $_GET['id_curso']);

$recuperar= new metodosCurso();
$recuperar->recuperarIva($id_curso);

?>
