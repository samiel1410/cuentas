<?php  

session_start();
require_once  ("../../../php/clases/inscripciones/inscripcion.php");

$id_inscripcion=$_POST['id_inscripcion'];



$certificado=addslashes(file_get_contents($_FILES['certificado_inscripcion']['tmp_name']));


$archivo = $_FILES["certificado_inscripcion"]["tmp_name"];
$tamanio = $_FILES["certificado_inscripcion"]["size"];
$nombre = $_FILES["certificado_inscripcion"]["name"];

if(!empty($archivo)){
    $fp = fopen($archivo, "rb");
    $contenido = fread($fp, $tamanio);
    fclose($fp);

}
$id_usuario = $_SESSION['id_usuario'];

$subir= new metodoInscripcion();
$subir->subirCertificado(
   $id_inscripcion,$certificado,$id_usuario
  
);

?>
