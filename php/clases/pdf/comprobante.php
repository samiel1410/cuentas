<?php
require_once ("../../../php/base/db.php");
require_once('library/tcpdf.php');


class metodoComprobante
{

    public function comprobante(  $id_usuario,
    $fecha,
    $concepto,
    $estado,
    $numero,
    $monto,
    $forma_pago,$nombre_alumno,$orden,$id_forma
)

    {
        $conn = conexion();

        // create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->setPageOrientation(PDF_PAGE_ORIENTATION); // PDF_PAGE_ORIENTATION---> 'l' or 'p'
// set document information

// Print text using writeHTMLCell()
$pdf->AddPage('L', 'A4');



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
.letra{
    font-size: 12px;
}
</style>
  </style>
';
// set some language-dependent strings (optional)

// ---------------------------------------------------------

// set font
$pdf->SetFont('dejavusans', '', 10);


$pageWidth = $pdf->getPageWidth();
$pageHeight = $pdf->getPageHeight();

// Definir las coordenadas para la primera imagen (izquierda)
$imageWidth = $pageWidth / 2;
$imageHeight = $pageHeight;
$x1 = 0;
$y1 = 0;
$bMargin = $pdf->getBreakMargin();
// get current auto-page-break mode
$auto_page_break = $pdf->getAutoPageBreak();
// disable auto-page-break
$pdf->SetAutoPageBreak(false, 0);
// set bacground image
$img_file = '../../../php/clases/pdf/images/mebrete.jpg';
$pdf->Image($img_file, $x1, $y1, $imageWidth, $imageHeight, '', '', '', false, 300, '', false, false, 0, false, false, false);

// Definir las coordenadas para la segunda imagen (derecha)
$x2 = $pageWidth / 2;
$y2 = 0;

// Agregar la segunda imagen
$pdf->Image($img_file, $x2, $y2, $imageWidth, $imageHeight, '', '', '', false, 300, '', false, false, 0, false, false, false);

$pdf->SetAutoPageBreak($auto_page_break, $bMargin);
// set the starting point for the page content
$pdf->setPageMark();

$query = "Select nombre_usuario , apellido_usuario ,correo_usuario ,nombre_sucursal from usuarios,sucursal where id_usuario = '$id_usuario' and usuarios.id_fksucursal_usuario = sucursal.id_sucursal ";
$recuperar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
$vals = mysqli_fetch_array($recuperar);




//queru forma de pago
$query_forma = "Select numero_cuenta from forma_pago where id_forma= $id_forma";
$recuperar_forma= mysqli_query($conn,$query_forma) or  die(mysqli_error($conn));
$forma = mysqli_fetch_array($recuperar_forma);

$html='<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
</head>
<body>
<table>
<tr>
<td style="background-image: url("C:\xampp\htdocs\Legion\php\clases\pdf\images\mebrete.jpg"); background-repeat: no-repeat; background-size: cover;">
<div></div>
<div></div>
    <div style="font-size: 10px; height:0">
    <b>'.$vals['nombre_usuario']." ".$vals['apellido_usuario'].'</b>  <br/>
      <b>Sucursal:'.$vals['nombre_sucursal'].'</b> <br/>
     
    </div>
    
    <div style="text-align:center;font-size:15px">
   <b>COMPROBANTE DE PAGO</b>  
        <br/>
        No.-'.$numero.'
        
      
      
    </div>
    <div style="text-align:right;font-size:9px">fecha emision:'.date('Y-m-d').' </div>
    <div id="outer">
        <table style=" border-collapse: collapse;
        border-spacing: 0; ">
            <tr style="text-align: left;
            vertical-align: top;"> 
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Fecha:</b> '.$fecha.' </td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b>MONTO PAGADO: </b>'.$monto.' </td>
            </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Cobrado por: </b> '.$vals['nombre_usuario'].' '.$vals['apellido_usuario'].' </td>
                
                <td style="border: solid 1px #aaa999;  height: 40px;"><b>Estado:</b> '.$estado.' </td>
            </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Sucursal:</b> '.$vals['nombre_sucursal'].'</td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Alumno:</b> '.$nombre_alumno.'</td>
            </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Forma de Pago:</b>'.$forma_pago." " ."N°".$forma['numero_cuenta'].' </td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Orden de Pedido:</b>'.$orden.' <br/>
       <b>Mensualidades:</b> <br/>'.$concepto.'
                
                
                </td>
            </tr>
        </table>
    </div>
 
    <div id="outer">
        <table style=" border-collapse: collapse;
        border-spacing: 0; ">
        <tr style="text-align: left;
        vertical-align: top;">
            <td style="border: solid 1px #aaa999;height: 25px; "><b>RECIBIDO POR :</b> </td>
           
        </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 0px;
                padding: 10px;">
                <div>NOMBRE:</div>
                <p>FIRMA: <span>...........................................</span>  <span style="color:white;">............................ </span> <span style="width:10px;text-align:right">FECHA:</span>
              </p> 
           
                </td>
                
                
            </tr>
        </table>
    </div>
    </td>
    
    <td>



<div></div>
<br/>
<br/>
    <div style="font-size: 10px; height:0">
    <b>'.$vals['nombre_usuario']." ".$vals['apellido_usuario'].'</b>  <br/>
      <b>Sucursal:'.$vals['nombre_sucursal'].'</b> <br/>
      
    </div>
    
    <div style="text-align:center;font-size:15px">
   <b>COMPROBANTE DE PAGO</b>  
        <br/>
        No.-'.$numero.'
        
      
      
    </div>
    <div style="text-align:right;font-size:9px">fecha emision:'.date('Y-m-d').' </div>
    <div id="outer">
        <table style=" border-collapse: collapse;
        border-spacing: 0; ">
            <tr style="text-align: left;
            vertical-align: top;"> 
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Fecha:</b> '.$fecha.' </td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b>MONTO PAGADO: </b>'.$monto.' </td>
            </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Cobrado por: </b> '.$vals['nombre_usuario'].' '.$vals['apellido_usuario'].' </td>
                
                <td style="border: solid 1px #aaa999;  height: 40px;"><b>Estado:</b> '.$estado.' </td>
            </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Sucursal:</b> '.$vals['nombre_sucursal'].'</td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Alumno:</b> '.$nombre_alumno.'</td>
            </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Forma de Pago:</b>'.$forma_pago." " ."N°".$forma['numero_cuenta'].' </td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Orden de Pedido:</b>'.$orden.' <br/>
       <b>Mensualidades:</b> <br/>'.$concepto.'
                
                
                </td>
            </tr>
        </table>
    </div>
 
    <div id="outer">
        <table style=" border-collapse: collapse;
        border-spacing: 0; ">
        <tr style="text-align: left;
        vertical-align: top;">
            <td style="border: solid 1px #aaa999;height: 25px; "><b>RECIBIDO POR :</b> </td>
           
        </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 0px;
                padding: 10px;">
                <div>NOMBRE:</div>
                <p>FIRMA: <span>...........................................</span>  <span style="color:white;">............................ </span> <span style="width:10px;text-align:right">FECHA:</span>
              </p> 
           
                </td>
                
                
            </tr>
        </table>
    </div>
    </td>

    

    </tr>
</table>


 
</body>
</html>';
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->writeHTML($style, true, false, true, false, '');
$pdf->writeHTML($html, true, false, true, false, '');




$pdf->Output('example_001.pdf', 'I');

    }
}




//============================================================+
// END OF FILE
//============================================================+


?>