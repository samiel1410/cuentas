<?php 
session_start();
echo "INGRESO" .$_SESSION['id_usuario'];
require 'C:\xampp\htdocs\resgistro_demo\php\clases\phpspreadsheet\vendor\autoload.php';
require 'db.php';

$conn = conexion();
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use \PhpOffice\PhpSpreadsheet\IOFactory;
use \PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
$spreadsheet = new Spreadsheet();

$spreadsheet -> getProperties()->setCreator("Contify")->setTitle("Reporte_Usuario");
$spreadsheet->getDefaultStyle()->getFont()->setName('Calibri');

$hojaActiva = $spreadsheet->getActiveSheet();


//imagen

// redirect output to client browser



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

$styleArray1= [
    'borders' => [
        'allBorders' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            
        ],
    ],
];

$letra=[
    'font' => [
        'bold' => true,
        'size'=>12
    ],
    
    
];
$letra2=[
    'font' => [
        'bold' => true,
        'size'=>16
    ],
    
    
];
$bold=[ 'font' => [
    'bold' => true,
    
]
];
$size=[ 'font' => [
    'size'=>20
    
]
];

$table_en=[ 'font' => [
    'size'=>12,
    'bold'=>true
    
]
];


$hojaActiva->getStyle('A6:I6')->applyFromArray($styleArray);
$hojaActiva->getStyle('A7:I6')->applyFromArray($styleArray1);




$spreadsheet->getActiveSheet()->getStyle('A7:K6')->applyFromArray($letra);
$spreadsheet->getActiveSheet()->getStyle('A6:K6')->applyFromArray($letra2);
$spreadsheet->getActiveSheet()->getStyle('B1:K1')->applyFromArray($size);

$spreadsheet->getActiveSheet()->getStyle('B1:K1')->applyFromArray($bold);
$spreadsheet->getActiveSheet()->getStyle('B2:B5')->applyFromArray($bold);
$spreadsheet->getActiveSheet()->getStyle('D2:D5')->applyFromArray($bold);
$spreadsheet->getActiveSheet()->getStyle('A7:G7')->applyFromArray($table_en);




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

$hojaActiva->setCellValue("B1","REPORTE USUARIOS");



$hojaActiva->setCellValue("B2","Codigo");
$hojaActiva->setCellValue("D2","Direccion");
$hojaActiva->setCellValue("F2","E-mail");
$hojaActiva->setCellValue("B3","SUCURSAL");
$hojaActiva->setCellValue("D3","Teléfono");
$hojaActiva->setCellValue("B5","Generado el:");
$hojaActiva->setCellValue("D5","Generado por:");

//celdas encabezado datos
$hojaActiva->setCellValue("C2","dsad");
$hojaActiva->setCellValue("C3","DDD");
$hojaActiva->setCellValue("C5","25/01/23");
$hojaActiva->setCellValue("E2","Av latacunga");
$hojaActiva->setCellValue("E3","156156156");
$hojaActiva->setCellValue("E5","Samiel");
$hojaActiva->setCellValue("G2","samie_141099@gmail.com");


//celda tabla
$hojaActiva->setCellValue("A6","LIBRO COMPRAS");

//TABLA1
$hojaActiva->setCellValue("A7","DOCUMENTO");
$hojaActiva->setCellValue("B7","CANTIDAD");
$hojaActiva->setCellValue("C7","EXENTO");
$hojaActiva->setCellValue("D7","NETO");
$hojaActiva->setCellValue("E7","IVA");
$hojaActiva->setCellValue("F7","IVA RET.");
$hojaActiva->setCellValue("G7","TOTAL");



//datos tabla1



$datos="SELECT * FROM `usuarios`";
$res_datos = $conn->query($datos);
$i=0;
$fila=8;
if(!empty($res_datos) && mysqli_num_rows($res_datos)>0){
    while($fila_datos=mysqli_fetch_array($res_datos)){
        $aux=$fila+$i;
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'A'.$aux,$fila_datos['id_usuario'],
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );
        
        $spreadsheet->getActiveSheet()
        ->getStyle('C'.$aux)
        ->getNumberFormat()
        ->setFormatCode(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);
        $hojaActiva->setCellValue('C'.$aux,$fila_datos['id_usuario']);
        
        $i++;
    }
}

//totales
$total=$i+$fila+2;
$hojaActiva->setCellValue('B'.$total,"TOTAL");
$hojaActiva->setCellValue('C'.$total,"0.00");
$hojaActiva->setCellValue('D'.$total,"0.00");
$hojaActiva->setCellValue('E'.$total,"0.00");
$hojaActiva->setCellValue('F'.$total,"0.00");
$hojaActiva->setCellValue('G'.$total,"0.00");

$spreadsheet->getActiveSheet()
->getStyle('C'.$total.':G'.$total)
->getNumberFormat()
->setFormatCode(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);


$spreadsheet->getActiveSheet()->getStyle('B'.$total.':G'.$total)->getFill()
->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
->getStartColor()->setARGB('F0F820');


//TABLA 2

//datos  tabla2

$res_datos = $conn->query($datos);
$j=0;
$fila2=$i+$fila+4;
if(!empty($res_datos) && mysqli_num_rows($res_datos)>0){
    while($fila_datos=mysqli_fetch_array($res_datos)){
        $aux2=$fila2+$j+1;
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'A'.$aux2,$fila_datos['id_usuario'],
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
            );
        
        $spreadsheet->getActiveSheet()
        ->getStyle('E'.$aux2.':G'.$aux2)
        ->getNumberFormat()
        ->setFormatCode(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);
        $hojaActiva->setCellValue('H'.$aux2,$fila_datos['id_usuario']);
        
        $j++;
    }
}
$total1=$aux2+2;
$borde2=$fila2-1;
//fila2
$hojaActiva->setCellValue('A'.$fila2,"FECHA");
$hojaActiva->setCellValue('B'.$fila2,"DOCUMENTO ");
$hojaActiva->setCellValue('C'.$fila2,"FOLIO");
$hojaActiva->setCellValue('D'.$fila2,"RAZON SOCIAL");
$hojaActiva->setCellValue('F'.$fila2,"NETO");
$hojaActiva->setCellValue('G'.$fila2,"IVA");
$hojaActiva->setCellValue('H'.$fila2,"IVA.RENT");
$hojaActiva->setCellValue('I'.$fila2,"TOTAL");
$spreadsheet->getActiveSheet()->getStyle('A'.$fila2.':I'.$fila2)->applyFromArray($table_en);
$hojaActiva->getStyle('A'.$borde2.':I'.$borde2)->applyFromArray($styleArray);

//totales
$hojaActiva->setCellValue('C'.$total1,"TOTAL");
$hojaActiva->setCellValue('E'.$total1,"0.00");
$hojaActiva->setCellValue('F'.$total1,"0.00");
$hojaActiva->setCellValue('G'.$total1,"0.00");
$hojaActiva->setCellValue('H'.$total1,"0.00");
$hojaActiva->setCellValue('I'.$total1,"0.00");


$spreadsheet->getActiveSheet()->getStyle('E'.$total1.':I'.$total1)->getFill()
->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
->getStartColor()->setARGB('F0F820');

$spreadsheet->getActiveSheet()->getStyle('C'.$total1)->getFill()
->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
->getStartColor()->setARGB('F0F820');


$spreadsheet->getActiveSheet()
->getStyle('E'.$total1.':I'.$total1)
->getNumberFormat()
->setFormatCode(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_CURRENCY_USD_SIMPLE);



header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="Libro_Compras.xlsx"');
header('Cache-Control: max-age=0');

$writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
$writer->save('php://output');


?>