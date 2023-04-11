
<?php
require_once ("../../../php/base/db.php");
class metodosComprobante
{

    public function insertarComprobante( $id_fkforma_pago_comprobante,$concepto_comprobante,$id_fkusuario_comprobante,$id_fksucursal_comprobante,$abono_comprobante,$id_fkorden_pedido_comprobante)
    {
      
        $conn=conexion();

        $id_orden_query = "SELECT MAX(id_comprobante )  FROM comprobante_cobro";
        $numero_comproabante=  mysqli_query($conn, $id_orden_query) or die(mysqli_error($conn));
        $numero =  mysqli_fetch_array($numero_comproabante);
       
        $dato = $numero[0]+1; 


        $query_comprobar =  "SELECT SUM(abono_comprobante) AS total  FROM comprobante_cobro WHERE id_fkorden_pedido_comprobante =$id_fkorden_pedido_comprobante and estado_comprobante =0 ";
        $comporbar_in =mysqli_query($conn, $query_comprobar) or die(mysqli_error($conn));
        $datos =mysqli_fetch_array($comporbar_in);

        $total=$datos['total'];

        if($total==NULL)
{
    $total =0;
}        
      


$query_total_orden=  "SELECT total_orden_pedido  FROM orden_pedido WHERE id_orden_pedido =$id_fkorden_pedido_comprobante  ";
$total_orden =mysqli_query($conn, $query_total_orden) or die(mysqli_error($conn));
$vals_total =mysqli_fetch_array($total_orden);

$total_orden=$vals_total['total_orden_pedido'];


$total_final = $total_orden - $total;
       
    
        if($abono_comprobante>$total_final){
            $resp = "Monto Superior a total a pagar";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "tipo" => 5
            );

            echo json_encode($arry);

            

        }
        else{

            date_default_timezone_set('America/Mexico_City');

        $fechaActual = date("Y-m-d");
            $query = "CALL  `insertar_comprobante`('$id_fkforma_pago_comprobante','$concepto_comprobante','$id_fkusuario_comprobante','$id_fksucursal_comprobante','$abono_comprobante','$id_fkorden_pedido_comprobante','$fechaActual', '0','$dato')";

            $insertar= mysqli_query($conn,$query) or die(mysqli_error($conn));
            
            
           
            if ($insertar) {
                $resp = "Comprobante creado";
                $arry = array(
                    "success" => true,
                    "respuesta" => $resp,
                    "tipo" => 0
                );
            } else {
                $resp = "No Creada";
    
                $arry = array(
                    "success" => False,
                    "respuesta" => $resp,
                    "tipo" => 0
                );
            }
    
            echo json_encode($arry);

        }







        




    

    }

    public function actualizarComprobante($id_comprobante,$id_fkforma_pago_comprobante,$concepto_comprobante,$fecha_creacion_comprobante,$fecha_cobro_comprobante,$id_fkusuario_comprobante,$id_fksucursal_comprobante,$abono_comprobante,$id_fkorden_pedido_comprobante)
    {
    
        $conn=conexion();
        $query = "CALL  `actualizar_comprobante`($id_comprobante,$id_fkforma_pago_comprobante,$concepto_comprobante,$fecha_creacion_comprobante,$fecha_cobro_comprobante,$id_fkusuario_comprobante,$id_fksucursal_comprobante,$abono_comprobante,$id_fkorden_pedido_comprobante)";
        $actualizar= mysqli_query($conn,$query);
       
        if ($actualizar)
            return 1;
        else
            return 0;
    }
    
 
    public function eliminarComprobante($id_comprobante)
    {
      
        echo "Ingreso elimnado";
        $conn=conexion();
        $query= "CALL  eliminar_alumno($id_comprobante);";
        $eliminar= mysqli_query($conn,$query);
        
      
               
        }
    
    

    public function seleccionarComprobantePaginado($inicio, $limite,$id_orden)
    {
        $conn=conexion();
       
        $response = new stdClass();
        $data = Array();
        $query = "select id_comprobante,id_fkforma_pago_comprobante ,concepto_comprobante ,fecha_creacion_comprobante ,fecha_cobro_comprobante,id_fkusuario_comprobante,id_fksucursal_comprobante,abono_comprobante,id_fkorden_pedido_comprobante,estado_comprobante,numero_comprobante ,forma_pago.nombre_forma from comprobante_cobro ,forma_pago where comprobante_cobro.id_fkorden_pedido_comprobante =$id_orden AND comprobante_cobro.id_fkforma_pago_comprobante= forma_pago.id_forma ";

        $sql=mysqli_query($conn,$query);
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Comprobantes";
        $i=0;

        while ($vals = mysqli_fetch_array($sql)) {
          
            $data[$i]['id_comprobante'] = $vals['id_comprobante'];
            $data[$i]['id_fkforma_pago_comprobante'] = $vals['id_fkforma_pago_comprobante'];
            $data[$i]['concepto_comprobante'] = $vals['concepto_comprobante'];
            $data[$i]['fecha_creacion_comprobante'] = $vals['fecha_creacion_comprobante'];
            $data[$i]['fecha_cobro_comprobante'] = $vals['fecha_cobro_comprobante'];
            $data[$i]['id_fkusuario_comprobante'] = $vals['id_fkusuario_comprobante'];
            $data[$i]['id_fksucursal_comprobante'] = $vals['id_fksucursal_comprobante'];
            $data[$i]['abono_comprobante'] = $vals['abono_comprobante'];
            $data[$i]['id_fkorden_pedido_comprobante'] = $vals['id_fkorden_pedido_comprobante'];
          

            if ($vals['estado_comprobante'] == 1) {
                $data[$i]['nombre_estado_comprobante'] = $vals['nombre_estado_comprobante'] = 'ANULADA';
                $data[$i]['estado_comprobante'] = $vals['estado_comprobante'] = 1;
            } elseif($vals['estado_comprobante'] ==0 ) {
                $data[$i]['nombre_estado_comprobante'] = $vals['nombre_estado_comprobante'] = 'COBRADO';
                $data[$i]['estado_comprobante'] = $vals['estado_comprobante'] = 0;
            }
            $data[$i]['numero_comprobante'] = $vals['numero_comprobante'];
            $data[$i]['nombre_forma'] = $vals['nombre_forma'];


            $i++;  
            
        }
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);

    }


    public function anularComporbantes($id_orden){

        
        $conn=conexion();
        $query= "UPDATE comprobante_cobro SET comprobante_cobro.estado_comprobante =1 where comprobante_cobro.id_fkorden_pedido_comprobante = $id_orden; "; 
        $anular=mysqli_query($conn,$query)  or die(mysqli_error($conn));
     
            if ($anular) {
                $resp = "Comprobanes Anulados";
                $arry = array(
                    "success" => true,
                    "respuesta" => $resp,
                    "tipo" => 0
                );
            } else {
                $resp = "No anualdos";
    
                $arry = array(
                    "success" => False,
                    "respuesta" => $resp,
                    "tipo" => 0
                );
            }

            echo json_encode($arry);

    }

    public function anularUnComporbante($id_comprobante){


        $conn=conexion();
        $query= "UPDATE comprobante_cobro SET comprobante_cobro.estado_comprobante =1 where comprobante_cobro.id_comprobante = $id_comprobante; "; 

      
        $anular=mysqli_query($conn,$query)  or die(mysqli_error($conn));
     
            if ($anular) {
                $resp = "Comprobante Anulado";
                $arry = array(
                    "success" => true,
                    "respuesta" => $resp,
                    "tipo" => 0
                );
            } else {
                $resp = "No anualdo";
    
                $arry = array(
                    "success" => False,
                    "respuesta" => $resp,
                    "tipo" => 0
                );
            }

            echo json_encode($arry);

    }

    
}


?>