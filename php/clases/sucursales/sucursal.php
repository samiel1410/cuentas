<?php

require_once ("../../../php/base/db.php");
class metodosSucursal
{

    public function insertarSucursal($codigo_sucursal,$nombre_sucursal,$nombre_comercial_sucursal,$direccion_sucursal,$ciudad_sucursal,$telefono_sucursal,$email_sucursal,$imagen_sucursal,$estado_sucursal,$id_fkusuario_sucursal,$id_fkempresa_sucursal)
    {
        $conn=conexion();
        
     
     

        $query = "INSERT INTO sucursal(codigo_sucursal,nombre_sucursal,nombre_comercial_sucursal,
                    direccion_sucursal,
                    ciudad_sucursal,
                    telefono_sucursal,
                    email_sucursal,
                    imagen_sucursal,
                    estado_sucursal,
                    id_fkusuario_sucursal,id_fkempresa_sucursal) VALUES (
                    '$codigo_sucursal',
                    '$nombre_sucursal',
                    '$nombre_comercial_sucursal',
                    '$direccion_sucursal',
                    '$ciudad_sucursal',
                    '$telefono_sucursal',
                    '$email_sucursal',
                    '$imagen_sucursal',
                    '$estado_sucursal',
                    '$id_fkusuario_sucursal','$id_fkempresa_sucursal')";

        $insertar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
        
        
        if ($insertar) {
            $resp= "Sucursal Ingresado";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"tipo" => 0) ;
        } else
        {$resp=  "No ingresado";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp,"tipo" => 0) ;
        }
        
        echo json_encode($arry);
    }

    public function actualizarSucursal($id_sucursal,$codigo_sucursal,$nombre_sucursal,$nombre_comercial_sucursal,$direccion_sucursal,$ciudad_sucursal,$telefono_sucursal,$email_sucursal,$imagen_sucursal,$estado_sucursal,$id_fkempresa_sucursal)
    {
    
        $conn=conexion();
        if($imagen_sucursal==""){
            $query = "CALL  `actualizar_sucursal_sin_imagen`('$id_sucursal','$codigo_sucursal','$nombre_sucursal','$nombre_comercial_sucursal','$direccion_sucursal','$ciudad_sucursal','$telefono_sucursal','$email_sucursal','$estado_sucursal','$id_fkempresa_sucursal')";

        }else{
            $query = "CALL  `actualizar_sucursal`('$id_sucursal','$codigo_sucursal','$nombre_sucursal','$nombre_comercial_sucursal','$direccion_sucursal','$ciudad_sucursal','$telefono_sucursal','$email_sucursal','$imagen_sucursal','$estado_sucursal','$id_fkempresa_sucursal')";
        }
       
       
        
        $actualizar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
       
        if ($actualizar) {
            $resp= "Sucursal Actualizado";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"tipo" => 1) ;
        } else
        {$resp=  "No Actualizado";
        
        $arry =  array("success"=> False ,"respuesta"=>$resp,"tipo" => 1) ;
        }
        
        echo json_encode($arry);
    }
    
 
    public function eliminarSucursal($id_sucursal)
    {
      
    
        $conn=conexion();
        $query= "CALL  eliminar_sucursal($id_sucursal);";
        $eliminar= mysqli_query($conn,$query);   
        }
    
    

        public function seleccionarSucursalPaginado($inicio, $limite,$nombre_busqueda,$id_empresa)
    {
            
      
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "Select id_sucursal,id_fkempresa_sucursal,nombre_empresa,codigo_sucursal,nombre_sucursal,nombre_comercial_sucursal,direccion_sucursal,ciudad_sucursal, telefono_sucursal,email_sucursal,imagen_sucursal,estado_sucursal,id_fkusuario_sucursal,nombre_usuario,apellido_usuario,sucursal.created_at from sucursal,usuarios,empresa WHERE id_fkusuario_sucursal=usuarios.id_usuario AND id_fkempresa_sucursal = empresa.id_empresa
";
        
        if($nombre_busqueda!=""){
            
            
            $query .=" AND nombre_sucursal LIKE '%$nombre_busqueda%'";
        };

        if($id_empresa!=""){
            
            
            $query .=" AND id_fkempresa_sucursal =$id_empresa";
        };
      
        
        
        $sql=mysqli_query($conn,$query) or  die(mysqli_error($conn));
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Sucursal";
        $i=0;
        while ($vals = mysqli_fetch_array($sql)) {
            $data[$i]['id_sucursal']=$vals['id_sucursal'];
            $data[$i]['codigo_sucursal']=$vals['codigo_sucursal'];
            $data[$i]['nombre_sucursal']=$vals['nombre_sucursal'];
            $data[$i]['nombre_comercial_sucursal']=$vals['nombre_comercial_sucursal'];
            $data[$i]['direccion_sucursal']=$vals['direccion_sucursal'];
            $data[$i]['ciudad_sucursal']=$vals['ciudad_sucursal']; 
            $data[$i]['telefono_sucursal']=$vals['telefono_sucursal'];
            $data[$i]['email_sucursal']=$vals['email_sucursal'];
            $data[$i]['imagen_sucursal']='<img src="data:image/jpeg;base64,'.base64_encode($vals['imagen_sucursal']).'"/>';
            
            if($vals['estado_sucursal']==1){
                $data[$i]['estado_sucursal']=$vals['estado_sucursal']=1;
                $data[$i]['nombre_estado_sucursal']=$vals['nombre_estado_sucursal']='Activo';
            
            }
            if($vals['estado_sucursal']==0){
                $data[$i]['estado_sucursal']=$vals['estado_sucursal']=0;
                $data[$i]['nombre_estado_sucursal']=$vals['nombre_estado_sucursal']='Inactivo';
                
            }
            
            $data[$i]['src_sucursal']='data:image/jpeg;base64,'.base64_encode($vals['imagen_sucursal']).'';
            $data[$i]['nombre_usuario']=$vals['nombre_usuario']." ".$vals['apellido_usuario'];
            $data[$i]['created_at']=$vals['created_at'];

            $data[$i]['id_fkempresa_sucursal']=$vals['id_fkempresa_sucursal'];
            $data[$i]['nombre_empresa']=$vals['nombre_empresa'];
            $i++;

        }
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);

    }
    
    public function seleccionarInstructor($instructor_busqueda)
    {
        $conn = conexion();
        
        $query = "Select nombre_instructor,apellido_instructor,cuota_entrada_curso,mensualidad_curso,nombre_curso from instructores,sucursal where instructores.id_instructor = (SELECT id_fkusuario_sucursal from sucursal WHERE sucursal.id_sucursal = $instructor_busqueda) ";
        $sql = mysqli_query($conn, $query);
        $vals = mysqli_fetch_array($sql);
        
        $arry = array(
            "success" => true,
            "nombre" => $vals['nombre_instructor'] . " " . $vals['apellido_instructor'],  
            'matricula' => $vals['cuota_entrada_curso'],
            'mensualidad' => $vals['mensualidad_curso'],
            'nombre_curso' => $vals['nombre_curso']
        );
        echo json_encode($arry);
    }



    public function verificarCurso($id_sucursal){

        $conn = conexion();
        
        $query = " Select id_curso, nombre_curso from cursos  where id_fksucursal_curso = $id_sucursal ";
        $sql = mysqli_query($conn, $query);
        $vals = mysqli_fetch_array($sql);
        $total=mysqli_num_rows($sql);

        if($total > 0){
            $arry = array(
                "success" => true,
               "total"=>1
            );
        }else{
            $arry = array(
                "success" => true,
               "total"=>0
            );

        }
        
        echo json_encode($arry);

    }

    
}


?>