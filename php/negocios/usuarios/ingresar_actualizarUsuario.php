
<?php  
require_once  ("../../../php/clases/usuarios/usuario.php");




$id_usuario=$_POST['id_usuario'];
$nombre_usuario=$_POST['nombre_usuario'];
$apellido_usuario=$_POST['apellido_usuario'];
$clave_usuario=$_POST['clave_usuario'];
$rol_usuario=$_POST['rol_usuario'];
$estado_usuario=$_POST['estado_usuario']; 
$correo_usuario=$_POST['correo_usuario'];
$id_fksucursal_usuario=$_POST['id_fksucursal_usuario']; 
$datos= new metodosUsuario();
if($id_usuario ==""){
    $datos->ingresarUsuario(
        $nombre_usuario,$apellido_usuario,$clave_usuario,$rol_usuario,$estado_usuario,$correo_usuario,$id_fksucursal_usuario
        
        );

       
    
}else{
    $datos->actualizarUsuario(
        $id_usuario,$nombre_usuario,$apellido_usuario,$clave_usuario,$rol_usuario,$estado_usuario,$correo_usuario,$id_fksucursal_usuario
        
        );
    
}



?>




