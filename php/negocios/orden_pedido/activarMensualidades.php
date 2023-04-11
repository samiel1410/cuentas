<?php  
require_once  ("../../../php/clases/orden_pedidos/orden_pedido.php");

$id_orden=$_POST['id_orden'];


$actualizar= new metodosOrdenPedido();
$actualizar->activarMensualidades($id_orden);

?>
