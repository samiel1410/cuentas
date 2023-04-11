<?php  
require_once  ("../../../php/clases/instructores/instructor.php");

$id_certificaciones_militar=$_POST['id_certificaciones_militar'];
$certificado= new metodosInstructor();
$certificado->verCertificado($id_certificaciones_militar);

?>
