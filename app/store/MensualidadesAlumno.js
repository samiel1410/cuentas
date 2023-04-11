Ext.define('Legion.store.MensualidadesAlumno',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.MensualidadOrden',
    autoLoad:true,
    alias: 'store.inscripcionMensualidad',
    storeId: 'MensualidadesAlumno',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/orden_pedido/verMensualidadAlumnos.php',
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