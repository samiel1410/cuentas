<?php
require_once ("../../../php/base/db.php");
require_once ('../../../php/clases/phpspreadsheet/vendor/autoload.php');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use \PhpOffice\PhpSpreadsheet\IOFactory;
use \PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class metodoReporteCurso
{

    public function reporteCurso($id_usuario, $id_sucursal,$instituto)

    {


        $conn = conexion();
        $spreadsheet = new Spreadsheet();

        $spreadsheet->getProperties()->setCreator("Contify")->setTitle("Reporte Cursos");
        $spreadsheet->getDefaultStyle()->getFont()->setName('Calibri');
        $hojaActiva = $spreadsheet->getActiveSheet();

        /*
            $drawing = new PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
            $drawing->setName('Logo');
            $drawing->setDescription('Logo');
            $drawing->setCoordinates('A1');
            $drawing->setPath('logo.png');
            $drawing->setHeight(36);
            $drawing->setWorksheet($hojaActiva);
            */


        //imagen


        //merges
        $hojaActiva->mergeCells('B1:K1');
        $hojaActiva->mergeCells('A1:A5');
        $hojaActiva->mergeCells('A1:A5');
        $hojaActiva->mergeCells('A6:K6');
        $hojaActiva->mergeCells('G2:I2');
        $hojaActiva->mergeCells('G3:J3');
        //estilos

        $spreadsheet->getActiveSheet()->getStyle('A1:K6')
            ->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
        $spreadsheet->getActiveSheet()->getStyle('A1:K6')
            ->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);


        $styleArray = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                ],
            ],
        ];

        $styleArray1 = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,

                ],
            ],
        ];

        $letra = [
            'font' => [
                'bold' => true,
                'size' => 12
            ],


        ];
        $letra2 = [
            'font' => [
                'bold' => true,
                'size' => 16
            ],


        ];
        $bold = [
            'font' => [
                'bold' => true,

            ]
        ];
        $size = [
            'font' => [
                'size' => 20

            ]
        ];

        $table_en = [
            'font' => [
                'size' => 12,
                'bold' => true

            ]
        ];

        $hojaActiva->getStyle('A6:O6')->applyFromArray($styleArray);
        $hojaActiva->getStyle('A7:O6')->applyFromArray($styleArray1);





        $spreadsheet->getActiveSheet()->getStyle('A7:K6')->applyFromArray($letra);
        $spreadsheet->getActiveSheet()->getStyle('A6:K6')->applyFromArray($letra2);
        $spreadsheet->getActiveSheet()->getStyle('B1:K1')->applyFromArray($size);

        $spreadsheet->getActiveSheet()->getStyle('B1:K1')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('B2:B5')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('D2:D5')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('A7:O7')->applyFromArray($table_en);

        $spreadsheet->getActiveSheet()->getStyle('F2')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('F3')->applyFromArray($bold);

        //anchos
        $spreadsheet->getActiveSheet()->getColumnDimension('A')->setWidth(19);
        $spreadsheet->getActiveSheet()->getColumnDimension('B')->setWidth(17);
        $spreadsheet->getActiveSheet()->getColumnDimension('C')->setWidth(23);
        $spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(23);
        $spreadsheet->getActiveSheet()->getColumnDimension('E')->setWidth(17);
        $spreadsheet->getActiveSheet()->getColumnDimension('F')->setWidth(25);
        $spreadsheet->getActiveSheet()->getColumnDimension('G')->setWidth(15);
        $spreadsheet->getActiveSheet()->getColumnDimension('H')->setWidth(20);
        $spreadsheet->getActiveSheet()->getColumnDimension('I')->setWidth(15);
        $spreadsheet->getActiveSheet()->getColumnDimension('J')->setWidth(15);
        $spreadsheet->getActiveSheet()->getColumnDimension('K')->setWidth(15);

        //altos
        $spreadsheet->getActiveSheet()->getRowDimension('1')->setRowHeight(26);
        $spreadsheet->getActiveSheet()->getRowDimension('6')->setRowHeight(21);


        //celdas encabezado

        $hojaActiva->setCellValue("B1", "REPORTE CURSOS");
        $hojaActiva->setCellValue("B2", "CODIGO SUCURSAL");
        $hojaActiva->setCellValue("D2", "Direccion");
        $hojaActiva->setCellValue("F2", "E-mail");
        $hojaActiva->setCellValue("D3", "Ciudad");
        $hojaActiva->setCellValue("F3","Instituto:");
        $hojaActiva->setCellValue("B3", "SUCURSAL");
        $hojaActiva->setCellValue("B5", "Generado el:");
        $hojaActiva->setCellValue("D5", "Generado por:");

        $hojaActiva->setCellValue("G3",$instituto);

        //celdas encabezado datos

        $query = "SELECT nombre_usuario, apellido_usuario ,ciudad_sucursal,correo_usuario ,codigo_sucursal, nombre_sucursal , direccion_sucursal FROM usuarios, sucursal where id_usuario = $id_usuario and sucursal.id_sucursal = usuarios.id_fksucursal_usuario ";


        $sql = mysqli_query($conn, $query) or  die(mysqli_error($conn));


        $vals = mysqli_fetch_array($sql);
        $hojaActiva->setCellValue("C2", $vals['codigo_sucursal']);
        $hojaActiva->setCellValue("C3", $vals['nombre_sucursal']);
        $hojaActiva->setCellValue("C5", date('Y-m-d'));
        $hojaActiva->setCellValue("E2", $vals['direccion_sucursal']);
        $hojaActiva->setCellValue("E3", $vals['ciudad_sucursal']);
        $hojaActiva->setCellValue("E5", $vals['nombre_usuario'] . " " . $vals['apellido_usuario']);
        $hojaActiva->setCellValue("G2", $vals['correo_usuario']);



        //celda tabla
        $hojaActiva->setCellValue("A6", "LISTA DE CURSOS");

        $hojaActiva->setCellValue("A7", "#");
        $hojaActiva->setCellValue("B7", "CURSO");
        $hojaActiva->setCellValue("C7", "ESTADO ");
        $hojaActiva->setCellValue("D7", "MENSUALIDAD");
        $hojaActiva->setCellValue("E7", "IVA");
        $hojaActiva->setCellValue("F7", "INSTRUCTOR");
        $hojaActiva->setCellValue("G7", "SUCURSAL");
        $hojaActiva->setCellValue("H7", "DURACION");
        $hojaActiva->setCellValue("I7", "MATRICULA");
        $hojaActiva->setCellValue("J7", "PRECIO");
        $hojaActiva->setCellValue("K7", "CUPOS");
        $hojaActiva->setCellValue("L7", "FECHA INICIO");
        $hojaActiva->setCellValue("M7", "FECHA DE FINALIZACION");
        $hojaActiva->setCellValue("O7", "CREADO");




        $query_lista = "SELECT nombre_curso , estado_curso ,  cursos.created_at,mensualidad_curso  ,apellido_instructor,iva_curso ,id_fkinstructor_curso, nombre_instructor,apellido_instructor,iva_curso,id_fksucursal_curso,duracion_mes_curso,nombre_sucursal,cuota_entrada_curso,cupos_curso,fecha_inicio_curso,fecha_fin_curso,precio_curso from cursos , sucursal,instructores where cursos.id_fkinstructor_curso = instructores.id_instructor AND cursos.id_fksucursal_curso = sucursal.id_sucursal ";
        if ($id_sucursal != "") {

            $query_lista .= " AND id_fksucursal_curso= $id_sucursal";
        };

        $sql_lista = mysqli_query($conn, $query_lista) or  die(mysqli_error($conn));



        $i = 0;
        $fila = 8;

        while ($vals_lis = mysqli_fetch_array($sql_lista)) {
            $aux = $fila + $i;

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'A' . $aux,
                $i + 1,
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'B' . $aux,
                $vals_lis['nombre_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );



            if ($vals_lis['estado_curso'] == 1) {
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'C' . $aux,
                    'Activo',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );
            } else {
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'C' . $aux,
                    'Inactivo',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );
            }


            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'D' . $aux,
                $vals_lis['mensualidad_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'E' . $aux,
                $vals_lis['iva_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'F' . $aux,
                $vals_lis['nombre_instructor'] . " " . $vals_lis['apellido_instructor'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'G' . $aux,
                $vals_lis['nombre_sucursal'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'H' . $aux,
                $vals_lis['duracion_mes_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'I' . $aux,
                $vals_lis['cuota_entrada_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'J' . $aux,
                $vals_lis['precio_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'K' . $aux,
                $vals_lis['cupos_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'L' . $aux,
                $vals_lis['fecha_inicio_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'M' . $aux,
                $vals_lis['fecha_fin_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'O' . $aux,
                $vals_lis['created_at'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );















            $i++;
        }








        $writer = new Xlsx($spreadsheet);
        $writer->save('Reporte_Cursos.xlsx');
        // Redireccionamos para que descargue el archivo generado
        header("Location: Reporte_Cursos.xlsx");
    }




    public function reporteMesCurso( $id_usuario,
    $id_sucursal,
    $instituto,
    $id_curso,
    $anio,
    $mes,$nombre_curso,$nombre_mes
    )

    {


        $conn = conexion();
        $spreadsheet = new Spreadsheet();

        $spreadsheet->getProperties()->setCreator("Contify")->setTitle("Reporte Cursos Mensualidades");
        $spreadsheet->getDefaultStyle()->getFont()->setName('Calibri');
        $hojaActiva = $spreadsheet->getActiveSheet();

        /*
            $drawing = new PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
            $drawing->setName('Logo');
            $drawing->setDescription('Logo');
            $drawing->setCoordinates('A1');
            $drawing->setPath('logo.png');
            $drawing->setHeight(36);
            $drawing->setWorksheet($hojaActiva);
            */


        //imagen


        //merges
        $hojaActiva->mergeCells('B1:K1');
        $hojaActiva->mergeCells('A1:A5');
        $hojaActiva->mergeCells('A1:A5');
        $hojaActiva->mergeCells('A6:K6');
        $hojaActiva->mergeCells('G2:I2');
        $hojaActiva->mergeCells('G3:J3');
        //estilos

        $spreadsheet->getActiveSheet()->getStyle('A1:K6')
            ->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
        $spreadsheet->getActiveSheet()->getStyle('A1:K6')
            ->getAlignment()->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);


        $styleArray = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                ],
            ],
        ];

        $styleArray1 = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,

                ],
            ],
        ];

        $letra = [
            'font' => [
                'bold' => true,
                'size' => 12
            ],


        ];
        $letra2 = [
            'font' => [
                'bold' => true,
                'size' => 16
            ],


        ];
        $bold = [
            'font' => [
                'bold' => true,

            ]
        ];
        $size = [
            'font' => [
                'size' => 20

            ]
        ];

        $table_en = [
            'font' => [
                'size' => 12,
                'bold' => true

            ]
        ];

        $hojaActiva->getStyle('A6:O6')->applyFromArray($styleArray);
        $hojaActiva->getStyle('A7:O6')->applyFromArray($styleArray1);





        $spreadsheet->getActiveSheet()->getStyle('A7:K6')->applyFromArray($letra);
        $spreadsheet->getActiveSheet()->getStyle('A6:K6')->applyFromArray($letra2);
        $spreadsheet->getActiveSheet()->getStyle('B1:K1')->applyFromArray($size);

        $spreadsheet->getActiveSheet()->getStyle('B1:K1')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('B2:B5')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('D2:D5')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('A7:O7')->applyFromArray($table_en);

        $spreadsheet->getActiveSheet()->getStyle('F2')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('F3')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('F5')->applyFromArray($bold);

        $spreadsheet->getActiveSheet()->getStyle('H5')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('J5')->applyFromArray($bold);

        //anchos
        $spreadsheet->getActiveSheet()->getColumnDimension('A')->setWidth(19);
        $spreadsheet->getActiveSheet()->getColumnDimension('B')->setWidth(17);
        $spreadsheet->getActiveSheet()->getColumnDimension('C')->setWidth(23);
        $spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(23);
        $spreadsheet->getActiveSheet()->getColumnDimension('E')->setWidth(17);
        $spreadsheet->getActiveSheet()->getColumnDimension('F')->setWidth(25);
        $spreadsheet->getActiveSheet()->getColumnDimension('G')->setWidth(15);
        $spreadsheet->getActiveSheet()->getColumnDimension('H')->setWidth(20);
        $spreadsheet->getActiveSheet()->getColumnDimension('I')->setWidth(15);
        $spreadsheet->getActiveSheet()->getColumnDimension('J')->setWidth(15);
        $spreadsheet->getActiveSheet()->getColumnDimension('K')->setWidth(15);

        //altos
        $spreadsheet->getActiveSheet()->getRowDimension('1')->setRowHeight(26);
        $spreadsheet->getActiveSheet()->getRowDimension('6')->setRowHeight(21);


        //celdas encabezado

        $hojaActiva->setCellValue("B1", "REPORTE CURSOS MENSUALIDADES");
        $hojaActiva->setCellValue("B2", "CODIGO SUCURSAL");
        $hojaActiva->setCellValue("D2", "Direccion");
        $hojaActiva->setCellValue("F2", "E-mail");
        $hojaActiva->setCellValue("D3", "Ciudad");
        $hojaActiva->setCellValue("F3","Instituto:");
        $hojaActiva->setCellValue("B3", "SUCURSAL");
        $hojaActiva->setCellValue("B5", "Generado el:");
        $hojaActiva->setCellValue("D5", "Generado por:");

        $hojaActiva->setCellValue("F5", "Curso:");
        $hojaActiva->setCellValue("G5",$nombre_curso);

        $hojaActiva->setCellValue("H5", "Mes:");

        $hojaActiva->setCellValue("I5", $nombre_mes);

        $hojaActiva->setCellValue("J5", 'Año');

        $hojaActiva->setCellValue("K5", $anio);
   




        $hojaActiva->setCellValue("G3",$instituto);

        //celdas encabezado datos

        $query = "SELECT nombre_usuario, apellido_usuario ,ciudad_sucursal,correo_usuario ,codigo_sucursal, nombre_sucursal , direccion_sucursal FROM usuarios, sucursal where id_usuario = $id_usuario and sucursal.id_sucursal = usuarios.id_fksucursal_usuario ";


        $sql = mysqli_query($conn, $query) or  die(mysqli_error($conn));


        $vals = mysqli_fetch_array($sql);
        $hojaActiva->setCellValue("C2", $vals['codigo_sucursal']);
        $hojaActiva->setCellValue("C3", $vals['nombre_sucursal']);
        $hojaActiva->setCellValue("C5", date('Y-m-d'));
        $hojaActiva->setCellValue("E2", $vals['direccion_sucursal']);
        $hojaActiva->setCellValue("E3", $vals['ciudad_sucursal']);
        $hojaActiva->setCellValue("E5", $vals['nombre_usuario'] . " " . $vals['apellido_usuario']);
        $hojaActiva->setCellValue("G2", $vals['correo_usuario']);



        //celda tabla
        $hojaActiva->setCellValue("A6", "LISTA DE ALUMNOS");

        $hojaActiva->setCellValue("A7", "#");
        $hojaActiva->setCellValue("B7", "ALUMNO");
        $hojaActiva->setCellValue("C7", "COBRADO ");
        $hojaActiva->setCellValue("D7", "POR PAGAR ");
        $hojaActiva->setCellValue("E7", "TOTAL ");








        ///Listado de alumnos
        $query_lista = "Select nombre_alumno,apellido_alumno,id_alumno from alumnos,inscripciones where inscripciones.id_fkcurso_inscripcion = $id_curso AND inscripciones.id_fkalumno_inscripcion = alumnos.id_alumno;";
     
        $sql_lista = mysqli_query($conn, $query_lista) or  die(mysqli_error($conn));






        $i = 0;
        $fila = 8;
        $j=0;
        $total_aux=0;
        $data = Array();
        $cobrado2 = Array();

        while ($vals_lis = mysqli_fetch_array($sql_lista)) {

          
            $aux = $fila + $i;

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'A' . $aux,
                $i + 1,
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'B' . $aux,
                $vals_lis['nombre_alumno']." ".$vals_lis['apellido_alumno'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );


  

            $id_alumno=$vals_lis['id_alumno'];
    
            //ID inscripcion
            $query_inscripcion = "Select id_inscripcion from inscripciones where inscripciones.id_fkalumno_inscripcion = $id_alumno AND inscripciones.id_fkcurso_inscripcion = $id_curso";
            $inscripcion= mysqli_query($conn,$query_inscripcion) or  die(mysqli_error($conn));


            //Totale
            while($recupera_id = mysqli_fetch_array($inscripcion)){

                $id_inscripcion = $recupera_id['id_inscripcion'];
    
                $query_total= "Select sum(saldo_mensualidad) total from mensualidades WHERE mensualidades.id_fkinscripcion_mensualidad =  $id_inscripcion ";
                

                $query_cobrado= "Select sum(saldo_mensualidad) cobrado from mensualidades WHERE mensualidades.id_fkinscripcion_mensualidad =  $id_inscripcion  AND estado_mensualidad = 1 ";
               
                
                
               

                if($mes!=0 || $anio != 0){

                    $fecha_inicio= $anio.'-'.$mes.'-01';
                    $dias_fin = date( 't', strtotime( $fecha_inicio ) );
        
                    $fecha_fin =$anio.'-'.$mes.'-'.$dias_fin;
        
                
        
                    $query_total .=" AND fecha_pago_mensualidad BETWEEN '$fecha_inicio' AND '$fecha_fin'";

                    $query_cobrado .=" AND fecha_pago_mensualidad BETWEEN '$fecha_inicio' AND '$fecha_fin'";
                 
        
        
                    
                   
                };
                
           
                
                $total= mysqli_query($conn,$query_total) or  die(mysqli_error($conn));
                $totales = mysqli_fetch_array($total);
        
                $data[$j]['total'] =  $totales['total'];


             

               
                 //Cobrado
                $cobrado_que= mysqli_query($conn,$query_cobrado) or  die(mysqli_error($conn));
                    ///////////////////////////////
                   
                    $cobrado = mysqli_fetch_array($cobrado_que);


                
             


                if($cobrado['cobrado']==""){
                   
                        $cobrado2[$j]['cobrado'] = 0;
    
                    }else{
                        $cobrado2[$j]['cobrado'] =  $cobrado['cobrado'];
    
    
                    }
        

           

                
                




                

            
        
               

                $j++;



        
        
               


               

            }


            $spreadsheet->getActiveSheet()
            ->getStyle('A'.$aux.':I'.$aux)
            ->getNumberFormat()
            ->setFormatCode(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);


            $hojaActiva->setCellValue(
                'C' . $aux,
                $cobrado2[$i]['cobrado'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );


            $hojaActiva->setCellValue(
                'D' . $aux,
                ((float)$data[$i]['total']- (float)( $cobrado2[$i]['cobrado'])),
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );
        
        

            $hojaActiva->setCellValue(
                'E' . $aux,
                $data[$i]['total'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );
        

            $i++;
        }


        //TOtales
        $valor = $aux +3;

        $spreadsheet->getActiveSheet()
        ->getStyle('C'.$valor.':D'.$valor)
        ->getNumberFormat()
        ->setFormatCode(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);

        $spreadsheet->getActiveSheet()
        ->getStyle('E'.$valor)
        ->getNumberFormat()
        ->setFormatCode(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);
       
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'B' . $valor,
            'TOTAL',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );

        $spreadsheet->getActiveSheet()->getStyle('B'.$valor)->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('C'.$valor)->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('D'.$valor)->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('E'.$valor)->applyFromArray($bold);


        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'C' . $valor,
            '=SUM(C8:C'.$aux.')',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_FORMULA
        );

        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'D' . $valor,
            '=SUM(D8:D'.$aux.')',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_FORMULA
        );

        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'E' . $valor,
            '=SUM(E8:E'.$aux.')',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_FORMULA
        );



        //Cobrado
      








        $writer = new Xlsx($spreadsheet);
        $writer->save('Reporte_Cursos_Mensualidades.xlsx');
        // Redireccionamos para que descargue el archivo generado
        header("Location: Reporte_Cursos_Mensualidades.xlsx");
    }

}
?>