Ext.define('Legion.store.Curso',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Curso',
    autoLoad:true,
    alias: 'store.curso',
    storeId: 'Curso',
 
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/cursos/verCurso.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:25,
             nombre_busqueda : "",
             sucursal_busqueda : "",
             mes:"",
             anio:"",
             fecha_start:"",
             fecha_end:"",
             estado:""
            
         	
         }
     
       
     }
     
   
    
    
});