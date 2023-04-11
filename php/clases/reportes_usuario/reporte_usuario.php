<?php
require_once ("../../../php/base/db.php");
require_once ('../../../php/clases/phpspreadsheet/vendor/autoload.php');
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use \PhpOffice\PhpSpreadsheet\IOFactory;
use \PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
class metodoReporteUsuario
{

        public function reporteUsuario($id_usuario ,$id_sucursal,$instituto)
        
        {


            $conn = conexion();
            $spreadsheet = new Spreadsheet();

            $spreadsheet -> getProperties()->setCreator("Contify")->setTitle("Reporte Usuario");
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

$hojaActiva->getStyle('A6:J6')->applyFromArray($styleArray);
    $hojaActiva->getStyle('A7:J6')->applyFromArray($styleArray1);


 


    $spreadsheet->getActiveSheet()->getStyle('A7:K6')->applyFromArray($letra);
    $spreadsheet->getActiveSheet()->getStyle('A6:K6')->applyFromArray($letra2);
    $spreadsheet->getActiveSheet()->getStyle('B1:K1')->applyFromArray($size);

    $spreadsheet->getActiveSheet()->getStyle('B1:K1')->applyFromArray($bold);
    $spreadsheet->getActiveSheet()->getStyle('B2:B5')->applyFromArray($bold);
    $spreadsheet->getActiveSheet()->getStyle('D2:D5')->applyFromArray($bold);
    $spreadsheet->getActiveSheet()->getStyle('A7:I7')->applyFromArray($table_en);
   
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

            $hojaActiva->setCellValue("B1","REPORTE USUARIOS");
            $hojaActiva->setCellValue("B2","CODIGO SUCURSAL");
            $hojaActiva->setCellValue("D2","Direccion");
            $hojaActiva->setCellValue("F2","E-mail");
            $hojaActiva->setCellValue("D3","Ciudad");
            $hojaActiva->setCellValue("F3","Instituto:");
            $hojaActiva->setCellValue("B3","SUCURSAL");
            $hojaActiva->setCellValue("B5","Generado el:");
            $hojaActiva->setCellValue("D5","Generado por:");


 $hojaActiva->setCellValue("G3",$instituto);
            //celdas encabezado datos

            $query = "SELECT nombre_usuario, apellido_usuario , ciudad_sucursal,correo_usuario ,codigo_sucursal, nombre_sucursal , direccion_sucursal FROM usuarios, sucursal where id_usuario = $id_usuario and sucursal.id_sucursal = usuarios.id_fksucursal_usuario ";


                    $sql=mysqli_query($conn,$query) or  die(mysqli_error($conn));


                    $vals = mysqli_fetch_array($sql);
$hojaActiva->setCellValue("C2",$vals['codigo_sucursal']);
$hojaActiva->setCellValue("C3",$vals['nombre_sucursal']);
$hojaActiva->setCellValue("C5",date('Y-m-d'));
$hojaActiva->setCellValue("E2",$vals['direccion_sucursal']);
$hojaActiva->setCellValue("E3",$vals['ciudad_sucursal']);
$hojaActiva->setCellValue("E5",$vals['nombre_usuario']." ".$vals['apellido_usuario']);
$hojaActiva->setCellValue("G2",$vals['correo_usuario']);



//celda tabla
$hojaActiva->setCellValue("A6","LISTA DE USUARIOS");

$hojaActiva->setCellValue("A7","#");
$hojaActiva->setCellValue("B7","NOMBRE");
$hojaActiva->setCellValue("C7","APELLIDO");
$hojaActiva->setCellValue("D7","CONTRASEÑA");
$hojaActiva->setCellValue("E7","ROL");
$hojaActiva->setCellValue("F7","ESTADO");
$hojaActiva->setCellValue("G7","CORREO");
$hojaActiva->setCellValue("H7","SUCURSAL");
$hojaActiva->setCellValue("I7","CREADO");



$query_lista = "SELECT id_usuario , nombre_usuario , apellido_usuario , clave_usuario ,rol_usuario,estado_usuario ,correo_usuario,nombre_sucursal , usuarios.created_at from usuarios , sucursal where  usuarios.id_fksucursal_usuario=sucursal.id_sucursal  ";
if($id_sucursal!=""){
            
    $query_lista .=" AND id_fksucursal_usuario= $id_sucursal AND estado_usuario=1";
};

$sql_lista=mysqli_query($conn,$query_lista) or  die(mysqli_error($conn));



$i=0;
$fila=8;

while ($vals_lis = mysqli_fetch_array($sql_lista)) {
    $aux=$fila+$i;

    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'A'.$aux,$i+1,
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );

    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'B'.$aux,$vals_lis['nombre_usuario'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );
    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'C'.$aux,$vals_lis['apellido_usuario'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );
    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'D'.$aux,$vals_lis['clave_usuario'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );

    if($vals_lis['rol_usuario']==1){
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'E'.$aux,'Super Admin',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );

    }
    else if($vals_lis['rol_usuario']==2){
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'E'.$aux,'Admin',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );

    }else{
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'E'.$aux,'Secretari@',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );


    }

    if($vals_lis['estado_usuario']==1){
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'F'.$aux,'Activo',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );

    }
    else{
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'F'.$aux,'Inactivo',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );


    }

    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'G'.$aux,$vals_lis['correo_usuario'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );

    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'H'.$aux,$vals_lis['nombre_sucursal'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );

    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'I'.$aux,$vals_lis['created_at'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );




    


    $i++;






}
$j=0;

$fila2=$aux+1;


$query_lista_2 = "SELECT id_usuario , nombre_usuario , apellido_usuario , clave_usuario ,rol_usuario,estado_usuario ,correo_usuario,nombre_sucursal , usuarios.created_at from usuarios , sucursal where  usuarios.id_fksucursal_usuario=sucursal.id_sucursal  ";
if($id_sucursal!=""){
            
    $query_lista_2 .=" AND id_fksucursal_usuario= $id_sucursal AND estado_usuario=0";
};

$sql_lista_2=mysqli_query($conn,$query_lista_2) or  die(mysqli_error($conn));


while ($vals_lis2 = mysqli_fetch_array($sql_lista_2)) {
    $aux2=$fila2+$j;

    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'A'.$aux2,$i+$j+1,
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );

    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'B'.$aux2,$vals_lis2['nombre_usuario'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );
    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'C'.$aux2,$vals_lis2['apellido_usuario'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );
    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'D'.$aux2,$vals_lis2['clave_usuario'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );

    if($vals_lis2['rol_usuario']==1){
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'E'.$aux2,'COMANDO',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );

    }
    else if($vals_lis2['rol_usuario']==2){
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'E'.$aux2,'DIRECTOR',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );

    }else{
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'E'.$aux2,'SECRETARI@',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );


    }

    if($vals_lis2['estado_usuario']==1){
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'F'.$aux2,'Activo',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );

    }
    else{
        $spreadsheet->getActiveSheet()->setCellValueExplicit(
            'F'.$aux2,'Inactivo',
            \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
        );


    }

    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'G'.$aux2,$vals_lis2['correo_usuario'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );

    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'H'.$aux,$vals_lis2['nombre_sucursal'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );

    $spreadsheet->getActiveSheet()->setCellValueExplicit(
        'I'.$aux2,$vals_lis2['created_at'],
        \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING
    );




    


    $j++;






}







         
        
        $writer = new Xlsx($spreadsheet);
        $writer->save('Reporte_Usuarios.xlsx');
        // Redireccionamos para que descargue el archivo generado
        header("Location: Reporte_Usuarios.xlsx");

        
       

}
}
?>