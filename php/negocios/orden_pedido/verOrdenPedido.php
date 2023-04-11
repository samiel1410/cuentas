<?php  
require_once  ("../../../php/clases/orden_pedidos/orden_pedido.php");
if(!isset($_SESSION)){
    session_start();
}

$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$ver= new metodosOrdenPedido();
$nombre_busqueda= (isset($_POST['nombre_busqueda']) ? $_POST['nombre_busqueda'] : $_GET['nombre_busqueda']);
$sucursal_busqueda = (isset($_POST['sucursal_busqueda']) ? $_POST['sucursal_busqueda'] : $_GET['sucursal_busqueda']);
$mes =  (isset($_POST['mes']) ? $_POST['mes'] : $_GET['mes']);
$anio =  (isset($_POST['anio']) ? $_POST['anio'] : $_GET['anio']);

$fecha_start=(isset($_POST['fecha_start']) ? $_POST['fecha_start'] : $_GET['fecha_start']);
$fecha_end=(isset($_POST['fecha_end']) ? $_POST['fecha_end'] : $_GET['fecha_end']);



$ver->seleccionarOrdenPedidoPaginado($inicio,$limite,$nombre_busqueda,$sucursal_busqueda,$mes,$anio,$fecha_start,$fecha_end);
?>
