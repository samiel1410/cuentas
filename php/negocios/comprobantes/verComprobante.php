<?php  

require_once  ("../../../php/clases/comprobante_cobros/comprobante_cobro.php");

$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$id_orden =(isset($_POST['id_orden']) ? $_POST['id_orden'] : $_GET['id_orden']);

$ver= new metodosComprobante();
$ver->seleccionarComprobantePaginado($inicio,$limite,$id_orden);

?>
