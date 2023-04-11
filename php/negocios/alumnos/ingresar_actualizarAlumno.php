<?php 
if(!isset($_SESSION)){
    session_start();
}
require_once  ("../../../php/clases/alumnos/alumno.php");

$id_alumno=$_POST['id_alumno'];
$nombre_alumno=$_POST['nombre_alumno'];
$apellido_alumno=$_POST['apellido_alumno'];
$fecha_naci_alumno=$_POST['fecha_naci_alumno'];
$direccion_alumno=$_POST['direccion_alumno'];
$telefono_alumno=$_POST['telefono_alumno'];
$celular_alumno=$_POST['celular_alumno'];
$instruccion_alumno=$_POST['instruccion_alumno'];
$ciudad_alumno=$_POST['ciudad_alumno'];
$estado_alumno=$_POST['estado_alumno'];
$correo_alumno=$_POST['correo_alumno'];
$cedula_alumno=$_POST['cedula_alumno'];

$tipo_sangre_alumno=$_POST['tipo_sangre_alumno'];
$nombre_representante_alumno=$_POST['nombre_representante_alumno'];
$numero_representante_alumno=$_POST['numero_representante_alumno'];
$talla_uniforme_alumno=$_POST['talla_uniforme_alumno'];
$numero_calzado_alumno=$_POST['numero_calzado_alumno'];
$id_fkusuario_alumno=$_SESSION['id_usuario']; //Cambiar con el SESSION

$imagen_validar=$_POST['imagen_validar_alumno'];
$id_fksucursal_alumno= $_SESSION['id_fksucursal_usuario'];
$id_fkprovincia_alumno= $_POST['id_fkprovincia_alumno'];



//Parseo de la variables String 




$actualizar= new metodosAlumno();



if($id_alumno==""){

    if(isset($_POST['imagen_alumno'])){
        $imagen=addslashes(file_get_contents($_FILES['imagen_alumno']['tmp_name']));
    }
    else{
        $imagen="";
    }
 
    $actualizar->insertarAlumno(
        $nombre_alumno, $apellido_alumno, $fecha_naci_alumno, $direccion_alumno, $telefono_alumno,$celular_alumno,$instruccion_alumno,$ciudad_alumno,$estado_alumno,$correo_alumno,$cedula_alumno,$imagen,$tipo_sangre_alumno,$nombre_representante_alumno,$numero_representante_alumno,$talla_uniforme_alumno,$numero_calzado_alumno,$id_fkusuario_alumno,$id_fksucursal_alumno,$id_fkprovincia_alumno
        
        );

}

else{
    if($imagen_validar==1){
    $imagen=addslashes(file_get_contents($_FILES['imagen_alumno_editar']['tmp_name']));
    $actualizar->actualizarAlumno(
        
        $id_alumno,$nombre_alumno, $apellido_alumno, $fecha_naci_alumno, $direccion_alumno, $telefono_alumno,$celular_alumno,$instruccion_alumno,$ciudad_alumno,$estado_alumno,$correo_alumno,$cedula_alumno,$imagen,$tipo_sangre_alumno,$nombre_representante_alumno,$numero_representante_alumno,$talla_uniforme_alumno,$numero_calzado_alumno,$id_fkprovincia_alumno
        
        );
    }else{
        $imagen="";
    $actualizar->actualizarAlumno(
        
        $id_alumno,$nombre_alumno, $apellido_alumno, $fecha_naci_alumno, $direccion_alumno, $telefono_alumno,$celular_alumno,$instruccion_alumno,$ciudad_alumno,$estado_alumno,$correo_alumno,$cedula_alumno,$imagen,$tipo_sangre_alumno,$nombre_representante_alumno,$numero_representante_alumno,$talla_uniforme_alumno,$numero_calzado_alumno,$id_fkprovincia_alumno
        
        );
    }
    
    
}



?>
