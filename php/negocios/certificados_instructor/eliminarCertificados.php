<?php  
require_once  ("../../../php/clases/certificados_instructor/certificados_instructor.php");

$id_certificado= (isset($_POST['id_certificado']) ? $_POST['id_certificado'] : $_GET['id_instructor']);

$ver= new metodosCertificados();
$ver->eliminarCertificado($id_certificado);
?>
