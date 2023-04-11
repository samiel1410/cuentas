Ext.define('Legion.view.inicio.Inicio', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.inicio',
  width: '100%',
  height: '100%',
  layout: 'vbox',
  listeners: {
    beforerender: function () {

      Ext.Ajax.request({
        url: 'php/negocios/usuarios/recuperarUsuario.php',
        method: 'POST',


        success: function (response) {

          var response_aux = Ext.util.JSON
            .decode(response.responseText, true);
          console.log(response_aux)


          if (response_aux.id_empresa == 1) {
            Ext.ComponentQuery.query('#titulo')[0].update('INSTITUTO DE EDUCACIÓN CONTINUA Y CAPACITACIONES PROFESIONALES');
            Ext.ComponentQuery.query('#titulo2')[0].update('"LA LEGIÓN GROUP"');
            Ext.ComponentQuery.query('#imagen_inicio')[0].setSrc('images/membrete2.jpg');


          } else {
            Ext.ComponentQuery.query('#titulo')[0].update('ORGANISMO EVALUADOR Y CERTIFICADOR DE COMPETENCIAS LABORALES');
            Ext.ComponentQuery.query('#titulo2')[0].update('"GROUPO LA LEGIÓN ECUADOR"');
            Ext.ComponentQuery.query('#imagen_inicio')[0].setSrc('images/membrete3.png');


          }



        }

      }

      );
    }
  },

  items: [
    {
      xtype: 'component',
      html: '',
      margin: '30 0 10 50',
      centered: true,
      itemId: 'titulo',
      style: {
        'font-family': 'Arial Black, sans-serif',
        'font-size': '20px',
        'color': '#4d4d4d',
        'text-align': 'center',
        'text-transform': 'uppercase',
        'letter-spacing': '2px',
        'border-bottom': '3px solid #c7b377',
        'padding-bottom': '10px',
        'margin-bottom': '20px',
        'text-shadow': '1px 1px 2px rgba(0,0,0,0.5)'

      }


    },

    {
      xtype: 'component',
      html: '',
      margin: '0 50 0 400',
      centered: true,
      itemId: 'titulo2',
      style: {
        'font-family': 'Arial Black, sans-serif',
        'font-size': '20px',
        'color': '#4d4d4d',
        'text-align': 'center',
        'text-transform': 'uppercase',
        'letter-spacing': '2px',
        'border-bottom': '3px solid #c7b377',
        'padding-bottom': '10px',
        'margin-bottom': '20px',
        'text-shadow': '1px 1px 2px rgba(0,0,0,0.5)'



      }


    },
    {


      layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'center'
      },

      items: [{
        margin: '0 0 0 50',
        itemId:"imagen_inicio",
        xtype: 'image',
        src: '',
        mode: 'image',
        height: 300,
        width:999

      }]


    }, {

      xtype: 'fieldset',
      itemId: 'fieldset',

      title: 'Acciones Rapidas',


      defaultType: 'textfield',
      defaults: {
        anchor: '100%',

      },

      width: '100%',
      layout: 'hbox',
      columnWidth: 0.5,
      style: {
        background: 'White'
      },
      margin: '10',
      items: [{

        layout: {
          type: 'fit',

        },
        defaults: {
          textAlign: 'left',
          padding: '20'
        },
        xtype: 'toolbar',

        items: [{
          iconCls: 'fas fa-file-excel',
          text: ' Alumnos',
          itemId: 'dirigir_alumnos',
          handler: function () {

            this.fireEvent('btnDirigirAlumnos');


          }
        }
          ,
        ]



      }, {

        layout: {
          type: 'fit',

        },
        defaults: {
          textAlign: 'center',
          padding: '20'
        },
        xtype: 'toolbar',
        margin: '0 0 0 250',

        items: [{
          iconCls: 'fas fa-file-excel',
          text: ' Inscripciones',
          itemId: 'dirigir_inscripciones',
          handler: function () {

            this.fireEvent('btnDirigirInscripciones');


          }


        }
          ,
        ]




      },
      {

        layout: {
          type: 'fit',

        },
        defaults: {
          textAlign: 'center',
          padding: '20'
        },
        xtype: 'toolbar',
        margin: '0 0 0 240',
        items: [{
          iconCls: 'fas fa-file-excel',
          text: 'Ordenes de Pedido',
          itemId: 'dirigir_orden',
          handler: function () {

            this.fireEvent('btnDirigirOrden');


          }
        }
          ,
        ]




      }]
    }

  ]



});
