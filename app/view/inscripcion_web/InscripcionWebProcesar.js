Ext.define('Legion.view.inscripcion_web.InscripcionWebProcesar', {
	extend : 'Ext.window.Window',
	alias : 'widget.procesar',
	itemId : 'procesar',
	title : 'Ingresar Inscripcion',

	draggable : false,
	resizable : false,

	modal : true,
	items : [{

		xtype : 'form',
		itemId : 'ProcesarWeb',
		alias : 'widget.ProcesarWeb',

		name : 'ProcesarWeb',
		buttonAlign : 'center',
		border : false,
		trackResetOnLoad : true,

		collapsible : false,
		
	
	
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
					items : [ 
                        
                        {
                            fieldLabel: 'id',
						itemId: 'id_inscripcion',
						name: 'id_inscripcion',
						hidden: true,
						flex: 1
                        }
                        ,{
                                fieldLabel: 'Alumno',
                                itemId: 'nombre_alumno_web',
                               

                                margin: '10 0 0 5',
                                flex: 1,
                                readOnly: true

							}, {
                                fieldLabel: 'Curso',
                                itemId: 'nombre_curso_web',

                                margin: '10 0 0 5',
                                flex: 1,
                                readOnly: true

							},
                        
                        
						     {
                                fieldLabel: 'Alumno',
                                itemId: 'nombre_alumno_web_id',
                                name:'id_fkalumno_inscripcion',
                                margin: '10 0 0 5',
                                flex: 1,
                                readOnly: true,
								hidden:true

							},
                            {
                                fieldLabel: 'Curso',
                                itemId: 'nombre_curso_web_id',
                                name:'id_fkcurso_inscripcion',
                                margin: '10 0 0 5',
                                flex: 1,
                                readOnly: true,
								hidden:true

							}
                        ]

				},
				{
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items : [{

								fieldLabel : 'Mensualidades',
							
								itemId : 'mensualidades_curso',
                                margin : '10 10 0 5',
								flex:1,
								readOnly: true,
							}, 
							{
								fieldLabel : 'Duracion(meses)',
								itemId : 'duracion_curso',
                                margin : '10 10 0 5',
								flex:1,
								readOnly: true,
							}]
				}
				,
				{
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items : [{

								fieldLabel : 'Sucursal',
								name : 'id_fksucursal_inscripcion',
								itemId : 'sucursal_web',
                                margin : '10 10 0 5',
								flex:1,
								hidden:true

							

							}, 
							{
								fieldLabel : 'Sucursal',
								itemId : 'nombre_sucursal',
                                margin : '10 10 0 5',
								flex:1,
							},{
								xtype: 'datefield',
                                fieldLabel: 'Fecha de Inscripcion',
                                itemId: 'fecha_inscripcion_web',
                                name: 'fecha_inscripcion',
                                margin: '10 10 0 5',
                                format: 'Y-m-d',
                                allowBlank: false,
                                editable: false,
						        flex: 1
								

							}]
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items : [{
                        xtype: 'datefield',
						fieldLabel: 'Fecha de Inicio Inscripcion',
						itemId: 'fecha_inicio_inscripcion_web',
						name: 'fecha_inicio_inscripcion',
						format: 'Y-m-d',
						allowBlank: false,
						margin: '10 10 0 5',
						readOnly: true,
						flex: 1
                        

                    }, {
                        xtype: 'datefield',
						fieldLabel: 'Fecha de Finalizacion',
						itemId: 'fecha_fin_inscripcion_web',
						name: 'fecha_fin_inscripcion',
						format: 'Y-m-d',
						allowBlank: false,
						margin: '10 10 0 5',
						readOnly: true,

						flex: 1
                        

                    }]
				},
				{

					xtype: 'fieldcontainer',
				
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					layout: 'hbox',
					items: [
                        {
                            fieldLabel: 'Estado',
                            name: 'estado_inscripcion',
                            margin: '10 10 0 5',
                            xtype: 'combo',
                            dock: 'top',
                            enableKeyEvents: true,
                            editable: false,
                            displayField: 'estado',
                            valueField: 'estado_inscripcion',
                            mode: 'local',
                            allowBlank: false,
                            triggerAction: 'all',
                            emptyText: 'Seleccionar',
                            store: new Ext.data.SimpleStore({
                                fields: [
                                    'estado_inscripcion',
                                    'estado'],
                                data: [['1', 'Activo'],
                                ['0', 'Inactivo']
    
                                ]
                            }),
                            queryMode: 'local',
                            flex: 1,
                            readOnly: true,
                            value: 1
                            
                        },
                        {
                        fieldLabel: 'Calificacion',
						itemId: 'calificacion_inscripcion_web',
						name: 'calificacion_inscripcion',
						margin: '10 10 0 5',
						flex: 1,
						maxLength: 2,
						minLength: 1,
						maskRe: /[0-9.]/,
						allowBlank: false,
                            
                        }
                        
                    ]
				},
                {

					xtype: 'fieldcontainer',
				
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					layout: 'hbox',
					items: [
                        {
                            fieldLabel: 'Instructor',
						itemId: 'id_fkinstructor_inscripcion_web',
						name: 'id_fkinstructor_inscripcion',
						margin: '10 10 0 5',
						flex: 1,
						hidden: true
    
                        },

                        {
                            fieldLabel: 'Instructor',
						itemId: 'nombre_instructor_web',
						
						margin: '10 10 0 5',
						flex: 1,

    
                        },
                        {
                           
						fieldLabel: 'Origen',
						itemId: 'origen_inscripcion',
						name: 'origen_inscripcion',
						margin: '10 10 0 5',
						xtype: 'combo',
						dock: 'top',
						enableKeyEvents: true,
						editable: false,
						displayField: 'origen',
						valueField: 'origen_inscripcion',
						mode: 'local',
						allowBlank: false,
						triggerAction: 'all',
						emptyText: 'Seleccionar',
						store: new Ext.data.SimpleStore({
							fields: [
								'origen_inscripcion',
								'origen'],
							data: [['1', 'Plataforma'],
							['0', 'Web']

							]
						}),
						queryMode: 'local',
						flex: 1, value: 1
                            
    
                        }
                        
                    ]
				},
                {

					xtype: 'fieldcontainer',
				
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					layout: 'hbox',
					items: [
                        {
                            fieldLabel: 'Precio',
                            itemId: 'precio_total_curso_web',
                            name: 'precio_total_curso',
                            margin: '10 10 0 5',
                            readOnly: true,
                            allowBlank: false,
    
                        },
                        {
                            fieldLabel: 'Uniforme',
						itemId: 'estado_uniforme_inscripcion_web',
						name: 'estado_uniforme_inscripcion',
						margin: '10 10 0 5',

						xtype: 'combo',
						dock: 'top',
						enableKeyEvents: true,
						editable: false,
						displayField: 'uniforme',
						valueField: 'estado_uniforme_inscripcion',
						mode: 'local',
						allowBlank: false,
						triggerAction: 'all',
						emptyText: 'Seleccionar',
						store: new Ext.data.SimpleStore(
							{
								fields: [
									'estado_uniforme_inscripcion',
									'uniforme'],
								data: [
									['1',
										'Entregado'],
									['0',
										'Pendiente'],
									['2',
										'Sin Uniforme'],

								]
							}),
						queryMode: 'local'
    
                        }
                        
                    ]
				},
                {

					xtype: 'fieldcontainer',
				
					defaultType: 'textfield',

					fieldDefaults: {

						labelStyle: 'font-weight:bold'
					},
					layout: 'hbox',
					items: [
                        {
                            fieldLabel: 'Condicion de Pago',

                            margin: '10 10 0 5',
                            itemId: 'condicion_pago_inscripcion_web',
                            name: 'condicion_pago_inscripcion',
    
                            xtype: 'combo',
                            dock: 'top',
                            enableKeyEvents: true,
                            editable: false,
                            displayField: 'condicion',
                            valueField: 'condicion_pago_inscripcion',
                            mode: 'local',
                            allowBlank: false,
                            triggerAction: 'all',
                            emptyText: 'Seleccionar',
                            store: new Ext.data.SimpleStore(
                                {
                                    fields: [
                                        'condicion_pago_inscripcion',
                                        'condicion'],
                                    data: [
                                        ['1',
                                            'Totalidad'],
                                        ['0',
                                            'Cuotas']
    
                                    ]
                                }),
                            queryMode: 'local'
    
                        },
                        {
                            xtype: 'checkbox',

						fieldLabel: 'Curso Indefinido',
						margin: '10 10 0 5',
						itemId: 'curso_variable_inscripcion_web',
						name: 'curso_variable_inscripcion',
						inputValue: 1
                            
    
                        }
                        
                    ]
				},
               
				
				
				],
		buttons : [{
            text: 'Guardar',
            iconCls: 'x-fa fa-save',
            itemId: 'guardar_inscripcion',

            style: {
                'background-color': 'green'

            },

            handler: function (record) {

                me = this;

                Ext.MessageBox.show({
                    title: 'Mensaje',
                    msg: 'Desea guardar  el registro?',
                    buttons: Ext.MessageBox.OKCANCEL,
                    icon: Ext.MessageBox.QUESTION,

                    fn: function (btn) {
                        if (btn == 'ok') {



                            var window = me.up('window');
                            var form = Ext.ComponentQuery.query('#ProcesarWeb')[0].getForm();
                            me.fireEvent('btnCreate', form, window,
                                record);

                        }
                    }

                });


            }
		}

		, {
			style: {
                'background-color': 'red'

            },
            iconCls: 'x-fa fa-window-close',
			text : 'Cerrar',
			handler : function() {
				this.up('window').close()

			}
		}

		]

	}]

});