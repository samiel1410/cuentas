Ext.define('Legion.store.OrdenPedido',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.OrdenPedido',
    autoLoad:true,
    alias: 'store.ordenpedido',
    storeId: 'OrdenPedido',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/orden_pedido/verOrdenPedido.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:25,
            nombre_busqueda:"",
            sucursal_busqueda:"",
            mes: "",
						anio: "",
						fecha_start: "",
						fecha_end: ""

         		
         	
         	
         }
     
       
     }
     
   
    
    
});