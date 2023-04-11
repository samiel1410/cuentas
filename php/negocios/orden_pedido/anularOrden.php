<?php  
require_once  ("../../../php/clases/orden_pedidos/orden_pedido.php");

$id_orden=$_POST['id_orden'];
$anular= new metodosOrdenPedido();
$anular->anularOrden($id_orden);

?>
