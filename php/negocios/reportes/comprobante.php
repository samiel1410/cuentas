<?php  
if(!isset($_SESSION)){
    session_start();

	 
}

require_once  ("../../../php/clases/pdf/comprobante.php");


$fecha=$_GET['fecha'];
$concepto = $_GET['concepto'];
$estado = $_GET['estado'];
$numero = $_GET['numero'];
$monto = $_GET['monto'];
$forma_pago = $_GET['forma'];
$nombre_alumno = $_GET['nombre_alumno'];
$orden = $_GET['orden'];
$id_forma = $_GET['id_forma'];





$id_usuario=$_SESSION['id_usuario'];
$reporte= new metodoComprobante();
$reporte->comprobante(
    $id_usuario,
    $fecha,
    $concepto,
    $estado,
    $numero,
    $monto,
    $forma_pago,
    $nombre_alumno,
    $orden,
    $id_forma

  
    
);

?>