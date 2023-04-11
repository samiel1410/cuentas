<?php  
require_once  ("../../../php/clases/inscripciones/inscripcion.php");


$id_inscripcion =  (isset($_POST['id_inscripcion']) ? $_POST['id_inscripcion'] : $_GET['id_inscripcion']);
$fecha=  (isset($_POST['fecha_entrega_uniforme']) ? $_POST['fecha_entrega_uniforme'] : $_GET['fecha_entrega_uniforme']);
$estado=  (isset($_POST['estado_uniforme_inscripcion_fo']) ? $_POST['estado_uniforme_inscripcion_fo'] : $_GET['estado_uniforme_inscripcion_fo']);



$id= new metodoInscripcion();
$id->actualizarEstadoUniforme(
   $id_inscripcion,
   $fecha,$estado
);

?>
