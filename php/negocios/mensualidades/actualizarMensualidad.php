<?php  

require_once  ("../../../php/clases/mensualidades/mensualidad.php");

$id_mensualidad=$_POST['id_mensualidad'];
$abonado_mensualidad=$_POST['abonado_mensualidad'];
$saldo_mensualidad=$_POST['saldo_mensualidad'];
$valor=$_POST['valor'];


$actualizar= new metodosMensualidades();
$actualizar->actualizarMensualidad(
    $id_mensualidad,
    $abonado_mensualidad,
    $saldo_mensualidad,
    $valor

    );
?>
