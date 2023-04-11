<?php  
require_once  ("../../../php/clases/certificados_instructor/certificados_instructor.php");

$nombre= (isset($_POST['nombre_certificaciones_militar']) ? $_POST['nombre_certificaciones_militar'] : $_GET['nombre_certificaciones_militar']);
$id_certificado = (isset($_POST['id_certificaciones_militar']) ? $_POST['id_certificaciones_militar'] : $_GET['id_certificaciones_militar']);
$editar= new metodosCertificados();
$editar->editarCertificado($nombre,$id_certificado);
?>
