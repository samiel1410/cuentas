Ext.define('Legion.store.Instructor',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Instructor',
    autoLoad:true,
    alias: 'store.instructor',
    storeId: 'Instructor',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/instructores/verInstructor.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:25,
         
			nombre_busqueda : "",
            cedula_busqueda:"",
            estado:""	
         	
         	
         }
     
       
     }
     
   
    
    
});