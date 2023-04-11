<?php  
require_once  ("../../../php/clases/orden_pedido_detalle/orden_pedido_detalles.php");


$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);


$ver= new metodosOrdenPedidoDetalle();
$ver->seleccionarOrdenPedidoDetallePaginado($inicio,$limite);

?>
