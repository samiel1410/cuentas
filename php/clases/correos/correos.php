
<?php
require_once "../../../php/base/db.php";
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

//Load Composer's autoloader
require 'vendor/autoload.php';
class metodosCorreos
{

    public function enviarCorreoUsuario()
    {
        $conn = conexion();
        $query = "SELECT MAX(id_usuario) AS id FROM usuarios";
        $sql = mysqli_query($conn, $query) or die(mysqli_error($conn));

        $vals = mysqli_fetch_array($sql);
        $id_usuario = $vals['id'];

        $query_usuarios = "SELECT id_usuario,nombre_usuario,apellido_usuario,clave_usuario,rol_usuario,correo_usuario,id_fksucursal_usuario , nombre_sucursal , codigo_sucursal,id_fkempresa_sucursal,nombre_empresa from usuarios,sucursal,empresa where id_usuario=$id_usuario AND id_fksucursal_usuario= sucursal.id_sucursal AND id_fkempresa_sucursal = empresa.id_empresa";
        $sql_usuarios = mysqli_query($conn, $query_usuarios) or die(mysqli_error($conn));

        $vals_usuarios = mysqli_fetch_array($sql_usuarios);

        $nombre = $vals_usuarios['nombre_usuario'] . " " . $vals_usuarios['apellido_usuario'];
        $clave = $vals_usuarios['clave_usuario'];
        $correo = $vals_usuarios['correo_usuario'];

        $clave = base64_decode($clave);

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 0; //Enable verbose debug output
            $mail->isSMTP(); //Send using SMTP
            $mail->Host = 'mail.grupolalegion.ec'; //Set the SMTP server to send through
            $mail->SMTPAuth = true; //Enable SMTP authentication
            $mail->Username = 'info@grupolalegion.ec'; //SMTP username
            $mail->Password = 'Legionario81.'; //SMTP password
            $mail->SMTPSecure = 'ssl'; //Enable implicit TLS encryption
            $mail->Port = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('info@grupolalegion.ec', 'Grupo la Legion');
            $mail->addAddress($correo); //Add a recipient
            /* $mail->addAddress('ellen@example.com');               //Name is optional
            $mail->addReplyTo('info@example.com', 'Information');
            $mail->addCC('cc@example.com');
            $mail->addBCC('bcc@example.com');*/

            //Attachments
            //Optional name

            //Content
            $mail->isHTML(true); //Set email format to HTML
            $mail->Subject = 'Bienvenido a Grupo La Legion';
            $mail->Body = "Hola $nombre <br>
    Este correo contiene sus Credeciales para entrar al sistema: <br>
    https://rea.grupolalegion.ec/
    <br>Correo:<b>$correo</b> <br> Contraseña: <b>$clave </b>";
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            echo 'Mensaje enviasdo';
        } catch (Exception $e) {
            echo "No se ha enviado.  Error: {$mail->ErrorInfo}";
        }

    }

    public function enviarCorreoAlumno()
    {

        $id_usuario = $_SESSION['id_usuario'];
        $conn = conexion();
        $query = "SELECT id_fkalumno_inscripcion from inscripciones where id_inscripcion = (SELECT MAX(id_inscripcion) AS id FROM inscripciones WHERE id_fkusuario_inscripcion= $id_usuario)";
        $sql = mysqli_query($conn, $query) or die(mysqli_error($conn));

        $vals = mysqli_fetch_array($sql);
        $id_alumno = $vals['id_fkalumno_inscripcion'];

        $query_alumno = "Select nombre_alumno , apellido_alumno , correo_alumno ,cedula_alumno , nombre_curso from alumnos , inscripciones , cursos where inscripciones.id_fkalumno_inscripcion =  $id_alumno AND cursos.id_curso = inscripciones.id_fkcurso_inscripcion AND inscripciones.id_fkalumno_inscripcion = alumnos.id_alumno;";
        $sql_alumno = mysqli_query($conn, $query_alumno) or die(mysqli_error($conn));

        $vals_alumnos = mysqli_fetch_array($sql_alumno);

        $nombre = $vals_alumnos['nombre_alumno'] . " " . $vals_alumnos['apellido_alumno'];
        $clave = $vals_alumnos['cedula_alumno'];
        $correo = $vals_alumnos['correo_alumno'];
        $usuario=$vals_alumnos['cedula_alumno'];
        $curso = $vals_alumnos['nombre_curso'];

     
        echo $correo;
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 0; //Enable verbose debug output
            $mail->isSMTP(); //Send using SMTP
            $mail->Host = 'mail.grupolalegion.ec'; //Set the SMTP server to send through
            $mail->SMTPAuth = true; //Enable SMTP authentication
            $mail->Username = 'info@grupolalegion.ec'; //SMTP username
            $mail->Password = 'Legionario81.'; //SMTP password
            $mail->SMTPSecure = 'ssl'; //Enable implicit TLS encryption
            $mail->Port = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('info@grupolalegion.ec', 'Grupo la Legion');
            $mail->addAddress($correo); //Add a recipient
            /* $mail->addAddress('ellen@example.com');               //Name is optional
            $mail->addReplyTo('info@example.com', 'Information');
            $mail->addCC('cc@example.com');
            $mail->addBCC('bcc@example.com');*/

            //Attachments
        //    $mail->AddEmbeddedImage('images/logo1.png', 'logo1.png');
            //Optional name

            //Content
            $mail->isHTML(true); //Set email format to HTML
            $mail->Subject = 'Bienvenido a grupo la Legion';
                    $mail->Body = "Hola $nombre <br>
            Te damos la bienvenida a Grupo la Legion. <br>

            Ha sido inscripto en el curso de $curso el dia hoy.<br>

            Gracias por unirte a nosotros , estaremos encantados de preparte.<br>

            Se adjunta su usuario y contraseña para verificar sus certificados al finalizar el curso
           
            <br>Usuario:<b>$usuario</b> <br> Contraseña: <b>$clave </b>";
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            echo 'Mensaje enviasdo';
        } catch (Exception $e) {
            echo "No se ha enviado.  Error: {$mail->ErrorInfo}";
        }

    }


    public  function enviarCorreoComprobantes($id_orden){


        $id_usuario = $_SESSION['id_usuario'];
        $conn = conexion();
        $query = "Select id_fkinscripcion_orden_pedido from orden_pedido where id_orden_pedido = $id_orden";
        $sql = mysqli_query($conn, $query) or die(mysqli_error($conn));

        $vals = mysqli_fetch_array($sql);
        $id_inscripcion= $vals['id_fkinscripcion_orden_pedido'];



        //conceptos de pago
        $query_detalles = "Select nombre_orden_pedido_detalle from orden_pedido_detalle where id_fkorden_pedido_detalle = $id_orden ";
        $detalle=mysqli_query($conn,$query_detalles)  or die(mysqli_error($conn));

        
        $query_mensualidad = "Select fecha_pago_mensualidad from mensualidades where id_fkorden_pedido_mensualidad = $id_orden ";
        $mensualidad=mysqli_query($conn,$query_mensualidad)  or die(mysqli_error($conn));
     

        while ($detalles = mysqli_fetch_array($detalle)  and    $meses = mysqli_fetch_array($mensualidad))  {
            $concepto_aux =  $detalles['nombre_orden_pedido_detalle'];
            $mes =  $meses['fecha_pago_mensualidad'];
  
        $concepto .= $concepto_aux. "-".ucfirst(strftime("%B", strtotime($mes)))."<br>";

        }



        //datos de alumno
        $query_alumno = "Select nombre_alumno , apellido_alumno , correo_alumno , nombre_curso from alumnos , inscripciones ,cursos where inscripciones.id_inscripcion = $id_inscripcion AND inscripciones.id_fkalumno_inscripcion = alumnos.id_alumno AND inscripciones.id_fkcurso_inscripcion = cursos.id_curso; ";
        $sql_alumno = mysqli_query($conn, $query_alumno) or die(mysqli_error($conn));

        $vals_alumnos = mysqli_fetch_array($sql_alumno);

        $nombre = $vals_alumnos['nombre_alumno'] . " " . $vals_alumnos['apellido_alumno'];
        $clave = $vals_alumnos['cedula_alumno'];
        $correo = $vals_alumnos['correo_alumno'];
        $usuario=$vals_alumnos['cedula_alumno'];
        $curso = $vals_alumnos['nombre_curso'];

     
        
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 0; //Enable verbose debug output
            $mail->isSMTP(); //Send using SMTP
            $mail->Host = 'mail.grupolalegion.ec'; //Set the SMTP server to send through
            $mail->SMTPAuth = true; //Enable SMTP authentication
            $mail->Username = 'info@grupolalegion.ec'; //SMTP username
            $mail->Password = 'Legionario81.'; //SMTP password
            $mail->SMTPSecure = 'ssl'; //Enable implicit TLS encryption
            $mail->Port = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('info@grupolalegion.ec', 'Grupo la Legion');
            $mail->addAddress($correo); //Add a recipient
            /* $mail->addAddress('ellen@example.com');               //Name is optional
            $mail->addReplyTo('info@example.com', 'Information');
            $mail->addCC('cc@example.com');
            $mail->addBCC('bcc@example.com');*/

            //Attachments
        //    $mail->AddEmbeddedImage('images/logo1.png', 'logo1.png');
            //Optional name
            $mail->AddAttachment($_SERVER['DOCUMENT_ROOT'].'php/clases/pdf/tmp/comprobante.pdf', 'comprobante.pdf');
            //Content
            $mail->isHTML(true); //Set email format to HTML
            $mail->Subject = 'Informacion de Pago';
                    $mail->Body = "Hola $nombre <br>
            Se ha realizado un pago a su nombre <br>

            Del curso $curso el dia hoy.<br>

           
            Se adjunta el comprobante  ";
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            echo 'Mensaje enviasdo';

            If (unlink($_SERVER['DOCUMENT_ROOT'].'php/clases/pdf/tmp/comprobante.pdf')) {

                echo "archivo eliminado";
              
              } else {
              
                echo "archivo no eliminado";
              
              }
              
        } catch (Exception $e) {
            echo "No se ha enviado.  Error: {$mail->ErrorInfo}";
        }

    }
}

?>