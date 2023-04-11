<?php  
require_once  ("../../../php/clases/inscripciones_web/inscripcion_web.php");


$inicio = (integer) (isset($_POST['inicio']) ? $_POST['inicio'] : $_GET['inicio']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$cedula_busqueda = (isset($_POST['cedula_busqueda']) ? $_POST['cedula_busqueda'] : $_GET['cedula_busqueda']);

$id= new metodosWeb();
$id->verInscripcionesWeb($inicio,$limite,$cedula_busqueda);

?>
