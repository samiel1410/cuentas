Ext.define('Legion.store.Cuentas_Cobrar',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Cuentas_Cobrar',
    autoLoad:true,
    alias: 'store.Cuentas_Cobrar',
    storeId: 'Cuentas_Cobrar',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/cuentas_cobrar/verCuentasCobrar.php',
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