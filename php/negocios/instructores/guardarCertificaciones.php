<?php  
require_once  ("../../../php/clases/instructores/instructor.php");

$record=$_POST['record'];
$guardar= new metodosInstructor();
$guardar->guadarCertificaciones($record);

?>
