<?php
require_once ("../../../php/base/db.php");
require_once('library/tcpdf.php');


class metodoListado
{

    public function listado( $id_curso ,$nombre_curso
  
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






.right {
    float: right;

}

table {
    width: 65%;
 
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


$query_alumno = "Select nombre_alumno,apellido_alumno,id_alumno from alumnos,inscripciones where inscripciones.id_fkcurso_inscripcion = $id_curso AND inscripciones.id_fkalumno_inscripcion = alumnos.id_alumno;  ";
$alumno= mysqli_query($conn,$query_alumno) or  die(mysqli_error($conn));

$data = Array();
$cobrado = Array();
$j=0;




//TOtales



$total_aux=0;
$i=1;
$k=0;
$z=0;

$datos="";
while($valsA = mysqli_fetch_array($alumno)){

   
        $id_alumno=$valsA['id_alumno'];
    
        //ID inscripcion
        $query_inscripcion = "Select id_inscripcion from inscripciones where inscripciones.id_fkalumno_inscripcion = $id_alumno AND inscripciones.id_fkcurso_inscripcion = $id_curso";
        $inscripcion= mysqli_query($conn,$query_inscripcion) or  die(mysqli_error($conn));


      
        
       //Totales
        while($recupera_id = mysqli_fetch_array($inscripcion)){
    
            $id_inscripcion = $recupera_id['id_inscripcion'];
    
            $query_total= "Select sum(saldo_mensualidad) total from mensualidades WHERE mensualidades.id_fkinscripcion_mensualidad =  $id_inscripcion";
            $total= mysqli_query($conn,$query_total) or  die(mysqli_error($conn));
            $totales = mysqli_fetch_array($total);
    
            $data[$j]['total'] =  $totales['total'];
    
            


             //Cobrado 

          //ID orden


                $query_cobrado= "Select sum(saldo_mensualidad) total from mensualidades WHERE mensualidades.id_fkinscripcion_mensualidad =  $id_inscripcion AND estado_mensualidad=1";
                $cobrado_que= mysqli_query($conn,$query_cobrado) or  die(mysqli_error($conn));


                $cobra = mysqli_fetch_array($cobrado_que);
        
                $cobrado[$j]['cobrado'] =  $cobra['total'];
  
                $j++;


    
    }


       
    
    
    
    
    


    $tabla ='
<tr> 
    <td style="border: solid 1px #aaa999;height: 20px; width:24px;"> '.$i.'</td>
    <td style="border: solid 1px #aaa999;height: 20px;width:200px;"> '.$valsA['nombre_alumno'].' '.$valsA['apellido_alumno'].'    </td>
    <td style="border: solid 1px #aaa999;height: 20px;"> $'.   $cobrado[$z]['cobrado'].' </td>
    <td style="border: solid 1px #aaa999;height: 20px;"> $'. ((float)$data[$z]['total']- (float)($cobrado[$z]['cobrado'])).'    </td>
    <td style="border: solid 1px #aaa999;height: 20px;"> $'.$data[$z]['total'].'    </td>
  
</tr>
';

    $i++;
    $z++;
    
    $datos .= $tabla;
 
   
}




//Docente Intrcutor
$query_instructor= "Select nombre_instructor , apellido_instructor from instructores,inscripciones where inscripciones.id_fkinstructor_inscripcion =instructores.id_instructor AND inscripciones.id_fkcurso_inscripcion = $id_curso   ";
$instructor= mysqli_query($conn,$query_instructor) or  die(mysqli_error($conn));
$datos_instructor = mysqli_fetch_array($instructor);
//Nombre _Curso

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
        <div style="text-align:right">  </div>
       

        <div><b>LISTADO DE ALUMNOS</b> </div>
        <div>Docente/Instructor:'.$datos_instructor['nombre_instructor'].'  '.$datos_instructor['apellido_instructor'].'     </div>
        <div>Curso:'.$nombre_curso.' </div>



        
    </div>
    <div style="text-align:right;font-size:9px">fecha emision:'.date('Y-m-d').' </div>
    
    <table style="text-align:center;">

                <tr>
                    <th  style="border: solid 1px #aaa999;height: 15px; width:24px;"> <b>N°</b></th>
                    <th  style="border: solid 1px #aaa999;height: 15px; width:200px;">  <b>Alumno</b></th>
                    <th  style="border: solid 1px #aaa999;height: 15px;"> <b>Cobrado</b> </th>
                    <th  style="border: solid 1px #aaa999;height: 15px;"> <b>Por Pagar</b></th>
                    <th  style="border: solid 1px #aaa999;height: 15px;"> <b>Total</b> </th>
                </tr>

                '.$datos.'

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