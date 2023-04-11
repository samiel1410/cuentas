<?php  
if(!isset($_SESSION)){
    session_start();
}
require_once  ("../../../php/clases/cuentas_cobrar/cuenta_cobrar.php");
$id_otra_cuenta_cobrar =$_POST['id_otra_cuenta_cobrar'];



$fecha_emision_otra_cuenta_cobrar=$_POST['fecha_emision_otra_cuenta_cobrar'];



$monto_otra_cuenta_cobrar=$_POST['monto_otra_cuenta_cobrar']; 
if(isset($_POST['numero_documento_otra_cuenta_cobrar'])) {

    $numero_documento_otra_cuenta_cobrar=$_POST['numero_documento_otra_cuenta_cobrar'];
}else{
    $numero_documento_otra_cuenta_cobrar =0;
}


$estado_otra_cuenta_cobrar='NO COBRADA';
//sessionES
$id_fkusuario_otra_cuenta_cobrar=1;
$id_fkempleado_emisor_otra_cuenta_cobrar=1;
//
$obs_otra_cuenta_cobrar= $_POST['obs_otra_cuenta_cobrar'];
$id_fkcliente_otra_cuenta_cobrar=$_POST['id_fkcliente_otra_cuenta_cobrar'];
$id_fktipo_documento_otra_cuenta_cobrar=$_POST['id_fktipo_documento_otra_cuenta_cobrar'];
$id_fksucursal_otra_cuenta_cobrar=$_POST['id_fksucursal_otra_cuenta_cobrar'];
$id_fkcentro_costo_otra_cuenta_cobrar=$_POST['id_fkcentro_costo_otra_cuenta_cobrar'];
$fecha_vcto_otra_cuenta_cobrar=$_POST['fecha_vcto_otra_cuenta_cobrar'];
$fecha_creacion_otra_cuenta_por_cobrar =date('Y-m-d H:i:s');





$datos= new metodosCuentasCobrar();
if($id_otra_cuenta_cobrar ==""){
    $datos->insertarCuentaCobrar(
              
                
                $fecha_emision_otra_cuenta_cobrar,
                $numero_documento_otra_cuenta_cobrar,
                $monto_otra_cuenta_cobrar,
                $obs_otra_cuenta_cobrar,
                $estado_otra_cuenta_cobrar,
                $id_fkusuario_otra_cuenta_cobrar,
                $id_fkempleado_emisor_otra_cuenta_cobrar,
                $id_fkcliente_otra_cuenta_cobrar,
                $id_fktipo_documento_otra_cuenta_cobrar,
                $id_fksucursal_otra_cuenta_cobrar,
                $id_fkcentro_costo_otra_cuenta_cobrar,
                $fecha_vcto_otra_cuenta_cobrar,
                $fecha_creacion_otra_cuenta_por_cobrar
               
        
        );
    
}else{
    $datos->actualizarCuentaCobrar(
        $id_instructor,$nombre_instructor, $apellido_instructor,$telefono_instructor,$celular_instructor ,$direccion_instructor,$titulo_instructor,$estado_instructor,$correo_instructor,$cedula_instructor,$ciudad_instructor,$categoria_instructor
        
        );
    
}






?>




