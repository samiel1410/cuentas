<?php  

session_start();
require_once  ("../../../php/clases/orden_pedidos/orden_pedido.php");

$id_orden_pedido=$_POST['id_orden_pedido'];
$fecha_emision_orden_pedido=$_POST['fecha_emision_orden_pedido'];
 $fecha_vencimiento_orden_pedido=0;
 $id_fkalumno_orden_pedido=$_POST['id_fkalumno_orden_pedido'];
 $id_fkusuario_orden_pedido=$_SESSION['id_usuario'];;
 $id_fkinscripcion_orden_pedido=$_POST['id_fkinscripcion_orden_pedido'];
 $condicion_pago_orden_pedido=0;
 $subtotal_12_orden_pedido=0;
 $subtotal_0_orden_pedido=0;
 $subtotal_orden_pedido=$_POST['subtotal_orden_pedido'];
 $iva_orden_pedido=$_POST['iva_orden_pedido'];
 $descuento_orden_pedido=0;
 $total_orden_pedido=$_POST['total_orden_pedido'];
 $estado_orden_pedido=0;
 $observacion_orden_pedido=$_POST['observacion_orden_pedido'];
 $tipo_origen_pedido=0;
 $motivo_anulacion_orden_pedido=0;
 $id_fkusuario_orden=$_SESSION['id_usuario'];
 $id_fksucursal_orden=$_SESSION['id_fksucursal_usuario'];

 $record = $_POST['record'];

$actualizar= new metodosOrdenPedido();


if($id_orden_pedido==""){
    $actualizar->insertarOrdenPedido(
        $fecha_emision_orden_pedido, $fecha_vencimiento_orden_pedido, $id_fkalumno_orden_pedido,$id_fkinscripcion_orden_pedido ,  $subtotal_12_orden_pedido, $subtotal_0_orden_pedido, $subtotal_orden_pedido, $iva_orden_pedido, $descuento_orden_pedido, $total_orden_pedido, $estado_orden_pedido, $observacion_orden_pedido, $tipo_origen_pedido, $motivo_anulacion_orden_pedido, $id_fkusuario_orden, $id_fksucursal_orden , $record
    
    );
   
}
else{
    $actualizar->actualizarOrdenPedido(
        $id_orden_pedido,$fecha_emision_orden_pedido, $fecha_vencimiento_orden_pedido, $id_fkalumno_orden_pedido, $id_fkusuario_orden_pedido, $id_fkinscripcion_orden_pedido, $condicion_pago_orden_pedido, $subtotal_12_orden_pedido, $subtotal_0_orden_pedido, $subtotal_orden_pedido, $iva_orden_pedido, $descuento_orden_pedido, $total_orden_pedido, $estado_orden_pedido, $observacion_orden_pedido, $tipo_origen_pedido, $motivo_anulacion_orden_pedido, $id_fksucursal_orden
    
    );
    
}




?>