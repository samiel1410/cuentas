<?php  

require_once  ("../../../php/clases/historial/historial.php");


$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);

$id_inscripcion =  (isset($_POST['id_inscripcion']) ? $_POST['id_inscripcion'] : $_GET['id_inscripcion']);


$ver= new metodoHistorial();
$ver->verHistorial($inicio,$limite,$id_inscripcion);

?>
