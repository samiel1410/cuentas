<?php  

require_once  ("../../../php/clases/sucursales/sucursal.php");



$id_sucursal = (isset($_POST['id_sucursal']) ? $_POST['id_sucursal'] : $_GET['id_sucursal']);
$ver= new metodosSucursal();
$ver->verificarCurso($id_sucursal);

?>
