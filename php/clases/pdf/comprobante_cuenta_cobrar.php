<?php
require_once ("../../../php/base/db.php");
require_once('library/tcpdf.php');


class metodoComprobanteCuentaCobrar
{

    public function comprobante( $numero ,
    $cliente,
    $tipo_documento ,
    $numero_documento ,
    $fecha_emision ,
    $fecha_venc ,
    $monto  ,
    $observacion ,
    $estado ,
    $sucursal ,
    $departamento 
   
)

    {
        $conn = conexion();

        // create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->setPageOrientation(PDF_PAGE_ORIENTATION); // PDF_PAGE_ORIENTATION---> 'l' or 'p'
// set document information

// Print text using writeHTMLCell()
$pdf->AddPage('L', 'LETTER');



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
$img_file = '';

$pdf->Image($img_file, 0, 0, 210, 297, '', '', '', false, 300, '', false, false, 0);
// restore auto-page-break status
$pdf->SetAutoPageBreak($auto_page_break, $bMargin);
// Definir las coordenadas para la segunda imagen (derecha)
$x2 = $pageWidth / 2;
$y2 = 0;

// Agregar la segunda imagen
//$pdf->Image($img_file, $x2, $y2, $imageWidth, $imageHeight, '', '', '', false, 300, '', false, false, 0, false, false, false);

$pdf->SetAutoPageBreak($auto_page_break, $bMargin);
// set the starting point for the page content
$pdf->setPageMark();

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
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Fecha:</b> '.' </td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b>MONTO PAGADO: </b>$'.' </td>
            </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Cobrado por: </b> '.' </td>
                
                <td style="border: solid 1px #aaa999;  height: 40px;"><b>Estado:</b> '.' </td>
            </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Sucursal:</b> '.'</td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Alumno:</b> '.'</td>
            </tr>
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Forma de Pago:</b>'.' </td>
                <td style="border: solid 1px #aaa999;height: 40px;"><b>Orden de Pedido:</b>'.' <br/>
       <b>Mensualidades:</b> <br/>'.'
                
                
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



ob_clean();
$pdf->Output('example_001.pdf', 'I');

    }
}




//============================================================+
// END OF FILE
//============================================================+


?>