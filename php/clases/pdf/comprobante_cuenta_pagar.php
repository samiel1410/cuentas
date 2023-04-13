<?php
require_once ("../../../php/base/db.php");
require_once('library/tcpdf.php');


class metodoComprobanteCuentaPagar
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
    $departamento ,$id_sucursal
   
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


$query = "Select direccion_sucursal , telefono_sucursal ,email_sucursal,imagen_sucursal  from sucursal where id_sucursal = '$id_sucursal'  ";
$recuperar= mysqli_query($conn,$query) or  die(mysqli_error($conn));
$vals = mysqli_fetch_array($recuperar);


$direccion =$vals['direccion_sucursal'];
$telefono =$vals['telefono_sucursal'];
$email =$vals['email_sucursal'];

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

<div id="outer">
<table style=" border-collapse: collapse;
border-spacing: 0; border: none;">
    <tr style="text-align: left;
    vertical-align: top;"> 
        <td style="height: 40px;"><div style="font-size: 10px; height:0">
        <b>'.$sucursal.'</b> <br/>
        <b>RUC:</b><br/>
        <b>Dirección:</b>'.$direccion.'<br/>
        <b>Telefono:</b>'.$telefono.'<br/>
        <b>Email:</b>'.$email.'<br/>
       
      </div>  </td>
        <td style="text-align: right" > <img  width="150" height="100" src="data:image/jpeg;base64,' . base64_encode($vals['imagen_sucursal']) . '"/>  </td>
    </tr>
   
    
</table>
</div>
    


   
  
    
   <div> <b  style="font-size:18px;">DETALLE  CUENTA PAGAR</b> </div>
    
    <div id="outer">
        <table style=" border-collapse: collapse;
        border-spacing: 0; ">
            <tr style="text-align: left;
            vertical-align: top; font-size:12px;"> 
                <td style="height: 40px;"><b>Numero Cuenta Cobrar:</b> '.$numero.' <br/> <b>Fecha Emisión:</b>'.$fecha_emision.' <br/> <b>Fecha Vencimiento:</b>'.$fecha_venc.'</td>
                <td style="height: 40px;"><b>Estado: </b>'.$estado.'<br/><b>Tipo Documento: </b>'.$tipo_documento.'<br/><b>N°: </b>'.$numero_documento.'<br/> </td>
            </tr>
            
            
         
        </table>
    </div>
 
    <div id="outer">
        <table style="border: solid 1px #aaa999;height: 0px;
        padding: 5px; ">

        <tr>
        <th style="border: solid 1px #aaa999;"><b>NÚMERO</b></th>
        <th style="border: solid 1px #aaa999;"><b>CLIENTE</b></th>
        <th style="border: solid 1px #aaa999;"><b>MONTO</b></th>
        <th style="border: solid 1px #aaa999;"><b>SUCURSAL</b></th>
        <th style="border: solid 1px #aaa999;"><b>DEPARTAMENTO</b></th>
      </tr>
        
            <tr style="text-align: left;
            vertical-align: top;">
                <td style="border: solid 1px #aaa999;">

              '.$numero.'
           
                </td>
                

                <td style="border: solid 1px #aaa999;">

                '.$cliente.'
             
                  </td>

                  <td style="border: solid 1px #aaa999;">

                  $'.$monto.'
               
                    </td>

                    <td style="border: solid 1px #aaa999;">

                    '.$sucursal.'
                 
                      </td>

                      <td style="border: solid 1px #aaa999;">

                      '.$departamento.'
                   
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