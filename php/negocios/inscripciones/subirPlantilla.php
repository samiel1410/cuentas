<?php  

session_start();
require_once  ("../../../php/clases/inscripciones/inscripcion.php");

$id_inscripcion=$_POST['id_inscripcion'];



$certificado=addslashes(file_get_contents($_FILES['plantilla_certificado']['tmp_name']));


$file = $_FILES["plantilla_certificado"]["name"]; //Nombre de nuestro archivo

$url_temp = $_FILES["plantilla_certificado"]["tmp_name"]; //Ruta temporal a donde se carga el archivo 

//dirname(__FILE__) nos otorga la ruta absoluta hasta el archivo en ejecución
$url_insert = dirname(__FILE__) . "/imagenes"; //Carpeta donde subiremos nuestros archivos

//Ruta donde se guardara el archivo, usamos str_replace para reemplazar los "\" por "/"
$url_target = str_replace('\\', '/', $url_insert) . '/' . $file;

//Si la carpeta no existe, la creamos
if (!file_exists($url_insert)) {
    mkdir($url_insert, 0777, true);
};


$subir= new metodoInscripcion();
$subir->subirPlantilla(
  $certificado,$id_inscripcion
);

?>