<?php  
require_once  ("../../../php/clases/cuentas_cobrar/cuenta_cobrar.php");

$id_otra_cuenta_cobrar = (integer) (isset($_POST['id_otra_cuenta_cobrar']) ? $_POST['id_otra_cuenta_cobrar'] : $_GET['id_otra_cuenta_cobrar']);


$ver= new metodosCuentasCobrar();
$ver->eliminarCuentaCobrar($id_otra_cuenta_cobrar);
?>
