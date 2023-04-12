<?php  
require_once  ("../../../php/clases/cuentas_pagar/cuenta_pagar.php");

$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$periodo =  (isset($_POST['periodo']) ? $_POST['periodo'] : $_GET['periodo']);
$desde =  (isset($_POST['desde']) ? $_POST['desde'] : $_GET['desde']);
$hasta =  (isset($_POST['hasta']) ? $_POST['hasta'] : $_GET['hasta']);
$observacion =  (isset($_POST['observacion']) ? $_POST['observacion'] : $_GET['observacion']);
$numero =  (isset($_POST['numero']) ? $_POST['numero'] : $_GET['numero']);
$estado =  (isset($_POST['estado']) ? $_POST['estado'] : $_GET['estado']);
$sucursal =  (isset($_POST['sucursal']) ? $_POST['sucursal'] : $_GET['sucursal']);
$departamento =  (isset($_POST['departamento']) ? $_POST['departamento'] : $_GET['departamento']);
if($estado == 'TODOS'){
    $estado ="";
}
$ver= new metodosCuentaspagar();
$ver->seleccionarCuentasPagar($inicio,$limite,$periodo,$desde,$hasta,$observacion,$numero,$estado,$sucursal,$departamento);
?>
