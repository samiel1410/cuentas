<?php  
require_once  ("../../../php/clases/registro_web/registro_web.php");


$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);


$ver= new metodosRegistroWeb();
$ver->seleccionarRegistroWebPaginado($inicio,$limite);

?>
