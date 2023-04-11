<?php
require_once ("../../../php/base/db.php");
require_once('library/tcpdf.php');


class metodoFicha
{

    public function ficha( $fecha_naci,$provincia,$ciudad,$id_alumno,$edad 
  
)

    {
        $conn = conexion();

        // create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information

// Print text using writeHTMLCell()




// set default monospaced font


// set auto page breaks

$style = '
<style>
table {
    border-collapse: collapse;
    border-spacing: 0;
}

table tr th {
    border: solid 1px #aaa999;

}

table tr td {
    border: solid 1px #aaa999;


}

table tr td:nth-child(1) {
    text-align: left;
    vertical-align: top;
}

table tr td:nth-child(2) {
    text-align: left;
    vertical-align: top;
}





#outer {

    width: 100%;
    display: flex;
    justify-content: center;
}

.right {
    float: right;

}

table {
    width: 65%;
    height: 300px;
    text-align: left;
    vertical-align: middle;
    ;
}
  </style>
';
// set some language-dependent strings (optional)

// ---------------------------------------------------------

// set font
$pdf->SetFont('dejavusans', '', 10);

// add a page
$pdf->AddPage();
$bMargin = $pdf->getBreakMargin();
// get current auto-page-break mode
$auto_page_break = $pdf->getAutoPageBreak();
// disable auto-page-break
$pdf->SetAutoPageBreak(false, 0);
// set bacground image
$img_file = '../../../php/clases/pdf/images/mebrete.jpg';
$pdf->Image($img_file, 0, 0, 210, 297, '', '', '', false, 300, '', false, false, 0);
// restore auto-page-break status
$pdf->SetAutoPageBreak($auto_page_break, $bMargin);
// set the starting point for the page content
$pdf->setPageMark();

$query_alumno = "Select nombre_alumno,apellido_alumno,imagen_alumno, nombre_representante_alumno,numero_representante_alumno,celular_alumno,correo_alumno from alumnos where id_alumno= $id_alumno";
$alumno= mysqli_query($conn,$query_alumno) or  die(mysqli_error($conn));
$valsA = mysqli_fetch_array($alumno);
$data = Array();
$query = "Select nombre_curso,id_inscripcion,precio_curso   from inscripciones,cursos where inscripciones.id_fkalumno_inscripcion = $id_alumno AND inscripciones.id_fkcurso_inscripcion = cursos.id_curso";
$recuperar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
$total_aux=0;
$cobrado = Array();
$i=0;
while($vals2 = mysqli_fetch_array($recuperar)){
    $id_inscripcion = $vals2['id_inscripcion'];

    $query_cobrado= "Select sum(saldo_mensualidad) total from mensualidades WHERE mensualidades.id_fkinscripcion_mensualidad =  $id_inscripcion AND estado_mensualidad=1";
    $cobrado_que= mysqli_query($conn,$query_cobrado) or  die(mysqli_error($conn));


    $cobra = mysqli_fetch_array($cobrado_que);

    if($cobra['total']>0)
{
    $cobrado[$i]['cobrado'] =  $cobra['total'];
} else{
    $cobrado[$i]['cobrado'] =  0;
}
 


    $i++;
    



}

$html='<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
   
</head>
<body>

    <div style="text-align:center;font-size:15px">
    <br/>
     <br/>
     <br/>
     <br/>
     
       

        <b>FICHA PERSONAL DEL ALUMNO</b>
        <br/>
        No.-'.$id_alumno.'
    </div>
    <div style="text-align:right;font-size:9px">fecha emision:'.date('Y-m-d').' </div>
    <div id="outer">
        <table style=" border-collapse: collapse;
        border-spacing: 0; ">
            <tr style="text-align: left;
            vertical-align: top;"> 
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Nombres Y Apellidos :</b> '.$valsA['nombre_alumno'].' '.$valsA['apellido_alumno'].'    </td>
                <td style="border: solid 1px #aaa999;height: 40px; text-align: center" > <img  width="150" height="100" src="data:image/jpeg;base64,' . base64_encode($valsA['imagen_alumno']) . '"/>  </td>
            </tr>
           
            
        </table>
    </div>
    <br>
 <div style="text-align: center;">
    <table style=" border-collapse: collapse;
    border-spacing: 0; style="text-align: center;"">
        <tr style="text-align: left;
        vertical-align: top;"> 
            <td style="border: solid 1px #aaa999;height: 40px;"><b>Fecha de Nacimiento :</b> '.$fecha_naci.' </td>
            <td style="border: solid 1px #aaa999;height: 40px;"><b> Edad :</b> '.$edad.' </td>
        </tr>
        <tr style="text-align: left;
        vertical-align: top;">
             <td style="border: solid 1px #aaa999;height: 40px;"><b>Provincia :</b> '.$provincia.' </td>
             <td style="border: solid 1px #aaa999;height: 40px;"><b> Ciudad:</b> '.$ciudad.' </td>
        </tr>
        <tr style="text-align: left;
        vertical-align: top;">
             <td style="border: solid 1px #aaa999;height: 40px;"><b>Celular :</b> '.$valsA['celular_alumno'].' </td>
             <td style="border: solid 1px #aaa999;height: 40px;"><b> Correo:</b> '.$valsA['correo_alumno'].' </td>
        </tr>
        
    </table>
</div>


<br>
<div style="text-align: center;"> <b>Datos Familiares</b> </div>
<div style="text-align: center;">
    <table style=" border-collapse: collapse;
    border-spacing: 0; ">
        <tr style="text-align: left;
        vertical-align: top;"> 
            <td style="border: solid 1px #aaa999;height: 40px;"><b>Nombre Representante :</b> '.$valsA['nombre_representante_alumno'].' </td>
            <td style="border: solid 1px #aaa999;height: 40px;"><b> Numero Representante :</b> '.$valsA['numero_representante_alumno'].' </td>
        </tr>
        
        
    </table>
</div>
<br>
<div style="text-align: center;"> <b>Informacion Academica</b> </div>





</body>
</html>';



// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->writeHTML($style, true, false, true, false, '');
$pdf->writeHTML($html, true, false, true, false, '');


$k=0;
$query_re = "Select nombre_curso,id_inscripcion,precio_curso  from inscripciones,cursos where inscripciones.id_fkalumno_inscripcion = $id_alumno AND inscripciones.id_fkcurso_inscripcion = cursos.id_curso";
$recuperar_re= mysqli_query($conn,$query_re) or  die(mysqli_error($conn));

while ($vals = mysqli_fetch_array($recuperar_re)) {

    
    $tabla_cusos ='
    <div id="outer">
        <table style=" border-collapse: collapse;
        border-spacing: 0; ">
    
     
    
            <tr style="text-align: left;
            vertical-align: top;"> 
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Curso :</b> '.$vals['nombre_curso'].' </td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b> Pagado :</b> '.$cobrado[$k]['cobrado'].' '.'$'.'  </td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b> Total :</b> '.$vals['precio_curso'].' '.'$'.' </td>
            </tr>
        
      
           
           
            
        </table>
    </div>';
    $k++;
    
    $pdf->writeHTML($tabla_cusos, true, false, true, false, '');


}

$pdf->Output('example_001.pdf', 'I');

    }
}




//============================================================+
// END OF FILE
//============================================================+


?>