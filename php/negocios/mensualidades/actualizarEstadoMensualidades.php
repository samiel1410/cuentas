<?php  

require_once  ("../../../php/clases/mensualidades/mensualidad.php");

$id_orden =  (isset($_POST['id_orden']) ? $_POST['id_orden'] : $_GET['id_orden']);
$tipo =  (isset($_POST['tipo']) ? $_POST['tipo'] : $_GET['tipo']);
$estado = (isset($_POST['estado']) ? $_POST['estado'] : $_GET['estado']);




$actualizar= new metodosMensualidades();
$actualizar->actualizarEstadoMensualidades(
    $id_orden,$tipo,$estado
    
    );
?>
