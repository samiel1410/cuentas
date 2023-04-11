<?php  

require_once  ("../../../php/clases/empresas/empresa.php");


$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);


$ver= new metodosEmpresa();
$ver->verEmpresa($inicio,$limite);

?>
