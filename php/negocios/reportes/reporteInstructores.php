<?php  
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/reporte_instructores/reporte_instructor.php");




$id_usuario=$_SESSION['id_usuario'];
$reporte= new metodoReporteInstructor();
$reporte->reporteInstructor(
    $id_usuario,
    
    
);

?>
