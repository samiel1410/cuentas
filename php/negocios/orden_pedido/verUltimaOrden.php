<?php  
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/orden_pedidos/orden_pedido.php");


$ver= new metodosOrdenPedido();



$ver->verUltimaOrden();
?>
