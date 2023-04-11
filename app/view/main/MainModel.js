Ext.define('Legion.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

  
 requires: [
    'Ext.plugin.Viewport',
    'Ext.window.MessageBox',
    'Legion.view.main.MainController',
   
  ],


    
    stores: {

        comando: {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: 'Inicio',
                    iconCls: 'x-fa fa-home',
                    viewType:'inicio',
                    arrowVisible: false,
                  
                }, 
                {
                    text: 'Cuentas',
                    iconCls: 'x-fa fa-home',
                    viewType:'',
                    children: [{
                        text: 'Cuentas Por Pagar',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'cuenta_pagar'
                    }, {
                        text: 'Cuentas Por Cobrar',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'cuenta_cobrar',
                        leaf: true
                    }]
                  
                },{
                    text: 'Usuarios',
                    iconCls: 'x-fa fa-user',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'Usuarios'
                      
                 }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                      
                        viewType:'window_usuario_reporte',
                      
                     
                         
  		
                        leaf: true
                       
                    }]
                }, {
                    text: 'Cursos',
          
                    iconCls: 'fas fa-university',
                     children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                    
                        leaf: true,
                        viewType:'Cursos'
                      
                 }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_curso_reporte',
                        leaf: true
                       
                    }]
                 
                }, {
                    text: 'Instructores',
                    iconCls: 'x-fa fa-chalkboard-teacher',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                              viewType:'Instructores'
                    }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_instructor_reporte',
                        leaf: true
                    }]
                },{
                	
                	text: 'Sucursales',
                    iconCls: 'x-fa fa-school',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'Sucursales'
                    }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_sucursal_reporte',
                        leaf: true
                    }]
                	
                }
                
                ,{
                	
                	text: 'Alumnos',
                    iconCls: 'fas fa-user-graduate',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'Alumnos'
                    }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_alumno_reporte',
                        leaf: true
                    }]
                	
                }
                ,{
                	
                	text: 'Formas de Pago',
                    iconCls: 'x-fa fa-cash-register',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'FormaPagos'
                    },
                    {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_forma_reporte',
                        leaf: true
                    }]
                	
                }
                  ,{
                	
                	text: 'Inscripciones',
                    iconCls: 'x-fa fa-user-plus',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'Inscripciones',
                        
                    }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_inscripcion_reporte',
                        leaf: true
                    }
                    ]
                	
                }
                ,{
                	
                	text: 'Inscripciones Web',
                    iconCls: 'x-fa fa-user-plus',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'InscripcionesWeb',
                        
                    }
                
                    ]
                	
                },
                
                	
                {
                	
                	
                	text: 'Ordenes de Cobro',
                    iconCls: 'fas fa-vote-yea',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'OrdenPedidos'
                    }
                    , {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_orden_reporte',
                        leaf: true
                    }
                    ]
                	
                
                }
                
                
                ]
            }
        },
        director: {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: 'Inicio',
                    iconCls: 'x-fa fa-home',
                    viewType:'inicio'
                  
                },  {
                    text: 'Cursos',
          
                    iconCls: 'fas fa-university',
                     children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                    
                        leaf: true,
                        viewType:'Cursos'
                      
                 }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_curso_reporte',
                        leaf: true
                       
                    }]
                 
                }, {
                    text: 'Instructores',
                    iconCls: 'x-fa fa-chalkboard-teacher',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                              viewType:'Instructores'
                    }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_instructor_reporte',
                        leaf: true
                    }]
                }
                
                ,{
                	
                	text: 'Alumnos',
                    iconCls: 'fas fa-user-graduate',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'Alumnos'
                    }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_alumno_reporte',
                        leaf: true
                    }]
                	
                }
                ,{
                	
                	text: 'Formas de Pago',
                    iconCls: 'x-fa fa-cash-register',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'FormaPagos'
                    },
                    {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_forma_reporte',
                        leaf: true
                    }]
                	
                }
                  ,{
                	
                	text: 'Inscripciones',
                    iconCls: 'x-fa fa-user-plus',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'Inscripciones',
                        
                    }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_inscripcion_reporte',
                        leaf: true
                    }
                    ]
                	
                },
                
                	
                {
                	
                	
                	text: 'Ordenes de Cobro',
                    iconCls: 'fas fa-vote-yea',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'OrdenPedidos'
                    }
                    , {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_orden_reporte',
                        leaf: true
                    }
                    ]
                	
                
                }
                
                
                ]
            }
        },
        secretaria: {
            type: 'tree',
            root: {
                expanded: true,
                children: [{
                    text: 'Inicio',
                    iconCls: 'x-fa fa-home',
                    viewType:'inicio'
                  
                }

                
                
                ,{
                	
                	text: 'Alumnos',
                    iconCls: 'fas fa-user-graduate',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'Alumnos'
                    }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_alumno_reporte',
                        leaf: true
                    }]
                	
                }
                ,{
                	
                	text: 'Formas de Pago',
                    iconCls: 'x-fa fa-cash-register',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'FormaPagos'
                    },
                    {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_forma_reporte',
                        leaf: true
                    }]
                	
                }
                  ,{
                	
                	text: 'Inscripciones',
                    iconCls: 'x-fa fa-user-plus',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'Inscripciones',
                        
                    }, {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_inscripcion_reporte',
                        leaf: true
                    }
                    ]
                	
                },
                
                	
                {
                	
                	
                	text: 'Ordenes de Cobro',
                    iconCls: 'fas fa-vote-yea',
                    children: [{
                        text: 'Listado',
                        iconCls: 'x-fa fa-list',
                        leaf: true,
                        viewType:'OrdenPedidos'
                    }
                    , {
                        text: 'Reportes',
                        iconCls: 'x-fas fa-clipboard',
                        viewType:'window_orden_reporte',
                        leaf: true
                    }
                    ]
                	
                
                }
                
                
                ]
            }
        },
        
      

    }
});