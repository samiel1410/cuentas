<?php  
require_once  ("../../../php/clases/orden_pedidos/orden_pedido.php");

$id_orden=$_POST['id_orden'];
$estado=$_POST['estado'];
$tipo=$_POST['tipo'];

$actualizar= new metodosOrdenPedido();
$actualizar->actualizarEstado($id_orden ,$estado,$tipo);

?>
