<?php
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/cursos/curso.php");

$id_curso=$_POST['id_curso'];
$nombre_curso=$_POST['nombre_curso'];
$estado_curso=$_POST['estado_curso'];
$mensualidad_curso=$_POST['mensualidad_curso'];
$iva_curso=$_POST['iva_curso'];
$id_fkinstructor_curso=$_POST['id_fkinstructor_curso'];
$id_fkusuario_curso=$_SESSION['id_usuario'];
$id_fksucursal_curso=$_POST['id_fksucursal_curso'];
$duracion_mes_curso=$_POST['duracion_mes_curso'];
$cuota_entrada_curso=$_POST['cuota_entrada_curso'];
$cupos_curso=$_POST['cupos_curso'];
$fecha_inicio_curso=$_POST['fecha_inicio_curso'];
$fecha_fin_curso=$_POST['fecha_fin_curso'];
$precio_curso=$_POST['precio_curso'];
$horas_curso=$_POST['horas_curso'];
$imagen_validar=$_POST['imagen_validar_curso'];



$actualizar= new metodosCurso();


if($id_curso==""){
    $imagen=addslashes(file_get_contents($_FILES['imagen_curso']['tmp_name']));

    $file = $_FILES["imagen_curso"]["name"]; //Nombre de nuestro archivo

$url_temp = $_FILES["imagen_curso"]["tmp_name"]; //Ruta temporal a donde se carga el archivo 

//dirname(__FILE__) nos otorga la ruta absoluta hasta el archivo en ejecución
$url_insert = "../certificado"; //Carpeta donde subiremos nuestros archivos

//Ruta donde se guardara el archivo, usamos str_replace para reemplazar los "\" por "/"
$url_target = str_replace('\\', '/', $url_insert) . '/' . $file;

//Si la carpeta no existe, la creamos
if (!file_exists($url_insert)) {
    mkdir($url_insert, 0777, true);
};
move_uploaded_file($url_temp, $url_target);
//movemos el archivo de la carpeta temporal a la carpeta objetivo y verificamos si fue exitoso

$ruta_final=htmlspecialchars(basename($file));
    $actualizar->insertarCurso(
        $nombre_curso,$estado_curso,$mensualidad_curso,$iva_curso,$id_fkinstructor_curso,$id_fkusuario_curso,$id_fksucursal_curso,$duracion_mes_curso,$cuota_entrada_curso,$cupos_curso,$fecha_inicio_curso,$fecha_fin_curso,$imagen,$precio_curso,$horas_curso,$ruta_final
        
        );
   
}
else{
    if($imagen_validar==1){
         $imagen=addslashes(file_get_contents($_FILES['imagen_curso_editar']['tmp_name']));
        
         $file = $_FILES["imagen_curso_editar"]["name"]; //Nombre de nuestro archivo
     
     $url_temp = $_FILES["imagen_curso_editar"]["tmp_name"]; //Ruta temporal a donde se carga el archivo 
     
     //dirname(__FILE__) nos otorga la ruta absoluta hasta el archivo en ejecución
     $url_insert = "../certificado"; //Carpeta donde subiremos nuestros archivos
     
     //Ruta donde se guardara el archivo, usamos str_replace para reemplazar los "\" por "/"
     $url_target = str_replace('\\', '/', $url_insert) . '/' . $file;
     
     //Si la carpeta no existe, la creamos
     if (!file_exists($url_insert)) {
         mkdir($url_insert, 0777, true);
     };

     move_uploaded_file($url_temp, $url_target);
       
    
    
     //movemos el archivo de la carpeta temporal a la carpeta objetivo y verificamos si fue exitoso
   
     $ruta_final=htmlspecialchars(basename($file));

        $actualizar->actualizarCurso(
            $id_curso,$nombre_curso,$estado_curso,$mensualidad_curso,$iva_curso,$id_fkinstructor_curso,$id_fksucursal_curso,$duracion_mes_curso,$cuota_entrada_curso,$cupos_curso,$fecha_inicio_curso,$fecha_fin_curso,$imagen,$precio_curso,$horas_curso,$ruta_final
            
            );
       
        
    }
    else{
       
            $imagen="";$ruta_final="";
            $actualizar->actualizarCurso(
                $id_curso,$nombre_curso,$estado_curso,$mensualidad_curso,$iva_curso,$id_fkinstructor_curso,$id_fksucursal_curso,$duracion_mes_curso,$cuota_entrada_curso,$cupos_curso,$fecha_inicio_curso,$fecha_fin_curso,$imagen,$precio_curso,$horas_curso,$ruta_final
                
                );

    }
   
}


?>
