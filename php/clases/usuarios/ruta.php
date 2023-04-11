<?php  require 'db.php';?>

<?php 

$cls = new ruta();
$cls->date_store();
class ruta{
    

    function date_store(){
        
        $conn = getConne();
        $response = new stdClass();
        $data = Array();
        $start = (integer) (isset($_POST['start']) ? $_POST['start'] : $_GET['start']);
        $end = (integer) (isset($_POST['limit']) ? $_POST['limit'] : $_GET['limit']);
        $query = "SELECT * FROM `usuario_demo` WHERE 1=1";
        $aux_estado=1;
        $aux_encontraste=1;
        $fecha_inicio=$_GET['fecha_inicio'];
        $fecha_final=$_GET['fecha_final'];
        $estado=$_GET['estado'];
        $encontraste=$_GET['encontraste'];
  
        
        if($fecha_final!="" and $fecha_inicio!=""){

            $query .=" AND fecha_inicio_usuario_demo BETWEEN \"$fecha_inicio\" AND \"$fecha_final\" ";
        }
        
        if ($estado!=""){

            if($estado=='Contactado'){
                $aux_estado=1;
            }
            if($estado=='Por Contactar'){
                $aux_estado=0;
            }
            $query.=" AND estado_usuario_demo = $aux_estado";
            
            
        }
        if($encontraste!=""){


            if($encontraste=='Recomendacion'){
                $aux_encontraste=1;
 
            }
            if($encontraste=='Google'){
                $aux_encontraste=2;  
            }
            if($encontraste=='Facebook'){
                $aux_encontraste=3;
                
            }
            if($encontraste=='Instagram'){
                $aux_encontraste=4;
                
            }
            $query.=" AND como_nos_encontraste = $aux_encontraste";
       
        
        }
        
        
      
     
        $query.=" ORDER BY id_usuario_demo";    

        $sql=mysqli_query($conn,$query);
        
            $total=mysqli_num_rows($sql);
            $response->success=true;
            $response->total=$total;
            $response->mensaje="Store Fecha";

            while ($vals = mysqli_fetch_array($sql)) {
                if($vals['como_nos_encontraste']==1){
                    $datos='Recomendacion';
                }
                if($vals['como_nos_encontraste']==2){
                    $datos='Google';
                }
                if($vals['como_nos_encontraste']==3){
                    $datos='Facebook';
                }
                if($vals['como_nos_encontraste']==4){
                    $datos='Instagram';
                }

                if($vals['estado_usuario_demo']==0){
                    $estado='Por Contactar';
                }
                if($vals['estado_usuario_demo']==1){
                    $estado='Contactado';
                }
                if($vals['estado_usuario_demo']==2){
                    $estado='No contactado';
                }
                
                $data[] = Array('Id' => $vals['id_usuario_demo'], 'nombre_usuario_demo' => $vals['nombre_usuario_demo']
                    ,'fecha_registro' => $vals['fecha_registro'],
                    'telefono_usuario_demo' => $vals['telefono_usuario_demo'],
                    'correo_usuario_demo' => $vals['correo_usuario_demo'],
                    'ciudad_usuario_demo' => $vals['ciudad_usuario_demo'],
                    'fecha_inicio_usuario_demo' => $vals['fecha_inicio_usuario_demo'],
                    'como_nos_encontraste' => $datos,
                    'estado_usuario_demo' => $estado
                );
                $response->data=array_slice($data, $start,$end);
                
            }
         
            echo  json_encode($response);
            

            
       
        
        
        $conn->close();
        
        
        
        
    }
    
    
    
    
    
}




?>