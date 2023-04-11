Ext.define('Legion.store.AlumnoInscripciones',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.MensualidadOrden',
    autoLoad:true,
    alias: 'store.inscripcionMensualidad',
    storeId: 'AlumnoInscripciones',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/orden_pedido/verMensualidadAlumnosIns.php',
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