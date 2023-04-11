Ext.define('Legion.view.forma_pago.FormaPagoWindow', {
			extend : 'Ext.window.Window',
			alias : 'widget.window_forma',
			itemId : 'window_forma',
			title : 'Nueva Forma de Pago',
			draggable : false,
			resizable : false,

			modal : true,
			items : [{

				xtype : 'form',
				itemId : 'formaForm',
				alias : 'widget.FormasForm',

				name : 'FormasForm',
				buttonAlign : 'center',
				border : false,
				trackResetOnLoad : true,

				collapsible : false,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},

				store : 'FormaPago',
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
								itemId : 'id_forma',
								name : 'id_forma',
								hidden : true,
								flex : 1

							},
							{
								fieldLabel : 'Nombre',
								itemId : 'nombre_forma',
								name : 'nombre_forma',
								margin : '10 10 0 5',
								flex : 1
							},{
								
									xtype:'checkboxfield',
									fieldLabel : 'Transferencia',
									margin : '10 10 0 5',
									inputValue: '1',
									itemId:'es_trasnferencia',
									listeners:{
										change: function(){
											valor =Ext.ComponentQuery
											.query('#es_trasnferencia')[0]
											.getValue();
											


											if(valor==true){

											Ext.ComponentQuery
											.query('#numero_cuenta')[0]
											.show();

											}else{

												Ext.ComponentQuery
											.query('#numero_cuenta')[0]
											.hide();

											Ext.ComponentQuery
											.query('#numero_cuenta')[0]
											.reset();

											}
											
										}
									}
									
								
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
					items : [
							{
								fieldLabel : 'Nro.Cuenta',
								itemId : 'numero_cuenta',
								name : 'numero_cuenta',
								margin : '10 10 0 5',
								flex : 1,
								maskRe : /[0-9.]/,
								value:"",
								hidden:true
							}

				]
				}],				
				buttons : [{
					text : 'Guardar',
					itemId : 'guardar_forma',
					style: {
						'background-color': 'green'
	
					},
					iconCls: 'x-fa fa-edit',
					handler : function(record) {
						var window = this.up('window');
						var form = Ext.ComponentQuery.query('#formaForm')[0]
								.getForm();
						this.fireEvent('btnCreate', form, window, record);

					}
				}

				, {
					style: {
						'background-color': 'red'
		
					},
					iconCls: 'x-fa fa-window-close',
					text:'Cerrar',
					handler : function() {
						this.up('window').close()

					}
				}

				]

			}]

		});