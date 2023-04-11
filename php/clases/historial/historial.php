
<?php
require_once ("../../../php/base/db.php");
setlocale(LC_TIME, 'spanish');

class metodoHistorial
{

    public function verHistorial($inicio,$limite,$id_inscripcion)
    {
      
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "SELECT id_certificado,id_fkinscripcion_certificado,descargadas_certificado
        ,subidas_certificado ,fecha_descargada,fecha_subida,id_fkusuario_subida_certificado,id_fkusuario_descarga_certificado
        
         from certificados where  id_fkinscripcion_certificado = $id_inscripcion ";
      
       
       
        $sql=mysqli_query($conn,$query) or  die(mysqli_error($conn));
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Historial Certificaods";
    
        $i=0;
        while ($vals = mysqli_fetch_array($sql)) {
            $data[$i]['id_certificado']=$vals['id_certificado'];
            $data[$i]['id_fkinscripcion_certificado']=$vals['id_fkinscripcion_certificado'];
            $data[$i]['descargadas_certificado']=$vals['descargadas_certificado'];
            $data[$i]['subidas_certificado']=$vals['subidas_certificado'];
            $data[$i]['fecha_descargada']=$vals['fecha_descargada'];
            $data[$i]['fecha_subida']=$vals['fecha_subida'];    

          
            $data[$i]['id_fkusuario_subida_certificado']=$vals['id_fkusuario_subida_certificado'];

            $id_usuario_subida= $vals['id_fkusuario_subida_certificado'];
            $query_subida = "SELECT nombre_usuario, apellido_usuario  from usuarios where  id_usuario = $id_usuario_subida ";
      
            $sql_sub=mysqli_query($conn,$query_subida) or  die(mysqli_error($conn));
            $subida = mysqli_fetch_array($sql_sub);

            $data[$i]['nombre_subida']=$subida['nombre_usuario']." ".$subida['apellido_usuario'];



            $data[$i]['id_fkusuario_descarga_certificado']=$vals['id_fkusuario_descarga_certificado'];

            $id_usuario_descar= $vals['id_fkusuario_descarga_certificado'];

            $query_descar = "SELECT nombre_usuario, apellido_usuario  from usuarios where  id_usuario = $id_usuario_descar ";
      
            $sql_su=mysqli_query($conn,$query_descar) or  die(mysqli_error($conn));
            $descargada = mysqli_fetch_array($sql_su);
            $data[$i]['nombre_descargada']=$descargada['nombre_usuario']." ".$descargada['apellido_usuario'];



            $i++;
        }
        $response->data=array_slice($data, $inicio,$limite);
     
        echo json_encode($response);
      
    
        
       
    }

  
    
}



?>