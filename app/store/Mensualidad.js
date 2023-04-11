Ext.define('Legion.store.Mensualidad',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Mensualidad',
    autoLoad:true,
    alias: 'store.mensualidad',
    storeId: 'Mensualidad',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/mensualidades/verMensualidad.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
        	limit:25,
        	estado_busqueda:""
        	
     
         	
         }
     
       
     }
     
   
    
    
});