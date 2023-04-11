Ext.define('Legion.view.forma_pago.FormaWindowReporte', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.window_forma_reporte',
    cls: 'myCls',
    autoScroll: true,

    items: [
      
      
      
      
      {
        xtype: 'fieldset',
        itemId: 'fieldset',

        title: 'EXCEL',

        defaultType: 'textfield',
        defaults: {
            anchor: '100%',
      
        },
       
        width:400,
        layout: 'hbox',
        columnWidth : 0.5,
        style : {
          background : 'White'
        },
        margin : '10',
        items: [{

            layout : {
                type : 'fit',
              
              },
              defaults : {
                textAlign : 'left',
                padding : '10'
              },
              xtype : 'toolbar',

              items : [{
                iconCls : 'fas fa-file-excel',
                text : 'Reporte por Formas de Pago',
                itemId : 'btnReporteForma'
              }]
        
            

        }]
    }]
});