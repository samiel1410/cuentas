<?php  
session_start();

require_once  ("../../../php/clases/pdf/ficha_alumno.php");




$fecha_naci = $_GET['fecha_naci'];
$provincia = $_GET['provincia'];
$ciudad = $_GET['ciudad'];


$id_alumno = $_GET['id_alumno'];



$nacimiento = new DateTime($fecha_naci);
$ahora = new DateTime(date("Y-m-d"));
$diferencia = $ahora->diff($nacimiento);
$edad = $diferencia->format("%y") ." " .'años';


$id_usuario=$_SESSION['id_usuario'];
$reporte= new metodoFicha();
$reporte->ficha(
    $fecha_naci,$provincia,$ciudad,$id_alumno,$edad 
  
    
);

?>