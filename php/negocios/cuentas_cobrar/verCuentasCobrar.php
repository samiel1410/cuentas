<?php  
require_once  ("../../../php/clases/cuentas_cobrar/cuenta_cobrar.php");

$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$periodo =  (isset($_POST['periodo']) ? $_POST['periodo'] : $_GET['periodo']);
$desde =  (isset($_POST['desde']) ? $_POST['desde'] : $_GET['desde']);
$hasta =  (isset($_POST['hasta']) ? $_POST['hasta'] : $_GET['hasta']);
$observacion =  (isset($_POST['observacion']) ? $_POST['observacion'] : $_GET['observacion']);
$numero =  (isset($_POST['numero']) ? $_POST['numero'] : $_GET['numero']);

$ver= new metodosCuentasCobrar();
$ver->seleccionarCuentasCobrar($inicio,$limite,$periodo,$desde,$hasta,$observacion,$numero);
?>
