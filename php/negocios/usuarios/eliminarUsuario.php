<?php  
require_once  ("../../../php/clases/usuarios/usuario.php");

$id_usuario=$_POST['id_usuario'];
$eliminar= new metodosUsuario();
$eliminar->eliminarUsuario($id_usuario);

?>
