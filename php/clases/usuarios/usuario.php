<?php
require_once ("../../../php/base/db.php");

class metodosUsuario
{

    public function ingresarUsuario($nombre_usuario,$apellido_usuario,$clave_usuario,$rol_usuario,$estado_usuario,$correo_usuario,$id_fksucursal_usuario)
    {
     
        $conn=conexion();
       

        $query_busca= "Select id_usuario from usuarios where correo_usuario = '$correo_usuario'";
        $buscar_usuario = mysqli_query($conn,$query_busca) or  die(mysqli_error($conn));

        $total=mysqli_num_rows($buscar_usuario);
       

        if ($total>0) {

            $resp= "Usuario Encontrado";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"tipo" => 2) ;
            

          
        }else if($total==0){
            $password = base64_encode($clave_usuario);

            $query = "CALL  insertar_usuario('$nombre_usuario','$apellido_usuario','$password','$rol_usuario','$estado_usuario','$correo_usuario','$id_fksucursal_usuario')";

            $insertar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
        
                
                if ($insertar) {
                    $resp= "Usuario Insertado";
                    $arry =  array("success"=> true ,"respuesta"=>$resp,"tipo" => 0) ;
                } else
                {$resp=  "No Insertado";
                
                    $arry =  array("success"=> False ,"respuesta"=>$resp,"tipo" => 0) ;
                }
                  

        }

        echo json_encode($arry);


        
   
      
        
    }

    public function actualizarUsuario($id_usuario,$nombre_usuario,$apellido_usuario,$clave_usuario,$rol_usuario,$estado_usuario,$correo_usuario,$id_fksucursal_usuario)
    {
        $conn=conexion();
        $clave_usuario = base64_encode($clave_usuario);

        $query = "CALL  `actualizar_usuario`('$id_usuario','$nombre_usuario','$apellido_usuario','$clave_usuario','$rol_usuario','$estado_usuario','$correo_usuario','$id_fksucursal_usuario')";
        $actualizar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
        
        if ($actualizar) {
            $resp= "Usuario Actualizado";
            $arry =  array("success"=> true ,"respuesta"=>$resp,"tipo" => 1) ;
        } else
        {$resp=  "No Actualizado";
            
            $arry =  array("success"=> False ,"respuesta"=>$resp,"tipo" => 1) ;
        }
            
            echo json_encode($arry);
    }
    
 
    public function eliminarUsuario($id_usuario)
    {
       
        $conn=conexion();
       $query= "CALL  eliminar_usuario($id_usuario);";
       $eliminar= mysqli_query($conn,$query);
       
       if ($eliminar)
           echo 1;
           else
               echo 0;
    
        }
    
    

        public function seleccionarUsuarioPaginado($inicio, $limite,$nombre_busqueda,$sucursal_busqueda,$estado)
    {
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "SELECT id_usuario,nombre_usuario,apellido_usuario,clave_usuario,rol_usuario,estado_usuario,
correo_usuario,nombre_sucursal,id_fksucursal_usuario,usuarios.created_at
 FROM usuarios,sucursal WHERE usuarios.id_fksucursal_usuario=sucursal.id_sucursal ";
      
       
        if($nombre_busqueda!=""){
       
            $query .=" AND nombre_usuario LIKE '%$nombre_busqueda%'";
        };
        
        if($sucursal_busqueda!=""){
            
            $query .=" AND id_fksucursal_usuario= $sucursal_busqueda";
        };

        if($estado!=""){
            
            $query .=" AND estado_usuario= $estado";
        };
        $query.=" ORDER BY usuarios.id_usuario"; 
    
        
        $sql=mysqli_query($conn,$query) or  die(mysqli_error($conn));
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Usuario";
    
        $i=0;
        while ($vals = mysqli_fetch_array($sql)) {
            $data[$i]['id_usuario']=$vals['id_usuario'];
            $data[$i]['nombre_usuario']=$vals['nombre_usuario'];
            $data[$i]['apellido_usuario']=$vals['apellido_usuario'];
            $data[$i]['clave_usuario']=$vals['clave_usuario'];
            
            if($vals['rol_usuario']==1){
                $data[$i]['nombre_rol_usuario']=$vals['nombre_rol_usuario']='Comando';
                $data[$i]['rol_usuario']=$vals['rol_usuario']='1';
                
            };
            if($vals['rol_usuario']==2){
                $data[$i]['nombre_rol_usuario']=$vals['nombre_rol_usuario']='Director';
                $data[$i]['rol_usuario']=$vals['rol_usuario']='2';
            };
            if($vals['rol_usuario']==3){
                $data[$i]['nombre_rol_usuario']=$vals['rol_usuario']='Secretaria';
                $data[$i]['rol_usuario']=$vals['rol_usuario']='3';
            };
            
            if($vals['estado_usuario']==1){
                $data[$i]['nombre_estado_usuario']=$vals['nombre_estado_usuario']='Activo';
                $data[$i]['estado_usuario']=$vals['estado_usuario']=1;
            }
            else{
                $data[$i]['nombre_estado_usuario']=$vals['estado_usuario']='Inactivo';
                $data[$i]['estado_usuario']=$vals['estado_usuario']=0;
            };
            
    
        
            $data[$i]['correo_usuario']=$vals['correo_usuario'];
            $data[$i]['nombre_sucursal']=$vals['nombre_sucursal'];
            
            $data[$i]['id_fksucursal_usuario']=$vals['id_fksucursal_usuario'];
            $data[$i]['created_at']=$vals['created_at'];
            

            $i++;
        }
        $response->data=array_slice($data, $inicio,$limite);
     
        echo json_encode($response);


    }

    public function recuperarUsuario($id_usuario){

        
        $conn=conexion();
       

        $query = "Select nombre_usuario,apellido_usuario,clave_usuario,correo_usuario,rol_usuario,id_empresa,estado_usuario,id_fksucursal_usuario,nombre_sucursal , nombre_empresa,codigo_sucursal,alias_empresa from usuarios,sucursal,empresa where id_usuario = $id_usuario AND usuarios.id_fksucursal_usuario = sucursal.id_sucursal AND sucursal.id_fkempresa_sucursal = empresa.id_empresa ";
        $recuperar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
        $vals = mysqli_fetch_array($recuperar);
        
        if ($recuperar) {
            $resp= "Usuario Encontrado";
            $arry =  array(
                "success"=> true ,
                "respuesta"=>$resp,
                "nombre"=>$vals['nombre_usuario'],
                "apellido"=>$vals['apellido_usuario'],
                "contrasenia"=>  base64_decode($vals['clave_usuario']),
                "correo"=>$vals['correo_usuario'],
                "rol"=>$vals['rol_usuario'],
                "estado"=>$vals['estado_usuario'],
                "id"=>$id_usuario,
                "sucursal"=>$vals['id_fksucursal_usuario'],
                "codigo_sucursal"=>$vals['codigo_sucursal'],
                "nombre_empresa"=>$vals['nombre_empresa'],
                "id_empresa"=>$vals['id_empresa'],
                "alias_empresa"=>$vals['alias_empresa'],
                

                
                ) ;
        } else
        {$resp=  "No Encontrado";
            
            $arry =  array("success"=> False ,"respuesta"=>$resp,"tipo" => 1) ;
        }
            
            echo json_encode($arry);
    

    }

    public function recuperarUsuarioCurso($id_usuario){

        
        $conn=conexion();
       

        $query = "SELECT id_curso FROM `cursos` WHERE id_fkusuario_curso = $id_usuario";
        $verificar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
        $total=mysqli_num_rows($verificar);


        if($total>0)
        {
            $resp= "Usuario con Curso";
        if($total>0)
            $arry =  array("success"=> true ,"respuesta"=>$resp,"total" => $total) ;
        } else
        {$resp=  "No con curso";
            
            $arry =  array("success"=> False ,"respuesta"=>$resp,"total" => $total) ;
        }
            
            echo json_encode($arry);

    }

    public  function recuperarFecha(){

        $fecha_actual = date("Y-m-d");   
        $arry =  array("fecha"=> $fecha_actual) ;
        echo json_encode($arry);



    }
    
}


?>