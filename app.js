Ext.application({
    requires : ['Ext.container.Viewport', 'Legion.Application'],
    name : 'Legion',

    launch : function(){

     
       
        setInterval(this.sendPostRequest, 30000);
        Ext.create('Ext.container.Viewport', 
        {
            layout : 'fit',
            items : [{
                xtype : 'container',
                items : [{
                	
                    xtype : 'Legion',
                    height:200,
                    html:'"DDD'
                },{
                    xtype:'component',
                  
                }
                
              
                ]
                
               
            }]
        });
    },

    sendPostRequest: function() {
        Ext.Ajax.request({
            url: 'php/negocios/login/verificarLogin.php',
            method: 'POST',
            success: function(response) {
                console.log("SSSSS1")

                var response_aux = Ext.util.JSON
				.decode(response.responseText, true);
				console.log(response_aux)
               if(response_aux.success==false){
                Swal.fire({
                    icon: 'warning',
  title: 'Advertencia',
  text: 'Se ha iniciado una sesion con el mismo usuario',
                   
                }).then((result) => {
                if (result.value) {
            
                    var redirect = 'login/index.php';
                    window.location = redirect;
                }
            });

               }
            },
          
        });
    }
});