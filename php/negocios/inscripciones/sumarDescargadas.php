<?php

session_start();
require_once  ("../../../php/clases/inscripciones/inscripcion.php");


$id_inscripcion =  (isset($_POST['id_inscripcion']) ? $_POST['id_inscripcion'] : $_GET['id_inscripcion']);

$id_usuario =$_SESSION['id_usuario'];

$sumar= new metodoInscripcion();
$sumar->sumarDescargadas(
   $id_inscripcion,$id_usuario
  
);

?>
