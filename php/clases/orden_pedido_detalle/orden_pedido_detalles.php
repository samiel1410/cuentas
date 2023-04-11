
<?php
require_once ("../../../php/base/db.php");
class metodosOrdenPedidoDetalle
{

    public function insertarOrdenPedidoDetalle($id_fkorden_pedido_detalle,$id_fkcurso_orden_pedido_detalle,$nombre_orden_pedido_detalle,$cantidad_orden_pedido_detalle,$iva_orden_pedido_detalle,$precio_orden_pedido_detalle,$descuento_orden_pedido_detalle,$total_orden_pedido_detalle,$id_usuario,$id_sucursal)
    {
      
        $conn=conexion();
        $query = "CALL  `insertar_orden_pedido_detalle`($id_fkorden_pedido_detalle,$id_fkcurso_orden_pedido_detalle,$nombre_orden_pedido_detalle,$cantidad_orden_pedido_detalle,$iva_orden_pedido_detalle,$precio_orden_pedido_detalle,$descuento_orden_pedido_detalle,$total_orden_pedido_detalle,$id_usuario,$id_sucursal)";

        $insertar= mysqli_query($conn,$query);
        
        
        if ($insertar) {
            $resp = "Orden Pedido Detalle  ingresado";
        } else
            $resp = 0;

        return $resp;
    }

    public function actualizarOrdenPedidoDetalle($id_orden_pedido_detalle,$id_fkorden_pedido_detalle,$id_fkcurso_orden_pedido_detalle,$nombre_orden_pedido_detalle,$cantidad_orden_pedido_detalle,$iva_orden_pedido_detalle,$precio_orden_pedido_detalle,$descuento_orden_pedido_detalle,$total_orden_pedido_detalle,$id_sucursal)
    {
    
        $conn=conexion();
        $query = "CALL  `actualizar_orden_pedido_detalle`($id_orden_pedido_detalle,$id_fkorden_pedido_detalle,$id_fkcurso_orden_pedido_detalle,$nombre_orden_pedido_detalle,$cantidad_orden_pedido_detalle,$iva_orden_pedido_detalle,$precio_orden_pedido_detalle,$descuento_orden_pedido_detalle,$total_orden_pedido_detalle,$id_sucursal)";
        $actualizar= mysqli_query($conn,$query);
       
        if ($actualizar)
            return 1;
        else
            return 0;
    }
    
 
    public function eliminarOrdenPedidoDetalle($id_orden_pedido_detalle)
    {
      
        echo "Ingreso elimnado";
        $conn=conexion();
        $query= "CALL  eliminar_orden_pedido_detalle($id_orden_pedido_detalle);";
        $eliminar= mysqli_query($conn,$query);
        
      
               
        }
    
    

        public function seleccionarOrdenPedidoDetallePaginado($inicio, $limite)
    {
        echo "funcion";
        $conn=conexion();
        $response = new stdClass();
        $data = Array();
        $query = "CALL  `ver_orden_pedido_detalle`()";

        $sql=mysqli_query($conn,$query);
        
        $total=mysqli_num_rows($sql);
        $response->success=true;
        $response->total=$total;
        $response->mensaje="Orden Pedido Detalle";

        while ($vals = mysqli_fetch_array($sql)) {
          
            
            $data[] = Array('id_orden_pedido_detalle' => $vals['id_orden_pedido_detalle'], 
            'id_fkorden_pedido_detalle' => $vals['id_fkorden_pedido_detalle']
                ,'id_fkcurso_orden_pedido_detalle' => $vals['id_fkcurso_orden_pedido_detalle'],
                'nombre_orden_pedido_detalle' => $vals['nombre_orden_pedido_detalle'],
                'cantidad_orden_pedido_detalle' => $vals['cantidad_orden_pedido_detalle'],
                'iva_orden_pedido_detalle' => $vals['iva_orden_pedido_detalle'],
                'precio_orden_pedido_detalle' => $vals['precio_orden_pedido_detalle'],
                'total_orden_pedido_detalle' => $vals['total_orden_pedido_detalle'],
                'id_usuario' => $vals['id_usuario'],
                'id_sucursal' => $vals['id_sucursal'],
                'created_at' => $vals['created_at'],
  
            );
            $response->data=array_slice($data, $inicio,$limite);
            
        }
     
        echo json_encode($response);


    }

    
}


?>