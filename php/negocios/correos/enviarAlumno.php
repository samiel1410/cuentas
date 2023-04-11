<?php  
if(!isset($_SESSION)){
    session_start();
}
require_once  ("../../../php/clases/correos/correos.php");


$enviar= new metodosCorreos();
$enviar->enviarCorreoAlumno();

?>
