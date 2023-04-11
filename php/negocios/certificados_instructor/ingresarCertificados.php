<?php  
require_once  ("../../../php/clases/certificados_instructor/certificados_instructor.php");

$nombre= (isset($_POST['nombre_certificaciones_militar']) ? $_POST['nombre_certificaciones_militar'] : $_GET['nombre_certificaciones_militar']);
$id_instructor = (isset($_POST['id_fkinstructor_certificaciones_militar']) ? $_POST['id_fkinstructor_certificaciones_militar'] : $_GET['id_fkinstructor_certificaciones_militar']);




$certificado=addslashes(file_get_contents($_FILES['certificado_pdf']['tmp_name']));


$archivo = $_FILES["certificado_pdf"]["tmp_name"];
$tamanio = $_FILES["certificado_pdf"]["size"];


if(!empty($archivo)){
    $fp = fopen($archivo, "rb");
    $contenido = fread($fp, $tamanio);
    fclose($fp);

}

$insertar= new metodosCertificados();
$insertar->insertarCertificado($nombre,$id_instructor,$certificado);
?>
