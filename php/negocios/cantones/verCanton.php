<?php  
require_once  ("../../../php/clases/cantones/canton.php");

$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$id_provincia = (isset($_POST['id_provincia']) ? $_POST['id_provincia'] : $_GET['id_provincia']);
$ver= new metodosCanton();



$ver->verCanton($inicio,$limite,$id_provincia);
?>
