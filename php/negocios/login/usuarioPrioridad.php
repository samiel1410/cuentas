<?php
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/login/login.php");
$correo = isset($_POST['usuario']) ? $_POST['usuario'] : $_GET['usuario'];
$clave =isset($_POST['pass']) ? $_POST['pass'] : $_GET['pass'];

$ver= new metodoLogin();
$ver->prioridad($correo,$clave);





?>