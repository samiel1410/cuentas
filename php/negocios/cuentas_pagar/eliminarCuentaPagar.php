<?php  
require_once  ("../../../php/clases/cuentas_pagar/cuenta_pagar.php");

$id_otra_cuenta_pagar = (integer) (isset($_POST['id_otra_cuenta_pagar']) ? $_POST['id_otra_cuenta_pagar'] : $_GET['id_otra_cuenta_pagar']);


$ver= new metodosCuentasPagar();
$ver->eliminarCuentaPagar($id_otra_cuenta_pagar);
?>
