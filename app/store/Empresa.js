Ext.define('Legion.store.Empresa',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Empresa',
    autoLoad:true,
    alias: 'store.empresa',
    storeId: 'Empresa',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/empresas/verEmpresa.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:25
         	
         }
     
       
     }
     
   
    
    
});