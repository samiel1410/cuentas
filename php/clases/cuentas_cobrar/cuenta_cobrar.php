<?php
require_once("../../../php/base/db.php");
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
        $fecha_creacion_otra_cuenta_por_cobrar
    ) {

        $conn = conexion();


        //Recuperar maximo

        $query_maximo = "SELECT max(numero_otra_cuenta_cobrar) AS maximo from otra_cuenta_por_cobrar  ";
        $maximo = mysqli_query($conn, $query_maximo) or die(mysqli_error($conn));
        $vals = mysqli_fetch_array($maximo);

        $dato_maximo =  $vals['maximo'] + 1;


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

        $insertar = mysqli_query($conn, $query) or die(mysqli_error($conn));



        if ($insertar) {
            $resp = "Ingresado";
            $arry = array(
                "success" => true,
                "respuesta" => $resp
            );
        } else {

            $resp = "No ingresada";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,

            );
        }

        echo json_encode($arry);
    }

    public function actualizarCuentaCobrar(
        $id_otra_cuenta_cobrar,
        $fecha_emision_otra_cuenta_cobrar,
        $monto_otra_cuenta_cobrar,
        $numero_documento_otra_cuenta_cobrar,
        $obs_otra_cuenta_cobrar,
        $id_fkcliente_otra_cuenta_cobrar,
        $id_fktipo_documento_otra_cuenta_cobrar,
        $id_fksucursal_otra_cuenta_cobrar,
        $id_fkcentro_costo_otra_cuenta_cobrar,
        $fecha_vcto_otra_cuenta_cobrar
    ) 
    
    {

        $conn = conexion();
        $query = "update otra_cuenta_por_cobrar SET 
        fecha_emision_otra_cuenta_cobrar='$fecha_emision_otra_cuenta_cobrar',
        monto_otra_cuenta_cobrar ='$monto_otra_cuenta_cobrar',
        obs_otra_cuenta_cobrar='$obs_otra_cuenta_cobrar',
        numero_documento_otra_cuenta_cobrar='$numero_documento_otra_cuenta_cobrar',
        id_fkcliente_otra_cuenta_cobrar='$id_fkcliente_otra_cuenta_cobrar',
        id_fktipo_documento_otra_cuenta_cobrar='$id_fktipo_documento_otra_cuenta_cobrar',
        id_fksucursal_otra_cuenta_cobrar='$id_fksucursal_otra_cuenta_cobrar',
        id_fkcentro_costo_otra_cuenta_cobrar='$id_fkcentro_costo_otra_cuenta_cobrar',
        fecha_vcto_otra_cuenta_cobrar='$fecha_vcto_otra_cuenta_cobrar'
        
                            
        
        where id_otra_cuenta_cobrar=$id_otra_cuenta_cobrar";
        $actualizar = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if ($actualizar) {
            $resp = "Actualizado ";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,



            );
        } else {

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


        $conn = conexion();
        $query = "delete from  otra_cuenta_por_cobrar  where id_otra_cuenta_cobrar  =$id_otra_cuenta_cobrar ";
        $eliminar = mysqli_query($conn, $query);


        if ($eliminar) {
            $resp = "Eliminado ";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,



            );
        } else {

            $resp = "No eliminado";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,

            );
        }

        echo json_encode($arry);
    }



    public function seleccionarCuentasCobrar($inicio, $limite,$periodo,$fecha_start,$fecha_end,$observacion,$numero)
    {
        $conn = conexion();
        $response = new stdClass();
        $data = array();
        $query = "SELECT id_otra_cuenta_cobrar ,nombre_cliente,numero_otra_cuenta_cobrar,fecha_emision_otra_cuenta_cobrar,numero_documento_otra_cuenta_cobrar,monto_otra_cuenta_cobrar,obs_otra_cuenta_cobrar,estado_otra_cuenta_cobrar,id_fkusuario_otra_cuenta_cobrar,id_fkempleado_emisor_otra_cuenta_cobrar,id_fkcliente_otra_cuenta_cobrar,id_fktipo_documento_otra_cuenta_cobrar,id_fksucursal_otra_cuenta_cobrar,id_fkcentro_costo_otra_cuenta_cobrar,fecha_vcto_otra_cuenta_cobrar,fecha_creacion_otra_cuenta_por_cobrar,nombre_documento_asiento_detalle from otra_cuenta_por_cobrar, cliente, documento_asiento_detalle  where id_fkcliente_otra_cuenta_cobrar = cliente.id_cliente  AND id_fktipo_documento_otra_cuenta_cobrar =  documento_asiento_detalle.id_documento_asiento_detalle";

        
        if($periodo!=0  ){

  
        

            $query .=" AND fecha_emision_otra_cuenta_cobrar BETWEEN '2023-$periodo-01' AND '2023-$periodo-31'";
         


            
           
        };


        if($fecha_start!="" || $fecha_end!= ""){
            $query .=" AND fecha_emision_otra_cuenta_cobrar BETWEEN '$fecha_start' AND '$fecha_end'";

        }

        if($observacion!=""){
       
            $query .=" AND obs_otra_cuenta_cobrar LIKE '%$observacion%'";
        };


        if($numero!=""){
       
            $query .=" AND numero_otra_cuenta_cobrar LIKE '%$numero%'";
        };
        

       
        
        $sql = mysqli_query($conn, $query);


        $total = mysqli_num_rows($sql);
        $response->success = true;
        $response->total = $total;
        $response->mensaje = "Cuentas por Cobrar";
        $i = 0;

        while ($vals = mysqli_fetch_array($sql)) {


            $data[$i]['id_otra_cuenta_cobrar'] = $vals['id_otra_cuenta_cobrar'];
            $data[$i]['numero_otra_cuenta_cobrar'] = $vals['numero_otra_cuenta_cobrar'];
            $data[$i]['fecha_emision_otra_cuenta_cobrar'] = $vals['fecha_emision_otra_cuenta_cobrar'];
            $data[$i]['numero_documento_otra_cuenta_cobrar'] = $vals['numero_documento_otra_cuenta_cobrar'];
            $data[$i]['monto_otra_cuenta_cobrar'] = $vals['monto_otra_cuenta_cobrar'];
            $data[$i]['obs_otra_cuenta_cobrar'] = $vals['obs_otra_cuenta_cobrar'];
            $data[$i]['estado_otra_cuenta_cobrar'] = $vals['estado_otra_cuenta_cobrar'];
            $data[$i]['id_fkusuario_otra_cuenta_cobrar'] = $vals['id_fkusuario_otra_cuenta_cobrar'];
            $data[$i]['id_fkempleado_emisor_otra_cuenta_cobrar'] = $vals['id_fkempleado_emisor_otra_cuenta_cobrar'];
            $data[$i]['id_fkcliente_otra_cuenta_cobrar'] = $vals['id_fkcliente_otra_cuenta_cobrar'];
            $data[$i]['id_fktipo_documento_otra_cuenta_cobrar'] = $vals['id_fktipo_documento_otra_cuenta_cobrar'];
            $data[$i]['id_fksucursal_otra_cuenta_cobrar'] = $vals['id_fksucursal_otra_cuenta_cobrar'];
            $data[$i]['id_fkcentro_costo_otra_cuenta_cobrar'] = $vals['id_fkcentro_costo_otra_cuenta_cobrar'];
            $data[$i]['fecha_vcto_otra_cuenta_cobrar'] = $vals['fecha_vcto_otra_cuenta_cobrar'];
            $data[$i]['fecha_creacion_otra_cuenta_por_cobrar'] = $vals['fecha_creacion_otra_cuenta_por_cobrar'];

            $data[$i]['nombre_cliente'] = $vals['nombre_cliente'];
            $data[$i]['nombre_documento_asiento_detalle'] = $vals['nombre_documento_asiento_detalle'];






            $i++;
        }
        $response->data = array_slice($data, $inicio, $limite);
        echo json_encode($response);
    }
}
