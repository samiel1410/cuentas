Ext.define('Legion.store.Sucursal',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Sucursal',
    autoLoad:true,
    alias: 'store.sucursal',
    storeId: 'Sucursal',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/sucursales/verSucursal.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
           extraParams:{
         	inicio:0,
         	limit:25,

			nombre_busqueda : "",
      id_empresa : ""
         	
         }
     
       
     }
     
   
    
    
});