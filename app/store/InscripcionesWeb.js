Ext.define('Legion.store.InscripcionesWeb',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.InscripcionesWeb',
    autoLoad:true,
   
    storeId: 'InscripcionesWeb',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/inscripciones_web/verInscripcionesWeb.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
        	limit:25,
            cedula_busqueda:""
	
     
         	
         }
     
       
     }
     
   
    
    
});