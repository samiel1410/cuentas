Ext.define('Legion.view.curso.CursoWindow', {
			extend : 'Ext.window.Window',
			alias : 'widget.window_curso',
			itemId : 'window_curso',
			title : 'Nuevo Curso',
			
			resizable : false,
			listeners: {
				beforerender: function () {
					
					Ext.Ajax.request({
						url : 'php/negocios/usuarios/recuperarUsuario.php',
						method : 'POST',
						
			
						success : function(response) {
			
							var response_aux = Ext.util.JSON
							.decode(response.responseText, true);
							console.log(response_aux)
			
			
							if(response_aux.rol==2 ||response_aux.rol==3){
							
								Ext.ComponentQuery.query('#cursoFormEditar #id_fkempresa_sucursal_curso')[0].hide();
								
								store = Ext.getStore("Curso");
		
								store.getProxy().extraParams={
		
									sucursal_busqueda : response_aux.sucursal,
									nombre_busqueda : "",   
									mes:"",
									anio:"",
									fecha_start:"",
									fecha_end:"",
									estado:""
		
								};
		
								Ext.ComponentQuery.query('#cursoFormEditar #id_fksucursal_curso')[0].setValue(response_aux.sucursal);
								Ext.ComponentQuery.query('#cursoFormEditar #id_fksucursal_curso')[0].setReadOnly(true);
								store.load();
		
		
								
							
			
							}
						
			
						
						}
			
					}
			
					);
				}
			},
		
		

			modal : true,
			items : [{

				xtype : 'form',
				itemId : 'cursoFormEditar',
				alias : 'widget.CursosFormEditar',

				name : 'CursosForm',
				buttonAlign : 'center',
				border : false,
				trackResetOnLoad : true,

				collapsible : false,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				autoScroll:true,
				height:500,
				store : 'Curso',
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
								itemId : 'id_curso',
								name : 'id_curso',
								hidden : true,
								flex : 1

							}, {
								fieldLabel : 'Nombre',
								itemId : 'nombre_curso',
								allowBlank : false,
								name : 'nombre_curso',
								margin : '10 0 0 5',
								flex : 1

							}, {
								fieldLabel : 'Cupos',
								name : 'cupos_curso',
								itemId : 'cupos_curso',
								margin : '10 0 0 5',
							
								allowBlank : false,
								flex : 1,
								enableKeyEvents : true,
								maxLength : 2,
								minLength : 1,
								maskRe : /[0-9.]/,
								enforceMaxLength : true

							},

							{
								fieldLabel : 'validad imgaen',
								
								name : 'imagen_validar_curso',
								itemId : 'imagen_validar_curso',
								margin : '10 0 0 5',
							
								flex : 1,
								hidden:true
							
							}


					]
				}, {

					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items : [{

								fieldLabel : 'Fecha Inicio',
								xtype : 'datefield',
								margin : '10 0 0 5',
								allowBlank : false,
								itemId : 'fecha_inicio_curso_edit',
								name : 'fecha_inicio_curso',
								format : 'Y-m-d',
								flex : 1

							}, 
							{

								fieldLabel : 'Duracion(meses)',
											
								name : 'duracion_mes_curso',
								itemId : 'duracion_mes_curso_edit',
								margin : '10 0 0 5',
						
						xtype : 'combo',
						dock : 'top',
						allowBlank : false,
						enableKeyEvents : true,
						editable : false,
						displayField : 'meses',
						valueField : 'duracion',
						mode : 'local',
						triggerAction : 'all',
						listConfig: {
							listeners: {
								select: function() {
									fecha_inici=Ext.ComponentQuery
.query('#fecha_inicio_curso_edit')[0]
.getValue();

duracion=	Ext.ComponentQuery
.query('#duracion_mes_curso_edit')[0]
.getValue();
fecha = fecha_inici;
dia = fecha.getDate();
mes = fecha.getMonth()+1 + parseInt(duracion);
anio = fecha.getFullYear();

if( parseInt(mes)<10)
{	
mes = "0"+mes;

}	

if( parseInt(mes)>12)
{
dato= parseInt(mes)-12;

anio=fecha.getFullYear()+1;




mes_nuevo = fecha.getMonth() -fecha.getMonth() + dato
if( parseInt(mes_nuevo)<10){
mes = "0"+mes_nuevo
}else{
mes =  mes_nuevo;
}

if(dia<10)
{
	dia = "0"+dia;
}
else{
	dia= dia;
}


}	
fecha_final=anio+"-"+mes+"-"+dia;

Ext.ComponentQuery
.query('#fecha_fin_curso_edit')[0]
.setValue(fecha_final);



								}
							}
						},
						emptyText : 'Seleccionar',
						store : new Ext.data.SimpleStore({
									fields : ['duracion','meses'],
									data : [['1', '1'],
											['2', '2'],
											['3', '3'],
											['4', '4'],
											['5', '5'],
											['6', '6'],
											['7', '7'],
											['8', '8'],
											['9', '9'],
											['10', '10'],
											['11', '11'],
											['12', '12']

									]
								}),
						queryMode : 'local',

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
						,{
							fieldLabel : 'Fecha Finalizacion',
							xtype : 'datefield',
							margin : '10 0 0 5',
							allowBlank : false,
							itemId : 'fecha_fin_curso_edit',
							name : 'fecha_fin_curso',
							format : 'Y-m-d',
													editable:false,
							flex : 1,
							readOnly:true,
						},{

								fieldLabel : 'Mensualidad$',
							
								allowBlank : false,
								itemId : 'mensualidad_curso',
								name : 'mensualidad_curso',
								margin : '10 0 0 5',
								maskRe : /[0-9.]/,
							

								flex : 1

							}, ]
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},
					items : [{

						fieldLabel : 'Uniforme$',

						name : 'cuota_entrada_curso',
						itemId : 'cuota_entrada_curso',
						margin : '10 0 0 5',
						allowBlank : false,
						flex : 1

					},{
								fieldLabel : 'Precio$',
								xtype : 'numberfield',
								name : 'precio_curso',
								itemId : 'precio_curso',
								margin : '10 0 0 5',
								maskRe : /[0-9.]/,
								flex : 1
							}, 

					]
				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},

					items : [{
						fieldLabel : 'IVA %',
						itemId : 'iva_curso',
						name : 'iva_curso',
						margin : '10 0 0 5',
						xtype : 'combo',
						dock : 'top',
						allowBlank : false,
						enableKeyEvents : true,
						editable : false,
						displayField : 'iva',
						valueField : 'iva_curso',
						mode : 'local',
						triggerAction : 'all',
						emptyText : 'Seleccionar',
						store : new Ext.data.SimpleStore({
									fields : ['iva_curso',
											'iva'],
									data : [['12', '12%'],
											['0', '0%']

									]
								}),
						queryMode : 'local',

						flex : 1
					},
					
					{
						xtype : 'combo',
		fieldLabel : 'Institucion',
		margin: '10 0 0 5',
		name : 'id_fkempresa_sucursal',
		itemId : 'id_fkempresa_sucursal_curso',
		enableKeyEvents : true,
		editable : false,
		allowBlank : false,
		typeAhead : true,
		mode : 'local',
		triggerAction : 'all',
		emptyText : 'Seleccionar',
		autoLoad : true,
		store : 'Empresa',
		displayField : 'alias_empresa',
		valueField : 'id_empresa',
		flex : 1,
		listeners:{
			change: function(){
				store = Ext.getStore('Sucursal');
				value=Ext.ComponentQuery
.query('#id_fkempresa_sucursal_curso')[0]
.getValue();

				store.getProxy().extraParams={
					id_empresa:value,
					nombre_busqueda:""

				}
				store.load();
				

			}
		}

					}
					,
					
					]

				}, {
					xtype : 'fieldcontainer',
					layout : 'hbox',
					defaultType : 'textfield',

					fieldDefaults : {

						labelStyle : 'font-weight:bold'
					},

					items : [{
						xtype : 'combo',
						fieldLabel : 'Sucursal',
						margin : '10 0 0 5',
						name : 'id_fksucursal_curso',
						itemId : 'id_fksucursal_curso',
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
						flex : 1,

						renderTo : Ext.getBody()
					}, {
						xtype : 'combo',
						fieldLabel : 'Instructor',
						margin : '10 0 0 5',
						name : 'id_fkinstructor_curso',
						itemId : 'id_fkinstructor_curso',
						allowBlank : false,
						editable : false,
						emptyText : 'Seleccionar',
						autoLoad : true,
						store : 'Instructor',
						displayField : 'nombre_instructor',
						valueField : 'id_instructor',
						flex : 1
						

					

					}, {
						fieldLabel : 'Usuario',

						name : 'id_fkusuario_curso',
						itemId : 'id_fkusuario_curso',
						margin : '10 0 0 5',
						hidden : true,
						flex : 1

					},
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
							fieldLabel : 'Estado',
							itemId : 'estado_curso',
							name : 'estado_curso',
							margin : '10 0 0 5',
							xtype : 'combo',
							allowBlank : false,
							dock : 'top',
							enableKeyEvents : true,
							editable : false,
							displayField : 'estado',
							valueField : 'estado_curso',
							mode : 'local',
							triggerAction : 'all',
							emptyText : 'Seleccionar',
							store : new Ext.data.SimpleStore({
										fields : ['estado_curso',
												'estado'],
										data : [['1', 'Activo'],
												['0', 'Inactivo']
	
										]
									}),
							queryMode : 'local',
							flex : 1
	
						},
						{
							
								fieldLabel : 'Horas',
								maskRe : /[0-9.]/,
								name : 'horas_curso',
								itemId : 'horas_curso',
								margin : '10 0 0 5',
								allowBlank : false,
								flex : 1,
								
							
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
								fieldLabel : 'Imagen',
								xtype : 'filefield',
								name : 'imagen_curso_editar',
								itemId : 'imagen_curso_editar',
								margin : '10 0 0 5',
								flex : 1
							}]
				},
				{
					xtype : 'fieldset',
	itemId : 'fieldset_imagen',

	title : 'Seleccionar Imagen',

	items : [{
		xtype : 'image',
		itemId : 'imagen_vista_curso_editar',
		src : 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
		height : 180,
		width : 180

	}]
			}

		],
				buttons : [{
					text : 'Guardar',
					itemId : 'guardar_curso',
					iconCls: 'x-fa fa-save',

					style: {
						'background-color': 'green'

					},
					handler : function() {
						
						var form = Ext.ComponentQuery.query('#cursoFormEditar')[0]
								.getForm();
						this.fireEvent('btnCreate', form);

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