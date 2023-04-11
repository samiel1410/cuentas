<?php  
session_start();

require_once  ("../../../php/clases/reporte_formas/reporte_forma.php");





if(isset($_GET['id_sucursal'])){

    $id_sucursal = $_GET['id_sucursal'];
}
else{
    $id_sucursal = $_SESSION['id_fksucursal_usuario'];
}
$nombre_institucion = $_GET['nombre_institucion'];
$desde = $_GET['desde'];
$hasta = $_GET['hasta'];

$id_usuario=$_SESSION['id_usuario'];
$reporte= new metodoForma();
$reporte->reporteForma(
    $id_usuario,
    $id_sucursal,
    $nombre_institucion,
    $desde,$hasta
    
   

  
    
);

?>