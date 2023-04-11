<?php  
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/reporte_sucursal/reporte_sucursal.php");


$nombre_instituto= (isset($_POST['nombre_instituto']) ? $_POST['nombre_instituto'] : $_GET['nombre_instituto']);
$id_instituto= (isset($_POST['id_instituto']) ? $_POST['id_instituto'] : $_GET['id_instituto']);

$id_usuario=$_SESSION['id_usuario'];
$reporte= new metodoReporteSucursal();
$reporte->reporteSucursal(
    $id_usuario,$nombre_instituto,$id_instituto
    
);

?>
