Ext.define('Legion.store.Certificaciones',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Certificaciones',
    
    storeId: 'Certificaciones',


    
    proxy: {
    	
    	type:'ajax',
       
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },

     }
     
   
    
    
});