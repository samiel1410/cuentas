<?php
require_once "../../../php/base/db.php";
require_once '../../../php/clases/phpspreadsheet/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class metodoReporteOrdenes
{

    public function reporteOrden($id_usuario, $id_sucursal, $id_estado, $fecha_start, $fecha_end, $instituto)
    {

        $conn = conexion();
        $spreadsheet = new Spreadsheet();

        $spreadsheet->getProperties()->setCreator("Contify")->setTitle("Reporte Ordenes");
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
                'size' => 12,
            ],

        ];
        $letra2 = [
            'font' => [
                'bold' => true,
                'size' => 16,
            ],

        ];
        $bold = [
            'font' => [
                'bold' => true,

            ],
        ];
        $size = [
            'font' => [
                'size' => 20,

            ],
        ];

        $table_en = [
            'font' => [
                'size' => 12,
                'bold' => true,

            ],
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
        $spreadsheet->getActiveSheet()->getStyle('F5')->applyFromArray($bold);

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

        $hojaActiva->setCellValue("B1", "REPORTE ORDENES PEDIDO");
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

        $query = "SELECT nombre_usuario, apellido_usuario , ciudad_sucursal,correo_usuario ,codigo_sucursal, nombre_sucursal , direccion_sucursal FROM usuarios, sucursal where id_usuario = $id_usuario and sucursal.id_sucursal = usuarios.id_fksucursal_usuario ";

        $sql = mysqli_query($conn, $query) or die(mysqli_error($conn));

        $vals = mysqli_fetch_array($sql);
        $hojaActiva->setCellValue("C2", $vals['codigo_sucursal']);
        $hojaActiva->setCellValue("C3", $vals['nombre_sucursal']);
        $hojaActiva->setCellValue("C5", date('Y-m-d'));
        $hojaActiva->setCellValue("E2", $vals['direccion_sucursal']);
        $hojaActiva->setCellValue("E3", $vals['ciudad_sucursal']);
        $hojaActiva->setCellValue("E5", $vals['nombre_usuario'] . " " . $vals['apellido_usuario']);
        $hojaActiva->setCellValue("G2", $vals['correo_usuario']);

        //celda tabla
        $hojaActiva->setCellValue("A6", "LISTA DE ORDENES DE PEDIDO");

        $hojaActiva->setCellValue("A7", "#");
        $hojaActiva->setCellValue("B7", "N. ORDEN");
        $hojaActiva->setCellValue("C7", "FECHA DE EMISION");
        $hojaActiva->setCellValue("D7", "ALUMNO");
        $hojaActiva->setCellValue("E7", "SUCURSAL");
        $hojaActiva->setCellValue("F7", "ESTADO");
        $hojaActiva->setCellValue("G7", "POR COBRAR");
        $hojaActiva->setCellValue("H7", "TOTAL");

        $query_lista = "SELECT id_orden_pedido,fecha_emision_orden_pedido,id_fkalumno_orden_pedido ,orden_pedido.created_at,id_fkusuario_orden_pedido ,id_fkusuario_orden,id_fksucursal_orden , estado_orden_pedido,fecha_vencimiento_orden_pedido,subtotal_12_orden_pedido,subtotal_0_orden_pedido ,subtotal_orden_pedido ,iva_orden_pedido ,nombre_alumno,apellido_alumno,nombre_sucursal,descuento_orden_pedido,total_orden_pedido,observacion_orden_pedido,tipo_origen_pedido,motivo_anulacion_orden_pedido from orden_pedido, sucursal, alumnos where orden_pedido.id_fksucursal_orden = sucursal.id_sucursal AND orden_pedido.id_fkalumno_orden_pedido = alumnos.id_alumno ";
        if ($id_sucursal != "") {

            $query_lista .= " AND id_fksucursal_orden= $id_sucursal";
        };

        if ($id_estado != "") {

            $query_lista .= " AND estado_orden_pedido= $id_estado";
        };

        if ($fecha_start != "" || $fecha_end != "") {

            $dateArr = date_parse($fecha_start);
            $date_inicio = date("Y-m-d", mktime(0, 0, 0, $dateArr['month'], $dateArr['day'], $dateArr['year']));
            $dateArr_fin = date_parse($fecha_end);
            $date_fin = date("Y-m-d", mktime(0, 0, 0, $dateArr_fin['month'], $dateArr_fin['day'], $dateArr_fin['year']));
            $query_lista .= " AND fecha_emision_orden_pedido BETWEEN '$date_inicio' AND '$date_fin'";

        }

        $sql_lista = mysqli_query($conn, $query_lista) or die(mysqli_error($conn));

        $i = 0;
        $fila = 8;

        while ($vals_lis = mysqli_fetch_array($sql_lista)) {

            $aux = $fila + $i;

            $spreadsheet->getActiveSheet()
                ->getStyle('G' . $aux . ':H' . $aux)
                ->getNumberFormat()
                ->setFormatCode(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);

            $dato_id = $vals_lis['id_orden_pedido'];

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'A' . $aux,
                $i + 1,
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'B' . $aux,
                $vals_lis['id_orden_pedido'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'C' . $aux,
                $vals_lis['fecha_emision_orden_pedido'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'D' . $aux,
                $vals_lis['nombre_alumno'] . " " . $vals_lis['apellido_alumno'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            $spreadsheet->getActiveSheet()->setCellValueExplicit(
                'E' . $aux,
                $vals_lis['nombre_sucursal'],
                \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );

            if ($vals_lis['estado_orden_pedido'] == 1) {
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'F' . $aux,
                    'Cobrada',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );

            } else if ($vals_lis['estado_orden_pedido'] == 2) {
                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'F' . $aux,
                    'Anulada',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );

            } else {

                $spreadsheet->getActiveSheet()->setCellValueExplicit(
                    'F' . $aux,
                    'Por Cobrar',
                    \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
                );

            }

            $query_comprobantes = "SELECT abono_comprobante,estado_comprobante, sum(abono_comprobante) pagado from comprobante_cobro where comprobante_cobro.id_fkorden_pedido_comprobante =$dato_id and comprobante_cobro.estado_comprobante =0";
            $sql2 = mysqli_query($conn, $query_comprobantes) or die(mysqli_error($conn));
            $vals2 = mysqli_fetch_array($sql2);

            $hojaActiva->setCellValue(
                'G' . $aux,
                abs(round($vals['total_orden_pedido'] - $vals2['pagado'], 2))

            );

            $hojaActiva->setCellValue(
                'H' . $aux,
                $vals_lis['total_orden_pedido']

            );

            $i++;
        }

        $valor = $aux + 3;

        $spreadsheet->getActiveSheet()
            ->getStyle('G' . $valor . ':H' . $valor)
            ->getNumberFormat()
            ->setFormatCode(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'F' . $valor,
            'TOTAL',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );

        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'G' . $valor,
            '=SUM(G8:G' . $aux . ')',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_FORMULA
        );

        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'H' . $valor,
            '=SUM(H8:H' . $aux . ')',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_FORMULA
        );

        $writer = new Xlsx($spreadsheet);
        $writer->save('Reporte_Ordenes.xlsx');
        // Redireccionamos para que descargue el archivo generado
        header("Location: Reporte_Ordenes.xlsx");
    }
}
?>