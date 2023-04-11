
<?php
require_once ("../../../php/base/db.php");

class metodosAlumno
{

    public function insertarAlumno($nombre_alumno, $apellido_alumno, $fecha_naci_alumno, $direccion_alumno, $telefono_alumno, $celular_alumno, $instruccion_alumno, $ciudad_alumno, $estado_alumno, $correo_alumno, $cedula_alumno, $imagen_alumno, $tipo_sangre_alumno, $nombre_representante_alumno, $numero_representante_alumno, $talla_uniforme_alumno, $numero_calzado_alumno, $id_fkusuario_alumno,$id_fksucursal_alumno,$id_fkprovincia_alumno)
    
    {
        
        $conn = conexion();

        $query = "CALL  `insertar_alumno`('$nombre_alumno', '$apellido_alumno', '$fecha_naci_alumno', '$direccion_alumno', '$telefono_alumno', '$celular_alumno', '$instruccion_alumno', '$ciudad_alumno', '$estado_alumno','$correo_alumno', '$cedula_alumno','$tipo_sangre_alumno', '$imagen_alumno', '$nombre_representante_alumno', '$numero_representante_alumno', '$talla_uniforme_alumno', '$numero_calzado_alumno', '$id_fkusuario_alumno','$id_fksucursal_alumno','$id_fkprovincia_alumno')";

        $insertar = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if ($insertar) {
            $resp = "Alumno Insertado";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "tipo" => 0
            );
        } else {
            $resp = "No Insertado";

            $arry = array(
                "success" => False,
                "respuesta" => $resp,
                "tipo" => 0
            );
        }
        echo json_encode($arry);
    }

    public function actualizarAlumno($id_alumno, $nombre_alumno, $apellido_alumno, $fecha_naci_alumno, $direccion_alumno, $telefono_alumno, $celular_alumno, $instruccion_alumno, $ciudad_alumno, $estado_alumno, $correo_alumno, $cedula_alumno, $imagen_alumno, $tipo_sangre_alumno, $nombre_representante_alumno, $numero_representante_alumno, $talla_uniforme_alumno, $numero_calzado_alumno,$id_fkprovincia_alumno)
    {
        $conn = conexion();

        if($imagen_alumno==""){
            $query = "CALL  `actualizar_alumno_sin_imagen`('$id_alumno','$nombre_alumno', '$apellido_alumno', '$fecha_naci_alumno', '$direccion_alumno', '$telefono_alumno','$celular_alumno','$instruccion_alumno','$ciudad_alumno','$estado_alumno','$correo_alumno','$cedula_alumno','$tipo_sangre_alumno','$nombre_representante_alumno','$numero_representante_alumno','$talla_uniforme_alumno','$numero_calzado_alumno','$id_fkprovincia_alumno')";
        }else{
            $query = "CALL  `actualizar_alumno`('$id_alumno','$nombre_alumno', '$apellido_alumno', '$fecha_naci_alumno', '$direccion_alumno', '$telefono_alumno','$celular_alumno','$instruccion_alumno','$ciudad_alumno','$estado_alumno','$correo_alumno','$cedula_alumno','$imagen_alumno','$tipo_sangre_alumno','$nombre_representante_alumno','$numero_representante_alumno','$talla_uniforme_alumno','$numero_calzado_alumno','$id_fkprovincia_alumno')";
        }

       
        $actualizar = mysqli_query($conn, $query) or die(mysqli_error($conn));

        if ($actualizar) {
            $resp = "Alumno Actualizado";
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

    public function eliminarAlumno($id_alumno)
    {
        echo "Ingreso elimnado";
        $conn = conexion();
        $query = "CALL  eliminar_alumno($id_alumno);";
        $eliminar = mysqli_query($conn, $query);
    }


    public function verificarAlumnoInscripcion($id_alumno){
        $conn = conexion();
        
        $query = "SELECT id_inscripcion from inscripciones where inscripciones.estado_inscripcion=1 and inscripciones.id_fkalumno_inscripcion =$id_alumno";
        
        $verificar = mysqli_query($conn, $query) or die(mysqli_error($conn));
        $total = mysqli_num_rows($verificar);
        if ($verificar) {
            $resp = "Alumno con Inscripcion Activa";
            $arry = array(
                "success" => true,
                "respuesta" => $resp,
                "tipo" => 1,
                "total" => $total
            );
        } 

        echo json_encode($arry);

    }


    public function seleccionarAlumnoNoInscrito($inicio, $limite, $nombre_busqueda)
    {
        $conn = conexion();

        $response = new stdClass();
        $data = Array();
        $query = "SELECT id_alumno,nombre_alumno,apellido_alumno,direccion_alumno ,celular_alumno,correo_alumno,ciudad_alumno,cedula_alumno,imagen_alumno,alumnos.created_at FROM alumnos where id_fksucursal_alumno =0; ";

        if ($nombre_busqueda != "") {

            $query .= " AND nombre_alumno LIKE '%$nombre_busqueda%'";
        }
        ;

      
        $sql = mysqli_query($conn, $query) or die(mysqli_error($conn));

        $total = mysqli_num_rows($sql);
        $response->success = true;
        $response->total = $total;
        $response->mensaje = "Alumno No Inscrito";
        $i = 0;
        while ($vals = mysqli_fetch_array($sql)) {
            $data[$i]['id_alumno'] = $vals['id_alumno'];
            $data[$i]['nombre_alumno'] = $vals['nombre_alumno'];
            $data[$i]['apellido_alumno'] = $vals['apellido_alumno'];
            $data[$i]['direccion_alumno'] = $vals['direccion_alumno'];
            $data[$i]['correo_alumno'] = $vals['correo_alumno'];
            $data[$i]['ciudad_alumno'] = $vals['ciudad_alumno'];
            $data[$i]['celular_alumno'] = $vals['celular_alumno'];
            $data[$i]['cedula_alumno'] = $vals['cedula_alumno'];
            $data[$i]['imagen_src'] = 'data:image/jpeg;base64,' . base64_encode($vals['imagen_alumno']) . '';
            $data[$i]['imagen_alumno'] = '<img src="data:image/jpeg;base64,' . base64_encode($vals['imagen_alumno']) . '"/>';

            $i ++;
        }
        $response->data = array_slice($data, $inicio, $limite);
        echo json_encode($response);
    }

    public function seleccionarAlumnoPaginado($inicio, $limite, $nombre_busqueda, $sucursal_busqueda,$estado,$cedula,$provincia,$ciudad)
    {
        $conn = conexion();

        $response = new stdClass();
        $data = Array();
        $query = "SELECT id_alumno,nombre_alumno,id_fkprovincia_alumno,apellido_alumno,provincia,fecha_naci_alumno,direccion_alumno,telefono_alumno ,celular_alumno,instruccion_alumno,correo_alumno,ciudad_alumno,estado_alumno,cedula_alumno,imagen_alumno, tipo_sangre_alumno,nombre_representante_alumno,numero_representante_alumno,talla_uniforme_alumno, nombre_representante_alumno,numero_calzado_alumno,nombre_usuario,apellido_usuario, id_fkusuario_alumno,alumnos.created_at FROM alumnos,usuarios,tbl_provincia WHERE alumnos.id_fkusuario_alumno = usuarios.id_usuario  AND alumnos.id_fkprovincia_alumno= tbl_provincia.id ";

       if ($nombre_busqueda != "") {

            $query .= " AND nombre_alumno LIKE '%$nombre_busqueda%'";
        };

       


        if ($estado != "") {

            $query .= " AND estado_alumno=1";
        };

        if ($cedula != "") {

            $query .= " AND cedula_alumno LIKE '%$cedula%'";
        };

        if ($provincia != "") {

            $query .= " AND id_fkprovincia_alumno = $provincia";
        };

        if ($ciudad != "") {

            $query .= " AND ciudad_alumno = '$ciudad'";
        };
         
        
        
        $query.=" ORDER BY  id_alumno DESC"; 
 

        $sql = mysqli_query($conn, $query) or die(mysqli_error($conn));

        $total = mysqli_num_rows($sql);
        $response->success = true;
        $response->total = $total;
        $response->mensaje = "Alumno";
        $i = 0;
        while ($vals = mysqli_fetch_array($sql)) {
            $data[$i]['id_alumno'] = $vals['id_alumno'];
            $data[$i]['nombre_alumno'] = $vals['nombre_alumno'];
            $data[$i]['apellido_alumno'] = $vals['apellido_alumno'];
            $data[$i]['fecha_naci_alumno'] = $vals['fecha_naci_alumno'];
            $data[$i]['direccion_alumno'] = $vals['direccion_alumno'];
            $data[$i]['telefono_alumno'] = $vals['telefono_alumno'];
            $data[$i]['celular_alumno'] = $vals['celular_alumno'];
            $data[$i]['instruccion_alumno'] = $vals['instruccion_alumno'];
            $data[$i]['correo_alumno'] = $vals['correo_alumno'];
            $data[$i]['ciudad_alumno'] = $vals['ciudad_alumno'];

            if ($vals['estado_alumno'] == 1) {
                $data[$i]['nombre_estado_alumno'] = $vals['nombre_estado_usuario'] = 'Activo';
                $data[$i]['estado_alumno'] = $vals['estado_usuario'] = 1;
            }
            if ($vals['estado_alumno'] == 0) {
                $data[$i]['nombre_estado_alumno'] = $vals['nombre_estado_usuario'] = 'Inactivo';
                $data[$i]['estado_alumno'] = $vals['estado_usuario'] = 0;
            }

            $data[$i]['cedula_alumno'] = $vals['cedula_alumno'];
            $data[$i]['imagen_src'] = 'data:image/jpeg;base64,' . base64_encode($vals['imagen_alumno']) . '';
            $data[$i]['imagen_alumno'] = '<img src="data:image/jpeg;base64,' . base64_encode($vals['imagen_alumno']) . '"/>';
            $data[$i]['tipo_sangre_alumno'] = $vals['tipo_sangre_alumno'];
            $data[$i]['nombre_representante_alumno'] = $vals['nombre_representante_alumno'];
            $data[$i]['numero_representante_alumno'] = $vals['numero_representante_alumno'];
            $data[$i]['talla_uniforme_alumno'] = $vals['talla_uniforme_alumno'];
            $data[$i]['nombre_representante_alumno'] = $vals['nombre_representante_alumno'];
            $data[$i]['numero_calzado_alumno'] = $vals['numero_calzado_alumno'];

            
            $data[$i]['nombre_usuario'] = $vals['nombre_usuario'] . " " . $vals['apellido_usuario'];

            $data[$i]['id_fkusuario_alumno'] = $vals['id_fkusuario_alumno'];
        
            $data[$i]['created_at'] = $vals['created_at'];
            $data[$i]['nombre_sucursal'] = $vals['nombre_sucursal'];
            $data[$i]['id_fkprovincia_alumno'] = $vals['id_fkprovincia_alumno'];
            $data[$i]['provincia'] = $vals['provincia'];

            //Edad
            $nacimiento = new DateTime($vals['fecha_naci_alumno']);
            $ahora = new DateTime(date("Y-m-d"));
            $diferencia = $ahora->diff($nacimiento);
            $data[$i]['edad'] = $diferencia->format("%y") ." " .'años';

            $i ++;
        }
        $response->data = array_slice($data, $inicio, $limite);
        echo json_encode($response);
    }


    public function recuperarImagen($id_alumno){

        $conn = conexion();
     
        
        $query = "SELECT imagen_alumno from alumnos where id_alumno =$id_alumno";
        
        $imagen = mysqli_query($conn, $query) or die(mysqli_error($conn));
        $resp="Encotrada";
        $vals = mysqli_fetch_array($imagen);

        $arry = array(
            "success" => true,
            "respuesta" => $resp,
            "imagen" =>  'data:image/jpeg;base64,' . base64_encode($vals['imagen_alumno']) .''
        );

        echo json_encode($arry);



    }
}

?>