Ext.define('Legion.store.Comprobante',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Comprobante',
    autoLoad:true,
    alias: 'store.comprobante',
    storeId: 'Comprobante',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/comprobantes/verComprobante.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
        	limit:25,
            id_orden:0
        	
     
         	
         }
     
       
     }
     
   
    
    
});