<?php
require_once ("../../../php/base/db.php");

class metodosInstructor
{

    public function insertarInstructor($nombre_instructor, $apellido_instructor, $ciudad_instructor, $telefono_instructor, $celular_instructor, $direccion_instructor, $titulo_instructor, $estado_instructor, $correo_instructor, $cedula_instructor,$categoria_instructor)
    {
        $conn=conexion();
        $id_fkusuario_instructor=$_SESSION['id_usuario'];
        $query = "CALL  insertar_instructor('$nombre_instructor', '$apellido_instructor', '$ciudad_instructor', '$telefono_instructor', '$celular_instructor', '$direccion_instructor', '$titulo_instructor', '$estado_instructor', '$correo_instructor', '$cedula_instructor','$id_fkusuario_instructor','$categoria_instructor')";

        $insertar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
        
        if ($insertar) {
            $resp = "Instructor creado";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "tipo" => 0,
                "SS"=>$_SESSION['id_usuario']
            );
        } else {
            $resp = "No Creado";

            $arry = array(
                "success" => False,
                "respuesta" => $resp,
                "tipo" => 0
            );
        }

        echo json_encode($arry);
    }

    public function actualizarInstructor($id_instructor,$nombre_instructor, $apellido_instructor,$telefono_instructor,$celular_instructor ,$direccion_instructor,$titulo_instructor,$estado_instructor,$correo_instructor,$cedula_instructor,$ciudad_instructor,$categoria_instructor)
    {
        $conn=conexion();
        $query = "CALL  `actualizar_instructor`('$id_instructor','$nombre_instructor', '$apellido_instructor','$telefono_instructor','$celular_instructor','$direccion_instructor','$titulo_instructor','$estado_instructor','$correo_instructor','$cedula_instructor','$ciudad_instructor','$categoria_instructor')";
        $actualizar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
       
        if ($actualizar) {
            $resp = "Instructor Actualizado";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "tipo" => 1
            );
        } else {
            $resp = "No Actualziado";

            $arry = array(
                "success" => False,
                "respuesta" => $resp,
                "tipo" => 1
            );
        }

        echo json_encode($arry);
    }
    
 
    public function eliminarInstructor($id_instructor)
    {
       
        $conn=conexion();
       $query= "CALL  eliminar_instructor($id_instructor);";
       $eliminar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
    
        }


        public function verificarInstructorCurso($id_instructor){
            $conn = conexion();

            $query = "Select id_curso from cursos where cursos.id_fkinstructor_curso = $id_instructor";
            
            $verificar = mysqli_query($conn, $query) or die(mysqli_error($conn));
            $total = mysqli_num_rows($verificar);
            if ($verificar) {
                $resp = "El instructor tiene un curso o mas";
                $arry = array(
                    "success" => true,
                    "respuesta" => $resp,
                    "tipo" => 1,
                    "total" => $total
                );
            } 
    
            echo json_encode($arry);

        }
    
    

        public function seleccionarInstructorPaginado($inicio, $limite,$nombre_busqueda,$cedula_busqueda,$estado)
    {
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "Select id_instructor,nombre_instructor, categoria_instructor,apellido_instructor, ciudad_instructor, cedula_instructor,telefono_instructor,celular_instructor, estado_instructor,
correo_instructor,direccion_instructor,titulo_instructor , id_fkusuario_instructor, nombre_usuario ,apellido_usuario, instructores.created_at from instructores,usuarios WHERE   instructores.id_fkusuario_instructor = usuarios.id_usuario" ;
        
        
        if($nombre_busqueda!=""){
            
            $query .=" AND nombre_instructor LIKE '%$nombre_busqueda%'";
        };

        if($cedula_busqueda!=""){
            
            $query .=" AND cedula_instructor LIKE '%$cedula_busqueda%'";
        };

        if($estado!=""){
            
            $query .=" AND estado_instructor = $estado";
        };
        

      
      
       
        $sql=mysqli_query($conn,$query) or  die(mysqli_error($conn));
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Instructor";
        $i=0;
        while ($vals = mysqli_fetch_array($sql)) {
            $data[$i]['id_instructor']=$vals['id_instructor'];
            $data[$i]['nombre_instructor']=$vals['nombre_instructor'];
            $data[$i]['apellido_instructor']=$vals['apellido_instructor'];
            $data[$i]['ciudad_instructor']=$vals['ciudad_instructor'];
            $data[$i]['telefono_instructor']=$vals['telefono_instructor'];
            $data[$i]['celular_instructor']=$vals['celular_instructor'];
            $data[$i]['direccion_instructor']=$vals['direccion_instructor'];
            $data[$i]['titulo_instructor']=$vals['titulo_instructor'];
            

            
            if($vals['estado_instructor']==1){
                $data[$i]['estado_instructor']=$vals['estado_instructor']=1;
                $data[$i]['nombre_estado_instructor']=$vals['nombre_estado_instructor']="Activo";
            }
            if($vals['estado_instructor']==0){
                $data[$i]['nombre_estado_instructor']=$vals['nombre_estado_instructor']="Inactivo";
                $data[$i]['estado_instructor']=$vals['estado_instructor']=0;
            }
            $data[$i]['correo_instructor']=$vals['correo_instructor'];
            $data[$i]['cedula_instructor']=$vals['cedula_instructor'];
           
          
            
            $data[$i]['cedula_instructor']=$vals['cedula_instructor'];
            $data[$i]['id_fkusuario_instructor']=$vals['id_fkusuario_instructor'];
            $data[$i]['nombre_usuario']=$vals['nombre_usuario']." ".$vals['apellido_usuario'];
           
            
            $data[$i]['created_at']=$vals['created_at'];

            if($vals['categoria_instructor']==0){
                $data[$i]['categoria_instructor']=0;
                $data[$i]['nombre_categoria_instructor']='Instructor';
            }else{
                $data[$i]['categoria_instructor']=1;
                $data[$i]['nombre_categoria_instructor']='Docente';
            
            }
            
            
            
      
           $i++;
            
        }
     
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);


    }


    public function guadarCertificaciones($record){


        $conn = conexion();

        $query_instructor ="SELECT MAX(id_instructor)  FROM instructores";
        $verificar_id = mysqli_query($conn, $query_instructor) or die(mysqli_error($conn));

        $vals = mysqli_fetch_array($verificar_id);

        $id_instructor=$vals[0]+1;

        $datos = json_decode($record,true);


        
        

        for ($i=0; $i < count($datos); $i++) { 
            $nombre_curso =json_encode($datos[$i]['nombre_certificaciones_militar']);
            $query_guardar = "CALL `guardar_certificaciones`($nombre_curso,$id_instructor)";
        
            $guardar = mysqli_query($conn, $query_guardar) or die(mysqli_error($conn));

 
        if ($guardar) {
            $resp = "Se guardo las certificaciones";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
               
            );
        } 

     


        }
        echo json_encode($arry);


      
      



    }


    public function  verCertificado($id_certificaciones_militar){

        $conn=conexion();
      
        $query = "Select certificado_pdf from certificaciones_militar  where id_certificaciones_militar =$id_certificaciones_militar";
        $certificado_vis= mysqli_query($conn,$query) or  die(mysqli_error($conn));
       
        $vals = mysqli_fetch_array($certificado_vis);
        $binary = base64_encode($vals['certificado_pdf']);

      
        

        if ($certificado_vis) {
            $resp= "Certificado Traido";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"src"=> $binary) ;
        } else
        {$resp=  "No trajo";
        
        $arry =  array("success"=> false ,"respuesta"=>$resp) ;
        }
        echo json_encode($arry);



    }

    
}


?>