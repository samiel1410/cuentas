<?php  
require_once  ("../../../php/clases/inscripciones_web/inscripcion_web.php");


$id_inscripcion_web =$_POST['id_inscripcion_web'];
$id_institucion =$_POST['id_institucion'];
$id_curso =$_POST['id_curso'];
$cedula =$_POST['cedula'];
$nombre =$_POST['nombre'];
$dirreccion =$_POST['dirrecion'];
$apellido =$_POST['apellido'];
$tipo_sangre =$_POST['tipo_sangre'];
$id_provincia =$_POST['id_provincia'];
$id_ciudad =$_POST['id_ciudad'];
$celular =$_POST['celular'];
$representante =$_POST['representante'];
$numero_repre =$_POST['numero_repre'];
$correo =$_POST['correo'];
$estudios =$_POST['estudios'];
$talla_uniforme =$_POST['talla_uniforme'];
$numero_calzado =$_POST['numero_calzado'];











$actualizar= new metodosWeb();
$actualizar->actualizarInscripcion($id_inscripcion_web ,$id_institucion ,$id_curso ,$cedula ,$nombre ,$apellido ,$tipo_sangre ,$id_provincia ,$id_ciudad,$celular ,$representante ,$numero_repre ,$correo ,$estudios ,$talla_uniforme ,$numero_calzado ,$dirreccion
);

?>
