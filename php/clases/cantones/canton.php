
<?php
require_once ("../../../php/base/db.php");

class metodosCanton
{


    public function verCanton($inicio, $limite ,$id_provincia)
    {
        $conn = conexion();
 

        $response = new stdClass();
        $data = Array();
        $query = "SELECT * from tbl_canton ";

        if($id_provincia != ""){

            $query .=" WHERE id_provincia = $id_provincia";
            
        }

    

        $sql = mysqli_query($conn, $query) or die(mysqli_error($conn));

        $total = mysqli_num_rows($sql);
        $response->success = true;
        $response->total = $total;
        $response->mensaje = "Cantones";
        $i = 0;

        while ($vals = mysqli_fetch_array($sql)) {

            $data[$i]['id'] = $vals['id'];
            $data[$i]['canton'] = $vals['canton'];
            $data[$i]['id_provincia'] = $vals['id_provincia'];
            
            $i ++;
        }
        $response->data = array_slice($data, $inicio, $limite);
        echo json_encode($response);
    }


    


   
}

?>