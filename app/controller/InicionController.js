Ext.define('Legion.controller.InicionController', {
	extend : 'Ext.app.Controller',
	
	refs : [{
				ref : 'formaMasterForm'

			}],

	init : function() {
		this.control({

					'#dirigir_alumnos' : {
						click : this.btnDirigirAlumnos

					},
					'#dirigir_inscripciones' : {
						click : this.btnDirigirInscripciones
                    },
                    '#dirigir_orden' : {
						click : this.btnDirigirOrden
                    }

				
				
				});
	},

	btnDirigirAlumnos : function() {
		
        var locacion = "Alumnos";

        this.redirectTo(locacion)

	},

    btnDirigirInscripciones : function() {
		
        var locacion = "Inscripciones";

        this.redirectTo(locacion)

	},


    
    btnDirigirOrden : function() {
		
        var locacion = "OrdenPedidos";

        this.redirectTo(locacion)

	},


	
		


		

	

});