<?php  

require_once  ("../../../php/clases/comprobante_cobros/comprobante_cobro.php");

$id_comprobante = $_GET['id_comprobante'];
$id_fkforma_pago_comprobante = $_GET['id_fkforma_pago_comprobante'];
$concepto_comprobante = $_GET['concepto_comprobante'];
$fecha_creacion_comprobante = $_GET['fecha_creacion_comprobante'];
$fecha_cobro_comprobante = $_GET['fecha_cobro_comprobante'];
$id_fkusuario_comprobante = $_GET['id_fkusuario_comprobante'];
$id_fksucursal_comprobante = $_GET['id_fksucursal_comprobante'];
$abono_comprobante = $_GET['abono_comprobante'];
$id_fkorden_pedido_comprobante = $_GET['id_fkorden_pedido_comprobante'];



$actualizar= new metodosComprobante();
$actualizar->actualizarComprobante(
    $id_comprobante, $id_fkforma_pago_comprobante,$concepto_comprobante,$fecha_creacion_comprobante,$fecha_cobro_comprobante,$id_fkusuario_comprobante,$id_fksucursal_comprobante,$abono_comprobante,$id_fkorden_pedido_comprobante);

?>
