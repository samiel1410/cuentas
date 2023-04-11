Ext.define('Legion.store.HistorialCertificados',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.HistorialCertificados',
    autoLoad:true,
    
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/historial/verHistorialCertificado.php',
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