<?php
require_once  ("../../../php/clases/forma_pagos/forma_pago.php");

$id_forma=$_POST['id_forma'];

$eliminar= new metodosFormaPago();
$eliminar->eliminarFormaPago($id_forma);


?>
