
<?php  
require_once  ("../../../php/clases/orden_pedidos/orden_pedido.php");



$id_orden_pedido=$_GET['id_orden_pedido'];
$fecha_emision_orden_pedido=$_GET['fecha_emision_orden_pedido'];
 $fecha_vencimiento_orden_pedido=$_GET['fecha_vencimiento_orden_pedido'];
 $id_fkalumno_orden_pedido=$_GET['id_fkalumno_orden_pedido'];
 $id_fkusuario_orden_pedido=$_GET['id_fkusuario_orden_pedido'];
 $id_fkinstructor_orden_pedido=$_GET['id_fkinstructor_orden_pedido'];
 $condicion_pago_orden_pedido=$_GET['condicion_pago_orden_pedido'];
 $subtotal_12_orden_pedido=$_GET['subtotal_12_orden_pedido'];
 $subtotal_0_orden_pedido=$_GET['subtotal_0_orden_pedido'];
 $subtotal_orden_pedido=$_GET['subtotal_orden_pedido'];
 $iva_orden_pedido=$_GET['iva_orden_pedido'];
 $descuento_orden_pedido=$_GET['descuento_orden_pedido'];
 $total_orden_pedido=$_GET['total_orden_pedido'];
 $estado_orden_pedido=$_GET['estado_orden_pedido'];
 $observacion_orden_pedido=$_GET['observacion_orden_pedido'];
 $tipo_origen_pedido=$_GET['tipo_origen_pedido'];
 $motivo_anulacion_orden_pedido=$_GET['motivo_anulacion_orden_pedido'];
 $id_usuario=$_GET['id_usuario'];
 $id_sucursal=$_GET['id_sucursal'];

$actualizar= new metodosOrdenPedido();
$actualizar->actualizarOrdenPedido(
    $id_orden_pedido,$fecha_emision_orden_pedido, $fecha_vencimiento_orden_pedido, $id_fkalumno_orden_pedido, $id_fkusuario_orden_pedido, $id_fkinstructor_orden_pedido, $condicion_pago_orden_pedido, $subtotal_12_orden_pedido, $subtotal_0_orden_pedido, $subtotal_orden_pedido, $iva_orden_pedido, $descuento_orden_pedido, $total_orden_pedido, $estado_orden_pedido, $observacion_orden_pedido, $tipo_origen_pedido, $motivo_anulacion_orden_pedido, $id_usuario, $id_sucursal

);

?>




