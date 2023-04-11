<?php
require_once ("../../../php/base/db.php");
require_once ('../../../php/clases/phpspreadsheet/vendor/autoload.php');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use \PhpOffice\PhpSpreadsheet\IOFactory;
use \PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class metodoReporteInstructor
{

    public function reporteInstructor($id_usuario)

    {


        $conn = conexion();
        $spreadsheet = new Spreadsheet();

        $spreadsheet->getProperties()->setCreator("Contify")->setTitle("Reporte Instructores");
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

        $hojaActiva->getStyle('A6:M6')->applyFromArray($styleArray);
        $hojaActiva->getStyle('A7:M6')->applyFromArray($styleArray1);





        $spreadsheet->getActiveSheet()->getStyle('A7:K6')->applyFromArray($letra);
        $spreadsheet->getActiveSheet()->getStyle('A6:K6')->applyFromArray($letra2);
        $spreadsheet->getActiveSheet()->getStyle('B1:K1')->applyFromArray($size);

        $spreadsheet->getActiveSheet()->getStyle('B1:K1')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('B2:B5')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('D2:D5')->applyFromArray($bold);
        $spreadsheet->getActiveSheet()->getStyle('A7:M7')->applyFromArray($table_en);

        $spreadsheet->getActiveSheet()->getStyle('F2')->applyFromArray($bold);


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

        $hojaActiva->setCellValue("B1", "REPORTE INSTRUCTORES");
        $hojaActiva->setCellValue("B2", "CODIGO SUCURSAL");
        $hojaActiva->setCellValue("D2", "Direccion");
        $hojaActiva->setCellValue("F2", "E-mail");
        $hojaActiva->setCellValue("D3", "Ciudad");
        $hojaActiva->setCellValue("B3", "SUCURSAL");
        $hojaActiva->setCellValue("B5", "Generado el:");
        $hojaActiva->setCellValue("D5", "Generado por:");



        //celdas encabezado datos

        $query = "SELECT nombre_usuario, apellido_usuario , ciudad_sucursal,correo_usuario ,codigo_sucursal, nombre_sucursal , direccion_sucursal FROM usuarios, sucursal where id_usuario = $id_usuario and sucursal.id_sucursal = usuarios.id_fksucursal_usuario ";


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
        $hojaActiva->setCellValue("A6", "LISTA DE INSTRUCTORES");

        $hojaActiva->setCellValue("A7", "#");
        $hojaActiva->setCellValue("B7", "INSTRUCTOR");
        $hojaActiva->setCellValue("C7", "CIUDAD ");
        $hojaActiva->setCellValue("D7", "TELEFONO");
        $hojaActiva->setCellValue("E7", "CELULAR");
        $hojaActiva->setCellValue("F7", "DIRECCION");
        $hojaActiva->setCellValue("G7", "TITULO");
        $hojaActiva->setCellValue("H7", "CORREO");
        $hojaActiva->setCellValue("I7", "CEDULA");
        $hojaActiva->setCellValue("J7", "ESTADO");

        $hojaActiva->setCellValue("K7", "CREADO");
       




        $query_lista = "select nombre_instructor, apellido_instructor ,ciudad_instructor,telefono_instructor ,celular_instructor ,direccion_instructor ,titulo_instructor ,estado_instructor , correo_instructor , cedula_instructor ,cedula_instructor  , instructores.created_at from instructores   ";
    

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
                $vals_lis['nombre_instructor']." ".$vals_lis['apellido_instructor'] ,
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );


            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'C' . $aux,
                $vals_lis['ciudad_instructor'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'D' . $aux,
                $vals_lis['telefono_instructor'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'E' . $aux,
                $vals_lis['celular_instructor'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'F' . $aux,
                $vals_lis['correo_instructor'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'G' . $aux,
                $vals_lis['titulo_instructor'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'H' . $aux,
                $vals_lis['correo_instructor'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'I' . $aux,
                $vals_lis['cedula_instructor'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            if ($vals_lis['estado_instructor'] == 1) {
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'J' . $aux,
                    'Activo',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );
            } else {
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'J' . $aux,
                    'Inactivo',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );
            }

           


            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'K' . $aux,
                $vals_lis['created_at'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );















            $i++;
        }








        $writer = new Xlsx($spreadsheet);
        $writer->save('Reporte_Instructores.xlsx');
        // Redireccionamos para que descargue el archivo generado
        header("Location: Reporte_Instructores.xlsx");
    }
}
?>