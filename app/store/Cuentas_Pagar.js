Ext.define('Legion.store.Cuentas_Pagar',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.Cuentas_Pagar',
    autoLoad:true,
    alias: 'store.Cuentas_Pagar',
    storeId: 'Cuentas_Pagar',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/cuentas_pagar/verCuentasPagar.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
        	limit:25,
          periodo:"",
          desde:"",
				hasta:"",
                observacion:"",
                numero:"",
                estado:"",
                sucursal:"",
                departamento:""
        	
     
         	
         }
     
       
     }
     
   
    
    
});