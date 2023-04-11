<?php  

require_once  ("../../../php/clases/sucursales/sucursal.php");



$instructor_busqueda = (isset($_POST['instructor_busqueda']) ? $_POST['instructor_busqueda'] : $_GET['instructor_busqueda']);
$ver= new metodosSucursal();
$ver->seleccionarInstructor($instructor_busqueda);

?>
