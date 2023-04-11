Ext.define('Legion.view.alumno.Alumnos', {
	extend : 'Ext.TabPanel',
	alias : 'widget.Alumnos',



					listeners: {
						beforerender: function () {
							
							Ext.Ajax.request({
								url : 'php/negocios/usuarios/recuperarUsuario.php',
								method : 'POST',
								
					
								success : function(response) {
					
									var response_aux = Ext.util.JSON
									.decode(response.responseText, true);
									console.log("s",response_aux)
									console.log(response_aux.sucursal)
					
								
								
					
								
								}
					
							}
					
							);
						}
					},
	
	

	items : [{
		title : 'Listado Alumnos',
		autoScroll:true,
	

		items : [{
			
					xtype : 'component',
					autoScroll:true,
					html : 'Listado de Alumnos',
					style : {
						'backgroundColor' : '#05723A',
						'color' : '#FFFFFF',
						'font-size' : '16px',
						'padding' : '15px'
						

					}

				},  {

					
					xtype : 'container',
					itemId : 'container',
					flex:1,
					items : [{
						xtype : 'fieldset',
						itemId : 'fieldset',

						title : 'Busqueda Alumnos',

						defaultType : 'textfield',
						defaults : {
							anchor : '100%'
						},
						layout : 'column',
						items : [{
							columnWidth: 0.33,
									fieldLabel : 'Cedula',
									itemId : 'cedula_busqueda_alumno',
									name : 'cedula_busqueda_alumno',
									margin : '0 0 0 5',
									maxLength : 15,


								}, 
								{
									columnWidth: 0.33,
									fieldLabel : 'Nombre',
									itemId : 'nombre_busqueda_alumno',
									name : 'nombre_busqueda_alumno',
									margin : '0 0 0 5'

								},{
									columnWidth: 0.33,
									fieldLabel : 'Sucursal',

									xtype : 'combo',
									fieldLabel : 'Sucursal',
									margin : '0 0 0 5',
									name : 'id_fksucursal_alumno',
									itemId : 'sucursal_busqueda_alumno',
									editable : false,
									
									typeAhead : true,
									mode : 'local',
									triggerAction : 'all',
									emptyText : 'Seleccionar',
									autoLoad : true,
									store : 'Sucursal',
									displayField : 'nombre_sucursal',
									valueField : 'id_sucursal',

									renderTo : Ext.getBody()
								}, 
								{

									xtype : 'button',
									margin : '0 0 0 5',
									iconCls : 'x-fa  fa-search',
									itemId : 'boton_buscar_alumno',
									handler : function() {
										this.fireEvent('btnBuscar');
									}

								},{

									xtype : 'button',
									margin : '0 0 0 5',
									iconCls : 'x-fa  fa-eraser',
									itemId : 'boton_refresh_alumno',
									handler : function() {
										this.fireEvent('btnRefresh');
									}

								}, 
								
								{
									columnWidth: 0.33,
									xtype : 'fieldcontainer',
									margin : '5 0 0 5',
								
									combineErrors : true,
								
									defaults : {
									 
									  enforceMaxLength : true
									},
									layout : 'column',
									items : [{
										
										fieldLabel : 'Provincia',
										itemId : 'provincia_busqueda',
										name : 'id_fkprovincia_alumno',
										columnWidth: 1,
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
								
										listeners:{
											change: function(){
												store = Ext.getStore('Canton');
											provincia=Ext.ComponentQuery
									.query('#provincia_busqueda')[0]
									.getValue();	
												storeA =Ext.getStore('Alumno');
												storeA.getProxy().extraParams ={
													sucursal_busqueda : "",
													nombre_busqueda : "",
													estado:"",
													cedula:"",
													provincia:provincia,
													ciudad:""


												};

												
					
												store.getProxy().extraParams={
													id_provincia:provincia,
													
					
												}
												store.load();
												storeA.load();
					
											}
										}
										
									},
	
									]
								  },
								  {
									columnWidth: 0.33,
									xtype : 'fieldcontainer',
									margin : '5 0 0 5',
									
									combineErrors : true,
								
									defaults : {
									 
									  enforceMaxLength : true
									},
									layout : 'column',
									items : [{
										columnWidth: 1,
										fieldLabel : 'Ciudad',
										itemId : 'ciudad_busqueda',
										name : 'ciudad_alumno',
									
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
										listeners:{
											change: function(){
												
												provincia=Ext.ComponentQuery
									.query('#provincia_busqueda')[0]
									.getValue();
									ciudad=Ext.ComponentQuery
									.query('#ciudad_busqueda')[0]
									.getValue();
												storeA =Ext.getStore('Alumno');
												storeA.getProxy().extraParams ={
													sucursal_busqueda : "",
													nombre_busqueda : "",
													estado:"",
													cedula:"",
													provincia:provincia,
													ciudad:ciudad


												};

												
												storeA.load();
												
												
					
											}
										}
									
									
									}
	
									]
								  },
								  {
									columnWidth: 0.33,
									xtype : 'fieldcontainer',
									
									margin : '5 0 0 5',
									combineErrors : true,
								
									defaults : {
									 
									  enforceMaxLength : true
									},
									layout : 'column',
									items : [
										{
											columnWidth: 1,
										
											xtype : 'combo',
											renderTo : document.body,
											itemId : 'mostrar_columnas',
											fieldLabel : 'Columnas',
											
											displayField : 'name',
											multiSelect : true,
											tpl : new Ext.XTemplate('<tpl for=".">',
													'<div class="x-boundlist-item">',
													'<input type="checkbox" />',
													'{name}', '</div>', '</tpl>'),
											store : Ext.create('Ext.data.Store', {
												fields : [{
															type : 'string',
															name : 'name'
														}],
												data : [{
															"name" : "Fecha Nacimiento",
															"id" : 1
														}, {
															"name" : "Direccion",
															"id" : 2
														}, {
															"name" : "Telefono",
															"id" : 3
														}, {
															"name" : "Institucion",
															"id" : 4
														},  {
															"name" : "Correo",
															"id" : 6
														}, {
															"name" : "Tipo de Sangre",
															"id" : 7
														}, {
															"name" : "Nombre Representante",
															"id" : 8
														}, {
															"name" : "Numero Representante",
															"id" : 9
														},
														{
															"name" : "Talla Uniforme",
															"id" : 10
														},
														{
															"name" : "Numero de Calzado",
															"id" : 11
														},
														{
															"name" : "Creado",
															"id" : 12
														}]
											}),
											queryMode : 'local',
											listeners : {
												select : function(combo, records) {
													this.fireEvent(
															'ComboMostrarColumnas',
															combo, records);
		
												},
												beforedeselect : function(combo, rec) {
		
													this.fireEvent('OcultarColumnas',
															combo, rec);
		
												}
											}
		
										}
	
									]
								  }
								]

					}

					]

				}, {

					alias : 'widget.AlumnoGrid',
					itemId : 'AlumnoGrid',
					xtype : 'grid',
				
				
					autoScroll:true,
				
			
					flex:1,
					selType : 'rowmodel',
					selModel : {
						mode : 'SINGLE'
					},
					viewConfig : {
						stripeRows : true
					},
					store : 'Alumno',
					width: '100%',
		

					autoLoad : true,

					columns : [{
								text : "Id",
								dataIndex : 'id_alumno',
								itemId : 'id_alumno',
								width : 50,
								hidden:true
							}, 
							{
								text : "Cedula",
								flex : 1,
								dataIndex : 'cedula_alumno'

							},{
								text : "Nombre",
								flex : 1,
								dataIndex : 'nombre_alumno'

							}, {
								text : "Apellido",
								flex : 1,
								dataIndex : 'apellido_alumno',

								width : 100

							}, 
							{
								text : "Provincia",
								flex : 1,
								dataIndex : 'provincia',
						

							},
							{
								text : "Ciudad",
								flex : 1,
								dataIndex : 'ciudad_alumno'

							},
							{
								text : "Celular",
								flex : 1,
								dataIndex : 'celular_alumno'

							},
							{
								text : "Sucursal",
								flex : 1,
								dataIndex : 'nombre_sucursal',
								hidden:true
						

							},
							 {
								text : "Usuario",
								flex : 1,
								dataIndex : 'nombre_usuario',
								hidden:true

							},
							{
								text : "id_provincia",
								flex : 1,
								dataIndex : 'id_fkprovincia_alumno',
								hidden:true
								

							},
							{
								text : "Fecha de Nacimiento",
								flex : 1,
								dataIndex : 'fecha_naci_alumno',
								hidden : true

							}, {
								text : "Direccion",
								flex : 1,
								dataIndex : 'direccion_alumno',
								hidden : true

							}, {
								text : "Telefono",
								flex : 1,
								dataIndex : 'telefono_alumno',
								hidden : true

							},  {
								text : "Institucion",
								flex : 1,
								dataIndex : 'instruccion_alumno',
								hidden : true

							},  {
								text : "Correo",
								flex : 1,
								dataIndex : 'correo_alumno',
								hidden : true

							},  {
								text : "Tipo de Sangre",
								flex : 1,
								dataIndex : 'tipo_sangre_alumno',
								hidden:true

							}, {
								text : "Representante",
								flex : 1,
								dataIndex : 'nombre_representante_alumno',
								hidden:true

							}, {
								text : "Numero Representante",
								flex : 1,
								dataIndex : 'numero_representante_alumno',
								hidden:true

							}, {
								text : "Talla de Uniforme",
								flex : 1,
								dataIndex : 'talla_uniforme_alumno',
								hidden : true

							}, {
								text : "Numero Calzado",
								flex : 1,
								dataIndex : 'numero_calzado_alumno',
								hidden : true

							},
							{
								text : "Creado",
								flex : 1,
								dataIndex : 'created_at',
								hidden : false

							},
							{
								text : "Edad",
								flex : 1,
								dataIndex : 'edad',
							
	
							},
						
							{
								text : "Estado",
								flex : 1,
								dataIndex : 'nombre_estado_alumno',
								renderer: function(value, meta, record) {
									if (value == 'Activo') {
										return '<i   data-qtip="ESTADO ACTIVO" class="fas fa-circle " style="color:green;"></i>';
									  } else if (value == 'Inactivo') {
										return '<i  data-qtip=" ESTADO INACTIVO" class="fas fa-circle " style="color:red;"></i>';
									  }
								}

								

							}, 
						
					

						{
							text : "Imagen SRC",
							flex : 1,
							dataIndex : 'imagen_src',
							hidden:true
						

						},

							{
								xtype : 'actioncolumn',
								itemId : 'action_alumno',
								
								width : 100,
								items : [{

									tooltip : 'Editar',
									iconCls : 'x-fa fa-pen',
									itemId : 'editar_alumno',
									handler : function(view, rowIndex,
											colIndex, item, e, record, row) {

										me = this;



										fecha_limite = record.data.created_at 
										console.log(fecha_limite);
									
										
										var e = new Date(fecha_limite);
										
										e.setDate(e.getDate() + 1)
										
										console.log(e);
										//Dos semanas

										fecha_final = new Date(e.setDate(e.getDate() + 14));
										console.log("Limite",fecha_final);

										Ext.Ajax.request({
											url : 'php/negocios/usuarios/recuperarFechaActual.php',
											method : 'POST',
											
								
											success : function(response) {
								
												var response_aux = Ext.util.JSON
												.decode(response.responseText, true);
												
											
												fecha_actual =new Date(response_aux.fecha);
												fecha_actual.setDate(fecha_actual.getDate() + 1)
											
												console.log("Actual",fecha_actual);
												if(fecha_actual>fecha_final){
													
													Ext.MessageBox.show({
														title : 'Mensaje',
														msg : 'Este Alumno ya paso la fecha de actualizar los datos',
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.INFO
								
													});


												}else{


													console.log(fecha_final);
										me.fireEvent('btnUpdate', view,
												rowIndex, colIndex, item, e,
												record, row);

												}
								
											
											
								
											
											}
								
										}
								
										);


									

										

									}

								}, {
									tooltip : 'Eliminar',
									iconCls : 'x-fa fa-times',
									itemId : 'eliminar_alumno',
									handler : function(grid, rowIndex, colIndex) {
										this.fireEvent('btnDelete', grid,
												rowIndex, colIndex);

									}
									

								}, {

									tooltip : 'Max',
									iconCls : 'x-fa fa-chevron-circle-down',
									itemId : 'menu_alumno',
									handler : function(grid, rowIndex,
											colIndex, item, e, record) {
										this.fireEvent('menu', grid, rowIndex, colIndex, item, e, record)
									}

								},{
									tooltip : 'Ver Imagen',
									iconCls : 'x-fa fa-eye',
									itemId : 'ver_alumno',
									handler : function(view, rowIndex,
											colIndex, item, e, record, row) {
										this.fireEvent('btnShowAlumno', view,
												rowIndex, colIndex, item, e,
												record, row);

									}
								}]
							}],
					bbar : [{
						flex : 1,
						xtype : 'pagingtoolbar',
						store : 'Alumno',
						displayInfo : true,
						displayMsg : 'Displaying {0} to {1} of {2} &nbsp;records ',
						emptyMsg : "No records to display&nbsp;",
						listeners : {
							beforechange : function(store) {
								this.fireEvent('pagination', store)

							}

						}
					}]

				}]
	}, {
		title : 'Nuevo Alumno',
		xtype : 'fieldcontainer',
	
		listeners:{
			
			deactivate: function(){
				if(Ext.ComponentQuery
					.query('#nombre_alumno')[0]
				.getValue()!="" || Ext.ComponentQuery
				.query('#apellido_alumno')[0]
			.getValue()!="" || Ext.ComponentQuery
			.query('#fecha_naci_alumno')[0]
		.getValue()!=null){

					Ext.MessageBox.show({
						title: 'Advertencia',
						msg: '¿Seguro desea abandonar el formulario?',
						buttons: Ext.MessageBox.OKCANCEL,
						icon: Ext.MessageBox.QUESTION,
						fn: function (btn) {
							if (btn == 'ok') {

								Ext.ComponentQuery.query('#alumnoForm')[0].getForm().reset();
			
								
			
							}else{
								Ext.ComponentQuery.query('Alumnos')[0].setActiveTab(1);
							}
						}
					});



				}
			}
		},
		
		fieldDefaults : {

			labelStyle : 'font-weight:bold'
		},
		flex:1,
		autoScroll:true,
	
		items : [{

			
			xtype : 'component',
			html : 'Nueva Alumno',
			style : {
				'backgroundColor' : '#05723A',
				'color' : '#FFFFFF',
				'font-size' : '16px',
				'padding' : '15px'
				

			}

		},{

			
			itemId : 'fieldset',
		
		
			autoScroll : true,
			

			defaultType : 'textfield',
				
			
		
			items : [{

				
				xtype : 'form',
				itemId : 'alumnoForm',
				alias : 'widget.AlumnosForm',
				
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
				items : [
					
					{

						
						layout:'hbox',
						xtype : 'fieldcontainer',
						items:[{

							xtype : 'fieldcontainer',
							layout : {
								type : 'vbox',
								align : 'stretch'
							},
							flex:1,
						
							items:[

								,{
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
		
											}, 
											{
												fieldLabel : 'id',
												itemId : 'imagen_validar_alumno',
												name : 'imagen_validar_alumno',
												hidden : true,
												flex : 1
		
											},{
												fieldLabel : 'Nombre',
												itemId : 'nombre_alumno',
												name : 'nombre_alumno',
												margin : '10 20 0 5',
												fieldStyle: 'text-transform:uppercase',
												flex : 1,
												allowBlank : false,
		
											},
		
											{
												fieldLabel : 'Apellido',
												itemId : 'apellido_alumno',
												name : 'apellido_alumno',
												margin : '10 20 0 5',
												fieldStyle: 'text-transform:uppercase',
												flex : 1,
												allowBlank : false,
		
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
												margin : '10 20 0 5',
												format : 'Y-m-d',
												editable:false,
												flex : 1,
												allowBlank : false,
		
											}, {
		
												fieldLabel : 'Direccion',
												itemId : 'direccion_alumno',
												name : 'direccion_alumno',
												margin : '10 20 0 5',
												flex : 1,
												allowBlank : false,
		
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
										margin : '10 20 0 5',
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
										flex : 1,
										allowBlank : false,
										value:1,
										readOnly:true,
										
									}
		
									, {
		
										fieldLabel : 'Telefono',
										itemId : 'telefono_alumno',
										name : 'telefono_alumno',
										margin : '10 20 0 5',
										flex : 1,
										allowBlank : false,
										maxLength : 10,
										minLength : 1,
										maskRe : /[0-9.]/,
								
							
							enforceMaxLength : true,
										flex: 1,
		
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
											fieldLabel : 'Correo',
	
											name : 'correo_alumno',
											itemId : 'correo_alumno',
											margin : '10 20 0 5',

											flex : 1,
										
											
									vtype : 'email',
									allowBlank : false,

									vtypeText : 'Formato invalido. Ejm: user@domain.com',
									msgTarget : 'under',
									flex : 1
										}
		
									, {
												fieldLabel : 'Institucion Educativa',
		
												name : 'instruccion_alumno',
												itemId : 'instruccion_alumno',
												margin : '10 20 0 5',
												flex : 1,
												allowBlank : false,
		
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
											itemId : 'id_fkprovincia_alumno_form',
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
									.query('#id_fkprovincia_alumno_form')[0]
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
										
										}, ]
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
												margin : '10 20 0 5',
												flex : 1,
												maxLength : 15,
												minLength : 1,
												maskRe : /[0-9.]/,
									enforceMaxLength : true,

										
									
								
												allowBlank : false,
		
											}, 
											{
												fieldLabel : 'Celular',
												itemId : 'celular_alumno',
												name : 'celular_alumno',
												margin : '10 20 0 5',
												flex : 1,
												maxLength : 10,
												minLength : 1,
												maskRe : /[0-9.]/,
										
									
									enforceMaxLength : true,
												allowBlank : false,
		
											},{
												fieldLabel : 'Tipo de Sangre',
		
												name : 'tipo_sangre_alumno',
												itemId : 'tipo_sangre_alumno',
												margin : '10 20 0 5',
												flex : 1,
												allowBlank : false,
		
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
												margin : '10 20 0 5',
												flex : 1,
												allowBlank : false,
											}, {
												fieldLabel : 'Celular del Representante',
		
												name : 'numero_representante_alumno',
												itemId : 'numero_representante_alumno',
												margin : '10 20 0 5',
												flex : 1,
												maxLength : 10,
												minLength : 1,
												maskRe : /[0-9.]/,
										
									
									enforceMaxLength : true,
												allowBlank : false,
		
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
												margin : '10 20 0 5',
												flex : 1,
												maxLength : 2,
										minLength : 1,
										maskRe : /[0-9.]/,
												allowBlank : false,
		
											}, {
												fieldLabel : 'Numero del Calzado',
		
												name : 'numero_calzado_alumno',
												itemId : 'numero_calzado_alumno',
												margin : '10 20 0 5',
												flex : 1,
												maxLength : 2,
										minLength : 1,
										maskRe : /[0-9.]/,
												allowBlank : false,
		
											},
											{
		
												fieldLabel : 'Imagen',
												xtype : 'filefield',
												name : 'imagen_alumno',
												itemId : 'imagen_alumno',
												margin : '10 20 0 5',
												flex : 1,
												allowBlank : false,
		
											}
		
									]
								}


							]

					},{

						xtype : 'fieldcontainer',
									
									
									
						fieldDefaults : {

							labelStyle : 'font-weight:bold'
						},
						margin:'70 0 0 0',
					
						items : [
							{
								
							
							
									xtype: 'image',
									itemId: 'imagen_alumno_vistas',
									border: 2,
									style: {
										borderColor: 'black',
										borderStyle: 'solid'
									},
	
									src: 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
									height: 220,
									width: 180
											
										}]
							
					},{
						
					}
				
				
				//Imagen
			]

					}
					

				],
				
				buttons : [{
					text : 'Guardar',
					itemId : 'guardar_alumno',
					iconCls: 'x-fa fa-save',

					style: {
						'background-color': 'green'

					},
					handler : function() {


						me = this;

						Ext.MessageBox.show({
							title: 'Mensaje',
							msg: 'Desea guardar  el registro?',
							buttons: Ext.MessageBox.OKCANCEL,
							icon: Ext.MessageBox.QUESTION,

							fn : function(btn) {
								if (btn == 'ok') {

							
					
									
									var form = Ext.ComponentQuery.query('#alumnoForm')[0]
											.getForm();
									me.fireEvent('btnCreate', form);
								
				
								}
							}
	
						});
					

					}
				}

				, {
					iconCls: 'fas fa-sync-alt',
					text : 'Refrescar',
					style: {
						'background-color': 'red'

					},
				
					handler : function() {
						Ext.ComponentQuery.query('#alumnoForm')[0]
								.getForm().reset();

					}
				}

				]

			}]

		}]

	}]

});