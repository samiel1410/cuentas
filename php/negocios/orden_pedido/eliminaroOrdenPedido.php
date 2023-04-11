<?php  
require_once  ("../../../php/clases/orden_pedidos/orden_pedido.php");

$id_orden_pedido=$_GET['id_orden_pedido'];
$eliminar= new metodosOrdenPedido();
$eliminar->eliminarOrdenPedido($id_orden_pedido);

?>
