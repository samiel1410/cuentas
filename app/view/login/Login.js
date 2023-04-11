Ext.define('Legion.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'app-login',
  
    requires: [
      'Legion.view.login.LoginController',
      'Ext.form.Panel'
    ],
    controller: 'login',
  
    closable: false,
    resizable: false,
    autoShow: true,
    maximized: true,
    modal: true,
    scrollable: true,
    header: false,
    style: 'border-width: 0;',
  
    layout: {
      type: 'vbox',
      align: 'center',
      pack: 'center'
    },
  
    items: [{
      xtype: 'form',
      defaultButton: 'loginButton',
      bodyPadding: '20 20',
      width: 415,
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      defaults: {
        margin: '5 0'
      },
      title: 'Login',
      items: [{
          xtype: 'label',
          text: 'Ingrese el usuario y contraseña:'
        },
        {
          xtype: 'textfield',
          reference: 'txtuserid',
          name: 'nombre_usuario',
          height: 55,
          hideLabel: false,
          allowBlank: false,
          emptyText: 'Usuario'
        },
        {
          xtype: 'textfield',
          reference: 'txtpassword',
          name: 'clave_usuario',
          inputType: 'password',
          height: 55,
          hideLabel: true,
          allowBlank: false,
          emptyText: 'Contraseña'
        },
        {
          xtype: 'button',
          reference: 'loginButton',
          scale: 'large',
          iconAlign: 'right',
          iconCls: 'x-fa fa-angle-right',
          text: 'Iniciar Sesion',
          formBind: true,
          listeners: {
            click: 'onLoginClick'
          }
        }
      ]
    }]
  });