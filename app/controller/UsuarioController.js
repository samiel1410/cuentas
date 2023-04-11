Ext.define('Legion.controller.UsuarioController', {
	extend : 'Ext.app.Controller',
	models : ['Legion.model.Usuario'],
	views : ['Legion.view.usuario.Usuarios'],
	stores : ['Usuario'],
	refs : [{
				ref : 'usuarioMasterForm'

			}],

	init : function() {
		this.control({

					'#guardar_usuario' : {
						btnCreate : this.onCreateClick
					},
					'#mostar_formulario_usuario' : {
						btnWindow : this.onWindow
					},
					'#action_usuario' : {
						btnUpdate : this.onUpdateClick,
						btnDelete : this.onDeleteClick
					},

					'#nombre_busqueda' : {
						specialkey : this.onBusquedaNombre
					},
					'#sucursal_busqueda' : {
						change : this.onBusquedaSucursal
					},

					'#boton_refresh' : {
						btnRefresh : this.onRefresh

					},
					'#boton_buscar' : {
						btnBuscar : this.onBuscar
					},
					'#boton_reporte_usuario' : {
						btnReporte : this.reporteUsuario
					},
					"#btnReporteUsuario" : {
						click : this.onbtnReporteUsaurio
					  },
					  '#guardar_usuario_conf':{
						btnActualizarConf: this.onUpdateUsuarioCon
					  },
					  '#estado_usuario_bus':{
						change: this.onBusquedaEstado
					  }

				});
	},

	onRefresh : function() {
		var store = Ext.getStore('Usuario');
		Ext.ComponentQuery.query('#nombre_busqueda')[0].reset();
		Ext.ComponentQuery.query('#sucursal_busqueda')[0].reset();
		Ext.ComponentQuery.query('#id_fkempresa_sucursal_bus')[0].reset();
		Ext.ComponentQuery.query('#estado_usuario_bus')[0].reset();
		store.getProxy().extraParams = {
			nombre_busqueda : "",
			sucursal_busqueda : "",
			estado: ""

		};
		store.load();

	},

	onBusquedaSucursal : function() {
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda')[0].getValue();
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda')[0]
				.getValue();

		console.log(sucursal);
		var store = Ext.getStore('Usuario');

		if (nombre != "") {

			store.getProxy().extraParams = {

				sucursal_busqueda : sucursal,
				nombre_busqueda : nombre,
				estado: ""

			}
		}

		else {

			store.getProxy().extraParams = {
				sucursal_busqueda : sucursal,
				nombre_busqueda : nombre,
				estado: ""

			}

		}

		store.loadPage(1);

	},
	onBusquedaNombre : function(field, e) {
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda')[0]
				.getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda')[0].getValue();

		if (e.getKey() == e.ENTER) {

			var store = Ext.getStore('Usuario');

			store.getProxy().extraParams = {
				nombre_busqueda : nombre,
				sucursal_busqueda : sucursal,
				estado: ""

			};
			store.loadPage(1);
			console.log(nombre);

		}

		if (e.getKey() == e.ENTER && nombre == '""') {
			nombre = ""

			store.getProxy().extraParams = {
				nombre_busqueda : nombre,
				sucursal_busqueda : sucursal,
				estado: ""

			};
			store.load();

		}

	},

	onBuscar : function() {
		var store = Ext.getStore('Usuario');

		var nombre = Ext.ComponentQuery.query('#nombre_busqueda')[0].getValue();
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda')[0]
				.getValue();

		store.getProxy().extraParams = {
			nombre_busqueda : nombre,
			sucursal_busqueda : sucursal,
			estado: ""

		};

		store.loadPage(1);

	},
	onWindow : function() {
		var window = Ext.create('Legion.view.usuario.UsuarioWindow');
		window.show();

	},
	onDeleteClick : function(grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex);


		Ext.Ajax.request({
			url : 'php/negocios/usuarios/verificarUsuarioCurso.php',
			method : 'POST',
			params:{
				id_usuario: rec.data.id_usuario
			},

			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)

				if (response_aux.total > 0) {

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Este Usuario no puede ser borrado por que tiene cursos adjuntos',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING,

					});
				}
				else {




					
				Ext.MessageBox.show({
					title : 'Advertencia',
					msg : 'Seguro que deseea Borrar a:' + rec.data.nombre_usuario + " "
							+ rec.data.apellido_usuario + "?",
					buttons : Ext.MessageBox.OKCANCEL,
					icon : Ext.MessageBox.WARNING,
					fn : function(btn) {
						if (btn == 'ok') {
		
							Ext.Ajax.request({
								url : 'php/negocios/usuarios/eliminarUsuario.php',
								method : 'POST',
								params : {
									id_usuario : rec.get('id_usuario')
								},
		
								success : function() {
		
									Ext.getStore('Usuario').load();
								}
		
							}
		
							);
		
						}
					}
				});



				}






			

			
			}

		}

		);

		

	},

	onUpdateClick : function(view, rowIndex, colIndex, item, e, record, row) {

		var id = record.data.id_usuario;
		var nombre = record.data.nombre_usuario;
		var apellido = record.data.apellido_usuario;
		var clave = record.data.clave_usuario;
		var rol = record.data.rol_usuario;
		var estado = record.data.estado_usuario;
		var correo = record.data.correo_usuario;
		var sucursal = record.data.id_fksucursal_usuario;

		Ext.Ajax.request({
			url : 'php/negocios/empresas/recuperarInstituto.php',
			method : 'POST',
			params:{
				id_sucursal :sucursal

			},
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)
				var id_empresa = response_aux.id

				Ext.ComponentQuery
				.query('#window2 #usuarioFormEditar #id_fkempresa_sucursal_edi')[0]
				.setValue(id_empresa);
				
				store = Ext.getStore('Sucursal');
				store.getProxy().extraParams={
					id_empresa:id_empresa,
					nombre_busqueda:""

				}
				store.load();
				




					

				

			
			}

		}

		);
	

		var window = Ext.create('Legion.view.usuario.UsuarioWindow');
		window.setTitle("Actualizar Usuario:" + nombre + " " + apellido, true);
		window.show();

		Ext.ComponentQuery.query('#window2 #usuarioFormEditar #id_usuario')[0]
				.setValue(id);


		
		Ext.ComponentQuery.query('#window2 #usuarioFormEditar #nombre_usuario')[0]
				.setValue(nombre);
		Ext.ComponentQuery
				.query('#window2 #usuarioFormEditar #apellido_usuario')[0]
				.setValue(apellido);
		Ext.ComponentQuery.query('#window2 #usuarioFormEditar #clave_usuario')[0]
				.setValue(clave);
		Ext.ComponentQuery.query('#window2 #usuarioFormEditar #rol_usuario')[0]
				.setValue(rol);

		Ext.ComponentQuery.query('#window2 #usuarioFormEditar #estado_usuario')[0]
				.setValue(estado);
		Ext.ComponentQuery.query('#window2 #usuarioFormEditar #correo_usuario')[0]
				.setValue(correo);
		Ext.ComponentQuery.query('#window2 #usuarioFormEditar #estado_usuario')[0]
				.setValue(estado);
	

		Ext.ComponentQuery
				.query('#window2 #usuarioFormEditar #id_fksucursal_usuario')[0]
				.setValue(sucursal);

		Ext.ComponentQuery
				.query('#window2 #usuarioFormEditar #guardar_usuario ')[0]
				.setText("Actualizar", true);

	},

	onCreateClick : function(form) {

		var values;

		if (!form || !form.isValid()) {
			alert('Verifica los datos Ingresados!!');
			return;
		}
		


		form.submit({
			url: 'php/negocios/usuarios/ingresar_actualizarUsuario.php',
			waitMsg: 'Espere...',

			success: function (data, response) {
				var tipo = response.result.tipo;
				console.log(tipo);

				
				if (tipo == 2) {

				

					Ext.MessageBox.show({
								title : 'Usuarios',
								msg : 'Este Correo Ya Existe',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING

							});
					
				};

				if (tipo == 0) {

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Nuevo Usuario Creado',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING

					});
					form.reset();
					Ext.ComponentQuery.query('Usuarios')[0].setActiveTab(0);
					Ext.getStore('Usuario').load();



					Ext.Ajax.request({
						url : 'php/negocios/correos/enviarUsuario.php',
						method : 'POST',
						
			
						success : function(response) {
			
							var response_aux = Ext.util.JSON
							.decode(response.responseText, true);
							console.log(response_aux);
			
			
						}
			
					}
			
					);
			

				}
				if (tipo == 1) {

					var window2 = Ext.ComponentQuery.query('#window2')[0];
				
					

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Usuario Actualizado',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING

					});
					window2.close();
				
					 Ext.getStore('Usuario').load();
					 console.log("EW");
					 Ext.getStore('Alumno').load();
				}
				

			},
			failure: function () {
				console.log("Error");
			}
		});

	

	},



	onUpdateUsuarioCon : function(form) {

		var values;

		if (!form || !form.isValid()) {
			alert('Verifica los datos Ingresados!!');
			return;
		}
		


		form.submit({
			url: 'php/negocios/usuarios/ingresar_actualizarUsuario.php',
			waitMsg: 'Espere...',

			success: function (data, response) {
				var tipo = response.result.tipo;
				console.log(tipo);

				
				if (tipo == 2) {



					Ext.MessageBox.show({
								title : 'Usuarios',
								msg : 'Este Correo Ya Existe',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.WARNING

							});
					
				};

				
				if (tipo == 1) {


					var windowcon =  Ext.ComponentQuery.query('#window_form_confi_usuario')[0];
					

					Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Usuario Actualizado',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING

					});
			
					 windowcon.close();
					 Ext.getStore('Usuario').load();
				}
				

			},
			failure: function () {
				console.log("Error");
			}
		});

	

	},




	onbtnReporteUsaurio : function() {


		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux.rol)


				if(response_aux.rol==1){
					var window2= Ext.create('Ext.window.Window', {
						title : 'Reporte Usuarios',
						layout: 'vbox',
						
						height:200,
					width:300,	
						modal : true,
						items:[
							
							{
								xtype : 'combo',
								fieldLabel : 'Institucion',
								margin: '10',
								name : 'id_fkempresa_sucursal',
								itemId : 'id_fkempresa_sucursal_re',
								enableKeyEvents : true,
								editable : false,
								
								typeAhead : true,
								mode : 'local',
								triggerAction : 'all',
								emptyText : 'Seleccionar',
								autoLoad : true,
								store : 'Empresa',
								displayField : 'alias_empresa',
								valueField : 'id_empresa',
								
								listeners:{
									change: function(){
									   
				
										store = Ext.getStore('Sucursal');
										value=Ext.ComponentQuery
						.query('#id_fkempresa_sucursal_re')[0]
						.getValue();
						
				
										store.getProxy().extraParams={
											id_empresa:value,
											nombre_busqueda:""
				
										}
										store.load();
				
									
										
				
									}
								}
				
				
				
				
				
							},{
									xtype : 'combo',
									fieldLabel : 'Sucursal',
									margin: '10',
									name : 'id_fksucursal_usuario',
									itemId : 'id_fksucursal_usuario_reporte',
									enableKeyEvents : true,
									editable : false,
									allowBlank : false,
									typeAhead : true,
									mode : 'local',
									triggerAction : 'all',
									emptyText : 'Seleccionar',
									autoLoad : true,
									store : 'Sucursal',
									displayField : 'nombre_sucursal',
									valueField : 'id_sucursal',
								},{
									xtype : 'button',
									
									text:'Generar Reporte de Usuarios',
														margin : '0 0 0 10',
														iconCls : 'fas fa-clipboard',
														itemId : 'boton_refresh',
														handler : function() {
															sucursal =Ext.ComponentQuery
							.query('#id_fksucursal_usuario_reporte')[0]
							.getValue();
							combo=Ext.ComponentQuery
							.query('#id_fkempresa_sucursal_re')[0]
							
							var value = combo.getValue();
    var valueField = combo.valueField;
    var record;
    combo.getStore().each(function(r){
        if(r.data[valueField] == value){
            record = r;
            return false;
        }
    });

 	instituto=record.get(combo.displayField);
		
						
						
							window.open('php/negocios/reportes/reporteUsuarios.php?id_sucursal='+sucursal+'&instituto='+instituto, '_blank');
							
														}
			
								}
			
							
						]
			
				});
				window2.show();

				}

			}

		}

		);


		
		
	
	
	  },


	  onBusquedaEstado: function(){
		var estado = Ext.ComponentQuery.query('#estado_usuario_bus')[0]
		.getValue();
		store = Ext.getStore('Usuario');
		store.getProxy().extraParams={
			nombre_busqueda:"",
         	sucursal_busqueda:"",
			estado: estado

		}

		store.load();

	  }

});