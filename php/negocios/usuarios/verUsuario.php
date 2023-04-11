<?php  
require_once  ("../../../php/clases/usuarios/usuario.php");
$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$nombre_busqueda= (isset($_POST['nombre_busqueda']) ? $_POST['nombre_busqueda'] : $_GET['nombre_busqueda']);
$sucursal_busqueda = (isset($_POST['sucursal_busqueda']) ? $_POST['sucursal_busqueda'] : $_GET['sucursal_busqueda']);
$estado = (isset($_POST['estado']) ? $_POST['estado'] : $_GET['estado']);
$ver= new metodosUsuario();
$ver->seleccionarUsuarioPaginado($inicio,$limite,$nombre_busqueda,$sucursal_busqueda,$estado);
?>
