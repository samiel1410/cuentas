<?php  
require_once  ("../../../php/clases/registro_web/registro_web.php");

$id=$_GET['id'];
$estado=$_GET['estado'];

$actualizar= new metodosRegistroWeb();
$actualizar->actualizarRegistroWeb(
    $id,$estado

);

?>
