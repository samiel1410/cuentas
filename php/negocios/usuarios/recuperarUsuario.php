<?php  
session_start();
require_once  ("../../../php/clases/usuarios/usuario.php");
$id_usuario= $_SESSION['id_usuario'];
$ver= new metodosUsuario();
$ver->recuperarUsuario($id_usuario);
?>
