
Ext.define('Legion.store.CertificacionesEdit',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Certificaciones',
    autoLoad:true,
    alias: 'store.canton',
    storeId: 'CertificacionesEdit',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/certificados_instructor/verCertificaciones.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:25,
            id_instructor:""
         	
         }
     
       
     }
     
   
    
    
});