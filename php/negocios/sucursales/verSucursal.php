<?php  
require_once  ("../../../php/clases/sucursales/sucursal.php");
$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$nombre_busqueda= (isset($_POST['nombre_busqueda']) ? $_POST['nombre_busqueda'] : $_GET['nombre_busqueda']);
$id_empresa= (isset($_POST['id_empresa']) ? $_POST['id_empresa'] : $_GET['id_empresa']);
$ver= new metodosSucursal();
$ver->seleccionarSucursalPaginado($inicio,$limite,$nombre_busqueda,$id_empresa);


?>