Ext.define('Legion.controller.AlumnoController', {
	extend : 'Ext.app.Controller',
	models : ['Legion.model.Alumno'],
	views : ['Legion.view.alumno.AlumnoWindow'],
	stores : ['Alumno'],
	refs : [{
				ref : 'alumnoMasterForm'

			}],

	init : function() {
		this.control({

					'#mostrar_formulario_alumno' : {
						btnWindow : this.onWindow

					},
					'#guardar_alumno' : {
						btnCreate : this.onCreateClick

					},
					'#action_alumno' : {
						btnUpdate : this.onUpdateClick,
						btnDelete : this.onDeleteClick,
						menu : this.menuBar,
						btnShowAlumno:this.onShowAlumno

					},

					'#nombre_busqueda_alumno' : {
						specialkey : this.onBusquedaNombre
					},

					
					'#cedula_busqueda_alumno' : {
						specialkey : this.onBusquedaCedula
					},
					'#sucursal_busqueda_alumno' : {
						change : this.onBusquedaSucursal
					},

					'#window_alumno_inscripcion #sucursal_busqueda_inscripcion_ins' : {
						change : this.onBusquedaSucursalIns
					},

					'#window_alumno_inscripcion #nombre_busqueda_alumno_ins' : {
						specialkey : this.onBusquedaInscripcionAlumno
					},

					'#boton_refresh_alumno' : {
						btnRefresh : this.onRefresh

					},
					'#boton_refresh_alumno_ins':{
						btnRefreshIns: this.onRefreshIns

					},
					'#imagen_alumno' : {
						change : this.onSelectImage
					},

					'#imagen_alumno_editar' : {
						change : this.onSelectImageEdit
					},
					'#mostrar_columnas' : {

						ComboMostrarColumnas : this.onMostrarColumnas,
						OcultarColumnas : this.onOcultarColumnas
					},
					'#imagen_alumno' : {
						change : this.onMostrarImagenAlumno
					},
					"#btnReporteAlumno" : {
						click : this.onbtnReporteAlumno
					  },
					  '#boton_buscar_alumno': {
						btnBuscar: this.onBuscar
					},

					'#boton_buscar_alumno_ins': {
						btnBuscarIns: this.onBuscarIns
					},

				});
	},

	onBuscar: function () {
		var store = Ext.getStore('Alumno');

		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_alumno')[0]
			.getValue();
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_alumno')[0]
			.getValue();

		
			var cedula = Ext.ComponentQuery.query('#cedula_busqueda_alumno')[0]
			.getValue();

		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)


				if(response_aux.rol==2 || response_aux.rol==3){
			
			
					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: "",
						estado:"",
						cedula:cedula,
						provincia:"",
						ciudad:""
			
					};
			
					store.loadPage(1);


					
				

				}
				else{

					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: "",
						estado:"",
						cedula:cedula,
						provincia:"",
						ciudad:""
			
					};
			
					store.loadPage(1);

				}
			

			
			}

		}

		);
		

	},


	onBuscarIns: function () {
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_alumno_ins')[0]
						.getValue();
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_inscripcion_ins')[0]
						.getValue();

						var store = Ext.getStore('Alumno');
		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)


				if(response_aux.rol==2 || response_aux.rol==3){
					

					
			
					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: "",
						estado:1,
						cedula:"",
						provincia:"",
						ciudad:""
			
					};
			
					store.loadPage(1);


					
				

				}else{

					store.getProxy().extraParams = {
						nombre_busqueda: nombre,
						sucursal_busqueda: "",
						estado:1,
						cedula:"",
						provincia:"",
						ciudad:""
			
					};
			
					store.loadPage(1);

				}
			

			
			}

		}

		);
		

	},

	onRefresh : function() {
		var store = Ext.getStore('Alumno');
		

		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)


				if(response_aux.rol==2 || response_aux.rol==3){
					Ext.ComponentQuery.query('#nombre_busqueda_alumno')[0].reset();
					Ext.ComponentQuery.query('#cedula_busqueda_alumno')[0].reset();
					Ext.ComponentQuery.query('#provincia_busqueda')[0].reset();
					Ext.ComponentQuery.query('#ciudad_busqueda')[0].reset();
				
					
					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: "",
						estado:"",
						cedula:"",
						provincia:"",
						ciudad:""
			
					};
			
					store.loadPage(1);


					
				

				}else{
					Ext.ComponentQuery.query('#nombre_busqueda_alumno')[0].reset();
					Ext.ComponentQuery.query('#sucursal_busqueda_alumno')[0].reset();
					Ext.ComponentQuery.query('#cedula_busqueda_alumno')[0].reset();
					Ext.ComponentQuery.query('#provincia_busqueda')[0].reset();
					Ext.ComponentQuery.query('#ciudad_busqueda')[0].reset();
					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: "",
						estado:"",
						cedula:"",
						provincia:"",
						ciudad:""
			
					};
			
					store.loadPage(1);

					
				}
			

			
			}

		}

		);

	},


	onRefreshIns : function() {
		var store = Ext.getStore('Alumno');
	
		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)


				if(response_aux.rol==2 || response_aux.rol==3){
					Ext.ComponentQuery.query('#nombre_busqueda_alumno_ins')[0].reset();
				
					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: "",
						estado:1,
						cedula:"",
						provincia:"",
						ciudad:""
			
					};
			
					store.loadPage(1);


					
				

				}
				else{

					Ext.ComponentQuery.query('#nombre_busqueda_alumno_ins')[0].reset();
					Ext.ComponentQuery.query('#sucursal_busqueda_inscripcion_ins')[0].reset();
					
					store.getProxy().extraParams = {
						nombre_busqueda: "",
						sucursal_busqueda: "",
						estado:"",
						cedula:"",
						provincia:"",
						ciudad:""
			
					};
			
					store.loadPage(1);

				}
			

			
			}

		}

		);

	},

	onBusquedaSucursal : function() {
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_alumno')[0]
				.getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_alumno')[0]
				.getValue();
	
		var store = Ext.getStore('Alumno');
		if (nombre != "") {
			
			store.getProxy().extraParams = {

				sucursal_busqueda : sucursal,
				nombre_busqueda : nombre,
				estado:"",
				cedula:"",
				provincia:"",
						ciudad:"",
						cedula:""

			}
		}

		else {

			store.getProxy().extraParams = {
				sucursal_busqueda : sucursal,
				nombre_busqueda : nombre,
				estado:"",
				provincia:"",
						ciudad:"",
						cedula:""

			}

		}

		store.loadPage(1);
	},

	onBusquedaSucursalIns:function(){

		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_inscripcion_ins')[0]
				.getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_alumno_ins')[0]
				.getValue();
		var store = Ext.getStore('Alumno');
		if (nombre != "") {
			
			store.getProxy().extraParams = {

				sucursal_busqueda : sucursal,
				nombre_busqueda : nombre,
				estado:1,
				cedula:"",
				provincia:"",
						ciudad:""

			}
		}

		else {

			store.getProxy().extraParams = {
				sucursal_busqueda : sucursal,
				nombre_busqueda : nombre,
				estado:1,
				cedula:"",
				provincia:"",
						ciudad:""
				


			}

		}

		store.loadPage(1);
	},

	
	onBusquedaCedula : function(field, e) {
		var cedula = Ext.ComponentQuery.query('#cedula_busqueda_alumno')[0]
				.getValue();

				var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_alumno')[0]
				.getValue();




				Ext.Ajax.request({
					url : 'php/negocios/usuarios/recuperarUsuario.php',
					method : 'POST',
					
		
					success : function(response) {
		
						var response_aux = Ext.util.JSON
						.decode(response.responseText, true);
						console.log(response_aux)
		
						store = Ext.getStore("Alumno");
						if(response_aux.rol==2|| response_aux.rol==3){
						
							
							if (e.getKey() == e.ENTER) {
		
						
							
								store.getProxy().extraParams = {
					
									sucursal_busqueda : "",
									nombre_busqueda : "",
									estado:"",
									cedula:cedula,
									provincia:"",
						ciudad:""
					
								}
								store.loadPage(1);
							}
							if (e.getKey() == e.ENTER && cedula == "") {
		
								cedula="";
							
								store.getProxy().extraParams = {
					
									sucursal_busqueda : "",
									nombre_busqueda : "",
									estado:"",
									cedula:cedula,
									provincia:"",
						ciudad:""
					
								}
								store.loadPage(1);
							}
					
					
						
		
		
							
						
		
						}else{
		
			
							if (e.getKey() == e.ENTER) {
		
						
							
								store.getProxy().extraParams = {
					
									sucursal_busqueda :"",
									nombre_busqueda : "",
									estado:"",
									cedula:cedula,
									provincia:"",
						ciudad:""
					
								}
								store.loadPage(1);
							}
							if (e.getKey() == e.ENTER && cedula == "") {
		
							
							
								store.getProxy().extraParams = {
					
									sucursal_busqueda : "",
									nombre_busqueda : "",
									estado:"",
									cedula:cedula,
									provincia:"",
						ciudad:""
					
								}
								store.loadPage(1);
							}
					
					
							
		
						}
					
		
					
					}
		
				}
		
				);

	},


	onBusquedaNombre : function(field, e) {
		var sucursal = Ext.ComponentQuery.query('#sucursal_busqueda_alumno')[0]
				.getValue();
		var nombre = Ext.ComponentQuery.query('#nombre_busqueda_alumno')[0]
				.getValue();



				Ext.Ajax.request({
					url : 'php/negocios/usuarios/recuperarUsuario.php',
					method : 'POST',
					
		
					success : function(response) {
		
						var response_aux = Ext.util.JSON
						.decode(response.responseText, true);
						console.log(response_aux)
		
						store = Ext.getStore("Alumno");
						if(response_aux.rol==2|| response_aux.rol==3){
						
							
							if (e.getKey() == e.ENTER) {
		
						
							
								store.getProxy().extraParams = {
					
									sucursal_busqueda : "",
									nombre_busqueda : nombre,
									estado:"",
									cedula:"",
									provincia:"",
						ciudad:""
					
								}
								store.loadPage(1);
							}
							if (e.getKey() == e.ENTER && nombre ==  '""') {
		
								nombre="";
							
								store.getProxy().extraParams = {
					
									sucursal_busqueda :"",
									nombre_busqueda : nombre,
									estado:"",
									cedula:"",
									provincia:"",
						ciudad:""
								}
								store.loadPage(1);
							}
					
					
						
		
		
							
						
		
						}else{
		
			
							if (e.getKey() == e.ENTER) {
		
						
							
								store.getProxy().extraParams = {
					
									sucursal_busqueda :"",
									nombre_busqueda : nombre,
									estado:"",
									cedula:"",
									provincia:"",
									ciudad:""
					
								}
								store.loadPage(1);
							}
							if (e.getKey() == e.ENTER && nombre ==  '""') {
		
								nombre="";
							
								store.getProxy().extraParams = {
					
									sucursal_busqueda : "",
									nombre_busqueda : nombre,
									estado:"",
									cedula:"",
									provincia:"",
									ciudad:""
					
								}
								store.load();
							}
					
					
							
		
						}
					
		
					
					}
		
				}
		
				);

	},


	onBusquedaInscripcionAlumno:function(){


		var sucursal = Ext.ComponentQuery.query('#window_alumno_inscripcion #sucursal_busqueda_inscripcion_ins')[0]
		.getValue();
		var nombre = Ext.ComponentQuery.query('#window_alumno_inscripcion #nombre_busqueda_alumno_ins')[0]
		.getValue();



		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
			

				store = Ext.getStore("Alumno");
				if(response_aux.rol==2|| response_aux.rol==3){
				
				
					
				f
					if (nombre != "") {
					
						store.getProxy().extraParams = {
			
							sucursal_busqueda : "",
							nombre_busqueda : nombre,
							estado:1,
							cedula:"",
									provincia:"",
						ciudad:""
			
						}
					}
			
					else {
			
						store.getProxy().extraParams = {
							sucursal_busqueda : "",
							nombre_busqueda : nombre,
							estado:1,
							cedula:"",
									provincia:"",
						ciudad:""
			
						}
			
					}
			
					store.loadPage(1);


					
				

				}else{


					if (nombre != "") {
						
						store.getProxy().extraParams = {
			
							sucursal_busqueda : "",
							nombre_busqueda : nombre,
							estado:1,
							cedula:"",
									provincia:"",
						ciudad:""
			
						}
					}
			
					else {
			
						store.getProxy().extraParams = {
							sucursal_busqueda : "",
							nombre_busqueda : nombre,
							estado:1,
							cedula:"",
									provincia:"",
						ciudad:""
			
						}
			
					}
			
					store.loadPage(1);

				}
			

			
			}

		}

		);


	},

	onSelectImage : function(newVal) {
		var file = newVal.fileInputEl.el.dom.files[0];
		var reader = new FileReader();
		console.log(reader);
		reader.readAsDataURL(file);
		reader.onload = function(evt) {
			Ext.ComponentQuery.query('#imagen_alumno_vistas')[0]
					.setSrc(evt.target.result);
		}
	},
	onSelectImageEdit : function(newVal) {
		var file = newVal.fileInputEl.el.dom.files[0];
		var reader = new FileReader();
	
		Ext.ComponentQuery.query('#window_alumno #alumnoFormEditar #imagen_validar_alumno')[0]
		.setValue(1);
		reader.readAsDataURL(file);
		reader.onload = function(evt) {
			Ext.ComponentQuery.query('#imagen_vista_alumno_editar')[0]
					.setSrc(evt.target.result);
		}
	},

	onWindow : function() {
		var window = Ext.create('Legion.view.alumno.AlumnoWindow');
		window.show();

	},
	onDeleteClick : function(grid, rowIndex, colIndex) {

		var rec = grid.getStore().getAt(rowIndex);
		Ext.Ajax.request({
			url: 'php/negocios/alumnos/verificarAlumnoInscripcion.php',
			method: 'POST',
			params: {
				id_alumno : rec.data.id_alumno
			},

			success: function (response) {
				console.log(response)
				var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
				if (response_aux.total > 0) {

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: 'Este Alumno no puede Eliminar por que tiene Inscripciones Activas',
						buttons: Ext.MessageBox.OKCANCEL,
						icon: Ext.MessageBox.WARNING,

					});
				}
				else{
					
		Ext.MessageBox.show({
			title : 'Advertencia',
			msg : 'Seguro que deseea Borrar?',
			buttons : Ext.MessageBox.OKCANCEL,
			icon : Ext.MessageBox.WARNING,
			fn : function(btn) {
				if (btn == 'ok') {
			

					Ext.Ajax.request({
						url : 'php/negocios/alumnos/eliminarAlumno.php',
						method : 'POST',
						params : {
							id_alumno : rec.data.id_alumno
						},

						success : function() {

							Ext.getStore('Alumno').load();
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

		var id = record.data.id_alumno;
		var nombre = record.data.nombre_alumno;
		var apellido = record.data.apellido_alumno;
		var fecha_naci = record.data.fecha_naci_alumno;
		var direccion = record.data.direccion_alumno;
		var telefono = record.data.telefono_alumno;
		var celular = record.data.celular_alumno;
		var cedula = record.data.cedula_alumno;
		var institucion = record.data.instruccion_alumno;
		var ciudad = record.data.ciudad_alumno;
		var estado = record.data.estado_alumno;
		var correo = record.data.correo_alumno;
		var sangre = record.data.tipo_sangre_alumno;
		var nombre_repre = record.data.nombre_representante_alumno;
		var numero_repre = record.data.numero_representante_alumno;
		var talla = record.data.talla_uniforme_alumno;
		var calzado = record.data.numero_calzado_alumno;
		var provincia = record.data.id_fkprovincia_alumno;
		
		var src = record.data.imagen_src;
		console.log(src);

		var window = Ext.create('Legion.view.alumno.AlumnoWindow');
		window.setTitle("Actualizar Alumno:" + nombre + " ", true);
		window.show();

		Ext.ComponentQuery.query('#window_alumno #alumnoFormEditar #id_alumno')[0]
				.setValue(id);
		
				Ext.ComponentQuery.query('#window_alumno #alumnoFormEditar #id_fkprovincia_alumno_edit')[0]
				.setValue(provincia);

		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #nombre_alumno')[0]
				.setValue(nombre);

		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #apellido_alumno')[0]
				.setValue(apellido);

		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #fecha_naci_alumno')[0]
				.setValue(fecha_naci);

		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #direccion_alumno')[0]
				.setValue(direccion);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #telefono_alumno')[0]
				.setValue(telefono);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #celular_alumno')[0]
				.setValue(celular);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #instruccion_alumno')[0]
				.setValue(institucion);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #ciudad_alumno')[0]
				.setValue(ciudad);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #estado_alumno')[0]
				.setValue(estado);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #correo_alumno')[0]
				.setValue(correo);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #cedula_alumno')[0]
				.setValue(cedula);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #tipo_sangre_alumno')[0]
				.setValue(sangre);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #imagen_vista_alumno_editar')[0]
				.setSrc(src)

		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #nombre_representante_alumno')[0]
				.setValue(nombre_repre);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #numero_representante_alumno')[0]
				.setValue(numero_repre);
		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #talla_uniforme_alumno')[0]
				.setValue(talla);

		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #numero_calzado_alumno')[0]
				.setValue(calzado);

		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #numero_calzado_alumno')[0]
				.setValue(calzado);
		

		Ext.ComponentQuery
				.query('#window_alumno #alumnoFormEditar #guardar_alumno')[0]
				.setText("Editar", true);

	},

	onCreateClick : function(form) {
	

		if (!form || !form.isValid()) {
			alert('Verifica los datos Ingresados');
			return;
		}

		form.submit({
			url : 'php/negocios/alumnos/ingresar_actualizarAlumno.php',
			waitMsg : 'Creando Nuevo alumno...',

			success : function(data, response) {
				var tipo = response.result.tipo;
				console.log(tipo);

				if (tipo == 0) {

					Ext.MessageBox.show({
								title : 'Mensaje',
								msg : 'Nuevo Alumno Creado',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO

							});
					form.reset();
					Ext.ComponentQuery.query('Alumnos')[0].setActiveTab(0);

					Ext.MessageBox.show({
						title : 'Mensaje',
						msg : 'Podra actualizar los datos del alumno durante 2 semanas',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO

					});


				}
				if (tipo == 1) {

					var window2 = Ext.ComponentQuery.query('#window_alumno')[0];

					Ext.MessageBox.show({
								title : 'Mensaje',
								msg : 'Alumno Actualizado',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO

							});
					window2.close();
				}
				Ext.getStore('Alumno').load();

			},
			failure : function() {
				console.log("dsa");
			}
		});

	},

	onMostrarColumnas : function(combo, records) {

		Ext.each(records, function(rec) {
					node = combo.getPicker().getNode(rec);
					if (rec.data.id == 1) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[10]
								.setVisible(true)

					}
					if (rec.data.id == 2) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[11]
								.setVisible(true)

					}
					if (rec.data.id == 3) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[12]
								.setVisible(true)

					}
					if (rec.data.id == 4) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[13]
								.setVisible(true)

					}
					
					if (rec.data.id == 6) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[14]
								.setVisible(true)

					}
					if (rec.data.id == 7) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[15]
								.setVisible(true)

					}
					if (rec.data.id == 8) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[16]
								.setVisible(true)

					}
					if (rec.data.id == 9) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[17]
								.setVisible(true)

					}

					if (rec.data.id == 10) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[18]
								.setVisible(true)

					}
					if (rec.data.id == 11) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[19]
								.setVisible(true)

					}
					if (rec.data.id == 12) {
						Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[20]
								.setVisible(true)

					}

					Ext.get(node).down('input').dom.checked = true;

				});
	},

	onOcultarColumnas : function(combo, rec) {

		var node = combo.getPicker().getNode(rec);
		if (rec.data.id == 1) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[10]
					.setVisible(false)
		}
		if (rec.data.id == 2) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[11]
					.setVisible(false)
		}
		if (rec.data.id == 3) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[12]
					.setVisible(false)
		}
		if (rec.data.id == 4) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[13]
					.setVisible(false)
		}
		

		if (rec.data.id == 6) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[14]
					.setVisible(false)
		}
		if (rec.data.id == 7) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[15]
					.setVisible(false)
		}
		if (rec.data.id == 8) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[16]
					.setVisible(false)
		}
		if (rec.data.id == 9) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[17]
					.setVisible(false)
		}
		if (rec.data.id == 10) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[18]
					.setVisible(false)
		}
		if (rec.data.id == 11) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[19]
					.setVisible(false)
		}
		if (rec.data.id == 12) {
			Ext.ComponentQuery.query('#AlumnoGrid')[0].columns[20]
					.setVisible(false)
		}

		Ext.get(node).down('input').dom.checked = false;
	},
	
	
	//MenuBar
	menuBar : function(grid, rowIndex, colIndex, item, e, record) {
		var menu_grid = new Ext.menu.Menu({
					items : [
						{
								text : 'Ver Inscripciones',
								iconCls : 'fas fa-book-reader',

								handler : function() {

									store = Ext.getStore('InscripcionesAlumno')

									store.getProxy().extraParams={
										id_alumno : record.data.id_alumno,
										

									}
									store.load();

								
									var window = Ext.create('Legion.view.alumno.VerInscripciones');
							
									window.show();

									//Pagar


									
									
									
								}
							},
							 {
								text : 'Ver Ficha de Alumno',
								iconCls : 'fas fa-user-graduate',
								handler : function() {

									nombre_alumno = record.data.nombre_alumno;
									apellido_alumno =  record.data.apellido_alumno;
									fecha_naci =  record.data.fecha_naci_alumno;
									provincia = record.data.provincia;
									ciudad = record.data.ciudad_alumno;
									celular_alumno = record.data.celular_alumno;
									correo_alumno = record.data.correo_alumno;

									representante =record.data.nombre_representante_alumno;
									numero_repre =record.data.numero_representante_alumno;
									id_alumno=record.data.id_alumno;
									
								
									
									

									var window2= Ext.create('Ext.window.Window', {
										title : 'Alumno'+" "+nombre_alumno +" "+apellido_alumno,
										layout: {
											align: 'middle',
											pack: 'center',
											type: 'hbox'
										},
										height:600,
										width:600,
										modal : true,
										listeners: {
											show: function() {
											  var myFrame = Ext.create('Ext.Component', {
												height:600,
										width:600,
												autoEl: {
												  tag: 'iframe',
												  
												  src: 'php/negocios/reportes/fichaAlumno.php?id_alumno='+id_alumno+'&ciudad='+ciudad+'&provincia='+provincia+'&fecha_naci='+fecha_naci
												}
											  });
											  this.add(myFrame);
											}
										  }
										
							
								});
								window2.show();
									
								}
							}]
				});

		var position = e.getXY();
		e.stopEvent();
		menu_grid.showAt(position);

	},

	onMostrarImagenAlumno : function(newVal) {
		var file = newVal.fileInputEl.el.dom.files[0];
		var reader = new FileReader();

		

			reader.readAsDataURL(file);
		reader.onload = function (evt) {

			Ext.ComponentQuery.query('#imagen_alumno_vistas')[0]
			.setSrc(evt.target.result);

			
		}

	},
	onbtnReporteAlumno : function() {


		Ext.Ajax.request({
			url : 'php/negocios/usuarios/recuperarUsuario.php',
			method : 'POST',
			

			success : function(response) {

				var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux.rol)


			
					var window2= Ext.create('Ext.window.Window', {
						title : 'Reporte Alumnos',
						layout: {
						
							pack: 'center',
							type: 'vbox'
						},
						height:200,
						width:300,
						modal : true,
						items:[
							{
								fieldLabel : 'Provincia',
								itemId : 'id_fkprovincia_alumno_reporte',
								name : 'id_fkprovincia_alumno',
								margin : '5',
								xtype : 'combo',
								dock : 'top',
								enableKeyEvents : true,
								editable : false,
								displayField : 'provincia',
								valueField : 'id',
								mode : 'local',
								triggerAction : 'all',
								emptyText : 'Seleccionar',
								store : 'Provincia',
								queryMode : 'local',
								
								allowBlank : false,
								listeners:{
									change: function(){
										store = Ext.getStore('Canton');
										value=Ext.ComponentQuery
										.query('#id_fkprovincia_alumno_reporte')[0]
										.getValue();
			
										store.getProxy().extraParams={
											id_provincia:value,
											
			
										}
										store.load();
										
			
									}
								}
								
							},

							{
								fieldLabel : 'Ciudad',
								itemId : 'ciudad_alumno_reporte',
								name : 'ciudad_alumno',
								margin : '5',
								xtype : 'combo',
								dock : 'top',
								enableKeyEvents : true,
								editable : false,
								displayField : 'canton',
								valueField : 'canton',
								mode : 'local',
								triggerAction : 'all',
								emptyText : 'Seleccionar',
								store : 'Canton',
								queryMode : 'local',
								
								allowBlank : false,
							
							}, ,{
									xtype : 'button',
									text:'Generar Reporte',
														margin : '5',
														iconCls : 'fas fa-clipboard',
														itemId : 'boton_refresh',
														handler : function() {

															provincia=Ext.ComponentQuery
										.query('#id_fkprovincia_alumno_reporte')[0]
										.getValue();
										combo=Ext.ComponentQuery
										.query('#id_fkprovincia_alumno_reporte')[0];
										
										ciudad=Ext.ComponentQuery
										.query('#ciudad_alumno_reporte')[0]
										.getValue();


										var value = combo.getValue();
				var valueField = combo.valueField;
				var record;
				combo.getStore().each(function(r){
					if(r.data[valueField] == value){
						record = r;
						return false;
					}
				});
										nombre_provincia=record.get(combo.displayField);
															
							window.open('php/negocios/reportes/reporteAlumnos.php?provincia='+provincia+'&ciudad='+ciudad+'&nombre_provincia='+nombre_provincia, '_blank');
							
														}
			
								}
			
							
						]
			
				});
				window2.show();

				

				
			}

		}

		);


		
		
	
	
	  },

	  onShowAlumno: function(view, rowIndex, colIndex, item, e, record, row) {
		
		var src2 = record.data.imagen_src;
		console.log(src2);
		Ext.create('Ext.window.Window', {
					title : 'Alumno' + " " + record.data.nombre_alumno +" "+record.data.apellido_alumno,
					height : 200,
					width : 400,
					modal : true,
					items : [{
								xtype : 'image',
								src : src2,
								height : 200,
								width : 400

							}]
				}).show();

	},
	
	

});