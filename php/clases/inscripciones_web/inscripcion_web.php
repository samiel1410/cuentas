
<?php
require_once ("../../../php/base/db.php");
class metodosWeb
{

    public function verInscripcionesWeb($inicio,$limite ,$cedula_busqueda)
    {
      
        $conn=conexion();
        $response = new stdClass();
        $data = Array();


        $query = "SELECT id_inscripcion_web,id_institucion,inscripcion_web.id_curso,celular,estado,cedula,nombre,apellido,tipo_sangre,dirreccion,inscripcion_web.id_provincia,id_ciudad,celular,representante,numero_repre,correo,estudios,talla_uniforme,numero_calzado,inscripcion_web.created_at, alias_empresa , nombre_curso , provincia, canton from inscripcion_web,empresa,cursos , tbl_provincia ,tbl_canton where id_institucion = empresa.id_empresa AND inscripcion_web.id_curso = cursos.id_curso AND inscripcion_web.id_provincia = tbl_provincia.id AND id_ciudad = tbl_canton.id ";
        
        if($cedula_busqueda!=""){
            
            $query .=" AND cedula LIKE '%$cedula_busqueda%'";
        }
        $sql=mysqli_query($conn,$query) or die(mysqli_error($conn));;
       
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Inscripciones Web";
        $i=0;

        while ($vals = mysqli_fetch_array($sql)) {
          
            
            $data[$i]['id_inscripcion_web']=$vals['id_inscripcion_web'];
            $data[$i]['id_institucion']=$vals['id_institucion'];
            $data[$i]['alias_empresa']=$vals['alias_empresa'];
            $data[$i]['nombre_curso']=$vals['nombre_curso'];
            $data[$i]['cedula']=$vals['cedula'];
            $data[$i]['id_curso']=$vals['id_curso'];
            $data[$i]['nombre']=$vals['nombre'];
            $data[$i]['apellido']=$vals['apellido'];
            $data[$i]['tipo_sangre']=$vals['tipo_sangre'];
            $data[$i]['dirreccion']=$vals['dirreccion'];
            $data[$i]['id_provincia']=$vals['id_provincia'];
            $data[$i]['provincia']=$vals['provincia'];
            $data[$i]['id_ciudad']=$vals['id_ciudad'];
            $data[$i]['celular']=$vals['celular'];
            $data[$i]['canton']=$vals['canton'];

             $data[$i]['representante']=$vals['representante'];
             if($vals['estado']== 0){
                $data[$i]['estado']=0;
                $data[$i]['nombre_estado']="EN PROCESO";
             }else{
                $data[$i]['estado']=1;
                $data[$i]['nombre_estado']="INSCRIPTO";
             }
             $data[$i]['estado']=$vals['estado'];
             $data[$i]['numero_repre']=$vals['numero_repre'];
             $data[$i]['correo']=$vals['correo'];
             $data[$i]['estudios']=$vals['estudios'];
             $data[$i]['talla_uniforme']=$vals['talla_uniforme'];
             $data[$i]['numero_calzado']=$vals['numero_calzado'];
             $data[$i]['created_at']=$vals['created_at'];

 
         $i++;
           
            
        }
        $response->data=array_slice($data, $inicio,$limite);
        echo json_encode($response);
    }



    public function eliminarInscripcion($id_inscripcion){

        $conn=conexion();
        $query= "CALL  eliminar_inscripcionWeb($id_inscripcion);";
        $eliminar= mysqli_query($conn,$query) or die(mysqli_error($conn));;   

        if ($eliminar) {
            $resp = "Inscripcion Web Eliminada";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                
               
            );
        } else{

            $resp = "No eliminada";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                
            );

        }

        echo json_encode($arry);



    }


    public function actualizarInscripcion($id_inscripcion_web ,$id_institucion ,$id_curso ,$cedula ,$nombre ,$apellido ,$tipo_sangre ,$id_provincia ,$id_ciudad,$celular ,$representante ,$numero_repre ,$correo ,$estudios ,$talla_uniforme ,$numero_calzado ,$dirreccion){
        $conn=conexion();
        $query= "CALL actualizar_inscripcionWeb('$id_inscripcion_web' ,'$id_institucion','$id_curso','$cedula' ,'$nombre' ,'$apellido' ,'$tipo_sangre' ,'$dirreccion','$id_provincia' ,'$id_ciudad','$celular' ,'$representante' ,'$numero_repre' ,'$correo' ,'$estudios','$talla_uniforme','$numero_calzado');";
        $actualizar= mysqli_query($conn,$query) or die(mysqli_error($conn));;   

        if ($actualizar) {
            $resp = "Inscripcion Web Actualizada";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                
               
            );
        } else{

            $resp = "No no actualziada";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                
            );

        }

        echo json_encode($arry);


    }
    
    public function actualizarEstado($id_inscripcion){


        $conn=conexion();
        $query= "UPDATE inscripcion_web set estado =1 where id_inscripcion_web = $id_inscripcion";
        $actualizar= mysqli_query($conn,$query) or die(mysqli_error($conn));;   

        if ($actualizar) {
            $resp = "estado Web Actualizada";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                
               
            );
        } else{

            $resp = "No no actualziada";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                
            );

        }

        echo json_encode($arry);

    }


    
    public function recuperarAlumno($id_usuario,$id_curso){

        $conn=conexion();
        $query= "Select MAX(id_alumno) AS id from alumnos where id_fkusuario_alumno = $id_usuario";
        $actualizar= mysqli_query($conn,$query) or die(mysqli_error($conn));;   
            
        $vals = mysqli_fetch_array($actualizar);



        $query_curso= "Select nombre_curso,id_fksucursal_curso,fecha_inicio_curso,fecha_fin_curso,cuota_entrada_curso,id_fkinstructor_curso,mensualidad_curso,duracion_mes_curso,precio_curso, id_sucursal, nombre_sucursal , id_instructor , nombre_instructor, apellido_instructor from cursos,sucursal,instructores where id_curso = $id_curso AND cursos.id_fkinstructor_curso = instructores.id_instructor AND cursos.id_fksucursal_curso = sucursal.id_sucursal ";
        $curso= mysqli_query($conn,$query_curso) or die(mysqli_error($conn));
            
        $vals_curso = mysqli_fetch_array($curso);





        if ($actualizar) {
            $resp = "Alumno encontrado";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "id_alumno"=>$vals['id'],
                "nombre_curso"=>$vals_curso['nombre_curso'],
                "precio"=>$vals_curso['precio_curso'],
                "fecha_inicio"=>$vals_curso['fecha_inicio_curso'],
                "fecha_fin"=>$vals_curso['fecha_fin_curso'],
                "id_instructor"=>$vals_curso['id_fkinstructor_curso'],
                "id_sucursal"=>$vals_curso['id_sucursal'],
                "nombre_sucursal"=>$vals_curso['nombre_sucursal'],
                "instructor"=>$vals_curso['nombre_instructor']." ".$vals_curso['apellido_instructor'],
                "duracion"=>$vals_curso['duracion_mes_curso'],
                "mensualidades"=>$vals_curso['mensualidad_curso'],
                "entrada"=>$vals_curso['cuota_entrada_curso'],

                
               
            );
        } else{

            $resp = "No no actualziada";
            $arry = array(
                "success" => false,
                "respuesta" => $resp,
                
            );

        }

        echo json_encode($arry);

    }
    
 
   
    
}


?>