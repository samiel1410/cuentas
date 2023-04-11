<?php
require_once ("../../../php/base/db.php");

class metodosProvinvia
{


  
 
 
    

    public function seleccionarProvinciaWebPaginado($inicio, $limite)
    {
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "CALL  `ver_provincia`()";

        $sql=mysqli_query($conn,$query);
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Provincias";

        while ($vals = mysqli_fetch_array($sql)) {
          
            
            $data[] = Array('id' => $vals['id'], 
            'provincia' => $vals['provincia']
               
              
              
            );
            $response->data=array_slice($data, $inicio,$limite);
            
        }
     
        echo json_encode($response);


    }

    
}


?>