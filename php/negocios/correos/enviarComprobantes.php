<?php  
if(!isset($_SESSION)){
    session_start();

	 
}

require_once  ("../../../php/clases/correos/correos.php");
require_once  ("../../../php/clases/pdf/crearcomprobante.php");

$id_orden = $_POST['id_orden'];
$id_inscripcion = $_POST['id_inscripcion'];
$id_usuario = $_SESSION['id_usuario'];

$crearpdf = new metodosCrear();
$crearpdf ->crearPdf($id_orden,$id_usuario,$id_inscripcion);


$enviar= new metodosCorreos();
$enviar->enviarCorreoComprobantes(
    $id_orden );

?>
