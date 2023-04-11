Ext.define('Legion.store.InscripcionesAlumno',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Inscripcion',
    autoLoad:true,
    alias: 'store.inscripcion',
    storeId: 'InscripcionesAlumno',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/inscripciones/verInscripcionesAlumno.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:25,
            id_alumno:"",
          
           
         
     
         	
         }
     
       
     }
     
   
    
    
});