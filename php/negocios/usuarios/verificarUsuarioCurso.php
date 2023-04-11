<?php  
if(!isset($_SESSION)){
    session_start();
}
require_once  ("../../../php/clases/usuarios/usuario.php");
$id_usuario= (isset($_POST['id_usuario']) ? $_POST['id_usuario'] : $_GET['id_usuario']);
$ver= new metodosUsuario();
$ver->recuperarUsuarioCurso($id_usuario);
?>
