<?php  
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/inscripciones/inscripcion.php");


$inicio = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
$limite = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
$id_alumno = (integer) (isset($_POST['id_alumno']) ? $_POST['id_alumno'] : $_GET['id_alumno']);
$nombre_busqueda =  (isset($_POST['nombre_busqueda']) ? $_POST['nombre_busqueda'] : $_GET['nombre_busqueda']);
$sucursal_busqueda =  (isset($_POST['sucursal_busqueda']) ? $_POST['sucursal_busqueda'] : $_GET['sucursal_busqueda']);
$mes =  (isset($_POST['mes']) ? $_POST['mes'] : $_GET['mes']);
$anio =  (isset($_POST['anio']) ? $_POST['anio'] : $_GET['anio']);

$fecha_start=(isset($_POST['fecha_start']) ? $_POST['fecha_start'] : $_GET['fecha_start']);
$fecha_end=(isset($_POST['fecha_end']) ? $_POST['fecha_end'] : $_GET['fecha_end']);
$curso=(isset($_POST['curso']) ? $_POST['curso'] : $_GET['curso']);

$estado=(isset($_POST['estado']) ? $_POST['estado'] : $_GET['estado']);


$ver= new metodoInscripcion();
$ver->seleccionarInscripcionPaginado($inicio,$limite,$id_alumno,$nombre_busqueda,$sucursal_busqueda,$mes,$anio,$fecha_start,$fecha_end,$curso,$estado);

?>
