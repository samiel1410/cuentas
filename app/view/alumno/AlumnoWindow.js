Ext.define('Legion.view.alumno.AlumnoWindow', {
			extend : 'Ext.window.Window',
			alias : 'widget.window_alumno',
			itemId : 'window_alumno',
			title : 'Nuevo Alumno',
			draggable : false,
			resizable : false,

			modal : true,
				items : [
			{

			xtype : 'form',
			itemId : 'alumnoFormEditar',
			alias : 'widget.AlumnosForm',
			width:700,
			height:500,
			autoScroll : true,
			name : 'AlumnosForm',
			buttonAlign : 'center',
			border : false,
			trackResetOnLoad : true,

			collapsible : false,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},

			
			fieldDefaults : {
				xtype : 'textfield',
				msgTarget : 'side',

				labelStyle : 'font-weight:bold'
			},
			defaultType : 'textfield',
			items : [{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						defaultType : 'textfield',

						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						items : [{
									fieldLabel : 'id',
									itemId : 'id_alumno',
									name : 'id_alumno',
									hidden : true,
									flex : 1

								}, {
									fieldLabel : 'Nombre',
									itemId : 'nombre_alumno',
									name : 'nombre_alumno',
									margin : '10 0 0 5',
									flex : 1

								},
								{
									fieldLabel : 'Nombre',
									itemId : 'imagen_validar_alumno',
									name : 'imagen_validar_alumno',
									margin : '10 0 0 5',
									flex : 1,
									hidden:true

								},

								{
									fieldLabel : 'Apellido',
									itemId : 'apellido_alumno',
									name : 'apellido_alumno',
									margin : '10 10 0 5',
									flex : 1

								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						defaultType : 'textfield',

						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						items : [{
									xtype : 'datefield',
									fieldLabel : 'Fecha Nacimiento',
									itemId : 'fecha_naci_alumno',
									name : 'fecha_naci_alumno',
									margin : '10 0 0 5',
									format : 'Y-m-d',
									flex : 1

								}, {

									fieldLabel : 'Direccion',
									itemId : 'direccion_alumno',
									name : 'direccion_alumno',
									margin : '10 10 0 5',
									flex : 1

								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						defaultType : 'textfield',

						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						items : [{
							fieldLabel : 'Estado',
							itemId : 'estado_alumno',
							name : 'estado_alumno',
							margin : '10 0 0 5',
							xtype : 'combo',
							dock : 'top',
							enableKeyEvents : true,
							editable : false,
							displayField : 'estado',
							valueField : 'estado_alumno',
							mode : 'local',
							triggerAction : 'all',
							emptyText : 'Seleccionar',
							store : new Ext.data.SimpleStore({
										fields : ['estado_alumno', 'estado'],
										data : [['1', 'Activo'],
												['0', 'Inactivo']

										]
									}),
							queryMode : 'local',
							flex : 1
						}

						, {

							fieldLabel : 'Telefono',
							itemId : 'telefono_alumno',
							name : 'telefono_alumno',
							margin : '10 10 0 5',
							flex : 1

						}]
					},

					{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						defaultType : 'textfield',

						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						items : [

						{
									fieldLabel : 'Celular',
									itemId : 'celular_alumno',
									name : 'celular_alumno',
									margin : '10 0 0 5',
									maxLength : 10,
										minLength : 1,
										maskRe : /[0-9.]/,
								
							
							enforceMaxLength : true,
									flex : 1

								}, {
									fieldLabel : 'Institucion',

									name : 'instruccion_alumno',
									itemId : 'instruccion_alumno',
									margin : '10 10 0 5',
									flex : 1

								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						defaultType : 'textfield',

						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						items : [
							{
								fieldLabel : 'Provincia',
								itemId : 'id_fkprovincia_alumno_edit',
								name : 'id_fkprovincia_alumno',
								margin : '10 20 0 5',
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
								flex : 1,
								allowBlank : false,
								listeners:{
									change: function(){
										store = Ext.getStore('Canton');
										value=Ext.ComponentQuery
						.query('#id_fkprovincia_alumno_edit')[0]
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
								itemId : 'ciudad_alumno',
								name : 'ciudad_alumno',
								margin : '10 20 0 5',
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
								flex : 1,
								allowBlank : false,
							
							}]
					},

					{
						xtype : 'fieldcontainer',
						layout : 'hbox',
						defaultType : 'textfield',

						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						items : [

						{

									fieldLabel : 'Cedula',

									name : 'cedula_alumno',
									itemId : 'cedula_alumno',
									margin : '10 0 0 5',
									maxLength : 15,
									minLength : 1,
									maskRe : /[0-9.]/,
									enforceMaxLength : true,

								
							
							enforceMaxLength : true,
									flex : 1

								}, {
									fieldLabel : 'Tipo de Sangre',

									name : 'tipo_sangre_alumno',
									itemId : 'tipo_sangre_alumno',
									margin : '10 10 0 5',
									flex : 1

								}

						]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						defaultType : 'textfield',

						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						items : [

						{
									fieldLabel : 'Nombre del Representante',

									name : 'nombre_representante_alumno',
									itemId : 'nombre_representante_alumno',
									margin : '10 0 0 5',
									flex : 1
								}, {
									fieldLabel : 'Numero del Representante',

									name : 'numero_representante_alumno',
									itemId : 'numero_representante_alumno',
									margin : '10 10 0 5',
									maxLength : 10,
										minLength : 1,
										maskRe : /[0-9.]/,
								
							
							enforceMaxLength : true,
									flex : 1

								}

						]
					}

					, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						defaultType : 'textfield',

						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						items : [

						{

									fieldLabel : 'Talla del Uniforme',

									name : 'talla_uniforme_alumno',
									itemId : 'talla_uniforme_alumno',
									margin : '10 0 0 5',
									flex : 1

								}, {
									fieldLabel : 'Numero del Calzado',

									name : 'numero_calzado_alumno',
									itemId : 'numero_calzado_alumno',
									margin : '10 10 0 5',
									flex : 1

								}

						]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						defaultType : 'textfield',

						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						items : [

					
								
								{

										fieldLabel : 'Imagen',
										xtype : 'filefield',
										name : 'imagen_alumno_editar',
										itemId : 'imagen_alumno_editar',
										margin : '10 0 0 5',
										flex : 1

									
					},
					{
						fieldLabel : 'Correo',

						name : 'correo_alumno',
						itemId : 'correo_alumno',
						margin : '10 10 0 5',
						flex : 1
					}

						]
					},{
							xtype : 'fieldset',
			itemId : 'fieldset_imagen',

			title : 'Seleccionar Imagen',

			items : [{
				xtype : 'image',
				itemId : 'imagen_vista_alumno_editar',
				src : 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
				height : 180,
				width : 180

			}]
					}
						

			],
			buttons : [{
				text : 'Guardar',
				itemId : 'guardar_alumno',
				style: {
					'background-color': 'green'

				},
				iconCls: 'x-fa fa-edit',
				handler : function(record) {
					var window = this.up('window');
					var form = Ext.ComponentQuery.query('#alumnoFormEditar')[0]
							.getForm();
					this.fireEvent('btnCreate', form, window, record);

				}
			}

			, {
				text : 'Cerrar',
				style: {
					'background-color': 'red'
	
				},
				iconCls: 'x-fa fa-window-close',
				handler : function() {
					this.up('window').close()

				}
			}

			]

		}]


		});