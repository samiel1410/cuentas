<?php  
require_once  ("../../../php/clases/orden_pedido_detalle/orden_pedido_detalles.php");

$id_orden_pedido_detalle=$_GET['id_orden_pedido_detalle'];


$eliminar= new metodosOrdenPedidoDetalle();
$eliminar->eliminarOrdenPedidoDetalle(
    $id_orden_pedido_detalle
);

?>
