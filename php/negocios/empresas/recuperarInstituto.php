<?php  

require_once  ("../../../php/clases/empresas/empresa.php");


$id_sucursal = (isset($_POST['id_sucursal']) ? $_POST['id_sucursal'] : $_GET['id_sucursal']);


$ver= new metodosEmpresa();
$ver->recuperarEmpresa($id_sucursal);

?>
