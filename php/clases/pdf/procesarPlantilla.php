<?php
require_once ("../../../php/base/db.php");
require_once('library/tcpdf.php');


class metodoProcesar
{

    public function procesar($id_inscripcion
  
)

    {
        $conn = conexion();
        $custom_layout = array(1000, 1000);
        // create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);



        $bMargin = $pdf->getBreakMargin();
        // get current auto-page-break mode
        $auto_page_break = $pdf->AutoPageBreak();
        // disable auto-page-break
        $pdf->SetAutoPageBreak(false, 0);
        // set bacground image
        $img_file = K_PATH_IMAGES.'negocios/inscripciones/imagenes/certificados-legion.jpg';
        $pdf->Image($img_file, 0, 0, 210, 297, '', '', '', false, 300, '', false, false, 0);
        // restore auto-page-break status
        $pdf->SetAutoPageBreak($auto_page_break, $bMargin);
        // set the starting point for the page content
        $pdf->setPageMark();

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
$pdf->AddPage('L', ['format' => 'MAKE-L', 'Rotate' => -90]);

$query_alumno = "Select plantilla_certificado from inscripciones where id_inscripcion = $id_inscripcion";
$alumno= mysqli_query($conn,$query_alumno) or  die(mysqli_error($conn));
$valsA = mysqli_fetch_array($alumno);


$html='<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
   
</head>
<body >

  
    <div style="text-align:center">  <img  width="1000" height="1000" src="data:image/jpeg;base64,' . base64_encode($valsA['plantilla_certificado']) . '"/></div>
       

 




</body>
</html>';



// Close and output PDF document
// This method has several options, check the source code documentation for more information.
$pdf->writeHTML($style, true, false, true, false, '');
$pdf->writeHTML($html, true, false, true, false, '');
$pdf->Output('example_001.pdf', 'D');

    }
}




//============================================================+
// END OF FILE
//============================================================+


?>