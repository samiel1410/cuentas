<?php  
require_once  ("../../../php/clases/orden_pedidos/orden_pedido.php");


$id_orden =  (isset($_POST['id_orden']) ? $_POST['id_orden'] : $_GET['id_orden']);
$ver= new metodosOrdenPedido();
$ver->verificarComprobantes($id_orden);
?>
