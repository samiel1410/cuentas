<?php  
require_once  ("../../../php/clases/certificados_instructor/certificados_instructor.php");
$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);

$id_instructor= (isset($_POST['id_instructor']) ? $_POST['id_instructor'] : $_GET['id_instructor']);

$ver= new metodosCertificados();
$ver->seleccionarCertificadosPaginado($inicio,$limite,$id_instructor);
?>
