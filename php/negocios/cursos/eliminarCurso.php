<?php
require_once  ("../../../php/clases/cursos/curso.php");

$id_curso=$_POST['id_curso'];

$eliminar= new metodosCurso();
$eliminar->eliminarCurso($id_curso);


?>
