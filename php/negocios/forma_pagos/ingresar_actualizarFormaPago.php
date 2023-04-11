<?php

require_once  ("../../../php/clases/forma_pagos/forma_pago.php");

$id_forma=$_POST['id_forma'];
$nombre_forma=$_POST['nombre_forma'];
$id_fkusuario_forma=$_POST['id_fkusuario_forma'];
$numero_cuenta=$_POST['numero_cuenta'];





$actualizar= new metodosFormaPago();


if($id_forma==""){
    $actualizar->insertarFormaPago(
        
        $nombre_forma,$id_fkusuario_forma,$numero_cuenta
        );
   
}
else{
    $actualizar->actualizarFormaPago(
        $id_forma,$nombre_forma,$numero_cuenta
        
        );
    
}

?>
