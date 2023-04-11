<?php  

if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/comprobante_cobros/comprobante_cobro.php");

$id_comprobante = $_POST['id_comprobante'];
$id_fkforma_pago_comprobante = $_POST['id_fkforma_pago_comprobante'];
$concepto_comprobante = $_POST['concepto_comprobante'];
$id_fkusuario_comprobante = $_SESSION['id_usuario'];
$id_fksucursal_comprobante = $_SESSION['id_fksucursal_usuario'];
$abono_comprobante = $_POST['abono_comprobante'];
$id_fkorden_pedido_comprobante = $_POST['id_fkorden_pedido_comprobante'];



$actualizar= new metodosComprobante();


if($id_comprobante==""){
    $actualizar->insertarComprobante(
    $id_fkforma_pago_comprobante,$concepto_comprobante,$id_fkusuario_comprobante,$id_fksucursal_comprobante,$abono_comprobante,$id_fkorden_pedido_comprobante);
   
}
?>
