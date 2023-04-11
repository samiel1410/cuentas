<?php
require_once ("../../../php/base/db.php");
class metodosCuentasCobrar
{

    public function insertarCuentaCobrar( 
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
    $fecha_creacion_otra_cuenta_por_cobrar)
    {
      
        $conn=conexion();


        //Recuperar maximo

        $query_maximo = "SELECT max(numero_otra_cuenta_cobrar) AS maximo from otra_cuenta_por_cobrar  ";
        $maximo= mysqli_query($conn,$query_maximo) or die(mysqli_error($conn));
        $vals = mysqli_fetch_array($maximo);

        $dato_maximo =  $vals['maximo'] +1;


        $query = "INSERT INTO otra_cuenta_por_cobrar (
                
                numero_otra_cuenta_cobrar,
                fecha_emision_otra_cuenta_cobrar,
                numero_documento_otra_cuenta_cobrar,
                monto_otra_cuenta_cobrar,
                obs_otra_cuenta_cobrar,
                estado_otra_cuenta_cobrar,
                id_fkusuario_otra_cuenta_cobrar,
                id_fkempleado_emisor_otra_cuenta_cobrar,
                id_fkcliente_otra_cuenta_cobrar,
                id_fktipo_documento_otra_cuenta_cobrar,
                id_fksucursal_otra_cuenta_cobrar,
                id_fkcentro_costo_otra_cuenta_cobrar,
                fecha_vcto_otra_cuenta_cobrar,
                fecha_creacion_otra_cuenta_por_cobrar
               
            )
            VALUES(
                
                '$dato_maximo',
                '$fecha_emision_otra_cuenta_cobrar',
                '$numero_documento_otra_cuenta_cobrar',
                '$monto_otra_cuenta_cobrar',
                '$obs_otra_cuenta_cobrar',
                '$estado_otra_cuenta_cobrar',
                '$id_fkusuario_otra_cuenta_cobrar',
                '$id_fkempleado_emisor_otra_cuenta_cobrar',
                '$id_fkcliente_otra_cuenta_cobrar',
                '$id_fktipo_documento_otra_cuenta_cobrar',
                '$id_fksucursal_otra_cuenta_cobrar',
                '$id_fkcentro_costo_otra_cuenta_cobrar',
                '$fecha_vcto_otra_cuenta_cobrar',
                '$fecha_creacion_otra_cuenta_por_cobrar'
               
            
            
            )";

        $insertar= mysqli_query($conn,$query) or die(mysqli_error($conn));
        
        
        
        if ($insertar) {
            $resp = "Ingresado";
            $arry = array(
                "success" => true,
                "respuesta" => $resp
            );
        } else{

            $resp = "No ingresada";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                
            );

        }

        echo json_encode($arry);
    }

    public function actualizarFormaPago($id_forma,$nombre_forma,$numero_cuenta)
    {
    
        $conn=conexion();
        $query = "CALL  `actualizar_forma_pago`($id_forma,$nombre_forma,$numero_cuenta)";
        $actualizar= mysqli_query($conn,$query) or die(mysqli_error($conn));
       
        if ($actualizar) {
            $resp = "Actualizado ";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
         
                
               
            );
        } else{

            $resp = "No actualzada";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                
            );

        }

        echo json_encode($arry);
    }
    
 
    public function eliminarCuentaCobrar($id_otra_cuenta_cobrar)
    {
      
        
        $conn=conexion();
        $query= "delete from  otra_cuenta_por_cobrar  where id_otra_cuenta_cobrar  =$id_otra_cuenta_cobrar ";
        $eliminar= mysqli_query($conn,$query);


        if ($eliminar) {
            $resp = "Eliminado ";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
         
                
               
            );
        } else{

            $resp = "No eliminado";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                
            );

        }

        echo json_encode($arry);
        
        }
    
    

        public function seleccionarCuentasCobrar($inicio, $limite)
    {
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "SELECT id_otra_cuenta_cobrar ,numero_otra_cuenta_cobrar,fecha_emision_otra_cuenta_cobrar,numero_documento_otra_cuenta_cobrar,monto_otra_cuenta_cobrar,obs_otra_cuenta_cobrar,estado_otra_cuenta_cobrar,id_fkusuario_otra_cuenta_cobrar,id_fkempleado_emisor_otra_cuenta_cobrar,id_fkcliente_otra_cuenta_cobrar,id_fktipo_documento_otra_cuenta_cobrar,id_fksucursal_otra_cuenta_cobrar,id_fkcentro_costo_otra_cuenta_cobrar,fecha_vcto_otra_cuenta_cobrar,fecha_creacion_otra_cuenta_por_cobrar from otra_cuenta_por_cobrar  where 1=1";
        
       
        $sql=mysqli_query($conn,$query);
       
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Cuentas por Cobrar";
        $i=0;

        while ($vals = mysqli_fetch_array($sql)) {
          
            
            $data[$i]['id_otra_cuenta_cobrar']=$vals['id_otra_cuenta_cobrar'];
            $data[$i]['numero_otra_cuenta_cobrar']=$vals['numero_otra_cuenta_cobrar'];
            $data[$i]['fecha_emision_otra_cuenta_cobrar']=$vals['fecha_emision_otra_cuenta_cobrar'];
            $data[$i]['numero_documento_otra_cuenta_cobrar']=$vals['numero_documento_otra_cuenta_cobrar'];
            $data[$i]['monto_otra_cuenta_cobrar']=$vals['monto_otra_cuenta_cobrar'];
            $data[$i]['obs_otra_cuenta_cobrar']=$vals['obs_otra_cuenta_cobrar'];
            $data[$i]['estado_otra_cuenta_cobrar']=$vals['estado_otra_cuenta_cobrar'];
            $data[$i]['id_fkusuario_otra_cuenta_cobrar']=$vals['id_fkusuario_otra_cuenta_cobrar'];
            $data[$i]['id_fkempleado_emisor_otra_cuenta_cobrar']=$vals['id_fkempleado_emisor_otra_cuenta_cobrar'];
            $data[$i]['id_fkcliente_otra_cuenta_cobrar']=$vals['id_fkcliente_otra_cuenta_cobrar'];
            $data[$i]['id_fktipo_documento_otra_cuenta_cobrar']=$vals['id_fktipo_documento_otra_cuenta_cobrar'];
            $data[$i]['id_fksucursal_otra_cuenta_cobrar']=$vals['id_fksucursal_otra_cuenta_cobrar'];
            $data[$i]['id_fkcentro_costo_otra_cuenta_cobrar']=$vals['id_fkcentro_costo_otra_cuenta_cobrar'];
            $data[$i]['fecha_vcto_otra_cuenta_cobrar']=$vals['fecha_vcto_otra_cuenta_cobrar'];
            $data[$i]['fecha_creacion_otra_cuenta_por_cobrar']=$vals['fecha_creacion_otra_cuenta_por_cobrar'];


            
            
 
         $i++;
           
            
        }
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);

    }

    
}


?>