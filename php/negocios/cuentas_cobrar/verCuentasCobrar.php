<?php  
require_once  ("../../../php/clases/cuentas_cobrar/cuenta_cobrar.php");

$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);

$ver= new metodosCuentasCobrar();
$ver->seleccionarCuentasCobrar($inicio,$limite);
?>
