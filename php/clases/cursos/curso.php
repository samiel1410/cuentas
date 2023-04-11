<?php
require_once ("../../../php/base/db.php");


class metodosCurso
{

    public function insertarCurso($nombre_curso, $estado_curso, $mensualidad_curso, $iva_curso, $id_fkinstructor_curso, $id_fkusuario_curso, $id_fksucursal_curso, $duracion_mes_curso, $cuota_entrada_curso, $cupos_curso, $fecha_inicio_curso, $fecha_fin_curso, $imagen_curso,$precio_curso,$horas_curso,$ruta_final)
    {
        $conn = conexion();

        $query = "CALL  `insertar_curso`( '$nombre_curso','$estado_curso','$mensualidad_curso','$iva_curso','$id_fkinstructor_curso','$id_fkusuario_curso','$id_fksucursal_curso','$duracion_mes_curso','$cuota_entrada_curso','$cupos_curso','$fecha_inicio_curso','$fecha_fin_curso','$imagen_curso','$precio_curso','$horas_curso','$ruta_final')";

        $insertar = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if ($insertar) {
            $resp = "Curso creado";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "tipo" => 0
            );
        } else {
            $resp = "No Ingresado";

            $arry = array(
                "success" => False,
                "respuesta" => $resp,
                "tipo" => 0
            );
        }

        echo json_encode($arry);
    }

    public function actualizarCurso($id_curso, $nombre_curso, $estado_curso, $mensualidad_curso, $iva_curso, $id_fkinstructor_curso, $id_fksucursal_curso, $duracion_mes_curso, $cuota_entrada_curso, $cupos_curso, $fecha_inicio_curso, $fecha_fin_curso, $imagen_curso,$precio_curso,$horas_curso,$ruta_final)
    {
        $conn = conexion();
        if($imagen_curso==""){
           
            $query = "CALL  `actualizar_curso_sin_imagen`('$id_curso','$nombre_curso','$estado_curso','$mensualidad_curso','$iva_curso','$id_fkinstructor_curso','$id_fksucursal_curso','$duracion_mes_curso','$cuota_entrada_curso','$cupos_curso','$fecha_inicio_curso','$fecha_fin_curso','$precio_curso','$horas_curso')";

        }else{
          
            $query = "CALL  `actualizar_curso`('$id_curso','$nombre_curso','$estado_curso','$mensualidad_curso','$iva_curso','$id_fkinstructor_curso','$id_fksucursal_curso','$duracion_mes_curso','$cuota_entrada_curso','$cupos_curso','$fecha_inicio_curso','$fecha_fin_curso','$imagen_curso','$precio_curso','$horas_curso','$ruta_final')";
        }

       
        $actualizar = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if ($actualizar) {
            $resp = "Curso Actualizado";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "tipo" => 1
            );
        } else {
            $resp = "No Actualizado";

            $arry = array(
                "success" => False,
                "respuesta" => $resp,
                "tipo" => 1
            );
        }

        echo json_encode($arry);
    }

    public function eliminarCurso($id_curso)
    {
        $conn = conexion();

        $query = "CALL  eliminar_curso($id_curso);";
        $eliminar = mysqli_query($conn, $query);
    }
    public function verificarCursoAlumno($id_curso){

        $conn = conexion();

        $query = "Select id_alumno from alumnos,inscripciones where inscripciones.id_fkalumno_inscripcion = alumnos.id_alumno and inscripciones.id_fkcurso_inscripcion = $id_curso AND estado_inscripcion=1" ;
        
        $verificar = mysqli_query($conn, $query) or die(mysqli_error($conn));
        $total = mysqli_num_rows($verificar);
        if ($verificar) {
            $resp = "Alumno en este curso";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "tipo" => 1,
                "total" => $total
            );
        } 

        echo json_encode($arry);

    }

    public function seleccionarInstructor($instructor_busqueda)
    
    {
        
        $conn = conexion();

        $query = "SELECT id_fkinstructor_curso,nombre_instructor,apellido_instructor,nombre_curso,cuota_entrada_curso,mensualidad_curso from cursos,instructores where id_curso=$instructor_busqueda and instructores.id_instructor = cursos.id_fkinstructor_curso;  ";
        $sql = mysqli_query($conn, $query);
        $vals = mysqli_fetch_array($sql);

        $arry = array(
            "success" => true,
            "nombre" => $vals['nombre_instructor'] . " " . $vals['apellido_instructor'],

            'matricula' => $vals['cuota_entrada_curso'],
            'mensualidad' => $vals['mensualidad_curso'],
            'nombre_curso' => $vals['nombre_curso']
        );
        echo json_encode($arry);
    }

    public function seleccionarCursoPaginado($inicio, $limite, $nombre_busqueda, $sucursal_busqueda,$estado,$mes,$anio,$fecha_start,$fecha_end)
    {
        $rol=  $_SESSION['rol_usuario'];
        $id_sucursal =  $_SESSION['id_fksucursal_usuario'];
        $conn = conexion();

        if($rol ==1){

            $query = "SELECT id_curso,nombre_curso,mensualidad_curso,horas_curso,precio_curso,estado_curso,fecha_inicio_curso,fecha_fin_curso,iva_curso,imagen_curso, id_fksucursal_curso,nombre_sucursal,duracion_mes_curso,cuota_entrada_curso,cupos_curso,id_fkinstructor_curso,nombre_instructor,apellido_instructor, id_fkusuario_curso, nombre_usuario, cursos.created_at FROM cursos,sucursal,instructores, usuarios WHERE cursos.id_fksucursal_curso=sucursal.id_sucursal AND cursos.id_fkinstructor_curso=instructores.id_instructor AND cursos.id_fkusuario_curso = usuarios.id_usuario ";
            
        }

        else{

            $query = "SELECT id_curso,nombre_curso,mensualidad_curso,horas_curso,precio_curso,estado_curso,fecha_inicio_curso,fecha_fin_curso,iva_curso,imagen_curso, id_fksucursal_curso,nombre_sucursal,duracion_mes_curso,cuota_entrada_curso,cupos_curso,id_fkinstructor_curso,nombre_instructor,apellido_instructor, id_fkusuario_curso, nombre_usuario, cursos.created_at FROM cursos,sucursal,instructores, usuarios WHERE cursos.id_fksucursal_curso=sucursal.id_sucursal AND cursos.id_fkinstructor_curso=instructores.id_instructor AND cursos.id_fkusuario_curso = usuarios.id_usuario AND  id_fksucursal_curso = $id_sucursal";
        }
 
        

        $response = new stdClass();
        $data = Array();
        

        if ($nombre_busqueda != "") {

            $query .= " AND nombre_curso LIKE '%$nombre_busqueda%'";
        }
        ;
        
        if ($sucursal_busqueda != "") {

            $query .= " AND id_fksucursal_curso= $sucursal_busqueda";
        }
        ;

        if ($estado != "") {

            $query .= " AND estado_curso= $estado";
        };


        
        if($mes!=0 || $anio != 0){

            $fecha_inicio= $anio.'-'.$mes.'-01';
            $dias_fin = date( 't', strtotime( $fecha_inicio ) );

            $fecha_fin =$anio.'-'.$mes.'-'.$dias_fin;

        

            $query .=" AND fecha_inicio_curso BETWEEN '$fecha_inicio' AND '$fecha_fin'";
         


            
           
        };

        if($fecha_start!="" || $fecha_end!= ""){
            $query .=" AND fecha_inicio_curso BETWEEN '$fecha_start' AND '$fecha_end'";

        }

        $query .= " ORDER BY id_curso";

        
    

        $sql = mysqli_query($conn, $query) or die(mysqli_error($conn));

        $total = mysqli_num_rows($sql);
        $response->success = true;
        $response->total = $total;
        $response->mensaje = "Cursos";
        $i = 0;

        while ($vals = mysqli_fetch_array($sql)) {

            $data[$i]['id_curso'] = $vals['id_curso'];
            $data[$i]['nombre_curso'] = $vals['nombre_curso'];
            $data[$i]['mensualidad_curso'] = $vals['mensualidad_curso'];

            if ($vals['estado_curso'] == 1) {
                $data[$i]['nombre_estado_curso'] = $vals['nombre_estado_curso'] = 'Activo';
                $data[$i]['estado_curso'] = $vals['estado_curso'] = 1;
            } else {
                $data[$i]['nombre_estado_curso'] = $vals['nombre_estado_curso'] = 'Inactivo';
                $data[$i]['estado_curso'] = $vals['estado_curso'] = 0;
            }
            $data[$i]['id_fkinstructor_curso'] = $vals['id_fkinstructor_curso'];
            $data[$i]['nombre_instructor'] = $vals['nombre_instructor'] . " " . $vals['apellido_instructor'];

            $data[$i]['nombre_sucursal'] = $vals['nombre_sucursal'];
            $data[$i]['iva_curso'] = $vals['iva_curso'];
            $data[$i]['id_fkusuario_curso'] = $vals['id_fkusuario_curso'];
            $data[$i]['id_fksucursal_curso'] = $vals['id_fksucursal_curso'];
            $data[$i]['duracion_mes_curso'] = $vals['duracion_mes_curso'];
            $data[$i]['cuota_entrada_curso'] = $vals['cuota_entrada_curso'];
            $data[$i]['cupos_curso'] = $vals['cupos_curso'];
            $data[$i]['nombre_usuario'] = $vals['nombre_usuario'];
            $data[$i]['fecha_inicio_curso'] = $vals['fecha_inicio_curso'];
            $data[$i]['fecha_fin_curso'] = $vals['fecha_fin_curso'];
            $data[$i]['imagen_src'] = 'data:image/jpeg;base64,' . base64_encode($vals['imagen_curso']) . '';
            $data[$i]['imagen_curso'] = '<img src="data:image/jpeg;base64,' . base64_encode($vals['imagen_curso']) . '"/>';
            $data[$i]['created_at'] = $vals['created_at'];
            $data[$i]['precio_curso'] = $vals['precio_curso'];
            $data[$i]['horas_curso'] = $vals['horas_curso'];
            $i ++;
        }
        $response->data = array_slice($data, $inicio, $limite);
        echo json_encode($response);
    }


    public function recuperarIva($id_curso){

        $conn = conexion();
     

        $query = "SELECT iva_curso from cursos where id_curso=$id_curso";
        $sql = mysqli_query($conn, $query)  or die(mysqli_error($conn));
        $vals = mysqli_fetch_array($sql);

        
        $arry = array(
            "success" => true,
            "iva" => $vals['iva_curso'] ,

        
        );
        echo json_encode($arry);

    }
}

?>