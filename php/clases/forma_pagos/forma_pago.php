
<?php
require_once ("../../../php/base/db.php");
class metodosFormaPago
{

    public function insertarFormaPago($nombre_forma,$id_fkusuario_forma,$numero_cuenta)
    {
      
        $conn=conexion();
        $query = "CALL  `insertar_forma_pago`($nombre_forma,$id_fkusuario_forma,$numero_cuenta)";

        $insertar= mysqli_query($conn,$query) or die(mysqli_error($conn));
        
        
        
        if ($insertar) {
            $resp = "Ingresado";
            $arry = array(
                "success" => true,
                "respuesta" => $resp
            );
        } else{

            $resp = "No ingresada";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                
            );

        }

        echo json_encode($arry);
    }

    public function actualizarFormaPago($id_forma,$nombre_forma,$numero_cuenta)
    {
    
        $conn=conexion();
        $query = "CALL  `actualizar_forma_pago`($id_forma,$nombre_forma,$numero_cuenta)";
        $actualizar= mysqli_query($conn,$query) or die(mysqli_error($conn));
       
        if ($actualizar) {
            $resp = "Actualizado ";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
         
                
               
            );
        } else{

            $resp = "No actualzada";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                
            );

        }

        echo json_encode($arry);
    }
    
 
    public function eliminarFormaPago($id_forma)
    {
      
        
        $conn=conexion();
        $query= "CALL  eliminar_forma_pago($id_forma);";
        $eliminar= mysqli_query($conn,$query);
        
      
               
        }
    
    

        public function seleccionarFormaPago($inicio, $limite,$nombre_busqueda)
    {
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "SELECT * from forma_pago where 1=1";
        
        if($nombre_busqueda!=""){
            
            $query .=" AND nombre_forma LIKE '%$nombre_busqueda%'";
        };
        $sql=mysqli_query($conn,$query);
       
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Forma Pago";
        $i=0;

        while ($vals = mysqli_fetch_array($sql)) {
          
            
            $data[$i]['id_forma']=$vals['id_forma'];
            $data[$i]['nombre_forma']=$vals['nombre_forma'];
            $data[$i]['id_fkusuario_forma']=$vals['id_fkusuario_forma'];
            $data[$i]['created_at']=$vals['created_at'];
 
         $i++;
           
            
        }
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);

    }

    
}


?>