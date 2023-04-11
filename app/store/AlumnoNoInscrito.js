Ext.define('Legion.store.AlumnoNoInscrito',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Alumno',
    autoLoad:true,
    alias: 'store.alumno_no_inscrito',
    storeId: 'AlumnoNoInscrito',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/alumnos/verAlumnoNoInscrito.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
        	limit:25,
			nombre_busqueda : ""
     
         	
         }
     
       
     }
     
   
    
    
});