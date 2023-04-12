<?php
require_once("../../../php/base/db.php");
class metodosCuentasPagar
{

    public function insertarCuentaPagar(
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
    ) {

        $conn = conexion();


        //Recuperar maximo

        $query_maximo = "SELECT max(numero_otra_cuenta_pagar) AS maximo from otra_cuenta_por_pagar  ";
        $maximo = mysqli_query($conn, $query_maximo) or die(mysqli_error($conn));
        $vals = mysqli_fetch_array($maximo);

        $dato_maximo =  $vals['maximo'] + 1;


        $query = "INSERT INTO otra_cuenta_por_pagar (
                
                numero_otra_cuenta_pagar,
                fecha_emision_otra_cuenta_pagar,
                numero_documento_otra_cuenta_pagar,
                monto_otra_cuenta_pagar,
                obs_otra_cuenta_pagar,
                estado_otra_cuenta_pagar,
                id_fkusuario_otra_cuenta_pagar,
                id_fkempleado_emisor_otra_cuenta_pagar,
                id_fkproveedor_otra_cuenta_pagar,
                id_fktipo_documento_otra_cuenta_pagar,
                id_fksucursal_otra_cuenta_pagar,
                id_fkcentro_costo_otra_cuenta_pagar,
                fecha_vcto_otra_cuenta_pagar,
                fecha_creacion_otra_cuenta_por_pagar
               
            )
            VALUES(
                
                '$dato_maximo',
                '$fecha_emision_otra_cuenta_pagar',
                '$numero_documento_otra_cuenta_pagar',
                '$monto_otra_cuenta_pagar',
                '$obs_otra_cuenta_pagar',
                '$estado_otra_cuenta_pagar',
                '$id_fkusuario_otra_cuenta_pagar',
                '$id_fkempleado_emisor_otra_cuenta_pagar',
                '$id_fkproveedor_otra_cuenta_pagar',
                '$id_fktipo_documento_otra_cuenta_pagar',
                '$id_fksucursal_otra_cuenta_pagar',
                '$id_fkcentro_costo_otra_cuenta_pagar',
                '$fecha_vcto_otra_cuenta_pagar',
                '$fecha_creacion_otra_cuenta_por_pagar'
               
            
            
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

    public function actualizarCuentaPagar(
        $id_otra_cuenta_pagar,
        $fecha_emision_otra_cuenta_pagar,
        $monto_otra_cuenta_pagar,
        $numero_documento_otra_cuenta_pagar,
        $obs_otra_cuenta_pagar,
        $id_fkproveedor_otra_cuenta_pagar,
        $id_fktipo_documento_otra_cuenta_pagar,
        $id_fksucursal_otra_cuenta_pagar,
        $id_fkcentro_costo_otra_cuenta_pagar,
        $fecha_vcto_otra_cuenta_pagar
    ) 
    
    {

        $conn = conexion();
        $query = "update otra_cuenta_por_pagar SET 
        fecha_emision_otra_cuenta_pagar='$fecha_emision_otra_cuenta_pagar',
        monto_otra_cuenta_pagar ='$monto_otra_cuenta_pagar',
        obs_otra_cuenta_pagar='$obs_otra_cuenta_pagar',
        numero_documento_otra_cuenta_pagar='$numero_documento_otra_cuenta_pagar',
        id_fkproveedor_otra_cuenta_pagar='$id_fkproveedor_otra_cuenta_pagar',
        id_fktipo_documento_otra_cuenta_pagar='$id_fktipo_documento_otra_cuenta_pagar',
        id_fksucursal_otra_cuenta_pagar='$id_fksucursal_otra_cuenta_pagar',
        id_fkcentro_costo_otra_cuenta_pagar='$id_fkcentro_costo_otra_cuenta_pagar',
        fecha_vcto_otra_cuenta_pagar='$fecha_vcto_otra_cuenta_pagar'
        
                            
        
        where id_otra_cuenta_pagar=$id_otra_cuenta_pagar";
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


    public function eliminarCuentaPagar($id_otra_cuenta_pagar)
    {


        $conn = conexion();
        $query = "delete from  otra_cuenta_por_pagar  where id_otra_cuenta_pagar  =$id_otra_cuenta_pagar ";
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



    public function seleccionarCuentasPagar($inicio, $limite,$periodo,$fecha_start,$fecha_end,$observacion,$numero,$estado,$sucursal,$departamento)
    {
        $conn = conexion();
        $response = new stdClass();
        $data = array();
        $query = "SELECT id_otra_cuenta_pagar ,nombre_sucursal,nombre_centro_costo,nombre_proveedor,numero_otra_cuenta_pagar,numero_otra_cuenta_pagar,fecha_emision_otra_cuenta_pagar,numero_documento_otra_cuenta_pagar,monto_otra_cuenta_pagar,obs_otra_cuenta_pagar,estado_otra_cuenta_pagar,id_fkusuario_otra_cuenta_pagar,id_fkempleado_emisor_otra_cuenta_pagar,id_fkproveedor_otra_cuenta_pagar,id_fktipo_documento_otra_cuenta_pagar,id_fksucursal_otra_cuenta_pagar,id_fkcentro_costo_otra_cuenta_pagar,fecha_vcto_otra_cuenta_pagar,fecha_creacion_otra_cuenta_por_pagar,nombre_documento_asiento_detalle from otra_cuenta_por_pagar, proveedor, documento_asiento_detalle, sucursal ,centro_costo where id_fkproveedor_otra_cuenta_pagar = proveedor.id_proveedor  AND id_fktipo_documento_otra_cuenta_pagar =  documento_asiento_detalle.id_documento_asiento_detalle AND id_fksucursal_otra_cuenta_pagar = sucursal.id_sucursal AND id_fkcentro_costo_otra_cuenta_pagar = centro_costo.id_centro_costo";

        
        if($periodo!=0  ){
            $query .=" AND fecha_emision_otra_cuenta_pagar BETWEEN '2023-$periodo-01' AND '2023-$periodo-31'";
   
        };

        if($sucursal!=""  ){
            $query .=" AND id_fksucursal_otra_cuenta_pagar = $sucursal";
   
        };


        if($fecha_start!="" || $fecha_end!= ""){
            $query .=" AND fecha_emision_otra_cuenta_pagar BETWEEN '$fecha_start' AND '$fecha_end'";

        }

        if($observacion!=""){
       
            $query .=" AND obs_otra_cuenta_pagar LIKE '%$observacion%'";
        };


        if($numero!=""){
       
            $query .=" AND numero_otra_cuenta_pagar LIKE '%$numero%'";
        };

        if($estado!=""){
       
            $query .=" AND estado_otra_cuenta_pagar = '$estado'";
        };

        if($departamento!=""){
       
            $query .=" AND id_fkcentro_costo_otra_cuenta_pagar = '$departamento'";
        };
        

        
      
        $sql = mysqli_query($conn, $query);


        $total = mysqli_num_rows($sql);
        $response->success = true;
        $response->total = $total;
        $response->mensaje = "Cuentas por pagar";
        $i = 0;

        while ($vals = mysqli_fetch_array($sql)) {


            $data[$i]['id_otra_cuenta_pagar'] = $vals['id_otra_cuenta_pagar'];
            $data[$i]['numero_otra_cuenta_pagar'] = $vals['numero_otra_cuenta_pagar'];
            $data[$i]['fecha_emision_otra_cuenta_pagar'] = $vals['fecha_emision_otra_cuenta_pagar'];
            $data[$i]['numero_documento_otra_cuenta_pagar'] = $vals['numero_documento_otra_cuenta_pagar'];
            $data[$i]['monto_otra_cuenta_pagar'] = $vals['monto_otra_cuenta_pagar'];
            $data[$i]['obs_otra_cuenta_pagar'] = $vals['obs_otra_cuenta_pagar'];
            $data[$i]['estado_otra_cuenta_pagar'] = $vals['estado_otra_cuenta_pagar'];
            $data[$i]['id_fkusuario_otra_cuenta_pagar'] = $vals['id_fkusuario_otra_cuenta_pagar'];
            $data[$i]['id_fkempleado_emisor_otra_cuenta_pagar'] = $vals['id_fkempleado_emisor_otra_cuenta_pagar'];
            $data[$i]['id_fkproveedor_otra_cuenta_pagar'] = $vals['id_fkproveedor_otra_cuenta_pagar'];
           
            $data[$i]['id_fktipo_documento_otra_cuenta_pagar'] = $vals['id_fktipo_documento_otra_cuenta_pagar'];
            $data[$i]['id_fksucursal_otra_cuenta_pagar'] = $vals['id_fksucursal_otra_cuenta_pagar'];
            $data[$i]['id_fkcentro_costo_otra_cuenta_pagar'] = $vals['id_fkcentro_costo_otra_cuenta_pagar'];
            $data[$i]['fecha_vcto_otra_cuenta_pagar'] = $vals['fecha_vcto_otra_cuenta_pagar'];
            $data[$i]['fecha_creacion_otra_cuenta_por_pagar'] = $vals['fecha_creacion_otra_cuenta_por_pagar'];

            $data[$i]['nombre_proveedor'] = $vals['nombre_proveedor'];
            $data[$i]['nombre_documento_asiento_detalle'] = $vals['nombre_documento_asiento_detalle'];

            $data[$i]['nombre_sucursal'] = $vals['nombre_sucursal'];

            $data[$i]['nombre_centro_costo'] = $vals['nombre_centro_costo'];







            $i++;
        }
        $response->data = array_slice($data, $inicio, $limite);
        echo json_encode($response);
    }



    public function recuperarTotales(){


        $conn = conexion();

        //TOTAL VENCIDO
        $total_vencido = "Select SUM(monto_otra_cuenta_pagar) AS total_vencido from otra_cuenta_por_pagar where fecha_vcto_otra_cuenta_pagar > NOW();  ";
        $sql_total_vencido = mysqli_query($conn, $total_vencido);
        $vals_total = mysqli_fetch_array($sql_total_vencido);
        $total_vencido =  $vals_total['total_vencido'];
        if($total_vencido==NULL){
            $total_vencido=0;
        }

        //TOTAL_NO_VENCIDO

        $total_no_vencido = "Select SUM(monto_otra_cuenta_pagar) AS total_no_vencido from otra_cuenta_por_pagar where fecha_vcto_otra_cuenta_pagar < NOW();  ";
        $sql_total_no_vencido = mysqli_query($conn, $total_no_vencido);
        $vals_no_total = mysqli_fetch_array($sql_total_no_vencido);
        $total_no_vencido =  $vals_no_total['total_no_vencido'];
        if($total_no_vencido==NULL){
            $total_no_vencido=0;
        }


        //TOTAL
        $total = "Select SUM(monto_otra_cuenta_pagar) AS total from otra_cuenta_por_pagar  ";
        $sql_total = mysqli_query($conn, $total);
        $vals_total_to = mysqli_fetch_array($sql_total);
        $total_total =  $vals_total_to['total'];
        if($total_total==NULL){
            $total_total=0;
        }
      
            $resp = "Totales ";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "total_vencido" => $total_vencido,
                "total_no_vencido"=>$total_no_vencido,
                "total"=>$total_total



            );
        

        echo json_encode($arry);

    }
}
