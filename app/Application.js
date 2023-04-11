
Ext.define('Legion.Application', {
    extend: 'Ext.app.Application',
  
    name: 'Legion',
 	alias: 'widget.Legion',
    views: [
      'Legion.view.login.Login',
      'Legion.view.main.Main'
    ],
    stores:['Usuario','Sucursal','Curso','Instructor','Sucursal','Alumno','FormaPago','Inscripcion','AlumnoNoInscrito','Mensualidad','InscripcionMensualidades','OrdenPedido','AlumnoInscripto','MensualidadesAlumno','DatosOrden','Comprobante','Empresa','Provincia','Canton','Certificaciones','CertificacionesEdit','AlumnoInscripciones','HistorialCertificados','InscripcionesWeb','InscripcionesAlumno','Cuentas_Cobrar'],
    controllers:['UsuarioController','CursoController','InstructorController','SucursalController','AlumnoController','FormaController','InscripcionController','MensualidadController','OrdenPedidoController','InicionController','InscripcionWeb','Cuenta_Cobrar'],
   

    controller: {
      routes: {
          orden: 'OrdenPedidos',
      
      },
  
  },
    quickTips: false,
    platformConfig: {
      desktop: {
        quickTips: true
      }
    },
  
    launch: function() {
  
     
      var inicio;
      inicio = localStorage.getItem("Inicio de sesión de usuario");
      Ext.widget(inicio ? 'app-login' : 'app-main');
  
    },
  
    onAppUpdate: function() {
      Ext.Msg.confirm('Actualizar', 'Recargar?',
        function(choice) {
          if (choice === 'yes') {
            window.location.reload();
          }
        }
      );
    }
});