<?php  
require_once  ("../../../php/clases/orden_pedido_detalle/orden_pedido_detalles.php");

$id_orden_pedido_detalle=$_GET['id_orden_pedido_detalle'];
$id_fkorden_pedido_detalle=$_GET['id_fkorden_pedido_detalle'];
$id_fkcurso_orden_pedido_detalle=$_GET['id_fkcurso_orden_pedido_detalle'];
$nombre_orden_pedido_detalle=$_GET['nombre_orden_pedido_detalle'];
$cantidad_orden_pedido_detalle=$_GET['cantidad_orden_pedido_detalle'];
$iva_orden_pedido_detalle=$_GET['iva_orden_pedido_detalle'];
$precio_orden_pedido_detalle=$_GET['precio_orden_pedido_detalle'];
$descuento_orden_pedido_detalle=$_GET['descuento_orden_pedido_detalle'];
$total_orden_pedido_detalle=$_GET['total_orden_pedido_detalle'];
$id_sucursal=$_GET['id_sucursal'];

$actualizar= new metodosOrdenPedidoDetalle();
$actualizar->actualizarOrdenPedidoDetalle(
    $id_orden_pedido_detalle,$id_fkorden_pedido_detalle,$id_fkcurso_orden_pedido_detalle,$nombre_orden_pedido_detalle,$cantidad_orden_pedido_detalle,$iva_orden_pedido_detalle,$precio_orden_pedido_detalle,$descuento_orden_pedido_detalle,$total_orden_pedido_detalle,$id_sucursal

);

?>
