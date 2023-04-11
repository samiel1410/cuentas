<?php
require_once ("../../../php/base/db.php");

class metodosRegistroWeb
{


    public function actualizarRegistroWeb($id,$estado)
    {
        $conn=conexion();


        $query = "CALL  `actualizar_registro_web`($id,$estado)";
        $actualizar= mysqli_query($conn,$query);
       
        if ($actualizar)
            return 1;
        else
            return 0;
    }
    
 
 
    

    public function seleccionarRegistroWebPaginado($inicio, $limite)
    {
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "CALL  `ver_registro_web`()";

        $sql=mysqli_query($conn,$query);
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Registro web";

        while ($vals = mysqli_fetch_array($sql)) {
          
            
            $data[] = Array('id' => $vals['id'], 
            'institucion' => $vals['institucion']
                ,'apellidos' => $vals['apellidos'],
                'nombres' => $vals['nombres'],
                'cedula' => $vals['cedula'],
                'tipo_sangre' => $vals['tipo_sangre'],
                'representante' => $vals['representante'],
                'direccion' => $vals['direccion'],
                'email' => $vals['email'],
                'unidad_educativa_estudio_secundario' => $vals['unidad_educativa_estudio_secundario'],
                'talla_uniforme' => $vals['talla_uniforme'],
                'numero_calzado' => $vals['numero_calzado'],
                'foto' => '<img src="data:image/jpeg;base64,'.base64_encode($vals['foto']).'"/>',
                'estado' => $vals['estado'],
                'created_at' => $vals['created_at'],
              
              
            );
            $response->data=array_slice($data, $inicio,$limite);
            
        }
     
        echo json_encode($response);


    }

    
}


?>