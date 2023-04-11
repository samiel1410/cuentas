<?php  

require_once  ("../../../php/clases/comprobante_cobros/comprobante_cobro.php");


$id_comprobante = $_POST['id_comprobante'];
$anular= new metodosComprobante();
$anular->anularUnComporbante($id_comprobante);

?>
