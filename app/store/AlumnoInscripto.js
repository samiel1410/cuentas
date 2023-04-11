Ext.define('Legion.store.AlumnoInscripto',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.AlumnoInscripto',
    autoLoad:true,
    alias: 'store.alumno_inscrito',
    storeId: 'AlumnoInscripto',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/orden_pedido/verAlumnosOrden.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
        	limit:25,
            id_inscripcion:""
			 	
         }
     
       
     }
     
   
    
    
});