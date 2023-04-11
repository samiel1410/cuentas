
<?php
require_once ("../../../php/base/db.php");
class metodosCertificados
{

  
 
    public function eliminarCertificado($id_certificado)
    {
      
        
        $conn=conexion();
        $query= "DELETE  from certificaciones_militar  WHERE  id_certificaciones_militar = $id_certificado ";
        $eliminar= mysqli_query($conn,$query);

        if($eliminar)
        {
            $arry = array(
                "success" => true,
                "respuesta" => 'eliminado' ,
    
            
            );
            echo json_encode($arry);
        }
      
        
      
               
        }
    
    

        public function seleccionarCertificadosPaginado($inicio, $limite,$id_instructor)
    {
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "SELECT * from certificaciones_militar WHERE id_fkinstructor_certificaciones_militar = $id_instructor ";
        $sql= mysqli_query($conn,$query) or die(mysqli_error($conn));
       
       
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Certificados";
        $i=0;

        while ($vals = mysqli_fetch_array($sql)) {
          
            
            $data[$i]['id_certificaciones_militar']=$vals['id_certificaciones_militar'];
            $data[$i]['nombre_certificaciones_militar']=$vals['nombre_certificaciones_militar'];
            $data[$i]['id_fkinstructor_certificaciones_militar']=$vals['id_fkinstructor_certificaciones_militar'];
            
 
         $i++;
           
            
        }
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);

    }


    public function insertarCertificado($nombre,$id_instructor,$certificado){

        $conn=conexion();
        $query_guardar = "CALL `guardar_certificaciones`('$nombre','$id_instructor','$certificado')";
        
        $guardar = mysqli_query($conn, $query_guardar) or die(mysqli_error($conn));
        if($guardar)
        {
            $arry = array(
                "success" => true,
                "respuesta" => 'Guardado' ,
    
            
            );
            echo json_encode($arry);
        }
      
    
    
    }


    public function editarCertificado($nombre,$id_certificado){


        $conn=conexion();
        $query = "UPDATE  certificaciones_militar  set nombre_certificaciones_militar = '$nombre' where id_certificaciones_militar= $id_certificado";
        
        $editar = mysqli_query($conn, $query) or die(mysqli_error($conn));
        if($editar)
        {
            $arry = array(
                "success" => true,
                "respuesta" => 'Ediatado' ,
    
            
            );
            echo json_encode($arry);
        }


    }
    
}


?>