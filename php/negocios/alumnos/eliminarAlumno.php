<?php
require_once  ("../../../php/clases/alumnos/alumno.php");

$id_alumno=$_POST['id_alumno'];
$eliminar= new metodosAlumno();
$eliminar->eliminarAlumno($id_alumno);


?>
