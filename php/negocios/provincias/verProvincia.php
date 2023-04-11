<?php  
require_once  ("../../../php/clases/pronvincias/provincia.php");

$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$ver= new metodosProvinvia();
$ver->seleccionarProvinciaWebPaginado($inicio,$limite);
?>
