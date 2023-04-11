<?php
require_once  ("../../../php/clases/sucursales/sucursal.php");


$id_sucursal=$_POST['id_sucursal'];




$eliminar= new metodosSucursal();
$eliminar->eliminarSucursal(
    
    $id_sucursal
    );

?>