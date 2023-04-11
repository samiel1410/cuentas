
<?php
require_once ("../../../php/base/db.php");




class metodoLogin
{
    
    public function ingresarLogin($correo,$clave)
    {
        
    
        $con=conexion();
        $password =  base64_encode($clave);

    
        $query = "SELECT id_usuario,id_fksucursal_usuario,rol_usuario , estado_usuario , sucursal.estado_sucursal FROM usuarios,sucursal WHERE correo_usuario='$correo' AND clave_usuario='$password' AND usuarios.id_fksucursal_usuario = sucursal.id_sucursal";
     
        $sql=mysqli_query($con,$query) or  die(mysqli_error($con));;
     
        $total=mysqli_num_rows($sql);
        
        $vals = mysqli_fetch_array($sql);
  
       
       
           
        if ($total >=1) {
           
            $id_usuario = $vals['id_usuario'];
            $_SESSION['id_usuario']=$id_usuario;
            $_SESSION['id_fksucursal_usuario']=$vals['id_fksucursal_usuario'];
            $_SESSION['rol_usuario']=$vals['rol_usuario'];
            $arry =  array("success"=> true ,"respuesta"=>'Usuario correcto',"tipo"=>1,"estado_usuario"=> $vals['estado_usuario'],"estado_sucursal"=>$vals['estado_sucursal'],"id"=> $_SESSION['id_usuario']);
            $session=session_id();
            $query_insert = "UPDATE  usuarios set session_id= '$session' where id_usuario=$id_usuario";
     
           
            $sql_insert=mysqli_query($con,$query_insert) or  die(mysqli_error($con));
            echo json_encode($arry);
            
        } else {
           
            $arry =  array("success"=> false ,"respuesta"=>'Contraseña y usuario mal');
            
            echo json_encode($arry);
            
           
        }
      

        



        
     
    }
    
    public function salir(){
    
        session_destroy();
        header('location:../../../login/index.php');
    }

    public function prioridad($correo,$clave){


  
        $con=conexion();
        $password = base64_encode($clave);

   
        $query = "SELECT id_usuario,id_fksucursal_usuario,rol_usuario , estado_usuario , sucursal.estado_sucursal FROM usuarios,sucursal WHERE correo_usuario='$correo' AND clave_usuario='$password' AND usuarios.id_fksucursal_usuario = sucursal.id_sucursal";
     
        $sql=mysqli_query($con,$query) or  die(mysqli_error($con));;
     
        $total=mysqli_num_rows($sql);
        
        $vals = mysqli_fetch_array($sql);
     
       
        if(isset($_SESSION['id_usuario']))
        {
        if ($total >=1) {
            $arry =  array("success"=> true ,"respuesta"=>'Usuario correcto',"estado_usuario"=> $vals['estado_usuario'],"estado_sucursal"=>$vals['estado_sucursal']);
            $id_usuario = $vals['id_usuario'];
            $_SESSION['id_usuario']=$id_usuario;
            $_SESSION['id_fksucursal_usuario']=$vals['id_fksucursal_usuario'];
            $_SESSION['rol_usuario']=$vals['rol_usuario'];
            
            $session=session_id();
            $query_insert = "UPDATE  usuarios set session_id= '$session' where id_usuario=$id_usuario";
     
            $sql_insert=mysqli_query($con,$query_insert) or  die(mysqli_error($con));
            echo json_encode($arry);
        } else {
           
            $arry =  array("success"=> false ,"respuesta"=>'Contraseña y usuario mal');
            
            echo json_encode($arry);
            
           
        }
      

        



        }
        else{
            $arry =  array("success"=> false ,"tipo"=>1);
            
            echo json_encode($arry);
            
        }

    
    




    }
    

    public function verificarLogin(){



        $con=conexion();
     

   
       

        if(isset($_SESSION['id_usuario']))
        {
            $id_usuario=$_SESSION['id_usuario'];
            $query = "SELECT session_id from usuarios where id_usuario= $id_usuario ";
     


            $sql=mysqli_query($con,$query) or  die(mysqli_error($con));;
         
           
            
            $vals = mysqli_fetch_array($sql);

            $session=session_id();

            if($vals['session_id']==$session){

                $arry =  array("success"=> true ,"respuesta"=>'todo bien');

            }else{

                $arry =  array("success"=> false ,"respuesta"=>'Otro Usuario ya se conecto');
                session_destroy();


            }
    
    
            
           
       
            echo json_encode($arry);
        


    }



    }
    
    
    
    
    
    
    
    
}








 
?>