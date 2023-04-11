<?php  
if(!isset($_SESSION)){
    session_start();
}
require_once  ("../../../php/clases/usuarios/usuario.php");

$fecha= new metodosUsuario();
$fecha->recuperarFecha();
?>
