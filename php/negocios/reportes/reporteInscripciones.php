<?php  
session_start();

require_once  ("../../../php/clases/reporte_inscripcion/reporte_inscripcion.php");


if(isset($_GET['id_sucursal'])){

    $id_sucursal = $_GET['id_sucursal'];
    $id_curso = $_GET['id_curso'];
}
else{
    $id_sucursal = $_SESSION['id_fksucursal_usuario'];
    $id_curso = $_GET['id_curso'];
}

$fecha_start= (isset($_POST['fecha_start']) ? $_POST['fecha_start'] : $_GET['fecha_start']);

$fecha_end= (isset($_POST['fecha_end']) ? $_POST['fecha_end'] : $_GET['fecha_end']);

$instituto= (isset($_POST['instituto']) ? $_POST['instituto'] : $_GET['instituto']);
$id_usuario=$_SESSION['id_usuario'];
$reporte= new metodoReporteInscripcion();
$reporte->reporteInscripcion(
    $id_usuario,
    $id_sucursal,
    $id_curso,$fecha_start,$fecha_end,$instituto
    
);

?>
