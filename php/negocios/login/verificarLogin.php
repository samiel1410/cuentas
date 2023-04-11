<?php
if(!isset($_SESSION)){
    session_start();
}

require_once  ("../../../php/clases/login/login.php");

$ver= new metodoLogin();
$ver->verificarLogin();





?>