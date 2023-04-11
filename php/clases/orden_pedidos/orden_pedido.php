<?php
require_once ("../../../php/base/db.php");
setlocale(LC_TIME, 'spanish');
class metodosOrdenPedido
{

    public function insertarOrdenPedido($fecha_emision_orden_pedido, $fecha_vencimiento_orden_pedido, $id_fkalumno_orden_pedido,$id_fkinscripcion_orden_pedido ,  $subtotal_12_orden_pedido, $subtotal_0_orden_pedido, $subtotal_orden_pedido, $iva_orden_pedido, $descuento_orden_pedido, $total_orden_pedido, $estado_orden_pedido, $observacion_orden_pedido, $tipo_origen_pedido, $motivo_anulacion_orden_pedido, $id_fkusuario_orden, $id_fksucursal_orden , $record)
    
    {
       

      
        $conn=conexion();
        $query = "CALL  `insertar_orden_pedido`('$fecha_emision_orden_pedido', '$fecha_vencimiento_orden_pedido', '$id_fkalumno_orden_pedido','$id_fkinscripcion_orden_pedido' ,  '$subtotal_12_orden_pedido', '$subtotal_0_orden_pedido', '$subtotal_orden_pedido', '$iva_orden_pedido', '$descuento_orden_pedido', '$total_orden_pedido', '$estado_orden_pedido', '$observacion_orden_pedido', '$tipo_origen_pedido', '$motivo_anulacion_orden_pedido', '$id_fkusuario_orden', '$id_fksucursal_orden')";
     



        $insertar = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if ($insertar) {
            $resp = "Orden creado";
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

       


     

        $id_orden_query = "SELECT MAX(id_orden_pedido)  FROM orden_pedido";
        $id_orde_recu=  mysqli_query($conn, $id_orden_query) or die(mysqli_error($conn));
        $id_orden =  mysqli_fetch_array($id_orde_recu);

        $id_orden_final= $id_orden[0];
        $datos = json_decode($record,true);
        

        for ($i=0; $i < count($datos); $i++) { 
            $id_mensualidad = json_encode($datos[$i]['id_mensualidad']);
            $descripcion_orden = json_encode($datos[$i]['concepto_mensualidad']);
            $cantidad_orden_pedido_detalle=json_encode($datos[$i]['cantidad_orden']);
             $precio_orden_pedido_detalle=json_encode($datos[$i]['monto_mensualidad']);
             $total_orden_pedido_detalle=json_encode($datos[$i]['saldo_mensualidad']);

             $query_mensualidad = "CALL `actualizar_mensualidad_orden`($id_mensualidad,$id_orden_final)";
        
            $query_orden_detalle= "CALL  `insertar_orden_pedido_detalle`('$id_orden_final',$descripcion_orden,$cantidad_orden_pedido_detalle,'$iva_orden_pedido','$precio_orden_pedido_detalle',0,'$total_orden_pedido_detalle' ,'$id_fksucursal_orden','$id_fkusuario_orden') ";
           
            $actualizar_mensualidad = mysqli_query($conn, $query_mensualidad) or die(mysqli_error($conn));
            $insertar_detale = mysqli_query($conn, $query_orden_detalle) or die(mysqli_error($conn));
            
        }

        echo json_encode($arry);

        

    }

    public function actualizarOrdenPedido($id_orden_pedido,$fecha_emision_orden_pedido, $fecha_vencimiento_orden_pedido, $id_fkalumno_orden_pedido,  $id_fkinscripcion_orden_pedido, $subtotal_12_orden_pedido, $subtotal_0_orden_pedido, $subtotal_orden_pedido, $iva_orden_pedido, $descuento_orden_pedido, $total_orden_pedido, $estado_orden_pedido, $observacion_orden_pedido, $tipo_origen_pedido, $motivo_anulacion_orden_pedido, $id_fksucursal_orden)
    {
    
        $conn=conexion();
        $query = "CALL  `actualizar_orden_pedido`($id_orden_pedido$fecha_emision_orden_pedido, $fecha_vencimiento_orden_pedido, $id_fkalumno_orden_pedido,  $id_fkinscripcion_orden_pedido, $subtotal_12_orden_pedido, $subtotal_0_orden_pedido, $subtotal_orden_pedido, $iva_orden_pedido, $descuento_orden_pedido, $total_orden_pedido, $estado_orden_pedido, $observacion_orden_pedido, $tipo_origen_pedido, $motivo_anulacion_orden_pedido, $id_fksucursal_orden)";
        $actualizar= mysqli_query($conn,$query)  or die(mysqli_error($conn));
       
        if ($actualizar)
            return 1;
        else
            return 0;
    }
    
 
    public function eliminarOrdenPedido($id_orden_pedido)
    {
      
        echo "Ingreso elimnado";
        $conn=conexion();
        $query= "delete from orden_pedido where id_orden_pedido=$id_orden_pedido";
        $eliminar= mysqli_query($conn,$query);

        }
        
        public function seleccionarMensualidadAlumnoPaginado($inicio, $limite,$inscripcion){
            
            $conn=conexion();
            $response = new stdClass();
            $data = Array();
            $query = "Select id_mensualidad,concepto_mensualidad,numero_cuota_mensualidad,fecha_pago_mensualidad,estado_mensualidad,monto_mensualidad,abonado_mensualidad,saldo_mensualidad from mensualidades where id_fkinscripcion_mensualidad = $inscripcion AND id_fkorden_pedido_mensualidad=0";
            $sql=mysqli_query($conn,$query)  or die(mysqli_error($conn));
            $total=mysqli_num_rows($sql);
            $response->success=true;
            $response->total=$total;
            $response->mensaje="Mensualidades del Alumno";
            $i=0;
            while ($vals = mysqli_fetch_array($sql)) {

                $data[$i]['id_mensualidad'] = $vals['id_mensualidad'];
                $data[$i]['concepto_mensualidad'] = $vals['concepto_mensualidad'];
                $data[$i]['numero_cuota_mensualidad'] = $vals['numero_cuota_mensualidad'];
                $data[$i]['fecha_pago_mensualidad'] = $vals['fecha_pago_mensualidad'];
            

                if($vals['estado_mensualidad']==1){
                    $data[$i]['nombre_estado_mensualidad']=$vals['nombre_estado_mensualidad']='Pagada';
                    $data[$i]['estado_mensualidad']=$vals['estado_mensualidad']=1;
                }
                else{
                    $data[$i]['nombre_estado_mensualidad']=$vals['nombre_estado_mensualidad']='Por Cobrar';
                    $data[$i]['estado_mensualidad']=$vals['estado_mensualidad']=0;
                };


                $data[$i]['monto_mensualidad'] = $vals['monto_mensualidad'];
                $data[$i]['abonado_mensualidad'] = $vals['abonado_mensualidad'];
                $data[$i]['saldo_mensualidad'] = $vals['saldo_mensualidad'];
                $i ++;
            }
            $response->data = array_slice($data, $inicio, $limite);
            echo json_encode($response);
            
        }
        
        
        public function seleccionarAlumnoPedidoPaginado($inicio, $limite,$id_inscripcion) {
            $conn=conexion();
            $response = new stdClass();
            $data = Array();

            $rol=  $_SESSION['rol_usuario'];
        $id_sucursal =  $_SESSION['id_fksucursal_usuario'];

        if($rol==1){

            $query = "SELECT id_inscripcion,id_alumno,imagen_alumno,cedula_alumno,nombre_alumno ,id_instructor,apellido_alumno ,celular_alumno ,nombre_sucursal,cursos.id_fksucursal_curso,correo_alumno,direccion_alumno ,nombre_curso,nombre_instructor, iva_curso from alumnos,cursos,instructores,inscripciones,sucursal,usuarios where id_alumno = inscripciones.id_fkalumno_inscripcion AND inscripciones.id_fkcurso_inscripcion = cursos.id_curso AND cursos.id_fkinstructor_curso = instructores.id_instructor and cursos.id_fksucursal_curso = sucursal.id_sucursal and id_fkusuario_inscripcion=usuarios.id_usuario  AND inscripciones.estado_inscripcion = '1'";


        }
        else{
            $query = "SELECT id_inscripcion,id_alumno,imagen_alumno,cedula_alumno,nombre_alumno ,id_instructor,apellido_alumno ,celular_alumno ,nombre_sucursal,cursos.id_fksucursal_curso,correo_alumno,direccion_alumno ,nombre_curso,nombre_instructor, iva_curso from alumnos,cursos,instructores,inscripciones,sucursal,usuarios where id_alumno = inscripciones.id_fkalumno_inscripcion AND inscripciones.id_fkcurso_inscripcion = cursos.id_curso AND cursos.id_fkinstructor_curso = instructores.id_instructor and cursos.id_fksucursal_curso = sucursal.id_sucursal and id_fkusuario_inscripcion=usuarios.id_usuario  AND inscripciones.estado_inscripcion = '1'  AND id_fksucursal_inscripcion = $id_sucursal";

        }
            if($id_inscripcion!=""){
            
            
                $query .=" AND id_inscripcion = '$id_inscripcion' ";
            };

          

           
            $sql=mysqli_query($conn,$query);
            $total=mysqli_num_rows($sql);
            $response->success=true;
            $response->total=$total;
            $response->mensaje="Alumnos Inscriptos";
            $i=0;
            while ($vals = mysqli_fetch_array($sql)) {
                
                $data[$i]['id_inscripcion'] = $vals['id_inscripcion'];
                $data[$i]['id_alumno'] = $vals['id_alumno'];
                $data[$i]['nombre_alumno'] = $vals['nombre_alumno'];
                $data[$i]['imagen_src'] = 'data:image/jpeg;base64,' . base64_encode($vals['imagen_alumno']) . '';
                $data[$i]['imagen_alumno'] = '<img src="data:image/jpeg;base64,' . base64_encode($vals['imagen_alumno']) . '"/>';
                $data[$i]['apellido_alumno'] = $vals['apellido_alumno'];
                $data[$i]['celular_alumno'] = $vals['celular_alumno'];
                $data[$i]['correo_alumno'] = $vals['correo_alumno'];
                $data[$i]['cedula_alumno'] = $vals['cedula_alumno'];
                $data[$i]['direccion_alumno'] = $vals['direccion_alumno'];
                $data[$i]['nombre_instructor'] = $vals['nombre_instructor'];
                $data[$i]['nombre_sucursal'] = $vals['nombre_sucursal'];
                $data[$i]['id_instructor'] = $vals['id_instructor'];
                $data[$i]['nombre_curso'] = $vals['nombre_curso'];
                $data[$i]['iva_curso'] = $vals['iva_curso'];
               
                
                $i ++;
            }
            $response->data = array_slice($data, $inicio, $limite);
            echo json_encode($response);
 
       } 
    
    

    public function seleccionarOrdenPedidoPaginado($inicio,$limite,$nombre_busqueda,$sucursal_busqueda,$mes,$anio,$fecha_start,$fecha_end)
    {
        $conn=conexion();
        $response = new stdClass();
        $data = Array();

        $rol=  $_SESSION['rol_usuario'];
        $id_sucursal =  $_SESSION['id_fksucursal_usuario'];

        if($rol==1){

            $query = "SELECT id_orden_pedido,fecha_emision_orden_pedido,id_fkalumno_orden_pedido ,orden_pedido.created_at,id_fkusuario_orden_pedido ,id_fkusuario_orden,id_fksucursal_orden , estado_orden_pedido,fecha_vencimiento_orden_pedido,id_fkinscripcion_orden_pedido,subtotal_12_orden_pedido,subtotal_0_orden_pedido ,subtotal_orden_pedido ,iva_orden_pedido ,nombre_alumno,apellido_alumno,nombre_sucursal,descuento_orden_pedido,total_orden_pedido,observacion_orden_pedido,tipo_origen_pedido,motivo_anulacion_orden_pedido from orden_pedido, sucursal, alumnos where orden_pedido.id_fksucursal_orden = sucursal.id_sucursal AND orden_pedido.id_fkalumno_orden_pedido = alumnos.id_alumno";

        }

        else{
            $query = "SELECT id_orden_pedido,fecha_emision_orden_pedido,id_fkalumno_orden_pedido ,orden_pedido.created_at,id_fkusuario_orden_pedido ,id_fkusuario_orden,id_fksucursal_orden , estado_orden_pedido,fecha_vencimiento_orden_pedido,id_fkinscripcion_orden_pedido,subtotal_12_orden_pedido,subtotal_0_orden_pedido ,subtotal_orden_pedido ,iva_orden_pedido ,nombre_alumno,apellido_alumno,nombre_sucursal,descuento_orden_pedido,total_orden_pedido,observacion_orden_pedido,tipo_origen_pedido,motivo_anulacion_orden_pedido from orden_pedido, sucursal, alumnos where orden_pedido.id_fksucursal_orden = sucursal.id_sucursal AND orden_pedido.id_fkalumno_orden_pedido = alumnos.id_alumno AND id_fksucursal_orden = $id_sucursal";

        }



        
        if($nombre_busqueda!=""){
       
            $query .=" AND nombre_alumno LIKE '%$nombre_busqueda%'";
        };
        
        if($sucursal_busqueda!=""){
            
            $query .=" AND id_fksucursal_orden= $sucursal_busqueda";
        };


        if($mes!=0 || $anio != 0){

            $fecha_inicio= $anio.'-'.$mes.'-01';
            $dias_fin = date( 't', strtotime( $fecha_inicio ) );

            $fecha_fin =$anio.'-'.$mes.'-'.$dias_fin;

        

            $query .=" AND fecha_emision_orden_pedido BETWEEN '$fecha_inicio' AND '$fecha_fin'";
         


            
           
        };

        if($fecha_start!="" || $fecha_end!= ""){
            $query .=" AND fecha_emision_orden_pedido BETWEEN '$fecha_start' AND '$fecha_end'";

        }

        $query.=" ORDER BY id_orden_pedido"; 
        $sql=mysqli_query($conn,$query)  or die(mysqli_error($conn));
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Orden de Pedido";
        $i=0;
        $suma=0;
        $j=0;

     

       

       

        while ($vals = mysqli_fetch_array($sql)) {
            $concepto="";
            $concepto_aux="";
            
            $data[$i]['id_orden_pedido']=$vals['id_orden_pedido'];
            $dato_id =$vals['id_orden_pedido'];
            $data[$i]['fecha_emision_orden_pedido']=$vals['fecha_emision_orden_pedido'];
            $data[$i]['fecha_vencimiento_orden_pedido']=$vals['fecha_vencimiento_orden_pedido'];
            $data[$i]['id_fkalumno_orden_pedido']=$vals['id_fkalumno_orden_pedido'];
            $data[$i]['id_fkusuario_orden_pedido']=$vals['id_fkusuario_orden_pedido'];
            $data[$i]['id_fkinscripcion_orden_pedido']=$vals['id_fkinscripcion_orden_pedido'];

            $data[$i]['subtotal_12_orden_pedido']=$vals['subtotal_12_orden_pedido'];
            $data[$i]['subtotal_0_orden_pedido']=$vals['subtotal_0_orden_pedido'];
            $data[$i]['subtotal_orden_pedido']=$vals['subtotal_orden_pedido'];
            $data[$i]['iva_orden_pedido']=$vals['iva_orden_pedido'];
            $data[$i]['descuento_orden_pedido']=$vals['descuento_orden_pedido'];
            $data[$i]['total_orden_pedido']=$vals['total_orden_pedido'];


          
            if ($vals['estado_orden_pedido'] == 1) {
                $data[$i]['nombre_estado_orden'] = $vals['nombre_estado_orden'] = 'COBRADA';
                $data[$i]['estado_orden_pedido'] = $vals['estado_orden_pedido'] = 1;
            } elseif($vals['estado_orden_pedido'] ==0 ) {
                $data[$i]['nombre_estado_orden'] = $vals['nombre_estado_orden'] = 'POR COBRAR';
                $data[$i]['estado_orden_pedido'] = $vals['estado_orden_pedido'] = 0;
            }
            else{
                $data[$i]['nombre_estado_orden'] = $vals['nombre_estado_orden'] = 'ANULADA';
                $data[$i]['estado_orden_pedido'] = $vals['estado_orden_pedido'] = 2;

            }


            $data[$i]['observacion_orden_pedido']=$vals['observacion_orden_pedido'];
            $data[$i]['tipo_origen_pedido']=$vals['tipo_origen_pedido'];
            $data[$i]['motivo_anulacion_orden_pedido']=$vals['motivo_anulacion_orden_pedido'];
            $data[$i]['id_fkusuario_orden']=$vals['id_fkusuario_orden'];
            
            $data[$i]['id_fksucursal_orden']=$vals['id_fksucursal_orden'];
            $data[$i]['nombre_sucursal']=$vals['nombre_sucursal'];

            $data[$i]['nombre_alumno']=$vals['nombre_alumno']. " ".$vals['apellido_alumno'];


            //detalless
            $query_detalles = "Select nombre_orden_pedido_detalle from orden_pedido_detalle where id_fkorden_pedido_detalle = $dato_id ";
            $detalle=mysqli_query($conn,$query_detalles)  or die(mysqli_error($conn));

            
            $query_mensualidad = "Select fecha_pago_mensualidad from mensualidades where id_fkorden_pedido_mensualidad = $dato_id ";
            $mensualidad=mysqli_query($conn,$query_mensualidad)  or die(mysqli_error($conn));
         

            while ($detalles = mysqli_fetch_array($detalle)  and    $meses = mysqli_fetch_array($mensualidad))  {
                $concepto_aux =  $detalles['nombre_orden_pedido_detalle'];
                $mes =  $meses['fecha_pago_mensualidad'];
      
            $concepto .= $concepto_aux. "-".ucfirst(strftime("%B", strtotime($mes)))."<br>";

            }
           
      
            $data[$i]['concepto']=  $concepto;


            //fecha - mensualidad

      
               

            

            
            $query_comprobantes = "SELECT abono_comprobante,estado_comprobante, sum(abono_comprobante) pagado from comprobante_cobro where comprobante_cobro.id_fkorden_pedido_comprobante =$dato_id and comprobante_cobro.estado_comprobante =0";
            $sql2=mysqli_query($conn,$query_comprobantes)  or die(mysqli_error($conn));
            $vals2 = mysqli_fetch_array($sql2);

          

           

           
       

            $data[$i]['pagado']=round($vals['total_orden_pedido'] - $vals2['pagado'], 2);
           
            
          
          
           
            

            
         

                
                
                
             
            $i++;
        
           
            
        }
     
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);

    }


    public function anularOrden($id_orden)
    {
        $conn=conexion();
        $query= "UPDATE orden_pedido SET orden_pedido.estado_orden_pedido =2 where orden_pedido.id_orden_pedido = $id_orden"; 
        $anular=mysqli_query($conn,$query)  or die(mysqli_error($conn));



     
            if ($anular) {
                $resp = "Orden Anulada";
                $arry = array(
                    "success" => true,
                    "respuesta" => $resp,
                    "tipo" => 0,
                    "id_orden" =>$id_orden

                );
            } else {
                $resp = "No anulada";
    
                $arry = array(
                    "success" => False,
                    "respuesta" => $resp,
                    "tipo" => 0,
                    "id_orden" =>$id_orden
                );
            }

            echo json_encode($arry);


        $query_estado= "UPDATE mensualidades SET id_fkorden_pedido_mensualidad =0 where id_fkorden_pedido_mensualidad = $id_orden"; 
        $estado=mysqli_query($conn,$query_estado)  or die(mysqli_error($conn));






        
    }

    public function actualizarEstado($id_orden,$estado,$tipo){

        $conn=conexion();
        $dato=0;

        if($tipo==0){
            $dato=0;
        }

        
        if($tipo==1){
            $dato=1;
        }

        echo $estado;
       
        $query= "UPDATE orden_pedido SET orden_pedido.estado_orden_pedido =$dato where orden_pedido.id_orden_pedido = '$id_orden'"; 

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

    public function verificarComprobantes($id_orden){

        
        $conn=conexion();


        
        $query= "Select id_comprobante from comprobante_cobro where comprobante_cobro.id_fkorden_pedido_comprobante = $id_orden And comprobante_cobro.estado_comprobante = 0"; 

        $verificar=mysqli_query($conn,$query)  or die(mysqli_error($conn));
        $total=mysqli_num_rows($verificar);

     

        if($total>0){
            
            $resp = "Si hay Comprobantes";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
              
                "id_orden" =>$id_orden

            );

        }
     
          
             else {
                $resp = "No hay Comprobantes";
    
                $arry = array(
                    "success" => False,
                    "respuesta" => $resp,
               
                    "id_orden" =>$id_orden
                );
            }

            echo json_encode($arry);

    }


    public function activarMensualidades($id_orden){
              
        $conn=conexion();

        $query= "UPDATE mensualidades SET estado_mensualidad=0 where id_fkorden_pedido_mensualidad= '$id_orden'"; 

        $actualizar=mysqli_query($conn,$query)  or die(mysqli_error($conn));
     
            if ($actualizar) {
                $resp = "Mensualides Actualziadas";
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



    public function seleccionarMensualidadAlumnoPaginadoInsc($inicio,$limite,$inscripcion){


    
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "Select id_mensualidad,concepto_mensualidad,numero_cuota_mensualidad,fecha_pago_mensualidad,estado_mensualidad,monto_mensualidad,abonado_mensualidad,saldo_mensualidad from mensualidades where id_fkinscripcion_mensualidad = $inscripcion ";
        $sql=mysqli_query($conn,$query)  or die(mysqli_error($conn));
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Mensualidades del Alumno";
        $i=0;
        while ($vals = mysqli_fetch_array($sql)) {

            $data[$i]['id_mensualidad'] = $vals['id_mensualidad'];
            $data[$i]['concepto_mensualidad'] = $vals['concepto_mensualidad'];
            $data[$i]['numero_cuota_mensualidad'] = $vals['numero_cuota_mensualidad'];
            $data[$i]['fecha_pago_mensualidad'] = $vals['fecha_pago_mensualidad'];
        

            if($vals['estado_mensualidad']==1){
                $data[$i]['nombre_estado_mensualidad']=$vals['nombre_estado_mensualidad']='Pagada';
                $data[$i]['estado_mensualidad']=$vals['estado_mensualidad']=1;
            }
            else{
                $data[$i]['nombre_estado_mensualidad']=$vals['nombre_estado_mensualidad']='Por Cobrar';
                $data[$i]['estado_mensualidad']=$vals['estado_mensualidad']=0;
            };


            $data[$i]['monto_mensualidad'] = $vals['monto_mensualidad'];
            $data[$i]['abonado_mensualidad'] = $vals['abonado_mensualidad'];
            $data[$i]['saldo_mensualidad'] = $vals['saldo_mensualidad'];
            $i ++;
        }
        $response->data = array_slice($data, $inicio, $limite);
        echo json_encode($response);
        

    }
    
    public function verUltimaOrden(){

        $conn=conexion();
        $response = new stdClass();

        $id_sucursal =  $_SESSION['id_fksucursal_usuario'];
        $id_usuario = $_SESSION['id_usuario'];
        $query = "Select  id_orden_pedido   , total_orden_pedido  from orden_pedido  where id_orden_pedido =  (SELECT MAX(id_orden_pedido) FROM orden_pedido)  AND id_fksucursal_orden = $id_sucursal AND  id_fkusuario_orden=$id_usuario";
        $sql=mysqli_query($conn,$query)  or die(mysqli_error($conn));
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Ultima Orden";
        $i=0;
       $vals = mysqli_fetch_array($sql);

         

        $resp = "Encontrado";
    
                $arry = array(
                    "success" => true,
                    "respuesta" => $resp,
                    "orden" => $vals['id_orden_pedido'],
                    "pagado" =>$vals['total_orden_pedido'],
                );
       
        echo json_encode($arry);


    }
}




?>