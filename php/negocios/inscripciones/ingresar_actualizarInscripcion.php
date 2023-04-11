<?php  
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/inscripciones/inscripcion.php");

$id_inscripcion=$_POST['id_inscripcion'];
$fecha_inscripcion=$_POST['fecha_inscripcion'];
$fecha_inicio_inscripcion=$_POST['fecha_inicio_inscripcion'];
$fecha_fin_inscripcion=$_POST['fecha_fin_inscripcion'];
$estado_inscripcion=$_POST['estado_inscripcion'];
$calificacion_inscripcion=$_POST['calificacion_inscripcion'];
$origen_inscripcion=$_POST['origen_inscripcion'];
$id_fkalumno_inscripcion=$_POST['id_fkalumno_inscripcion'];
$id_fkcurso_inscripcion=$_POST['id_fkcurso_inscripcion'];
$id_fkusuario_inscripcion=$_SESSION['id_usuario'];
$id_fksucursal_inscripcion=$_POST['id_fksucursal_inscripcion'];
$id_fkinstructor_inscripcion=$_POST['id_fkinstructor_inscripcion'];
$precio_total_curso=$_POST['precio_total_curso'];
$estado_uniforme_inscripcion=$_POST['estado_uniforme_inscripcion'];

if(isset($_POST['curso_variable_inscripcion'])){
    $curso_variable_inscripcion=$_POST['curso_variable_inscripcion'];
    
    
}
else{
    $curso_variable_inscripcion=0;
}


if(isset($_POST['condicion_pago_inscripcion'])){
    $condicion_pago_inscripcion=$_POST['condicion_pago_inscripcion'];
    
    
}
else{
    $condicion_pago_inscripcion=0;
}






$actualizar= new metodoInscripcion();


if($id_inscripcion==""){
   
    $actualizar->insertarInscripcion(
        $fecha_inscripcion,$fecha_inicio_inscripcion,$fecha_fin_inscripcion,$estado_inscripcion,$calificacion_inscripcion,$origen_inscripcion,$id_fkalumno_inscripcion,$id_fkcurso_inscripcion,$id_fkusuario_inscripcion,$id_fksucursal_inscripcion,$id_fkinstructor_inscripcion,$precio_total_curso,$estado_uniforme_inscripcion,$condicion_pago_inscripcion,$curso_variable_inscripcion
        
        );
    
}else{
 
    $actualizar->actualizarInscripcion(
        $id_inscripcion,$fecha_inscripcion,$fecha_inicio_inscripcion,$fecha_fin_inscripcion,$estado_inscripcion,$calificacion_inscripcion,$origen_inscripcion,$id_fkalumno_inscripcion,$id_fkcurso_inscripcion,$id_fksucursal_inscripcion,$id_fkinstructor_inscripcion,$precio_total_curso,$estado_uniforme_inscripcion);
    
}

?>
