<?php  
if(!isset($_SESSION)){
    session_start();

	 
}

require_once  ("../../../php/clases/pdf/comprobante_cuenta_cobrar.php");
$numero = $_GET['numero'];
$cliente= $_GET['cliente'];
$tipo_documento = $_GET['tipo_documento'];
$numero_documento =$_GET['numero_documento'];
$fecha_emision =$_GET['fecha_emision'];
$fecha_venc =$_GET['fecha_venc'];
$monto = $_GET['monto'];
$observacion = $_GET['observacion'];
$estado = $_GET['estado'];
$sucursal = $_GET['sucursal'];
$departamento = $_GET['departamento'];


$reporte= new metodoComprobanteCuentaCobrar();
$reporte->comprobante(
    $numero ,
    $cliente,
    $tipo_documento ,
    $numero_documento ,
    $fecha_emision ,
    $fecha_venc ,
    $monto  ,
    $observacion ,
    $estado ,
    $sucursal ,
    $departamento 

  
    
);

?>