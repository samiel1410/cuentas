Ext.define('Legion.view.alumno.VerInscripciones', {
    extend : 'Ext.window.Window',
    alias : 'widget.window_ver_inscripciones',
    itemId : 'window_ver_inscripciones',
    title : 'Inscripciones',
    draggable : false,
    resizable : false,
    width:600,
    modal : true,
        items : [
            {

                alias : 'widget.InscripcionesAlumnoGrid',
                itemId : 'InscripcionesAlumnoGrid',
                xtype : 'grid',
              
                height:300,
                autoScroll : true,
               
                store : 'InscripcionesAlumno',
                

                autoLoad : true,
                features : [{
                    ftype : 'summary'
                  }],
        
                  viewConfig: {
                    listeners: {
                        expandbody: function(rowNode, record, expandRow, eOpts) {
                          
                            console.log(record)
                           store = Ext.getStore('AlumnoInscripciones');

                            store.getProxy().extraParams={
                            inscripcion: record.data.id_inscripcion

                           }
                           store.load();
                        
           

                        }
                    }
                },
                  plugins : [{
                    ptype : 'rowwidget',
                    widget : {
                      xtype : 'grid',
                      itemId : 'gridPedidosRenovar',
                       
                        store : 'AlumnoInscripciones',
                         
                   

                        listeners: {
                            datachanged: function(){
                                delete me.totalSum;
                            }
                        },
                
                        getTotalSum: function() {
                            var me = this;
                
                            if (Ext.isEmpty(me.totalSum)) {
                                me.totalSum = me.sum('saldo_mensualidad');
                            }
                
                            return me.totalSum;
                        },
                     
                      features : [{
                            ftype : 'summary'
                          }],
                      columns : [{
                            text : "#",
                            dataIndex : 'numero_cuota_mensualidad',
                            width : 70,
                            summaryRenderer: function() {
                                return 'Total: '
                            },
                          }, {
                            text : "Concepto",
                            dataIndex : 'concepto_mensualidad',
                            flex : 1
                          }, {
                            text : "Fecha de Pago",
                            dataIndex : 'fecha_pago_mensualidad',
                            flex : 1
                          }, {
                            text : "Estado",
                            dataIndex : 'estado_mensualidad',
                            flex : 1,
                            hidden:true
                          },
                          {
                            text : "Estado",
                            dataIndex : 'nombre_estado_mensualidad',
                            flex : 1
                          }, {
                            text : "Total",
                            formatter : 'usMoney',
                            dataIndex : 'saldo_mensualidad',
                            flex :1 ,
                            summaryType: 'sum'
                          }],
  
                      listeners : {
                        selectionchange : 'onSelectionChange'
                      }
  
                    }
                  }],
                columns : [{
                            text : "Id",
                            dataIndex : 'id_inscripcion',
                            itemId : 'id_inscripcion',
                            width : 50,
                            hidden:true
                        }, {
                            text : "Fecha de Inscripcion",
                            flex : 1,
                            dataIndex : 'fecha_inscripcion'

                        }, {
                            text : "Fecha Inicio",
                            flex : 1,
                            dataIndex : 'fecha_inicio_inscripcion',

                            width : 100,
                            hidden:true

                        }, {
                            text : "Fecha Fin",
                            flex : 1,
                            dataIndex : 'fecha_fin_inscripcion',
                            hidden:true
                            

                        },
                        {
                            text : "Curso iD",
                            flex : 1,
                            dataIndex : 'id_fkcurso_inscripcion',
                            hidden:true
                            

                        },
                        {
                            text : "Curso",
                            flex : 1,
                            dataIndex : 'nombre_curso',
                          
                            

                        },
                        {
                          text : "Estado",
                          flex : 1,
                          dataIndex : 'estado_inscripcion',
                          hidden:true
                        
                          

                      },
                    
                    {
                      text : "Estado",
                      flex : 1,
                      dataIndex : 'nombre_estado_inscripcion',
                    
                      

                  }, {
                            text : "Calificacion",
                            flex : 1,
                            dataIndex : 'calificacion_inscripcion',
                            hidden : true

                        },

                      
                        
                        
                      
                        

                      

                    ],
                bbar : [{
                    xtype : 'pagingtoolbar',
                    store : 'InscripcionesAlumno',
                    displayInfo : true,
                    displayMsg : 'Displaying {0} to {1} of {2} &nbsp;records ',
                    emptyMsg : "No records to display&nbsp;",
                    
                }]

            }
   ]


});