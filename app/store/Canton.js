
Ext.define('Legion.store.Canton',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Canton',
    autoLoad:true,
    alias: 'store.canton',
    storeId: 'Canton',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/cantones/verCanton.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:100,
            id_provincia:""
         	
         }
     
       
     }
     
   
    
    
});