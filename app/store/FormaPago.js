Ext.define('Legion.store.FormaPago',
{
    extend: 'Ext.data.Store',
    model: 'Legion.model.FormaPago',
    autoLoad:true,
    alias: 'store.formpago',
    storeId: 'FormaPago',
    proxy: {
    	
    	type:'ajax',
         url: 'php/negocios/forma_pagos/verFormaPago.php',
         reader: {
             type: 'json',
             root: 'data',
             totalProperty:'total'
         },
          extraParams:{
         	inicio:0,
         	limit:25,
         	nombre_busqueda:""
     
         	
         }
     
       
     }
     
   
    
    
});