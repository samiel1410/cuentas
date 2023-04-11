Ext.define('Legion.store.Inscripcion',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Inscripcion',
    autoLoad:true,
    alias: 'store.inscripcion',
    storeId: 'Inscripcion',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/inscripciones/verInscripciones.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:25,
            id_alumno:"",
            nombre_busqueda : "",
            sucursal_busqueda : "",
            mes:"",
            anio:"",
            fecha_start:"",
            fecha_end:"",
            curso:"",
            estado:""
           
         
     
         	
         }
     
       
     }
     
   
    
    
});