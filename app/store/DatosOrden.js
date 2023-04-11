Ext.define('Legion.store.DatosOrden',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.DatosOrden',
    autoLoad:true,
    alias: 'store.datos_orden',
    storeId: 'DatosOrden',
    proxy: {
    	
    	type:'ajax',
       
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          
     
       
     }
     
   
    
    
});