<?php
require_once ("../../../php/base/db.php");
require_once ('../../../php/clases/phpspreadsheet/vendor/autoload.php');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use \PhpOffice\PhpSpreadsheet\IOFactory;
use \PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class metodoReporteInscripcion
{

    public function reporteInscripcion($id_usuario, $id_sucursal,$id_curso,$fecha_start,$fecha_end,$instituto)

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
        $hojaActiva->mergeCells('G5:I5');

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
        $spreadsheet->getActiveSheet()->getStyle('F5')->applyFromArray($bold);


        //anchos
        $spreadsheet->getActiveSheet()->getColumnDimension('A')->setWidth(19);
        $spreadsheet->getActiveSheet()->getColumnDimension('B')->setWidth(23);
        $spreadsheet->getActiveSheet()->getColumnDimension('C')->setWidth(23);
        $spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(15);
        $spreadsheet->getActiveSheet()->getColumnDimension('E')->setWidth(15);
        $spreadsheet->getActiveSheet()->getColumnDimension('F')->setWidth(25);
        $spreadsheet->getActiveSheet()->getColumnDimension('G')->setWidth(25);
        $spreadsheet->getActiveSheet()->getColumnDimension('H')->setWidth(25);
        $spreadsheet->getActiveSheet()->getColumnDimension('I')->setWidth(15);
        $spreadsheet->getActiveSheet()->getColumnDimension('J')->setWidth(23);
        $spreadsheet->getActiveSheet()->getColumnDimension('K')->setWidth(23);
        $spreadsheet->getActiveSheet()->getColumnDimension('l')->setWidth(23);

        //altos
        $spreadsheet->getActiveSheet()->getRowDimension('1')->setRowHeight(26);
        $spreadsheet->getActiveSheet()->getRowDimension('6')->setRowHeight(21);


        //celdas encabezado

        $hojaActiva->setCellValue("B1", "REPORTE INSCRIPCIONES");
        $hojaActiva->setCellValue("B2", "CODIGO SUCURSAL");
        $hojaActiva->setCellValue("D2", "Direccion");
        $hojaActiva->setCellValue("F2", "E-mail");
        $hojaActiva->setCellValue("D3", "Ciudad");
        $hojaActiva->setCellValue("B3", "SUCURSAL");
        $hojaActiva->setCellValue("B5", "Generado el:");
        $hojaActiva->setCellValue("D5", "Generado por:");
        $hojaActiva->setCellValue("F5", "Instituto:");
        $hojaActiva->setCellValue("G5", $instituto);


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
        $hojaActiva->setCellValue("A6", "LISTA DE INSCRIPCIONES");

        $hojaActiva->setCellValue("A7", "#");
        $hojaActiva->setCellValue("B7", "FECHA DE INSCRIPCION");
        $hojaActiva->setCellValue("C7", "ESTADO");
        $hojaActiva->setCellValue("D7", "CALIFICACION");
        $hojaActiva->setCellValue("E7", "PRECIO");
        $hojaActiva->setCellValue("F7", "ALUMNO");
        $hojaActiva->setCellValue("G7", "CURSO");
        $hojaActiva->setCellValue("H7", "SUCURSAL");
        $hojaActiva->setCellValue("I7", "UNIFORME");
        $hojaActiva->setCellValue("J7", "CONDICION PAGO");
        $hojaActiva->setCellValue("K7", "TIPO DE INSCRIPCION");
        $hojaActiva->setCellValue("L7", "CREADO");
       




        $query_lista = "Select fecha_inscripcion , estado_inscripcion , calificacion_inscripcion , precio_total_curso , nombre_alumno , apellido_alumno , nombre_curso , nombre_sucursal , estado_uniforme_inscripcion , inscripciones.created_at,condicion_pago_inscripcion , curso_variable_inscripcion from inscripciones , cursos , sucursal ,alumnos where inscripciones.id_fkalumno_inscripcion = alumnos.id_alumno and inscripciones.id_fkcurso_inscripcion = cursos.id_curso and inscripciones.id_fksucursal_inscripcion = sucursal.id_sucursal  ";
        if ($id_sucursal != "") {

            $query_lista .= " AND id_fksucursal_inscripcion= $id_sucursal";
        };

        if ($id_curso != "") {

            $query_lista .= " AND id_fkcurso_inscripcion= $id_curso";
        };

        
        if($fecha_start!="" || $fecha_end!= ""){

            $dateArr = date_parse($fecha_start);
            $date_inicio = date("Y-m-d", mktime(0, 0, 0, $dateArr['month'], $dateArr['day'], $dateArr['year']));
            $dateArr_fin = date_parse($fecha_end);
            $date_fin= date("Y-m-d", mktime(0, 0, 0, $dateArr_fin['month'], $dateArr_fin['day'], $dateArr_fin['year']));
            $query_lista .=" AND fecha_inscripcion BETWEEN '$date_inicio' AND '$date_fin'";

        }

   
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
                $vals_lis['fecha_inscripcion'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );



            if ($vals_lis['estado_inscripcion'] == 1) {
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
                $vals_lis['calificacion_inscripcion'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'E' . $aux,
                $vals_lis['precio_total_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'F' . $aux,
                $vals_lis['nombre_alumno'] . " " . $vals_lis['apellido_alumno'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'G' . $aux,
                $vals_lis['nombre_curso'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'H' . $aux,
                $vals_lis['nombre_sucursal'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );


            if ($vals_lis['estado_uniforme_inscripcion'] == 1) {
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'I' . $aux,
                    'Entregado',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );
            } else if($vals_lis['estado_uniforme_inscripcion']==2){
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'I' . $aux,
                    'Sin Uniforme',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );
            }
            else{

                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'I' . $aux,
                    'Pendiente',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );

            }

            if ($vals_lis['condicion_pago_inscripcion'] == 1) {
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'J' . $aux,
                    'Totalidad',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );
            } else{
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'J' . $aux,
                    'Cuotas',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );

            }

            if ($vals_lis['curso_variable_inscripcion'] == 1) {
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'K' . $aux,
                    'Indefinido',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );
            } else{
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'K' . $aux,
                    'Definido',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );

            }


            

            

          

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'L' . $aux,
                $vals_lis['created_at'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );















            $i++;
        }








        $writer = new Xlsx($spreadsheet);
        $writer->save('Reporte_Inscripciones.xlsx');
        // Redireccionamos para que descargue el archivo generado
        header("Location: Reporte_Inscripciones.xlsx");
    }
}
?>