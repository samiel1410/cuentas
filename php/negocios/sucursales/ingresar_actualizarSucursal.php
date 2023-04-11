<?php  

require_once  ("../../../php/clases/sucursales/sucursal.php");

$id_sucursal=$_POST['id_sucursal'];
$codigo_sucursal=$_POST['codigo_sucursal'];
$nombre_sucursal=$_POST['nombre_sucursal'];
$nombre_comercial_sucursal=$_POST['nombre_comercial_sucursal'];
$direccion_sucursal=$_POST['direccion_sucursal'];
$ciudad_sucursal=$_POST['ciudad_sucursal'];
$telefono_sucursal=$_POST['telefono_sucursal'];
$email_sucursal=$_POST['email_sucursal'];

$estado_sucursal=$_POST['estado_sucursal'];
$id_fkusuario_sucursal=$_POST['id_fkusuario_sucursal'];

$id_fkusuario_sucursal=$_SESSION['id_usuario'];

$imagen_validar=$_POST['imagen_validar_sucursal'];
$id_fkempresa_sucursal=$_POST['id_fkempresa_sucursal'];

$actualizar= new metodosSucursal();


if($id_sucursal==""){
    $imagen2=addslashes(file_get_contents($_FILES['imagen_sucursal']['tmp_name']));
$actualizar->insertarSucursal(
   
    $codigo_sucursal,$nombre_sucursal,$nombre_comercial_sucursal,$direccion_sucursal,$ciudad_sucursal,$telefono_sucursal,$email_sucursal,$imagen2,$estado_sucursal,$id_fkusuario_sucursal,$id_fkempresa_sucursal
);
}

else{

    if($imagen_validar==1){
        $imagen_editar=addslashes(file_get_contents($_FILES['imagen_sucursal_editar']['tmp_name']));
        $actualizar->actualizarSucursal(
            
            $id_sucursal,$codigo_sucursal,$nombre_sucursal,$nombre_comercial_sucursal,$direccion_sucursal,$ciudad_sucursal,$telefono_sucursal,$email_sucursal,$imagen_editar,$estado_sucursal,$id_fkempresa_sucursal
            );

    }
    else{

        $imagen_editar="";
        $actualizar->actualizarSucursal(
            
            $id_sucursal,$codigo_sucursal,$nombre_sucursal,$nombre_comercial_sucursal,$direccion_sucursal,$ciudad_sucursal,$telefono_sucursal,$email_sucursal,$imagen_editar,$estado_sucursal,$id_fkempresa_sucursal
            );


    }
  
}
?>