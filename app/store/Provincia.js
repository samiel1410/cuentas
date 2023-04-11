Ext.define('Legion.store.Provincia',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Provincia',
    autoLoad:true,
    alias: 'store.provincia',
    storeId: 'Provincia',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/provincias/verProvincia.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:25,
           
            

         		
         	
         	
         }
     
       
     }
     
   
    
    
});