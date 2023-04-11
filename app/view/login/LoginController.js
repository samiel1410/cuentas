Ext.define('Legion.view.login.LoginController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.login',

  onLoginClick: function() {

    var me = this,
      nombre_usuario = me.lookup('txtuserid').getValue(),
      clave_usuario = me.lookup('txtpassword').getValue();

	var paramentroFinal_usuario="'"+nombre_usuario+"'";
	

    Ext.MessageBox.show({
      msg: 'Cargando',
      progressText: 'Cargando...',
      width: 300,
      wait: {
        interval: 100
      },
      animateTarget: true
    });

  
    me.timer = Ext.defer(function() {
    
      Ext.Ajax.request({
        url: '../php/login/login.php',
        method: 'post',
        params: {
          nombre_usuario: paramentroFinal_usuario,
          clave_usuario: clave_usuario
        },
        success: function(response) {
          me.timer = null;
          Ext.MessageBox.hide();

          var resp = Ext.decode(response.responseText, true);
          if (resp !== null) {
            if (resp.success) {
             
              localStorage.setItem("Iniciar sesion", true);
          
              me.timer = null;

              Ext.MessageBox.hide();

              me.getView().destroy();

           
              Ext.widget('app-main');
               
              
            } else {
              Ext.Msg.alert('Fallo login', resp.msg);
            }
          } else {
            Ext.Msg.alert('Fallo login', response.responseText);
          }
        },
        failure: function(response, opts) {
          me.timer = null;
          Ext.MessageBox.hide();
          var resp = Ext.decode(response.responseText, true);
          if (resp !== null) {
            Ext.Msg.alert('Fallo login', resp.msg);
          } else {
            Ext.Msg.alert(response.responseText);
          }
        }
      });

    }, 300);
  }
});