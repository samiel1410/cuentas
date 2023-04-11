<?php  

require_once  ("../../../php/clases/inscripciones/inscripcion.php");


$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$inscripcion=(isset($_POST['inscripcion']) ? $_POST['inscripcion'] : $_GET['inscripcion']);


$ver= new metodoInscripcion();
$ver->seleccionarMensualidades($inicio,$limite,$inscripcion);

?>
