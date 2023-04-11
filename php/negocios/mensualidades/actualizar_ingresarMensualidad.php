<?php  

require_once  ("../../../php/clases/mensualidades/mensualidad.php");

$id_mensualidad=$_POST['id_mensualidad'];
$id_fkinscripcion_mensualidad=$_POST['id_fkinscripcion_mensualidad'];
$id_fkorden_pedido_mensualidad=$_POST['id_fkorden_pedido_mensualidad'];
$numero_cuota_mensualidad=$_POST['numero_cuota_mensualidad'];
$estado_mensualidad=$_POST['estado_mensualidad'];
$fecha_pago_mensualidad=$_POST['fecha_pago_mensualidad'];
$concepto_mensualidad=$_POST['concepto_mensualidad'];
$monto_mensualidad=$_POST['monto_mensualidad'];
$abonado_mensualidad=$_POST['abonado_mensualidad'];
$saldo_mensualidad=$_POST['saldo_mensualidad'];


$actualizar= new metodosMensualidades();





    if($id_mensualidad==""){
      
    $actualizar->insertarMensualidad(
       
        $id_fkinscripcion_mensualidad,
        $id_fkorden_pedido_mensualidad,
        $numero_cuota_mensualidad,
        $estado_mensualidad,
        $fecha_pago_mensualidad,
        $concepto_mensualidad,
        $monto_mensualidad,
        $abonado_mensualidad,
        $saldo_mensualidad
    );
    }
    
    else{
      
    $actualizar->actualizarMensualidad(
        
        $id_mensualidad,
    $id_fkinscripcion_mensualidad,
    $id_fkorden_pedido_mensualidad,
    $numero_cuota_mensualidad,
    $estado_mensualidad,
    $fecha_pago_mensualidad,
    $concepto_mensualidad,
    $monto_mensualidad,
    $abonado_mensualidad,
    $saldo_mensualidad
        );
    }
?>
