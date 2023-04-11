<?php  

require_once  ("../../../php/clases/mensualidades/mensualidad.php");

$id_fkinscripcion_mensualidad=$_GET['id_fkinscripcion_mensualidad'];
$id_fkorden_pedido_mensualidad=$_GET['id_fkorden_pedido_mensualidad'];
$numero_cuota_mensualidad=$_GET['numero_cuota_mensualidad'];
$fecha_pago_mensualidad=$_GET['fecha_pago_mensualidad'];
$estado_mensualidad=$_GET['estado_mensualidad'];
$monto_mensualidad=$_GET['monto_mensualidad'];
$abonado_mensualidad=$_GET['abonado_mensualidad'];
$saldo_mensualidad=$_GET['saldo_mensualidad'];

$ingresar= new metodosMensualidades();
$ingresar->insertarMensualidad(
    $id_fkinscripcion_mensualidad,$id_fkorden_pedido_mensualidad,$numero_cuota_mensualidad,
    $fecha_pago_mensualidad,$fecha_pago_mensualidad,$estado_mensualidad,$estado_mensualidad,
    $monto_mensualidad,$abonado_mensualidad,$saldo_mensualidad

    );
?>
