Ext.define('Legion.store.InscripcionMensualidades',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Mensualidad',
    autoLoad:true,
    alias: 'store.inscripcionMensualidad',
    storeId: 'InscripcionMensualidades',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/inscripciones/verInscripcionMensualidades.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:25,
         	inscripcion:0
     
         	
         }
     
       
     }
     
   
    
    
});