<?php  

require_once  ("../../../php/clases/alumnos/alumno.php");

$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$ver= new metodosAlumno();
$nombre_busqueda= (isset($_POST['nombre_busqueda']) ? $_POST['nombre_busqueda'] : $_GET['nombre_busqueda']);

$ver->seleccionarAlumnoNoInscrito($inicio,$limite,$nombre_busqueda);

?>
