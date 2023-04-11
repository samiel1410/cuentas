<?php  

require_once  ("../../../php/clases/correos/correos.php");


$enviar= new metodosCorreos();
$enviar->enviarCorreoUsuario();

?>
