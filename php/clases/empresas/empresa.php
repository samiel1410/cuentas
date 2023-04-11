
<?php
require_once ("../../../php/base/db.php");

class metodosEmpresa
{


    public function verEmpresa($inicio, $limite)
    {
        $conn = conexion();
 

        $response = new stdClass();
        $data = Array();
        $query = "SELECT * from empresa";

    

        $sql = mysqli_query($conn, $query) or die(mysqli_error($conn));

        $total = mysqli_num_rows($sql);
        $response->success = true;
        $response->total = $total;
        $response->mensaje = "Empresas";
        $i = 0;

        while ($vals = mysqli_fetch_array($sql)) {

            $data[$i]['id_empresa'] = $vals['id_empresa'];
            $data[$i]['nombre_empresa'] = $vals['nombre_empresa'];
            $data[$i]['alias_empresa'] = $vals['alias_empresa'];
            
            $i ++;
        }
        $response->data = array_slice($data, $inicio, $limite);
        echo json_encode($response);
    }


    public function recuperarEmpresa($id_sucursal){

        
        $conn = conexion();
 

     
        $query = "Select sucursal.id_fkempresa_sucursal from sucursal where sucursal.id_sucursal = $id_sucursal ";

       

           
        $recuperar = mysqli_query($conn, $query) or die(mysqli_error($conn));
        $vals = mysqli_fetch_array($recuperar);
        $id_empresa = $vals['id_fkempresa_sucursal'];


        $query_empresa = "Select nombre_empresa from empresa where id_empresa = $id_empresa ";
        $recuperar_empresa = mysqli_query($conn, $query_empresa) or die(mysqli_error($conn));
        $vals2 = mysqli_fetch_array($recuperar_empresa);
        
        if ($recuperar) {
            $resp = "Empresa Encontrada";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "id" => $vals['id_fkempresa_sucursal'],
                "nombre_empresa"=>$vals2['nombre_empresa'],
                
               
            );
        } else{

            $resp = "ANo encontrada";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                
            );

        }

        echo json_encode($arry);


    }


   
}

?>