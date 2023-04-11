Ext.define('Legion.view.main.MainController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  views : ['main.Main'],
  init : function() {
    this.control({
        "#main_prin" : {
        render : this.onMainViewRender
        }
              
            });
},


  



  exit: function() {
    var me = this;
    Ext.MessageBox.confirm(
      'Confirmar',
      '¿Estás seguro de que quieres salir de la aplicación?',
      function(choice) {
        if (choice == 'yes') {
       
          localStorage.removeItem('Inicio de Sesion');

         
          me.getView().destroy();

          Ext.widget('app-login');
        }
      }
    );
  },
listen : {
    controller : {
        '#' : {
            unmatchedroute : 'onRouteChange'
        }
    }
},


routes: {
    ':node': 'onRouteChange'
},


lastView: null,


setCurrentView: function(hashTag) {
    hashTag = (hashTag || '').toLowerCase();

    


    var me = this,
        refs = me.getReferences(),
        mainCard = refs.mainCardPanel,
        mainLayout = mainCard.getLayout(),
        navigationList = refs.navigationTreeList;

        store = me.getViewModel().getStore('comando');
        Ext.Ajax.request({
            url : 'php/negocios/usuarios/recuperarUsuario.php',
            method : 'POST',
            

            success : function(response) {

                var response_aux = Ext.util.JSON
                .decode(response.responseText, true);
                console.log(response_aux)
            


                if(response_aux.rol==2 ){
                
                    
                    store = me.getViewModel().getStore('director');
                    
                    
                  
            
                    
                

                }
                else if(response_aux.rol==3){
                    store = me.getViewModel().getStore('secretaria');
                  

                }
                else{
                    store = me.getViewModel().getStore('comando');
                

                }

            
            }

        }

        );
     
        //store = navigationList.getStore();


        var node = store.findNode('routeId', hashTag) ||
               store.findNode('viewType', hashTag);
        var view = (node && node.get('viewType')) ,
        lastView = me.lastView,
        existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
        newView;

      



    // Kill any previously routed window
    if (lastView && lastView.isWindow) {
        lastView.destroy();
    }


    lastView = mainLayout.getActiveItem();


    if (!existingItem) {
        newView = Ext.create({
            xtype: view,
            routeId: hashTag,  // for existingItem search later
            hideMode: 'offsets'
        });
    }


    if (!newView || !newView.isWindow) {
        // !newView means we have an existing view, but if the newView isWindow
        // we don't add it to the card layout.
        if (existingItem) {
            // We don't have a newView, so activate the existing view.
            if (existingItem !== lastView) {
                mainLayout.setActiveItem(existingItem);
            }
            newView = existingItem;
        }
        else {
            // newView is set (did not exist already), so add it and make it the
            // activeItem.
            Ext.suspendLayouts();
            mainLayout.setActiveItem(mainCard.add(newView));
            Ext.resumeLayouts(true);
        }
    }


    navigationList.setSelection(node);


    if (newView.isFocusable(true)) {
        newView.focus();
    }


    me.lastView = newView;


},

onExit: function(){





   
	Ext.Ajax.request({
        
						url : 'php/negocios/login/salir.php',
						method : 'POST',
						
						success : function() {

							
							  var redirect = 'login/index.php';
                     		 window.location = redirect;
						}

					}

					);
	
	
},


onMostrarConfguracion: function(){
    
    Ext.Ajax.request({
        url : 'php/negocios/usuarios/recuperarUsuario.php',
        method : 'POST',
       
        success : function(response) {
            var response_aux = Ext.util.JSON
					.decode(response.responseText, true);
                    console.log(response_aux.nombre)


                    Ext.Ajax.request({
                        url : 'php/negocios/empresas/recuperarInstituto.php',
                        method : 'POST',
                        params:{
                            id_sucursal :response_aux.sucursal
            
                        },
                        
            
                        success : function(response) {
            
                            var response_aux = Ext.util.JSON
                            .decode(response.responseText, true);
                            console.log(response_aux)
                            var id_empresa = response_aux.id
            
                            Ext.ComponentQuery
                            .query('#window_form_confi_usuario #usuarioFormConf #id_fkempresa_sucursal_conf')[0]
                            .setValue(id_empresa);
                            
                            store = Ext.getStore('Sucursal');
                            store.getProxy().extraParams={
                                id_empresa:id_empresa,
                                nombre_busqueda:""
            
                            }
                            store.load();
                            
            
            
            
            
                                
            
                            
            
                        
                        }
            
                    }
            
                    );
               
                    
                    Ext.ComponentQuery
                    .query('#window_form_confi_usuario #usuarioFormConf #guardar_usuario_conf')[0]
                    .setIconCls('x-fa fa-edit');

                    Ext.ComponentQuery
                    .query('#window_form_confi_usuario #usuarioFormConf #guardar_usuario_conf')[0]
                    .setText('Editar');
           

            Ext.ComponentQuery
				.query('#window_form_confi_usuario #usuarioFormConf #nombre_usuario')[0]
				.setValue(response_aux.nombre);

                Ext.ComponentQuery
				.query('#window_form_confi_usuario #usuarioFormConf #id_usuario')[0]
				.setValue(response_aux.id);

                Ext.ComponentQuery
				.query('#window_form_confi_usuario #usuarioFormConf #apellido_usuario')[0]
				.setValue(response_aux.apellido);

                Ext.ComponentQuery
				.query('#window_form_confi_usuario #usuarioFormConf #clave_usuario')[0]
				.setValue(response_aux.contrasenia);

                Ext.ComponentQuery
				.query('#window_form_confi_usuario #usuarioFormConf #correo_usuario')[0]
				.setValue(response_aux.correo);

                Ext.ComponentQuery
				.query('#window_form_confi_usuario #usuarioFormConf #rol_usuario')[0]
				.setValue(response_aux.rol);

                Ext.ComponentQuery
				.query('#window_form_confi_usuario #usuarioFormConf #estado_usuario')[0]
				.setValue(response_aux.estado);

                Ext.ComponentQuery
				.query('#window_form_confi_usuario #usuarioFormConf #id_fksucursal_usuario')[0]
				.setValue(response_aux.sucursal);

            


            console.log(response);



        }

    }

    );
		
    var window = Ext.create('Legion.view.usuario.UsuarioConfiguracion');
    window.show();

    
},



onNavigationTreeSelectionChange: function (tree, node) {
    var to = node && (node.data.routeId || node.data.viewType);


    if (to) {
        this.redirectTo(to);
    }
},


onToggleNavigationSize: function () {
    var me = this,
        refs = me.getReferences(),
        navigationList = refs.navigationTreeList,
        wrapContainer = refs.mainContainerWrap,
        collapsing = !navigationList.getMicro(),
        new_width = collapsing ? 64 : 250;


    if (Ext.isIE9m || !Ext.os.is.Desktop) {
        Ext.suspendLayouts();


        refs.senchaLogo.setWidth(new_width);


        navigationList.setWidth(new_width);
        navigationList.setMicro(collapsing);


        Ext.resumeLayouts(); // do not flush the layout here...


        // No animation for IE9 or lower...
        wrapContainer.layout.animatePolicy = wrapContainer.layout.animate = null;
        wrapContainer.updateLayout();  // ... since this will flush them
    }
    else {
        if (!collapsing) {
            // If we are leaving micro mode (expanding), we do that first so that the
            // text of the items in the navlist will be revealed by the animation.
            navigationList.setMicro(false);
        }


        // Start this layout first since it does not require a layout
        refs.senchaLogo.animate({dynamic: true, to: {width: new_width}});


        // Directly adjust the width config and then run the main wrap container layout
        // as the root layout (it and its chidren). This will cause the adjusted size to
        // be flushed to the element and animate to that new size.
        navigationList.width = new_width;
        wrapContainer.updateLayout({isRoot: true});
        navigationList.el.addCls('nav-tree-animating');


        // We need to switch to micro mode on the navlist *after* the animation (this
        // allows the "sweep" to leave the item text in place until it is no longer
        // visible.
        if (collapsing) {
            navigationList.on({
                afterlayoutanimation: function () {
                    navigationList.setMicro(true);
                    navigationList.el.removeCls('nav-tree-animating');
                },
                single: true
            });
        }
    }
},




onMainViewRender:function() {

    
      this.redirectTo("inicio");
    

},


onRouteChange:function(id){

    this.setCurrentView(id);
},


onSearchRouteChange: function () {
    this.setCurrentView('searchresults');
},


onSwitchToModern: function () {
    Ext.Msg.confirm('Switch to Modern', 'Are you sure you want to switch toolkits?',
                    this.onSwitchToModernConfirmed, this);
},


onSwitchToModernConfirmed: function (choice) {
    if (choice === 'yes') {
        var s = location.search;


        // Strip "?classic" or "&classic" with optionally more "&foo" tokens
        // following and ensure we don't start with "?".
        s = s.replace(/(^\?|&)classic($|&)/, '').replace(/^\?/, '');


        // Add "?modern&" before the remaining tokens and strip & if there are
        // none.
        location.search = ('?modern&' + s).replace(/&$/, '');
    }
},

onAfterRender: function(){
    console.log('after render');
},

  onItemSelected: function(sender, record) {
    Ext.Msg.confirm('Confirm', 'Esta seguro', 'onConfirm', this);
  },

  onConfirm: function(choice) {
    if (choice === 'yes') {
      //
    }
  },
  
  
    onToggleConfig: function(menuitem) {
        var treelist = this.lookupReference('treelist');
        console.log("s",menuitem);

        treelist.setConfig(menuitem.config, menuitem.checked);
    },

    onToggleMicro: function(button, pressed) {
        var treelist = this.lookupReference('treelist'),
            navBtn = this.lookupReference('navBtn'),
            ct = treelist.ownerCt;

        treelist.setMicro(pressed);

        if (pressed) {
            navBtn.setPressed(true);
            navBtn.disable();
            this.oldWidth = ct.width;
            ct.setWidth(44);
        }
        else {
            ct.setWidth(this.oldWidth);
            navBtn.enable();
        }

 
        if (Ext.isIE8) {
            this.repaintList(treelist, pressed);
        }
    },

    onToggleNav: function(button, pressed) {
    	console.log(pressed);
        var treelist = this.lookupReference('treelist'),
            ct = this.lookupReference('treelistContainer');

        treelist.setExpanderFirst(!pressed);
        treelist.setUi(pressed ? 'nav' : null);
        treelist.setHighlightPath(pressed);
        ct[pressed ? 'addCls' : 'removeCls']('treelist-with-nav');

        if (Ext.isIE8) {
            this.repaintList(treelist);
        }
    },
    
   
    repaintList: function(treelist, microMode) {
        treelist.getStore().getRoot().cascade(function(node) {
            var item, toolElement;

            item = treelist.getItem(node);

            if (item && item.isTreeListItem) {
                if (microMode) {
                    toolElement = item.getToolElement();

                    if (toolElement && toolElement.isVisible(true)) {
                        toolElement.syncRepaint();
                    }
                }
                else {
                    if (item.element.isVisible(true)) {
                        item.iconElement.syncRepaint();
                        item.expanderElement.syncRepaint();
                    }
                }
            }
        });
    }
});