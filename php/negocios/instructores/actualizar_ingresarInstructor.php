<?php  
if(!isset($_SESSION)){
    session_start();
}
require_once  ("../../../php/clases/instructores/instructor.php");
$id_instructor=$_POST['id_instructor'];
$nombre_instructor=$_POST['nombre_instructor'];
$apellido_instructor=$_POST['apellido_instructor'];
$ciudad_instructor=$_POST['ciudad_instructor'];
$telefono_instructor=$_POST['telefono_instructor']; 
$celular_instructor=$_POST['celular_instructor']; 
$direccion_instructor=$_POST['direccion_instructor'];
$titulo_instructor=$_POST['titulo_instructor'];
$estado_instructor=$_POST['estado_instructor'];
$correo_instructor=$_POST['correo_instructor'];
$cedula_instructor=$_POST['cedula_instructor'];
$id_fkusuario_instructor=$_SESSION['id_usuario'];

echo $_SESSION['id_usuario']."Ingreso";
$categoria_instructor=$_POST['categoria_instructor'];



$datos= new metodosInstructor();
if($id_instructor ==""){
    $datos->insertarInstructor(
        $nombre_instructor, $apellido_instructor, $ciudad_instructor, $telefono_instructor, $celular_instructor, $direccion_instructor, $titulo_instructor, $estado_instructor, $correo_instructor, $cedula_instructor,$id_fkusuario_instructor,$categoria_instructor
        
        );
    
}else{
    $datos->actualizarInstructor(
        $id_instructor,$nombre_instructor, $apellido_instructor,$telefono_instructor,$celular_instructor ,$direccion_instructor,$titulo_instructor,$estado_instructor,$correo_instructor,$cedula_instructor,$ciudad_instructor,$categoria_instructor
        
        );
    
}






?>




