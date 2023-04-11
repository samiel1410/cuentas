<?php


require_once ("../../../php/base/db.php");
setlocale(LC_TIME, 'spanish');
class metodoInscripcion
{

    public function insertarInscripcion($fecha_inscripcion,$fecha_inicio_inscripcion,$fecha_fin_inscripcion,$estado_inscripcion,$calificacion_inscripcion,$origen_inscripcion,$id_fkalumno_inscripcion,$id_fkcurso_inscripcion,$id_fkusuario_inscripcion,$id_fksucursal_inscripcion,$id_fkinstructor_inscripcion,$precio_total_curso,$estado_uniforme_inscripcion,$condicion_pago_inscripcion,$curso_variable_inscripcion)
    {
      
        $conn=conexion();
       
        $query = "CALL  `insertar_inscripciones`('$fecha_inscripcion','$fecha_inicio_inscripcion','$fecha_fin_inscripcion','$estado_inscripcion','$calificacion_inscripcion','$origen_inscripcion','$id_fkalumno_inscripcion','$id_fkcurso_inscripcion','$id_fkusuario_inscripcion','$id_fksucursal_inscripcion','$id_fkinstructor_inscripcion','$precio_total_curso','$estado_uniforme_inscripcion','$condicion_pago_inscripcion','$curso_variable_inscripcion')";
    
        
        $insertar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
        
        
        if ($insertar) {
            $resp= "Inscripcion Creada";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"tipo" => 0) ;
        } else
        {$resp=  "No Creada";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp,"tipo" => 0) ;
        }
        echo json_encode($arry);


        $query_id_inscripcion ="SELECT MAX(id_inscripcion) AS id FROM  inscripciones";
        $recuperar_id= mysqli_query($conn,$query_id_inscripcion) or  die(mysqli_error($conn));
        $id_inscripcion =  mysqli_fetch_array($recuperar_id);

        $id=$id_inscripcion['id']+1;
        $query_certificado= "CALL `insertar_certificado`('$id')";
        $insertar_certificado= mysqli_query($conn,$query_certificado) or  die(mysqli_error($conn));
    }

    public function actualizarInscripcion($id_inscripcion,$fecha_inscripcion,$fecha_inicio_inscripcion,$fecha_fin_inscripcion,$estado_inscripcion,$calificacion_inscripcion,$origen_inscripcion,$id_fkalumno_inscripcion,$id_fkcurso_inscripcion,$id_fksucursal_inscripcion,$id_fkinstructor_inscripcion,$precio_total_curso,$estado_uniforme_inscripcion)
    {
    
        $conn=conexion();
        $query = "CALL  `actualizar_inscripcion`($id_inscripcion,$fecha_inscripcion,$fecha_inicio_inscripcion,$fecha_fin_inscripcion,$estado_inscripcion,$calificacion_inscripcion,$origen_inscripcion,$id_fkalumno_inscripcion,$id_fkcurso_inscripcion,$id_fksucursal_inscripcion,$id_fkinstructor_inscripcion,$precio_total_curso,$estado_uniforme_inscripcion)";
        $actualizar= mysqli_query($conn,$query) or  die(mysqli_error($conn));;
       
        if ($actualizar) {
            $resp= "Inscripcion  Actualziado";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"tipo" => 0) ;
        } else
        {$resp=  "No actualizada";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp,"tipo" => 0) ;
        }
        echo json_encode($arry);
    }
    
 
    public function eliminarInscripcion($id_inscripcion)
    {
      
        echo "Ingreso elimnado";
        $conn=conexion();
        $query= "CALL  eliminar_inscripcion($id_inscripcion);";
        $eliminar= mysqli_query($conn,$query);
        
      
               
        }
        
        
        public function seleccionarMensualidades($inicio, $limite,$inscripcion){
         
            $conn = conexion();
            
            $response = new stdClass();
            $data = Array();
            $query = "Select id_mensualidad,concepto_mensualidad,id_fkinscripcion_mensualidad,id_fkorden_pedido_mensualidad,numero_cuota_mensualidad,fecha_pago_mensualidad,estado_mensualidad,monto_mensualidad,abonado_mensualidad,saldo_mensualidad from mensualidades where id_fkinscripcion_mensualidad = $inscripcion" ;
            
            
            $sql = mysqli_query($conn, $query) or die(mysqli_error($conn));
            
            $total = mysqli_num_rows($sql);
            $response->success = true;
            $response->total = $total;
            $response->mensaje = "Mensualidades";
            $i = 0;
            while ($vals = mysqli_fetch_array($sql)) {
                $data[$i]['id_mensualidad'] = $vals['id_mensualidad'];
                $data[$i]['concepto_mensualidad'] = $vals['concepto_mensualidad'];
                $data[$i]['numero_cuota_mensualidad'] = $vals['numero_cuota_mensualidad'];
                $data[$i]['fecha_pago_mensualidad'] = $vals['fecha_pago_mensualidad'];

                
            if ($vals['estado_mensualidad'] == 1) {
                $data[$i]['nombre_estado_mensualidad'] = $vals['nombre_estado_mensualidad'] = 'Pagado';
                $data[$i]['estado_mensualidad'] = $vals['estado_mensualidad'] = 1;
            } 
            
            else {
                $data[$i]['nombre_estado_mensualidad'] = $vals['nombre_estado_mensualidad'] = 'Pendiente';
                $data[$i]['estado_mensualidad'] = $vals['estado_mensualidad'] = 0;
            }

                
                $data[$i]['monto_mensualidad'] = $vals['monto_mensualidad'];
                $data[$i]['abonado_mensualidad'] = $vals['abonado_mensualidad'];
                $data[$i]['saldo_mensualidad'] = $vals['saldo_mensualidad'];
                
                $data[$i]['id_fkorden_pedido_mensualidad'] = $vals['id_fkorden_pedido_mensualidad'];
                $data[$i]['id_fkinscripcion_mensualidad'] = $vals['id_fkinscripcion_mensualidad'];


                
                $i ++;
            }
            $response->data = array_slice($data, $inicio, $limite);
            echo json_encode($response);
        }
    
    

        public function seleccionarInscripcionPaginado($inicio,$limite,$id_alumno,$nombre_busqueda,$sucursal_busqueda,$mes,$anio,$fecha_start,$fecha_end,$curso,$estado)
    {
       
        
        $conn=conexion();
        $rol=  $_SESSION['rol_usuario'];
        $id_sucursal =  $_SESSION['id_fksucursal_usuario'];
        $response = new stdClass();
        $data = Array();

        if($rol==1){
            $query = "Select id_inscripcion,fecha_inscripcion,cedula_alumno,fecha_inicio_inscripcion,fecha_fin_inscripcion,estado_inscripcion,calificacion_inscripcion,curso_variable_inscripcion,origen_inscripcion,id_fkalumno_inscripcion,id_fkcurso_inscripcion,id_fkusuario_inscripcion,id_fksucursal_inscripcion,id_fkinstructor_inscripcion,inscripciones.created_at,precio_total_curso,estado_uniforme_inscripcion,condicion_pago_inscripcion , alumnos.nombre_alumno , alumnos.apellido_alumno ,cursos.nombre_curso,usuarios.nombre_usuario,sucursal.nombre_sucursal,instructores.nombre_instructor,instructores.apellido_instructor ,nombre_curso from inscripciones,alumnos,cursos,usuarios,sucursal,instructores where inscripciones.id_fkalumno_inscripcion = alumnos.id_alumno and inscripciones.id_fkcurso_inscripcion = cursos.id_curso and inscripciones.id_fkusuario_inscripcion = usuarios.id_usuario and inscripciones.id_fksucursal_inscripcion = sucursal.id_sucursal AND inscripciones.id_fkinstructor_inscripcion = instructores.id_instructor";

        }
        else{

            $query = "Select id_inscripcion,fecha_inscripcion,cedula_alumno,fecha_inicio_inscripcion,fecha_fin_inscripcion,estado_inscripcion,calificacion_inscripcion,curso_variable_inscripcion,origen_inscripcion,id_fkalumno_inscripcion,id_fkcurso_inscripcion,id_fkusuario_inscripcion,id_fksucursal_inscripcion,id_fkinstructor_inscripcion,inscripciones.created_at,precio_total_curso,estado_uniforme_inscripcion,condicion_pago_inscripcion , alumnos.nombre_alumno , alumnos.apellido_alumno ,cursos.nombre_curso,usuarios.nombre_usuario,sucursal.nombre_sucursal,instructores.nombre_instructor,instructores.apellido_instructor ,nombre_curso from inscripciones,alumnos,cursos,usuarios,sucursal,instructores where inscripciones.id_fkalumno_inscripcion = alumnos.id_alumno and inscripciones.id_fkcurso_inscripcion = cursos.id_curso and inscripciones.id_fkusuario_inscripcion = usuarios.id_usuario and inscripciones.id_fksucursal_inscripcion = sucursal.id_sucursal AND inscripciones.id_fkinstructor_inscripcion = instructores.id_instructor AND id_fksucursal_inscripcion = $id_sucursal";

        }
        


        if($id_alumno!=""){
       
            $query .=" AND inscripciones.id_fkalumno_inscripcion =$id_alumno ";
        };

        
        if($nombre_busqueda!=""){
       
            $query .=" AND nombre_alumno LIKE '%$nombre_busqueda%'";
        };
        
        if($sucursal_busqueda!=""){
            
            $query .=" AND id_fksucursal_inscripcion= $sucursal_busqueda";
        };

        if($mes!=0 || $anio != 0){

            $fecha_inicio= $anio.'-'.$mes.'-01';
            $dias_fin = date( 't', strtotime( $fecha_inicio ) );

            $fecha_fin =$anio.'-'.$mes.'-'.$dias_fin;

        

            $query .=" AND fecha_inscripcion BETWEEN '$fecha_inicio' AND '$fecha_fin'";
         


            
           
        };

        if($fecha_start!="" || $fecha_end!= ""){
            $query .=" AND fecha_inscripcion BETWEEN '$fecha_start' AND '$fecha_end'";

        }

        if($curso!="" ){
            $query .=" AND id_fkcurso_inscripcion = $curso";

        }

        if($estado!="" ){
            $query .=" AND estado_inscripcion = $estado";

        }



   
        

      
        $query.=" ORDER BY  id_inscripcion DESC"; 

        $sql=mysqli_query($conn,$query) or die(mysqli_error($conn));
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Inscripciones";
        $i=0;
        while ($vals = mysqli_fetch_array($sql)) {
            $data[$i]['id_inscripcion']=$vals['id_inscripcion'];
            $data[$i]['fecha_inscripcion']=$vals['fecha_inscripcion'];
            $data[$i]['fecha_inicio_inscripcion']=$vals['fecha_inicio_inscripcion'];
            $data[$i]['fecha_fin_inscripcion']=$vals['fecha_fin_inscripcion'];
            

            if ($vals['estado_inscripcion'] == 1) {
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Activo';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 1;
            } else if($vals['estado_inscripcion'] == 0) {
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Inactivo';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 0;
            }
            else if($vals['estado_inscripcion'] == 3) {
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Anulada';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 3;
            }
            
            
            
            else{
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Finalizado';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 2;
            }

            $data[$i]['calificacion_inscripcion']=$vals['calificacion_inscripcion'];
          
           
            $data[$i]['origen_inscripcion']=$vals['origen_inscripcion'];
            $data[$i]['id_fkalumno_inscripcion']=$vals['id_fkalumno_inscripcion'];
            $data[$i]['id_fkcurso_inscripcion']=$vals['id_fkcurso_inscripcion'];

            $data[$i]['nombre_curso']=$vals['nombre_curso'];
            $data[$i]['id_fkusuario_inscripcion']=$vals['id_fkusuario_inscripcion'];
            $data[$i]['id_fksucursal_inscripcion']=$vals['id_fksucursal_inscripcion'];
            $data[$i]['id_fkinstructor_inscripcion']=$vals['id_fkinstructor_inscripcion'];
            $data[$i]['created_at']=$vals['created_at'];
            $data[$i]['precio_total_curso']=$vals['precio_total_curso'];
            $data[$i]['estado_uniforme_inscripcion']=$vals['estado_uniforme_inscripcion'];

            if ($vals['estado_uniforme_inscripcion'] == 1) {
                $data[$i]['nombre_estado_uniforme'] = $vals['nombre_estado_uniforme'] = 'Entregado';
                $data[$i]['estado_uniforme_inscripcion'] = $vals['estado_uniforme_inscripcion'] = 1;
            } else if ($vals['estado_uniforme_inscripcion'] == 0) {
                $data[$i]['nombre_estado_uniforme'] = $vals['nombre_estado_uniforme'] = 'Pendiente';
                $data[$i]['estado_uniforme_inscripcion'] = $vals['estado_inscripcion'] = 0;
            }else{
                $data[$i]['nombre_estado_uniforme'] = $vals['nombre_estado_uniforme'] = 'Sin Uniforme';
                $data[$i]['estado_uniforme_inscripcion'] = $vals['estado_uniforme_inscripcion'] = 2;
            }


            
         

            

            if ($vals['curso_variable_inscripcion'] == 1) {
                $data[$i]['curso_variable'] = $vals['curso_variable'] = 'Indefinido';
                $data[$i]['curso_variable_inscripcion'] = $vals['curso_variable_inscripcion'] = 1;

                $data[$i]['condicion_pago'] = $vals['condicion_pago'] = 'Indefinido';
                $data[$i]['condicion_pago_inscripcion'] = $vals['condicion_pago_inscripcion'] = 0;
                
            } else{
                $data[$i]['curso_variable'] = $vals['curso_variable'] = 'Definido';
                $data[$i]['curso_variable_inscripcion'] = $vals['curso_variable_inscripcion'] = 0;

                if ($vals['condicion_pago_inscripcion'] == 1) {
                    $data[$i]['condicion_pago'] = $vals['condicion_pago'] = 'Totalidad';
                    $data[$i]['condicion_pago_inscripcion'] = $vals['condicion_pago_inscripcion'] = 1;
                } else{
                    $data[$i]['condicion_pago'] = $vals['condicion_pago'] = 'Cuotas';
                    $data[$i]['condicion_pago_inscripcion'] = $vals['condicion_pago_inscripcion'] = 0;
                }
    
            }


           
            $data[$i]['nombre_alumno']=$vals['nombre_alumno']." ".$vals['apellido_alumno'];
            $data[$i]['cedula_alumno']=$vals['cedula_alumno'];
            $data[$i]['nombre_curso']=$vals['nombre_curso'];
            $data[$i]['nombre_usuario']=$vals['nombre_usuario'];
            $data[$i]['nombre_sucursal']=$vals['nombre_sucursal'];
            
            
            $i++;
            
        }
        
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);


    }

    public function recuperarIdInscripcion(){

        
        $conn=conexion();
        $query = "SELECT MAX(id_inscripcion)  FROM inscripciones";
        $recuperar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
        $vals = mysqli_fetch_array($recuperar);
        $id_inscripcion= $vals[0];
        
       
        if ($recuperar) {
            $resp= "Inscripcion  encontrada";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"id" => $id_inscripcion) ;
        } else
        {$resp=  "No actualizada";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp,"id" => $id_inscripcion) ;
        }
        echo json_encode($arry);

    }



    //recuperar Si el alumno ay esta en el curso
    public function recuperarAlumnoCurso($id_alumno,$id_curso){

        $conn=conexion();
        $query = "select id_inscripcion from inscripciones WHERE inscripciones.id_fkalumno_inscripcion = $id_alumno and inscripciones.id_fkcurso_inscripcion = $id_curso  AND estado_inscripcion=1";
        $recuperar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
        $vals = mysqli_fetch_array($recuperar);
        $total=mysqli_num_rows($recuperar);
       
        if ($total>0) {
            $resp= "Alumno  en el curso";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"encontro" => 1) ;
        } else
        {$resp=  "No esta en el curso";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp,"encontro" => 0) ;
        }
        echo json_encode($arry);


    }

    public function recuperarInscripcionOrden($id_inscripcion){

        $conn=conexion();
        $query = "Select id_fkorden_pedido_mensualidad from mensualidades  where  id_fkinscripcion_mensualidad= '$id_inscripcion' AND id_fkorden_pedido_mensualidad!=0";
        $recuperar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
     
        
        $total=mysqli_num_rows($recuperar);
       
        if ($total>0) {
            $resp= "Orden Pedido Encontrada";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"total" => $total) ;
        } else
        {$resp=  "No hay Ordene";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp,"total" => $total) ;
        }
        echo json_encode($arry);


    }

    public function agregarCalificacion($id_inscripcion, $nota){

        $conn=conexion();
        $query = "Update inscripciones set   calificacion_inscripcion=$nota  where id_inscripcion=$id_inscripcion ";
        $nota= mysqli_query($conn,$query) or  die(mysqli_error($conn));

        if ($nota) {
            $resp= "Nota agregada";
            $arry =  array("success"=> true ,"respuesta"=>$resp) ;
        } else
        {$resp=  "No se agrego la nota";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);
     


    }

    public function agregarFechaFin(   $id_inscripcion,
    $fecha_fin){


        $conn=conexion();
        $dateArr = date_parse($fecha_fin);
		$date_fin = date("Y-m-d", mktime(0, 0, 0, $dateArr['month'], $dateArr['day'], $dateArr['year']));
        $query = "Update inscripciones set   fecha_fin_inscripcion='$fecha_fin' ,estado_inscripcion=2 where id_inscripcion=$id_inscripcion ";
        $fecha= mysqli_query($conn,$query) or  die(mysqli_error($conn));

        if ($fecha) {
            $resp= "Fecha agregada";
            $arry =  array("success"=> true ,"respuesta"=>$resp) ;
        } else
        {$resp=  "No se agrego la fecha";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);

    }

    public function verificarDeudas($id_inscripcion){
        $conn=conexion();
      
        $query = "SELECT id_mensualidad FROM mensualidades WHERE id_fkinscripcion_mensualidad =$id_inscripcion AND estado_mensualidad = 0;  ";
        $deudas= mysqli_query($conn,$query) or  die(mysqli_error($conn));
        $total=mysqli_num_rows($deudas);



         if ($total>0) {
            $resp= "Deudas encontradas";
            $arry =  array("success"=> true ,"respuesta"=>$resp) ;
        } else
        {$resp=  "Nohay deudas";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);


    }

    public function subirCertificado($id_inscripcion , $certificado,$id_usuario){

        $conn=conexion();
      
        $query = "UPDATE inscripciones set certificado_inscripcion ='$certificado'   where id_inscripcion = $id_inscripcion";
        $certificado_que= mysqli_query($conn,$query) or  die(mysqli_error($conn));

         if ($certificado_que) {
            $resp= "Certificado Subido";
            $arry =  array("success"=> true ,"respuesta"=>$resp) ;
        } else
        {$resp=  "No se subio";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);



        $query_recuperar_subidas = "Select  subidas_certificado from certificados where  id_fkinscripcion_certificado = $id_inscripcion";

        $subidas= mysqli_query($conn,$query_recuperar_subidas) or  die(mysqli_error($conn));

        $vals = mysqli_fetch_array($subidas);
       


        if(isset($vals['subidas_certificado'])){
           $total = $vals['subidas_certificado']+1;
        }else{
             $total =1;
        }


        $query_sumar= "UPDATE certificados set subidas_certificado = $total , fecha_subida =  NOW() , id_fkusuario_subida_certificado =$id_usuario where id_fkinscripcion_certificado = $id_inscripcion ";
        $sumar = mysqli_query($conn,$query_sumar) or  die(mysqli_error($conn));







    }


    public function recuperarCertificado($id_inscripcion){


        
        $conn=conexion();
      
        $query = "Select certificado_inscripcion from inscripciones where id_inscripcion=$id_inscripcion";
        $certificado_vis= mysqli_query($conn,$query) or  die(mysqli_error($conn));
       
        $vals = mysqli_fetch_array($certificado_vis);
        $binary = base64_encode($vals['certificado_inscripcion']);

      
        

        if ($certificado_vis) {
            $resp= "Certificado Traido";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"src"=> $binary) ;
        } else
        {$resp=  "No trajo";
        
        $arry =  array("success"=> false ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);




    }


    public function subirPlantilla($plantilla,$id_inscripcion){


        $conn=conexion();
      
        $query = "UPDATE inscripciones set plantilla_certificado ='$plantilla'  , estado_certificado= 1 where id_inscripcion = $id_inscripcion";
        $plantilla= mysqli_query($conn,$query) or  die(mysqli_error($conn));

         if ($plantilla) {
            $resp= "Plantilla Subido";
            $arry =  array("success"=> true ,"respuesta"=>$resp) ;
        } else
        {$resp=  "No se subio";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);

    }


    public function actualizarEstadoUniforme($id_inscripcion,
    $fecha,$estado){


        $conn=conexion();
      
        $query = "UPDATE inscripciones set estado_uniforme_inscripcion ='$estado'  , fecha_uniforme='$fecha ' where id_inscripcion = $id_inscripcion";
        $uniforme= mysqli_query($conn,$query) or  die(mysqli_error($conn));

         if ($uniforme) {
            $resp= "Uniforme actualziado";
            $arry =  array("success"=> true ,"respuesta"=>$resp) ;
        } else
        {$resp=  "No actulizado";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);




    }


    public  function actualizarEstado($id_inscripcion){

        
        $conn=conexion();
      
        $query = "UPDATE inscripciones set estado_inscripcion =2  where id_inscripcion = $id_inscripcion";
        $estado= mysqli_query($conn,$query) or  die(mysqli_error($conn));

         if ($estado) {
            $resp= "Estado actualziado";
            $arry =  array("success"=> true ,"respuesta"=>$resp) ;
        } else
        {$resp=  "No actulizado";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);

    }


    public function anularInscripcion($id_inscripcion){
        $conn=conexion();
        $query = "UPDATE inscripciones set estado_inscripcion =3  where id_inscripcion = $id_inscripcion";
        $anular= mysqli_query($conn,$query) or  die(mysqli_error($conn));

         if ($anular) {
            $resp= "Inscripcion anulada";
            $arry =  array("success"=> true ,"respuesta"=>$resp) ;
        } else
        {$resp=  "No anulada";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);
        
    }




    public function  verInscripcionalumno($id_inscripcion,$inicio,$limite){


        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "Select id_inscripcion,fecha_inscripcion,cedula_alumno,codigo_sucursal,id_certificado ,ciudad_sucursal,ruta_curso,horas_curso,fecha_inicio_inscripcion,fecha_fin_inscripcion,estado_inscripcion,calificacion_inscripcion,curso_variable_inscripcion,origen_inscripcion,id_fkalumno_inscripcion,id_fkcurso_inscripcion,id_fkusuario_inscripcion,id_fksucursal_inscripcion,id_fkinstructor_inscripcion,inscripciones.created_at,precio_total_curso,estado_uniforme_inscripcion,condicion_pago_inscripcion , alumnos.nombre_alumno , alumnos.apellido_alumno ,cursos.nombre_curso,usuarios.nombre_usuario,sucursal.nombre_sucursal,instructores.nombre_instructor,instructores.apellido_instructor ,nombre_curso from inscripciones,alumnos,cursos,usuarios,sucursal,instructores, certificados  where inscripciones.id_fkalumno_inscripcion = alumnos.id_alumno and inscripciones.id_fkcurso_inscripcion = cursos.id_curso and inscripciones.id_fkusuario_inscripcion = usuarios.id_usuario and inscripciones.id_fksucursal_inscripcion = sucursal.id_sucursal AND inscripciones.id_fkinstructor_inscripcion = instructores.id_instructor AND id_inscripcion=$id_inscripcion AND id_fkinscripcion_certificado = $id_inscripcion";
        $query.=" ORDER BY id_inscripcion"; 

        $sql=mysqli_query($conn,$query) or die(mysqli_error($conn));
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Inscripciones";
        $i=0;
        while ($vals = mysqli_fetch_array($sql)) {
            $data[$i]['id_inscripcion']=$vals['id_inscripcion'];
            $data[$i]['fecha_inscripcion']=$vals['fecha_inscripcion'];
            $data[$i]['fecha_inicio_inscripcion']=$vals['fecha_inicio_inscripcion'];
            $data[$i]['fecha_fin_inscripcion']=$vals['fecha_fin_inscripcion'];
            

            if ($vals['estado_inscripcion'] == 1) {
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Activo';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 1;
            } else if($vals['estado_inscripcion'] == 0) {
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Inactivo';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 0;
            }
            else if($vals['estado_inscripcion'] == 3) {
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Anulada';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 3;
            }
            
            
            
            else{
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Finalizado';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 2;
            }

            $data[$i]['calificacion_inscripcion']=$vals['calificacion_inscripcion'];
           
           
            $data[$i]['origen_inscripcion']=$vals['origen_inscripcion'];
            $data[$i]['id_fkalumno_inscripcion']=$vals['id_fkalumno_inscripcion'];
            $data[$i]['id_fkcurso_inscripcion']=$vals['id_fkcurso_inscripcion'];

            $data[$i]['nombre_curso']=$vals['nombre_curso'];
            $data[$i]['id_fkusuario_inscripcion']=$vals['id_fkusuario_inscripcion'];
            $data[$i]['id_fksucursal_inscripcion']=$vals['id_fksucursal_inscripcion'];
            $data[$i]['id_fkinstructor_inscripcion']=$vals['id_fkinstructor_inscripcion'];
            $data[$i]['created_at']=$vals['created_at'];
            $data[$i]['precio_total_curso']=$vals['precio_total_curso'];
            $data[$i]['estado_uniforme_inscripcion']=$vals['estado_uniforme_inscripcion'];

            if ($vals['estado_uniforme_inscripcion'] == 1) {
                $data[$i]['nombre_estado_uniforme'] = $vals['nombre_estado_uniforme'] = 'Entregado';
                $data[$i]['estado_uniforme_inscripcion'] = $vals['estado_uniforme_inscripcion'] = 1;
            } else if ($vals['estado_uniforme_inscripcion'] == 0) {
                $data[$i]['nombre_estado_uniforme'] = $vals['nombre_estado_uniforme'] = 'Pendiente';
                $data[$i]['estado_uniforme_inscripcion'] = $vals['estado_inscripcion'] = 0;
            }else{
                $data[$i]['nombre_estado_uniforme'] = $vals['nombre_estado_uniforme'] = 'Sin Uniforme';
                $data[$i]['estado_uniforme_inscripcion'] = $vals['estado_uniforme_inscripcion'] = 2;
            }


            
         

            

            if ($vals['curso_variable_inscripcion'] == 1) {
                $data[$i]['curso_variable'] = $vals['curso_variable'] = 'Indefinido';
                $data[$i]['curso_variable_inscripcion'] = $vals['curso_variable_inscripcion'] = 1;

                $data[$i]['condicion_pago'] = $vals['condicion_pago'] = 'Indefinido';
                $data[$i]['condicion_pago_inscripcion'] = $vals['condicion_pago_inscripcion'] = 0;
                
            } else{
                $data[$i]['curso_variable'] = $vals['curso_variable'] = 'Definido';
                $data[$i]['curso_variable_inscripcion'] = $vals['curso_variable_inscripcion'] = 0;

                if ($vals['condicion_pago_inscripcion'] == 1) {
                    $data[$i]['condicion_pago'] = $vals['condicion_pago'] = 'Totalidad';
                    $data[$i]['condicion_pago_inscripcion'] = $vals['condicion_pago_inscripcion'] = 1;
                } else{
                    $data[$i]['condicion_pago'] = $vals['condicion_pago'] = 'Cuotas';
                    $data[$i]['condicion_pago_inscripcion'] = $vals['condicion_pago_inscripcion'] = 0;
                }
    
            }


           
            $data[$i]['nombre_alumno']=$vals['nombre_alumno']." ".$vals['apellido_alumno'];
            $data[$i]['cedula_alumno']=$vals['cedula_alumno'];
            $data[$i]['nombre_curso']=$vals['nombre_curso'];
            $data[$i]['nombre_usuario']=$vals['nombre_usuario'];
            $data[$i]['nombre_sucursal']=$vals['nombre_sucursal'];
            $data[$i]['ruta_curso']=$vals['ruta_curso'];
            $data[$i]['horas_curso']=$vals['horas_curso'];
            $data[$i]['ciudad_sucursal']=$vals['ciudad_sucursal'];

            $data[$i]['codigo_sucursal']=$vals['codigo_sucursal'];
            $data[$i]['id_certificado']=$vals['id_certificado'];


            $fecha_inicio=$vals['fecha_inicio_inscripcion'];
 
     
            $data[$i]['dia_inicio']=date("d", strtotime($fecha_inicio));
            $data[$i]['mes_inicio']= ucfirst(strftime("%B", strtotime($fecha_inicio)));
            $data[$i]['anio_inicio']=date("Y", strtotime($fecha_inicio));


            $fecha_fin=$vals['fecha_fin_inscripcion'];
            $data[$i]['dia_fin']=date("d",  strtotime($fecha_fin));
            $data[$i]['mes_fin']=ucfirst(strftime("%B", strtotime($fecha_fin)));
            $data[$i]['anio_fin']=date("Y", strtotime($fecha_fin));
            
            
            $i++;
            
        }
        
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);

    }


    public function sumarDescargadas($id_inscripcion,$id_usuario){


        $conn=conexion();
        $query_obtener_descargadas = "Select descargadas_certificado from certificados where id_fkinscripcion_certificado=$id_inscripcion";
        $descargadas= mysqli_query($conn,$query_obtener_descargadas) or  die(mysqli_error($conn));
        $vals = mysqli_fetch_array($descargadas);
       


        if(isset($vals['descargadas_certificado'])){
           $total = $vals['descargadas_certificado']+1;
        }else{
             $total =1;
        }

      
        

       



       
        
        $query = "UPDATE certificados set descargadas_certificado = $total , fecha_descargada =  NOW(),  id_fkusuario_descarga_certificado = $id_usuario where id_fkinscripcion_certificado = $id_inscripcion";

        $sumar= mysqli_query($conn,$query) or  die(mysqli_error($conn));

         if ($sumar) {
            $resp= "Se aumento el descargadas";
            $arry =  array("success"=> true ,"respuesta"=>$resp) ;
        } else
        {$resp=  "No se aumento";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);
        

    }

    public function verInscripcionesAlumno($inicio,$limite,$id_alumno)
    {
       
        
        $conn=conexion();
       
        $response = new stdClass();
        $data = Array();


            $query = "Select id_inscripcion,fecha_inscripcion,cedula_alumno,fecha_inicio_inscripcion,fecha_fin_inscripcion,estado_inscripcion,calificacion_inscripcion,curso_variable_inscripcion,origen_inscripcion,id_fkalumno_inscripcion,id_fkcurso_inscripcion,id_fkusuario_inscripcion,id_fksucursal_inscripcion,id_fkinstructor_inscripcion,inscripciones.created_at,precio_total_curso,estado_uniforme_inscripcion,condicion_pago_inscripcion , alumnos.nombre_alumno , alumnos.apellido_alumno ,cursos.nombre_curso,usuarios.nombre_usuario,sucursal.nombre_sucursal,instructores.nombre_instructor,instructores.apellido_instructor ,nombre_curso from inscripciones,alumnos,cursos,usuarios,sucursal,instructores where inscripciones.id_fkalumno_inscripcion = alumnos.id_alumno and inscripciones.id_fkcurso_inscripcion = cursos.id_curso and inscripciones.id_fkusuario_inscripcion = usuarios.id_usuario and inscripciones.id_fksucursal_inscripcion = sucursal.id_sucursal AND inscripciones.id_fkinstructor_inscripcion = instructores.id_instructor";

    
        


        if($id_alumno!=""){
       
            $query .=" AND inscripciones.id_fkalumno_inscripcion =$id_alumno ";
        };

       
 
     


   
        

      
        $query.=" ORDER BY  id_inscripcion DESC"; 

        $sql=mysqli_query($conn,$query) or die(mysqli_error($conn));
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Inscripciones";
        $i=0;
        while ($vals = mysqli_fetch_array($sql)) {
            $data[$i]['id_inscripcion']=$vals['id_inscripcion'];
            $data[$i]['fecha_inscripcion']=$vals['fecha_inscripcion'];
            $data[$i]['fecha_inicio_inscripcion']=$vals['fecha_inicio_inscripcion'];
            $data[$i]['fecha_fin_inscripcion']=$vals['fecha_fin_inscripcion'];
            

            if ($vals['estado_inscripcion'] == 1) {
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Activo';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 1;
            } else if($vals['estado_inscripcion'] == 0) {
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Inactivo';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 0;
            }
            else if($vals['estado_inscripcion'] == 3) {
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Anulada';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 3;
            }
            
            
            
            else{
                $data[$i]['nombre_estado_inscripcion'] = $vals['nombre_estado_inscripcion'] = 'Finalizado';
                $data[$i]['estado_inscripcion'] = $vals['estado_inscripcion'] = 2;
            }

            $data[$i]['calificacion_inscripcion']=$vals['calificacion_inscripcion'];
          
           
            $data[$i]['origen_inscripcion']=$vals['origen_inscripcion'];
            $data[$i]['id_fkalumno_inscripcion']=$vals['id_fkalumno_inscripcion'];
            $data[$i]['id_fkcurso_inscripcion']=$vals['id_fkcurso_inscripcion'];

            $data[$i]['nombre_curso']=$vals['nombre_curso'];
            $data[$i]['id_fkusuario_inscripcion']=$vals['id_fkusuario_inscripcion'];
            $data[$i]['id_fksucursal_inscripcion']=$vals['id_fksucursal_inscripcion'];
            $data[$i]['id_fkinstructor_inscripcion']=$vals['id_fkinstructor_inscripcion'];
            $data[$i]['created_at']=$vals['created_at'];
            $data[$i]['precio_total_curso']=$vals['precio_total_curso'];
            $data[$i]['estado_uniforme_inscripcion']=$vals['estado_uniforme_inscripcion'];

            if ($vals['estado_uniforme_inscripcion'] == 1) {
                $data[$i]['nombre_estado_uniforme'] = $vals['nombre_estado_uniforme'] = 'Entregado';
                $data[$i]['estado_uniforme_inscripcion'] = $vals['estado_uniforme_inscripcion'] = 1;
            } else if ($vals['estado_uniforme_inscripcion'] == 0) {
                $data[$i]['nombre_estado_uniforme'] = $vals['nombre_estado_uniforme'] = 'Pendiente';
                $data[$i]['estado_uniforme_inscripcion'] = $vals['estado_inscripcion'] = 0;
            }else{
                $data[$i]['nombre_estado_uniforme'] = $vals['nombre_estado_uniforme'] = 'Sin Uniforme';
                $data[$i]['estado_uniforme_inscripcion'] = $vals['estado_uniforme_inscripcion'] = 2;
            }


            
         

            

            if ($vals['curso_variable_inscripcion'] == 1) {
                $data[$i]['curso_variable'] = $vals['curso_variable'] = 'Indefinido';
                $data[$i]['curso_variable_inscripcion'] = $vals['curso_variable_inscripcion'] = 1;

                $data[$i]['condicion_pago'] = $vals['condicion_pago'] = 'Indefinido';
                $data[$i]['condicion_pago_inscripcion'] = $vals['condicion_pago_inscripcion'] = 0;
                
            } else{
                $data[$i]['curso_variable'] = $vals['curso_variable'] = 'Definido';
                $data[$i]['curso_variable_inscripcion'] = $vals['curso_variable_inscripcion'] = 0;

                if ($vals['condicion_pago_inscripcion'] == 1) {
                    $data[$i]['condicion_pago'] = $vals['condicion_pago'] = 'Totalidad';
                    $data[$i]['condicion_pago_inscripcion'] = $vals['condicion_pago_inscripcion'] = 1;
                } else{
                    $data[$i]['condicion_pago'] = $vals['condicion_pago'] = 'Cuotas';
                    $data[$i]['condicion_pago_inscripcion'] = $vals['condicion_pago_inscripcion'] = 0;
                }
    
            }


           
            $data[$i]['nombre_alumno']=$vals['nombre_alumno']." ".$vals['apellido_alumno'];
            $data[$i]['cedula_alumno']=$vals['cedula_alumno'];
            $data[$i]['nombre_curso']=$vals['nombre_curso'];
            $data[$i]['nombre_usuario']=$vals['nombre_usuario'];
            $data[$i]['nombre_sucursal']=$vals['nombre_sucursal'];
            
            
            $i++;
            
        }
        
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);


    }
    
}



?>