Ext.define('Legion.store.Usuario',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Usuario',
    autoLoad:true,
    alias: 'store.users',
    storeId: 'Usuario',
    pageSize:25,
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/usuarios/verUsuario.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
         extraParams:{
         	inicio:0,
         	limit:25,
         	nombre_busqueda:"",
         	sucursal_busqueda:"",
            estado :""
         }
       
     }
   
   
    
    
});