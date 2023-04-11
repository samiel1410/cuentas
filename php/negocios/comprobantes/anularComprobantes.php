<?php  

require_once  ("../../../php/clases/comprobante_cobros/comprobante_cobro.php");


$id_orden = $_POST['id_orden'];

$anular= new metodosComprobante();
$anular->anularComporbantes($id_orden);

?>
