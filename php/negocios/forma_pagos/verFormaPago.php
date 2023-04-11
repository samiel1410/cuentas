<?php  

require_once  ("../../../php/clases/forma_pagos/forma_pago.php");


$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);

$nombre_busqueda= (isset($_POST['nombre_busqueda']) ? $_POST['nombre_busqueda'] : $_GET['nombre_busqueda']);
$ver= new metodosFormaPago();
$ver->seleccionarFormaPago($inicio,$limite,$nombre_busqueda);

?>
