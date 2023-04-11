Ext.define('Legion.controller.InscripcionWeb', {
	extend: 'Ext.app.Controller',
	
	refs: [{
		ref: 'formaMasterForm'

	}],

	init: function () {
		this.control({

			
			'#action_web': {
				btnUpdate: this.onUpdateClick,
				btnDelete: this.onDeleteClick,
                btnProcesarWeb: this.onProcesarWeb
			},

            '#guardar_web':{
                btnUpdateGuardar:this.onGuadar
            },
			'#curso_variable_inscripcion_web': {
				change: this.onCheckCursoVariable
			},
			'#boton_refresh_cedula':{
				btnRefresh : this.onRefresh
			},
			'#cedula_web':{
				specialkey	: this.onBusquedaCedula
			}


		});
	},

	onRefresh: function () {

		var store = Ext.getStore('InscripcionesWeb');
		Ext.ComponentQuery.query('#cedula_web')[0].reset();


		store.getProxy().extraParams = {
			inicio:0,
			cedula_busqueda: ""

		};
		store.load();

	},


	onBusquedaCedula: function (field, e) {

		var cedula = Ext.ComponentQuery.query('#cedula_web')[0]
			.getValue();
		var store = Ext.getStore('InscripcionesWeb');
		if (e.getKey() == e.ENTER) {



			store.getProxy().extraParams = {
				inicio:0,
				cedula_busqueda: cedula

			};
			store.loadPage(1);
		

		}

		if (e.getKey() == e.ENTER && cedula == '""') {
			cedula = ""

			store.getProxy().extraParams = {
				cedula_busqueda: cedula
				

			};
			store.load();

		}

	},

	onWindow: function () {
		var window = Ext.create('Legion.view.forma_pago.FormaPagoWindow');
		window.show();

	},
	onDeleteClick: function (view, rowIndex, colIndex, item, e, record, row) {

		if(record.data.estado==1){
			Ext.MessageBox.show({
				title: 'Advertencia',
				msg: 'Esta inscripción ya ha sido procesada , no se puede eliminar',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING,

			});

		}
		else{

			Ext.MessageBox.show({
				title: 'Advertencia',
				msg: 'Seguro que deseea Borrar?',
				buttons: Ext.MessageBox.OKCANCEL,
				icon: Ext.MessageBox.WARNING,
				fn: function (btn) {
					if (btn == 'ok') {
						
	
						Ext.Ajax.request({
							url: 'php/negocios/inscripciones_web/eliminarInscripcionWeb.php',
							method: 'POST',
							params: {
								id_inscripcion_web: record.data.id_inscripcion_web
							},
	
							success: function () {
	
								Ext.getStore('InscripcionesWeb').load();
							}
	
						}
	
						);
	
					}
				}
			});

		}

		

	},

	onUpdateClick: function (view, rowIndex, colIndex, item, e, record, row) {

		if(record.data.estado==1){
			Ext.MessageBox.show({
				title: 'Advertencia',
				msg: 'Esta inscripción ya ha sido procesada , no se puede editar',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING,

			});

		}
		else{


			var window = Ext.create('Legion.view.inscripcion_web.InscripcionesWebEdit');
			window.setTitle("Actualizar", true);
			window.show();
	
			Ext.ComponentQuery.query('#edit_web #WebForm #id_inscripcion_web')[0]
				.setValue(record.data.id_inscripcion_web);
			  
			
			Ext.ComponentQuery.query('#edit_web #WebForm #id_institucion')[0]
				.setValue(record.data.id_institucion);     
				
				
				Ext.ComponentQuery.query('#edit_web #WebForm #id_curso')[0]
				.setValue(record.data.id_curso);      
		
				Ext.ComponentQuery.query('#edit_web #WebForm #cedula')[0]
				.setValue(record.data.cedula);      
	
				Ext.ComponentQuery.query('#edit_web #WebForm #nombre')[0]
				.setValue(record.data.nombre);    
				
				
	
				Ext.ComponentQuery.query('#edit_web #WebForm #apellido')[0]
				.setValue(record.data.apellido);      
		
	
				Ext.ComponentQuery.query('#edit_web #WebForm #tipo_sangre')[0]
				.setValue(record.data.tipo_sangre);   
	
				Ext.ComponentQuery.query('#edit_web #WebForm #id_provincia')[0]
				.setValue(record.data.id_provincia);
		
	
				Ext.ComponentQuery.query('#edit_web #WebForm #id_ciudad')[0]
				.setValue(record.data.id_ciudad);
	
	
				
				Ext.ComponentQuery.query('#edit_web #WebForm #celular')[0]
				.setValue(record.data.celular);
	
				
	
				Ext.ComponentQuery.query('#edit_web #WebForm #representante')[0]
				.setValue(record.data.representante);
		
	
				Ext.ComponentQuery.query('#edit_web #WebForm #numero_repre')[0]
				.setValue(record.data.numero_repre);
		
				Ext.ComponentQuery.query('#edit_web #WebForm #correo')[0]
				.setValue(record.data.correo);
		
	
				Ext.ComponentQuery.query('#edit_web #WebForm #estudios')[0]
				.setValue(record.data.estudios);
	
	
				Ext.ComponentQuery.query('#edit_web #WebForm #talla_uniforme')[0]
				.setValue(record.data.talla_uniforme);
	
	
				Ext.ComponentQuery.query('#edit_web #WebForm #numero_calzado')[0]
				.setValue(record.data.numero_calzado);
	
				Ext.ComponentQuery.query('#edit_web #WebForm #dirrecion')[0]
				.setValue(record.data.dirreccion);
			
		}


	







	

	},


    onGuadar: function(form,window){

        form.submit({
			url: 'php/negocios/inscripciones_web/actualizarInscripcionWeb.php',
			
			
            success: function (data, response) {

                
				
				console.log(response.result.success)
                if(response.result.success==true){

                    Ext.MessageBox.show({
						title: 'Mensaje',
						msg: 'Inscripcion Web Actualizada',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.QUESTION,

					});

                    Ext.getStore('InscripcionesWeb').load();
                    window.close();



                }



				

			},
			failure: function () {
				console.log("Error");
			}
		});


    },

    onProcesarWeb: function(view, rowIndex, colIndex,
        item, e, record, row){


			if(record.data.estado==0){
				Ext.MessageBox.show({
					title: 'Advertencia',
					msg: 'Desea guardar el alumno y procesar la inscripcion?',
					buttons: Ext.MessageBox.OKCANCEL,
					icon: Ext.MessageBox.QUESTION,
					fn: function (btn) {
						if (btn == 'ok') {
	
				var window = Ext.create('Legion.view.inscripcion_web.InscripcionWebProcesar');
			   
	
				Ext.Ajax.request({
					url: 'php/negocios/inscripciones_web/actualizarEstado.php',
					method: 'POST',
					params: {
						id_inscripcion_web : record.data.id_inscripcion_web
					},
	
	
					success: function (response) {
	
						var response_aux = Ext.util.JSON
							.decode(response.responseText, true);
						console.log(response_aux)
	
	
						
	
	
	
	
					}
	
	
	
	
				}
	
				);
				
				Ext.Ajax.request({
					url: 'php/negocios/alumnos/ingresar_actualizarAlumno.php',
					method: 'POST',
					params: {
						id_alumno: "",
						nombre_alumno: record.data.nombre,
						apellido_alumno: record.data.apellido,
						fecha_naci_alumno: "",
						direccion_alumno: record.data.dirreccion,
						telefono_alumno: "",
						celular_alumno: record.data.celular,
						instruccion_alumno: record.data.estudios,
						ciudad_alumno: record.data.canton,
						estado_alumno: 1,
						cedula_alumno: record.data.cedula,
						correo_alumno: record.data.correo,
						cedula_alumno: record.data.cedula,
						tipo_sangre_alumno: record.data.tipo_sangre,
						nombre_representante_alumno: record.data.representante,
						numero_representante_alumno: record.data.numero_repre,
						talla_uniforme_alumno: record.data.talla_uniforme,
						numero_calzado_alumno: record.data.numero_calzado,
						id_fkprovincia_alumno: record.data.id_provincia,
						imagen_validar_alumno : 0,
						
	
	
					},
	
	
					success: function (response) {
	
						var response_aux = Ext.util.JSON
							.decode(response.responseText, true);
						console.log(response_aux)
	
	
						if (response_aux.success == true) {
	
							console.log("Ingresado");
	
	
						} 
	
	
	
	
					}
	
	
	
	
				}
	
				);
	
	
				window.show();

				Ext.Ajax.request({
					url: 'php/negocios/inscripciones_web/recuperarUltimoAlumno.php',
					method: 'POST',
					params:{
						id_curso:record.data.id_curso
					},
					
	
	
					success: function (response) {
	
						var response_aux = Ext.util.JSON
							.decode(response.responseText, true);
						console.log(response_aux)
						var id_alumno=response_aux.id_alumno



						Ext.ComponentQuery.query('#procesar #ProcesarWeb #nombre_alumno_web')[0]
						.setValue(record.data.nombre +" "+record.data.apellido);

						Ext.ComponentQuery.query('#procesar #ProcesarWeb #nombre_alumno_web_id')[0]
						.setValue(id_alumno);


						Ext.ComponentQuery.query('#procesar #ProcesarWeb #nombre_curso_web')[0]
						.setValue(response_aux.nombre_curso);


						Ext.ComponentQuery.query('#procesar #ProcesarWeb #nombre_curso_web_id')[0]
						.setValue(record.data.id_curso);


						Ext.ComponentQuery.query('#procesar #ProcesarWeb #sucursal_web')[0]
						.setValue(response_aux.id_sucursal);

						Ext.ComponentQuery.query('#procesar #ProcesarWeb #nombre_sucursal')[0]
						.setValue(response_aux.nombre_sucursal);


						
						Ext.ComponentQuery.query('#procesar #ProcesarWeb #fecha_inicio_inscripcion_web')[0]
						.setValue(response_aux.fecha_inicio);


						Ext.ComponentQuery.query('#procesar #ProcesarWeb #fecha_fin_inscripcion_web')[0]
						.setValue(response_aux.fecha_fin);


						
						Ext.ComponentQuery.query('#procesar #ProcesarWeb #id_fkinstructor_inscripcion_web')[0]
						.setValue(response_aux.id_instructor);


						
						Ext.ComponentQuery.query('#procesar #ProcesarWeb #nombre_instructor_web')[0]
						.setValue(response_aux.instructor);


						Ext.ComponentQuery.query('#procesar #ProcesarWeb #precio_total_curso_web')[0]
						.setValue(response_aux.precio);



						Ext.ComponentQuery.query('#procesar #ProcesarWeb #mensualidades_curso')[0]
						.setValue(response_aux.mensualidades);

						Ext.ComponentQuery.query('#procesar #ProcesarWeb #duracion_curso')[0]
						.setValue(response_aux.duracion);
							
							
							
	
	
						
	
	
	
	
					}

				});
	
	
				
		
							
		
						}
					}
				});


			}else{

				Ext.MessageBox.show({
					title: 'Mensaje',
					msg: 'Esta inscripcion ya fue procesada',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.QUESTION,

				});


			}


		

            





            


         





    },

	onCheckCursoVariable: function () {
		var check = Ext.ComponentQuery
			.query('#procesar #curso_variable_inscripcion_web')[0]
			.getValue();

		if (check == true) {
			Ext.ComponentQuery
				.query('#procesar #condicion_pago_inscripcion_web')[0]
				.disable();

		}
		if (check == false) {
			Ext.ComponentQuery
				.query('#procesar #condicion_pago_inscripcion_web')[0]
				.enable();

				
		}





	

	},

	
	

});