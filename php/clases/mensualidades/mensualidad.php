
<?php
require_once ("../../../php/base/db.php");
class metodosMensualidades
{
public function insertarMensualidad(  $id_fkinscripcion_mensualidad,
$id_fkorden_pedido_mensualidad,
$numero_cuota_mensualidad,
$estado_mensualidad,
$fecha_pago_mensualidad,
$concepto_mensualidad,
$monto_mensualidad,
$abonado_mensualidad,
$saldo_mensualidad)
    {
      
        $conn=conexion();
        $query = "CALL  `insertar_mensualidad`('$id_fkinscripcion_mensualidad', '$id_fkorden_pedido_mensualidad', '$concepto_mensualidad','$numero_cuota_mensualidad', '$fecha_pago_mensualidad','$estado_mensualidad','$monto_mensualidad','$abonado_mensualidad','$saldo_mensualidad')";

        $insertar= mysqli_query($conn,$query);
        
        
        if ($insertar) {
            $resp= "Mensualiad Creada";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"tipo" => 0) ;
        } else
        {$resp=  "No Insertado";
        
            $arry =  array("success"=> false ,"respuesta"=>$resp,"tipo" => 0) ;
        }
        echo json_encode($arry);
    }

    public function actualizarMensualidad($id_mensualidad,$abonado_mensualidad,$saldo_mensualidad,$valor)
    {
        
       
        $conn=conexion();
        echo "ABOANDO",$abonado_mensualidad,'Saldo',$saldo_mensualidad,"VALOR",$valor;
        
        $abonado = $abonado_mensualidad + $valor;
        $saldo = $saldo_mensualidad - $valor;
       
 
    
        $query = "CALL  `actualizar_mensualidad`('$id_mensualidad','$abonado','$saldo')";
        $actualizar= mysqli_query($conn,$query) or die(mysqli_error($conn));
        
        echo $query;
       
        if ($actualizar) {
            $resp = "Mensualidad Actualizada";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "tipo" => 1
            );
      
        }
        echo json_encode($arry);
    }
    
 
    public function eliminarMensualidad($id_mensualidad)
    {
      
        echo "Ingreso elimnado";
        $conn=conexion();
        $query= "CALL  eliminar_mensualidad($id_mensualidad);";
        $eliminar= mysqli_query($conn,$query);     
        }
    
    

    public function seleccionarMensualidadPaginado($inicio, $limite)
    {
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "CALL  `ver_mensualidad`()";

        $sql=mysqli_query($conn,$query);
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Mensualidad";
        $i=0;
        while ($vals = mysqli_fetch_array($sql)) {
            $data[$i]['id_mensualidad'] = $vals['id_mensualidad'];
            
            $data[$i]['id_fkinscripcion_mensualidad'] = $vals['id_fkinscripcion_mensualidad'];
            $data[$i]['id_fkorden_pedido_mensualidad'] = $vals['id_fkorden_pedido_mensualidad'];
            $data[$i]['numero_cuota_mensualidad'] = $vals['numero_cuota_mensualidad'];
            $data[$i]['fecha_pago_mensualidad'] = $vals['fecha_pago_mensualidad'];
            $data[$i]['estado_mensualidad'] = $vals['estado_mensualidad'];
            $data[$i]['concepto_mensualidad'] = $vals['concepto_mensualidad'];
            
            if($vals['estado_mensualidad']==1){
                $data[$i]['nombre_estado_mensualidad']=$vals['nombre_estado_mensualidad']='Pagado';
                $data[$i]['estado_mensualidad']=$vals['estado_mensualidad']=1;
            }
            if($vals['estado_mensualidad']==0){
                $data[$i]['nombre_estado_mensualidad']=$vals['nombre_estado_mensualidad']='Por Cobrar';
                $data[$i]['estado_mensualidad']=$vals['estado_mensualidad']=0;
            }
            
            $data[$i]['monto_mensualidad'] = $vals['monto_mensualidad'];
            $data[$i]['abonado_mensualidad'] = $vals['abonado_mensualidad'];
            $data[$i]['saldo_mensualidad'] = $vals['saldo_mensualidad'];
            $data[$i]['created_at'] = $vals['created_at'];

          $i++;
            
        }
        $response->data=array_slice($data, $inicio,$limite);
     
        echo json_encode($response);

    }


    public function actualizarEstadoMensualidades($id_orden,$tipo,$estado){


        $conn=conexion();
        $dato=0;

    

        echo $estado;
       
        $query= "UPDATE mensualidades SET mensualidades.estado_mensualidad = 1 where mensualidades.id_fkorden_pedido_mensualidad='$id_orden'"; 

        $actualizar=mysqli_query($conn,$query)  or die(mysqli_error($conn));
     
            if ($actualizar) {
                $resp = "Estado Actualziado";
                $arry = array(
                    "success" => true,
                    "respuesta" => $resp,
                    "tipo" => 0,
                    "id_orden" =>$id_orden

                );
            } else {
                $resp = "No actualizado";
    
                $arry = array(
                    "success" => False,
                    "respuesta" => $resp,
                    "tipo" => 0,
                    "id_orden" =>$id_orden
                );
            }

            echo json_encode($arry);


    }

    public  function verificarCursoVariable($id_inscripcion){

        $conn=conexion();
    
        $query= "SELECT curso_variable_inscripcion FROM inscripciones WHERE inscripciones.id_inscripcion = $id_inscripcion"; 

        $verificar=mysqli_query($conn,$query)  or die(mysqli_error($conn));

        $vals = mysqli_fetch_array($verificar);
        


        if ($vals['curso_variable_inscripcion'] ==0) {
            $resp = "Curso Definido";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "tipo" => 0
               

            );
        } else {
            $resp = "No definido";

            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                "tipo" => 1
                
            );
        }

        echo json_encode($arry);








    }


    

    
}


?>