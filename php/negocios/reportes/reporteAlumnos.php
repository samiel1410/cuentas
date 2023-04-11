<?php  
session_start();

require_once  ("../../../php/clases/reporte_alumnos/reporte_alumno.php");



  
    $provincia = $_GET['provincia'];
    
    $ciudad = $_GET['ciudad'];

    $nombre_provincia=$_GET['nombre_provincia'];





$id_usuario=$_SESSION['id_usuario'];
$reporte= new metodoReporteAlumno();
$reporte->reporteAlumno(
    $id_usuario,
    $provincia,$ciudad,$nombre_provincia
    
);

?>
