<?php  
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/reportes_usuario/reporte_usuario.php");


if(isset($_GET['id_sucursal'])){

    $id_sucursal = $_GET['id_sucursal'];
}
else{
    $id_sucursal = $_SESSION['id_fksucursal_usuario'];
}

$instituto= $_GET['instituto'];

$id_usuario=$_SESSION['id_usuario'];
$reporte= new metodoReporteUsuario();
$reporte->reporteUsuario(
    $id_usuario,
    $id_sucursal,
    $instituto
    
);

?>
