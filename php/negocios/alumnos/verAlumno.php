<?php  

require_once  ("../../../php/clases/alumnos/alumno.php");

$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$ver= new metodosAlumno();
$nombre_busqueda= (isset($_POST['nombre_busqueda']) ? $_POST['nombre_busqueda'] : $_GET['nombre_busqueda']);
$sucursal_busqueda = (isset($_POST['sucursal_busqueda']) ? $_POST['sucursal_busqueda'] : $_GET['sucursal_busqueda']);
$estado = (isset($_POST['estado']) ? $_POST['estado'] : $_GET['estado']);
$cedula = (isset($_POST['cedula']) ? $_POST['cedula'] : $_GET['cedula']);
$provincia = (isset($_POST['provincia']) ? $_POST['provincia'] : $_GET['provincia']);
$ciudad = (isset($_POST['ciudad']) ? $_POST['ciudad'] : $_GET['ciudad']);

$ver->seleccionarAlumnoPaginado($inicio,$limite,$nombre_busqueda,$sucursal_busqueda,$estado,$cedula,$provincia,$ciudad);

?>
