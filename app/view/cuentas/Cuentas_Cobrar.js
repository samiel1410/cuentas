Ext.define('Legion.view.cuentas.Cuentas_Cobrar', {
    extend: 'Ext.TabPanel',
    alias: 'widget.cuenta_cobrar',
    title:"CUENTAS POR COBRAR",
 
    items : [
        //Listado
        {
            title:'Listado',
            layout : 'column',
            tabConfig: {
                hidden: true
            },
            items:[  
              {
                columnWidth : 1,
                dockedItems : [{
                  xtype : 'toolbar',
                  dock : 'bottom',
                  layout : {
                    pack : 'center'
                  },
                  items : [{
                        iconCls : 'fas fa-low-vision visualizarTotales',
                        text : 'Mostrar Totales',
                        itemId : 'btnTotalCuentasPorCobrar',
                        cls : 'botonNuevo',
                        style : 'background-color:#7beea3;',
                        xtype : 'button'
                      }]
                }]
          
          
              },

              

              
                {
                  
                  columnWidth : 0.33,
                  title : '<i class="fas fa-money-bill-alt">  </i>   Total vencido',
                  ui : "light",
                 
                  headerPosition : "top",
                  fieldStyle : "text-align:center;",
                  height : 100,
                  layout : "fit",
                  header : {
                    titleAlign : 'center',
                    cls : "quick-graph-panel shadow"
                  },
                  items : [{
                        xtype : "label",
                        itemId : 'id_total_vencido_cuenta_cobrar',
                        html : '<div align="center" style="font-size:18px;color: Black;font-weight: bold;" ><h2>$--.--</h2></div>'
                      }]
                }, {
                  columnWidth : 0.33,
                  title : '<i class="fas fa-money-bill-alt">  </i>  Total no vencido',
                  fieldStyle : "text-align:center;",
                  ui : "light",
                
                  headerPosition : "top",
                  header : {
                    titleAlign : 'center',
                    cls : "quick-graph-panel shadow"
                  },
                  height : 100,
                  layout : "fit",
                  items : [{
                        xtype : "label",
                        itemId : 'id_total_no_vencido_cuenta_cobrar',
                        html : '<div align="center" style="font-size:18px;color: Black;font-weight: bold;" ><h2>$--.--</h2></div>'
                      }]
                },


                {
                  columnWidth : 0.33,
                  title : '<i class="fas fa-money-bill-alt">  </i> Total',
                  ui : "light",
                
                  headerPosition : "top",
                  fieldStyle : "text-align:center;",
                  height : 100,
                  layout : "fit",
                  header : {
                    titleAlign : 'center',
                    cls : "quick-graph-panel shadow"
                  },
                  items : [{
                        xtype : "label",
                        itemId : 'id_total_cuenta_cobrar',
                        html : '<div align="center" style="font-size:18px;color: Black;font-weight: bold;" ><h2>$--.--</h2></div>'
                      }]
                },
                
                
                
                {
                  columnWidth : 1,
                  itemId : 'cuentacobrarfitrobusquedaform',
                  xtype : 'form',
                  padding : '5 15 0 15',
                  items : [{
                        columnWidth : 1,
                        dockedItems : [{
                              xtype : 'toolbar',
                              dock : 'top',
                              items : [{
                                    text : "Nueva Cuenta Cobrar",
                                    iconCls : 'fas fa-plus-circle',
                                    itemId : 'btnAbrirCuentaCobrar',
                                    cls : 'botonNuevo',
                                    style : 'background-color:#4f9d40;'
                                  }]
                            }]
                      }, {
                        columnWidth : 1,
                        xtype : 'fieldset',
                        title : 'Búsqueda cuentas cobrar',
                        layout : 'column',
                        defaults : {
                          padding : '3'
                        },
                        style : {
                          background : 'White',
                          'text-align' : 'center'
                        },
                        items : [{
                              columnWidth : 0.33,
                              xtype : 'combo',
                              name : 'comboMes',
                              itemId : 'comboMesCuentaCobrar',
                              fieldLabel : 'Periodo',
                              enableKeyEvents : true,
                              editable : false,
                              valueField : 'id',
                              displayField : 'nombre',
                              allowBlank : false,
                              typeAhead : true,
                              mode : 'local',
                              triggerAction : 'all',
                              emptyText : 'Mes',
                              store : new Ext.data.SimpleStore({
                                    fields : ['id', 'nombre'],
                                    data : [['01', 'Enero'], ['02', 'Febrero'], ['03', 'Marzo'], ['04', 'Abril'], ['05', 'Mayo'], ['06', 'Junio'], ['07', 'Julio'], ['08', 'Agosto'], ['09', 'Septiembre'], ['10', 'Octubre'], ['11', 'Noviembre'], ['12', 'Diciembre']]
                                  })
                            }, {
                              columnWidth : 0.20,
                              xtype : 'datefield',
                              name : 'buscarPorFechaDesde',
                              itemId : 'buscarPorFechaDesdeCuentaCobrar',
                              format : 'Y-m-d',
                              enableKeyEvents : true,
                              emptyText : "Desde"
        
                            }, {
                              columnWidth : 0.20,
                              xtype : 'datefield',
                              name : 'buscarPorFechaHasta',
                              itemId : 'buscarPorFechaHastaCuentaCobrar',
                              format : 'Y-m-d',
                              enableKeyEvents : true,
                              emptyText : 'Hasta'
                            }, {
                              columnWidth : 0.10,
                              margin : '5 5 0 5',
                              iconCls : 'fas fa-search',
                              text : 'Ver',
                              itemId : 'btnBuscarPorRangoCuentaCobrar',
                              cls : 'botonNuevo',
                              xtype : 'button',
                              style : 'background-color:#3987a8;',
                              height : 30
        
                            }, 
                            {
                              columnWidth : 0.10,
                              margin : '5 5 0 5',
                              iconCls : 'fas fa-search',
                              text : 'Limpiar',
                              itemId : 'btnRefrescarCuentaCobrar',
                              cls : 'botonNuevo',
                              xtype : 'button',
                              style : 'background-color:#3987a8;',
                              height : 30
        
                            }, 
                            {
                              columnWidth : 0.33,
                              xtype : "combo",
                              itemId : "sucursal_cuenta_cobrar",
                              allowBlank : true,
                              editable : false,
                              fieldLabel : 'Sucursal',
                              enableKeyEvents : true,
                              editable : false,
                              displayField : 'sucursal',
                              valueField : 'id_sucursal',
                              mode : 'local',
                              triggerAction : 'all',
                              emptyText : 'Seleccionar',
                              store : new Ext.data.SimpleStore({
                                    fields : ['id_sucursal', 'sucursal'],
                                    data : [['1', 'MATRIZ'],
                                        ['2', 'SUCURSAL 02']
              
                                    ]
                                  }),
                              queryMode : 'local',
        
                            },
                            {
                              columnWidth : 0.33,
                              xtype : "combo",
                              itemId : "departamento_cuenta_cobrar",
                              name : "centro_costo",
                              fieldLabel : 'Departamento',
                              allowBlank : true,
                              editable : false,
                              valueField : 'id',
                               displayField : 'departamento',
                              valueField : 'id_departamento',
                              mode : 'local',
                              triggerAction : 'all',
                              emptyText : 'Seleccionar',
                              store : new Ext.data.SimpleStore({
                                    fields : ['id_departamento', 'departamento'],
                                    data : [['1', 'VENTAS'],
                                        ['2', 'CONTABILIDAD']
              
                                    ]
                                  }),
                              queryMode : 'local',
        
                            }, 
                            {
                              columnWidth : 0.33,
                              xtype : "combo",
                              itemId : "estado_cuenta_cobrar",
                            
                              allowBlank : true,
                              editable : false,
                              valueField : 'id',
                              displayField : 'estado',
                              fieldLabel : 'Estado',
                              typeAhead : true,
                              mode : 'local',
                              triggerAction : 'all',
                              store : new Ext.data.SimpleStore({
                                fields : ['id', 'estado'],
                                data : [['TODOS', 'TODOS'],['COBRADA', 'COBRADA'],
                                    ['NO COBRADA', 'NO COBRADA']
          
                                ]
                              }),

                              value:'TODOS'
                            }, {
                              columnWidth : 0.50,
                              xtype : 'textfield',
                              name : 'buscarPorNumero',
                              itemId : 'buscarPorNumeroCuentaCobrar',
                              fieldLabel : "Número"
                            },
                            {
                              columnWidth : 0.50,
                              xtype : 'textfield',
                              itemId : 'buscarPorObservacionCuentaCobrar',
                           
                              fieldLabel : ' Observacion',
                              
                            },
      
                        ]
        
                      }]
        
                },
                // inicio
                {
                  columnWidth : 1,
                  width : '100%',
                  xtype : 'grid',
                
                 height:250,
         
        
        
                    autoScroll: true,
        
        
                 
                    store: 'Cuentas_Cobrar',
                    width: '100%',
        
        
                    autoLoad: true,
        
                    columns: [{
                        text: "Id",
                        dataIndex: 'id_otra_cuenta_cobrar',
                        itemId: 'id_otra_cuenta_cobrar',
                        width: 50,
                        hidden: true
                    },
                   
                    {
                        text: "NÚMERO",
                        flex: 1,
                        dataIndex: 'numero_otra_cuenta_cobrar'
        
                    }, 
                    {
                      text: "CLIENTE",
                      flex: 1,
                      dataIndex: 'id_fkcliente_otra_cuenta_cobrar',
                      hidden:true
      
                  },
                  {
                    text: "CLIENTE",
                    flex: 1,
                    dataIndex: 'nombre_cliente',
    
                },
                    {
                      text: "T.DOCUMENTO",
                      flex: 1,
                      dataIndex: 'id_fktipo_documento_otra_cuenta_cobrar',

                      hidden:true,
      
      
      
                  },
                  {
                    text: "T.DOCUMENTO",
                    flex: 1,
                    dataIndex: 'nombre_documento_asiento_detalle',
    
    
    
                },{
                        text: "N.DOCUMENTO",
                        flex: 1,
                        dataIndex: 'numero_documento_otra_cuenta_cobrar',
        
                        width: 100
        
                    },
                    {
                      text: "F.EMISIÓN",
                      flex: 1,
                      dataIndex: 'fecha_emision_otra_cuenta_cobrar'
      
                  }, 
                    {
                        text: "F.VENC",
                        flex: 1,
                        dataIndex: 'fecha_vcto_otra_cuenta_cobrar',
        
        
                    },
                    {
                        text: "MONTO",
                        flex: 1,
                        dataIndex: 'monto_otra_cuenta_cobrar',
                        renderer: Ext.util.Format.usMoney

        
                    },
                    {
                        text: "OBS.",
                        flex: 1,
                        dataIndex: 'obs_otra_cuenta_cobrar'
        
                    },
                   
                    {
                        text: "ESTADO",
                        flex: 1,
                        dataIndex: 'estado_otra_cuenta_cobrar',
        
        
        
                    },
                    {
                      text: "SUCURSAL",
                      flex: 1,
                      dataIndex: 'nombre_sucursal',
        
   
      
                  },
                  {
                    text: "DEPT.",
                    flex: 1,
                    dataIndex: 'nombre_centro_costo',
 
    
                },
                    {
                        text: "USUARIO",
                        flex: 1,
                        dataIndex: 'id_fkusuario_otra_cuenta_cobrar',
                        hidden:true
        
        
        
                    },
                    {
                        text: "EMPLEADO",
                        flex: 1,
                        dataIndex: 'id_fkempleado_emisor_otra_cuenta_cobrar',
                        hidden:true
        
        
        
                    },
                   
                    
                    {
                        text: "DEPT.",
                        flex: 1,
                        dataIndex: 'id_fkcentro_costo_otra_cuenta_cobrar',
                        hidden:true
        
        
        
                    },
                    {
                        text: "SUCURSAL",
                        flex: 1,
                        dataIndex: 'id_fksucursal_otra_cuenta_cobrar',
                        hidden:true
        
        
        
                    },
                    {
                        text: "F.CREACION",
                        flex: 1,
                        dataIndex: 'fecha_creacion_otra_cuenta_por_cobrar',
                        hidden:true
        
        
        
                    },

                    {
                      xtype : 'actioncolumn',
                      itemId : 'action_cuenta_cobrar',
                      width : 75,
                      items : [{
        
                        tooltip : 'Editar',
                        iconCls : 'x-fa fa-pen',
                        itemId : 'editar_forma',
                        handler : function(view, rowIndex, colIndex,
                            item, e, record, row) {
                          this.fireEvent('btnUpdate', view, rowIndex,
                              colIndex, item, e, record, row);
        
                        }
        
                      }, {
                        tooltip : 'Eliminar',
                        iconCls : 'x-fa fa-times',
                        itemId : 'eliminar_forma',
                        handler : function(view, rowIndex, colIndex,
                          item, e, record, row) {
                          this.fireEvent('btnDelete', view, rowIndex, colIndex,
                          item, e, record, row);
        
                        }
                      },
                      {
                        tooltip : 'PDF',
                        iconCls : 'x-fa fa-search',
                        itemId : 'eliminar_forma',
                        handler : function(view, rowIndex, colIndex,
                          item, e, record, row) {
                          this.fireEvent('btnPDF', view, rowIndex, colIndex,
                          item, e, record, row);
        
                        }
                      }
        
                      ]
                    }
                    ],
                      bbar: [{
                        flex: 1,
                        xtype: 'pagingtoolbar',
                        store: 'Cuentas_Cobrar',
                        displayInfo: true,
                        displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
                        emptyMsg: "No records to display&nbsp;",
                       
                    }]
        
                }]
        }

        //Formulario
,
        {
            title:'Nueva cuenta Cobrar',
            tabConfig: {
                hidden: true
            },
            items:[
  
                {
                    columnWidth : 1,
                    items : [{
                          xtype : 'label',
                          style : 'font-size:20px;font-weight:bold;color:green;',
                          text : 'INGRESO CUENTAS COBRAR'
                        }, {
                          xtype : 'toolbar',
                          items : ['->', 
                               {
                                text : "Atrás",
                                itemId : 'btnRegresarVista',
                                iconCls : 'fas fa-caret-square-left',
                                cls : 'botonGuardar',
                                style : 'background-color:#96f5e8'
                              }]
                        }]
          
                  }, {
                    columnWidth : 0.6,
                    xtype : 'fieldset',
                    itemId : '_gasto_menor',
                    title : 'NUEVO CUENTA A COBRAR:',
                    style : {
                      background : 'White'
                    },
                    defaults : {
                      margin : '5',
                      anchor : '100%',
                      labelStyle : 'font-weight:bold;'
                    },
          
                    items : [{
                          itemId : 'agregarCuentaCobrarForm',
                          xtype : 'form',
                          padding : '5 0 5 0',
                          layout : 'column',
                          defaults : {
                           
                            labelWidth : 100
                          },
                          items : [ 
                            
                            {
                                columnWidth : 0.85,
                                xtype : 'textfield',
                                fieldLabel : 'id_cliente',
                                itemId :'id_otra_cuenta_cobrar',
                                name : 'id_otra_cuenta_cobrar',
                               value:"",
                                editable : false,
                                hidden:true,
                               
                            
                              }, 
                            {
                                columnWidth : 0.85,
                                xtype : 'textfield',
                                fieldLabel : 'id_cliente',
                                itemId : 'id_fkcliente_otra_cuenta_cobrar',
                                name : 'id_fkcliente_otra_cuenta_cobrar',
                                allowBlank : false,
                                editable : false,
                                hidden:true,
                               
                            
                              }, 
                              {
                                columnWidth : 0.85,
                                xtype : 'textfield',
                                fieldLabel : 'Cliente',
                                itemId : 'nombre_cliente',
                               
                                allowBlank : false,
                                editable : false,
                         
                               
                            
                              }, 

                              {
                                columnWidth : 0.85,
                                xtype : 'textfield',
                                fieldLabel : 'Cliente',
                                itemId : 'numero_otra_cuenta_cobrar',
                                name : 'numero_otra_cuenta_cobrar',
                                hidden:true,
                                
                                editable : false,
                               
                         
                               
                            
                              }, 
                              {
                                columnWidth : 0.15,
                                xtype : 'button',
                                margin:'0 5 0 5',
                                text:'Clientes',
                                width: 64,
                                height:30 ,
                                iconCls : 'x-fa fa-search',
                                itemId : 'btnListadoClientes',
                                handler : function() {
                                    this.fireEvent('listadoClientes');
                                }
                              },
                              
                              
                              {
                                columnWidth : 0.33,
                                xtype : 'datefield',
                                name : 'fecha_emision_otra_cuenta_cobrar',
                                itemId : 'fecha_emision_otra_cuenta_cobrar',
                                
                                labelAlign : 'top',
                                fieldLabel : 'Fecha',
                                allowBlank : false,
                                value : new Date(),
                                format : 'Y-m-d',
                                editable : false
                              }, {
                                columnWidth : 0.33,
                                xtype : 'combo',
                                fieldLabel : ' Documento',
                                margin:'0 0 0 5',
                                itemId : 'id_fktipo_documento_otra_cuenta_cobrar',
                                name : 'id_fktipo_documento_otra_cuenta_cobrar',
                                labelAlign : 'top',
                                allowBlank : false,
                                editable : false,
                                emptyText : 'Seleccionar',
                                valueField : 'id_documento_asiento_detalle',
                                displayField : 'nombre_documento_asiento_detalle',
                                typeAhead : true,
                                mode : 'local',
                                triggerAction : 'all',


                                store : new Ext.data.SimpleStore({
                                    fields : ['id_documento_asiento_detalle', 'nombre_documento_asiento_detalle'],
                                    data : [[1,'Sin Documento' ], [2, 'Factura Física'], ]
                                  }),
                                autoLoad:true,
                                listeners : {
                                    change : function(fld, newValue, oldValue, opts) {
                                      if (newValue == 1) {
                                        Ext.ComponentQuery.query('cuenta_cobrar form#agregarCuentaCobrarForm textfield#numero_documento_otra_cuenta_cobrar')[0].setValue("0");
                                        Ext.ComponentQuery.query('cuenta_cobrar form#agregarCuentaCobrarForm textfield#numero_documento_otra_cuenta_cobrar')[0].setDisabled(true);
                                      } else {
                                        Ext.ComponentQuery.query('cuenta_cobrar form#agregarCuentaCobrarForm textfield#numero_documento_otra_cuenta_cobrar')[0].setValue("");
                                        Ext.ComponentQuery.query('cuenta_cobrar form#agregarCuentaCobrarForm textfield#numero_documento_otra_cuenta_cobrar')[0].setDisabled(false);
                                      }
                                    }
                                  },
                               
                               
                              }, {
                                columnWidth : 0.33,
                                xtype : 'textfield',
                                labelAlign : 'top',
                                name : 'numero_documento_otra_cuenta_cobrar',
                                itemId :'numero_documento_otra_cuenta_cobrar',
                                fieldLabel : 'Nº Dcto.',
                                allowBlank : false,
                                margin:'0 0 0 5',
                                maxLength : 200,
                                enforceMaxLength : true,
                                maskRe : /[0-9.]/,
                                disabled : false,
                                
                              }, {
                                columnWidth : 0.33,
                                xtype : 'textfield',
                                labelAlign : 'top',
                                fieldLabel : 'Monto',
                                margin:'0 0 0 0',
                                itemId : 'monto_otra_cuenta_cobrar',
                                name : 'monto_otra_cuenta_cobrar',
                                allowBlank : false,
                                maxLength : 200,
                                enforceMaxLength : true,
                                maskRe : /[0-9.]/,
                                
                              }, {
                                columnWidth : 0.33,
                                fieldLabel : 'Sucursal',
                                labelAlign : 'top',
                                itemId : 'id_fksucursal_otra_cuenta_cobrar',
                                name : 'id_fksucursal_otra_cuenta_cobrar',
                                margin : '0 0 0 5',
                                xtype : 'combo',
                                dock : 'top',
                                enableKeyEvents : true,
                                editable : false,
                                displayField : 'sucursal',
                                valueField : 'id_sucursal',
                                mode : 'local',
                                triggerAction : 'all',
                                emptyText : 'Seleccionar',
                                store : new Ext.data.SimpleStore({
                                      fields : ['id_sucursal', 'sucursal'],
                                      data : [['1', 'MATRIZ'],
                                          ['2', 'SUCURSAL 02']
                
                                      ]
                                    }),
                                queryMode : 'local',
                               
                                allowBlank : false,
                              }, {
                                columnWidth : 0.33,
                                xtype : 'combo',
                              
                                labelAlign : 'top',
                                fieldLabel : 'Departamento',
                                itemId : 'id_fkcentro_costo_otra_cuenta_cobrar',
                                name : 'id_fkcentro_costo_otra_cuenta_cobrar',
                                margin : '0 0 0 5',
                                enableKeyEvents : true,
                                editable : false,
                                displayField : 'departamento',
                                valueField : 'id_departamento',
                                mode : 'local',
                                triggerAction : 'all',
                                emptyText : 'Seleccionar',
                                store : new Ext.data.SimpleStore({
                                      fields : ['id_departamento', 'departamento'],
                                      data : [['1', 'VENTAS'],
                                          ['2', 'CONTABILIDAD']
                
                                      ]
                                    }),
                                queryMode : 'local',
                               
                                allowBlank : false,
                              }, {
                                columnWidth : 0.30,
                                xtype : 'datefield',
                                labelAlign : 'top',
                                format : 'Y-m-d',
                                name : 'fecha_vcto_otra_cuenta_cobrar',
                                itemId : 'fecha_vcto_otra_cuenta_cobrar',
                                allowBlank : false,
                                fieldLabel : 'Fecha de Vencimiento',
                               
                                editable : false,
                    
                               
          
                              }, {
                                columnWidth : 0.70,
                                xtype : 'textfield',
                                labelAlign : 'top',
                                name : 'obs_otra_cuenta_cobrar',
                                itemId : 'obs_otra_cuenta_cobrar',
                                margin:'0 0 0 5',
                                fieldLabel : 'Observación',
                                allowBlank : true,
                                maxLength : 200,
                                enforceMaxLength : true
                              }],
                          dockedItems : [{
                                xtype : 'toolbar',
                                dock : 'bottom',
                                items : ['->', {
                                      text : "Guardar",
                                      iconCls : 'far fa-save',
                                      itemId : 'btnGuardarCuentaCobrar',
                                      scale : 'medium',
                                      cls : 'botonGuardar',
                                      style : 'background-color:#4f9d40;'
                                    }]
                              }]
                        }]
          
                  }
            ]
        }
        
        
        
      

    ]
  });