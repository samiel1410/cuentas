<?php  
if(!isset($_SESSION)){
    session_start();

	 
}

require_once  ("../../../php/clases/pdf/crearcomprobante.php");


$id_orden=$_GET['id_orden'];




$id_usuario=$_SESSION['id_usuario'];
$reporte= new metodoComprobante();
$reporte->comprobante(
    $id_orden,
    $id_orden
    

  
    
);

?>