<?php
require_once ("../../../php/base/db.php");
require_once ('../../../php/clases/phpspreadsheet/vendor/autoload.php');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use \PhpOffice\PhpSpreadsheet\IOFactory;
use \PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class metodoForma
{
    public function reporteForma( $id_usuario,
    $id_sucursal,
    $nombre_institucion,
    $desde,$hasta
    
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





        $hojaActiva->setCellValue("G3",$nombre_institucion);

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
        $hojaActiva->setCellValue("B7", "FORMA DE PAGO");
        $hojaActiva->setCellValue("C7", "N° CUENTA ");
        $hojaActiva->setCellValue("D7", "SUCURSAL ");
        $hojaActiva->setCellValue("E7", "TOTAL");
     







        ///Listado de alumnos
        $query_forma = "Select id_forma, nombre_forma ,numero_cuenta  from forma_pago";
     
        $sql_forma = mysqli_query($conn, $query_forma) or  die(mysqli_error($conn));


        $query_sucursal = "SELECT nombre_sucursal,codigo_sucursal from sucursal where id_sucursal = $id_sucursal";


        $sql_sucursal= mysqli_query($conn, $query_sucursal) or  die(mysqli_error($conn));
        $sucursal =mysqli_fetch_array($sql_sucursal);





        $query_orden = "SELECT id_orden_pedido from orden_pedido where id_fksucursal_orden = $id_sucursal";
        $sql_orden= mysqli_query($conn, $query_orden) or  die(mysqli_error($conn));
       


        $i = 0;
        $fila = 8;
        $j=0;
        $aux_sucursal=0;
        $total_aux=0;
        $data = Array();
        $cobrado2 = Array();
        $total=0;

        while ($vals_lis = mysqli_fetch_array($sql_forma)) {

          
            $aux = $fila + $i;
          $id_forma= $vals_lis['id_forma'];

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'A' . $aux,
                $i + 1,
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'B' . $aux,
                $vals_lis['nombre_forma'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            if($vals_lis['numero_cuenta']==""){
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'C' . $aux,
                    'No maneja cuenta',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );
    

            }else{

                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'C' . $aux,
                    $vals_lis['numero_cuenta'],
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );
    

            }
      
          



            $query_orden = "SELECT id_orden_pedido from orden_pedido where id_fksucursal_orden = $id_sucursal";
            $sql_orden= mysqli_query($conn, $query_orden) or  die(mysqli_error($conn));

            while ($orden= mysqli_fetch_array($sql_orden)) {

                $aux_sucursal = $fila + $j;

                $id_orden = $orden['id_orden_pedido'];

             

                $query_comprobantes= "SELECT sum(abono_comprobante) total from comprobante_cobro where id_fkforma_pago_comprobante = $id_forma AND id_fkorden_pedido_comprobante= $id_orden  AND estado_comprobante=0";

                if($desde != "" && $hasta!=""){

                    $dateArr = date_parse($desde);
                    $date_inicio = date("Y-m-d", mktime(0, 0, 0, $dateArr['month'], $dateArr['day'], $dateArr['year']));
                    $dateArr_fin = date_parse($hasta);
                    $date_fin= date("Y-m-d", mktime(0, 0, 0, $dateArr_fin['month'], $dateArr_fin['day'], $dateArr_fin['year']));
                    $query_comprobantes .= " AND fecha_cobro_comprobante BETWEEN '$date_inicio' AND '$date_fin'";


                   
                    
                }

              
              
              
              
                $sql_comprobantes= mysqli_query($conn, $query_comprobantes) or  die(mysqli_error($conn));
                $vals_compro = mysqli_fetch_array($sql_comprobantes);


                $total = $total + $vals_compro['total'];
            
               
    
            }


    
         

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'D' . $aux,
                $sucursal['nombre_sucursal']."-".$sucursal['codigo_sucursal'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );
            
            $hojaActiva->setCellValue(
                'E' . $aux,
                $total,
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );
            $total=0;



            $spreadsheet->getActiveSheet()
            ->getStyle('E'.$aux)
            ->getNumberFormat()
            ->setFormatCode(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);


            $j++;
    

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
            'E' . $valor,
            '=SUM(E8:E'.$aux.')',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_FORMULA
        );



        //Cobrado
      








        $writer = new Xlsx($spreadsheet);
        $writer->save('Reporte_Formas.xlsx');
        // Redireccionamos para que descargue el archivo generado
        header("Location: Reporte_Formas.xlsx");
    }

}
?>