<?php  
session_start();

require_once  ("../../../php/clases/reporte_curso/reporte_curso.php");


if(isset($_GET['id_sucursal'])){

    $id_sucursal = $_GET['id_sucursal'];
}
else{
    $id_sucursal = $_SESSION['id_fksucursal_usuario'];
}
$instituto = $_GET['instituto'];

$id_curso = $_GET['id_curso'];
$anio= $_GET['anio'];
$mes =$_GET['mes'];

$nombre_curso =$_GET['nombre_curso'];


$nombre_mes= $_GET['nombre_mes'];


$id_usuario=$_SESSION['id_usuario'];
$reporte= new metodoReporteCurso();
$reporte->reporteMesCurso(
    $id_usuario,
    $id_sucursal,
    $instituto,
    $id_curso,
    $anio,
    $mes,$nombre_curso,$nombre_mes
    
);

?>
