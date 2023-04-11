<?php  
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/orden_pedidos/orden_pedido.php");

$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$id_inscripcion =  (isset($_POST['id_inscripcion']) ? $_POST['id_inscripcion'] : $_GET['id_inscripcion']);
$ver= new metodosOrdenPedido();
$ver->seleccionarAlumnoPedidoPaginado($inicio,$limite,$id_inscripcion);
?>
