Ext.define('Legion.store.Alumno',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Alumno',
    autoLoad:true,
    alias: 'store.alumno',
    storeId: 'Alumno',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/alumnos/verAlumno.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
        	limit:25,
        		sucursal_busqueda : "",
			nombre_busqueda : "",
            estado:"",
            cedula:"",
            provincia:"",
            ciudad:""

     
         	
         }
     
       
     }
     
   
    
    
});