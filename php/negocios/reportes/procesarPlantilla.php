<?php  
session_start();

require_once  ("../../../php/clases/pdf/procesarPlantilla.php");




$id_inscripcion= $_POST['id_inscripcion'];

$reporte= new metodoProcesar();
$reporte->procesar(
    $id_inscripcion
  
    
);

?>