<?php  
if(!isset($_SESSION)){
    session_start();
}
require_once  ("../../../php/clases/cuentas_pagar/cuenta_pagar.php");
$id_otra_cuenta_pagar =$_POST['id_otra_cuenta_pagar'];
$fecha_emision_otra_cuenta_pagar=$_POST['fecha_emision_otra_cuenta_pagar'];
$monto_otra_cuenta_pagar=$_POST['monto_otra_cuenta_pagar']; 
if(isset($_POST['numero_documento_otra_cuenta_pagar'])) {

    $numero_documento_otra_cuenta_pagar=$_POST['numero_documento_otra_cuenta_pagar'];
}else{
    $numero_documento_otra_cuenta_pagar =0;
}


$estado_otra_cuenta_pagar='NO PAGADA';
//sessionES
$id_fkusuario_otra_cuenta_pagar=1;
$id_fkempleado_emisor_otra_cuenta_pagar=1;
//
$obs_otra_cuenta_pagar= $_POST['obs_otra_cuenta_pagar'];
$id_fkproveedor_otra_cuenta_pagar=$_POST['id_fkproveedor_otra_cuenta_pagar'];
$id_fktipo_documento_otra_cuenta_pagar=$_POST['id_fktipo_documento_otra_cuenta_pagar'];
$id_fksucursal_otra_cuenta_pagar=$_POST['id_fksucursal_otra_cuenta_pagar'];
$id_fkcentro_costo_otra_cuenta_pagar=$_POST['id_fkcentro_costo_otra_cuenta_pagar'];
$fecha_vcto_otra_cuenta_pagar=$_POST['fecha_vcto_otra_cuenta_pagar'];
$fecha_creacion_otra_cuenta_por_pagar =date('Y-m-d H:i:s');





$datos= new metodosCuentasPagar();
if($id_otra_cuenta_pagar ==""){
    $datos->insertarCuentaPagar(
              
                
                $fecha_emision_otra_cuenta_pagar,
                $numero_documento_otra_cuenta_pagar,
                $monto_otra_cuenta_pagar,
                $obs_otra_cuenta_pagar,
                $estado_otra_cuenta_pagar,
                $id_fkusuario_otra_cuenta_pagar,
                $id_fkempleado_emisor_otra_cuenta_pagar,
                $id_fkproveedor_otra_cuenta_pagar,
                $id_fktipo_documento_otra_cuenta_pagar,
                $id_fksucursal_otra_cuenta_pagar,
                $id_fkcentro_costo_otra_cuenta_pagar,
                $fecha_vcto_otra_cuenta_pagar,
                $fecha_creacion_otra_cuenta_por_pagar
               
        
        );
    
}else{
    $datos->actualizarCuentaPagar(
        $id_otra_cuenta_pagar,
        $fecha_emision_otra_cuenta_pagar,
        $monto_otra_cuenta_pagar,
        $numero_documento_otra_cuenta_pagar,
        $obs_otra_cuenta_pagar,
        $id_fkproveedor_otra_cuenta_pagar,
        $id_fktipo_documento_otra_cuenta_pagar,
        $id_fksucursal_otra_cuenta_pagar,
        $id_fkcentro_costo_otra_cuenta_pagar,
        $fecha_vcto_otra_cuenta_pagar,
        
        );
    
}






?>




