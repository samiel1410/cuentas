Ext.define('Legion.model.AlumnoInscripto', {
			extend : 'Ext.data.Model',
			idProperty : 'id_inscripcion',
			fields : [{
						name : 'id_inscripcion',
						type : 'int',
						defaultValue : 0
					}, {
						name : 'nombre_alumno',
						type : 'string'
					}, {
						name : 'apellido_alumno',
						type : 'string'
					}, {
						name : 'fecha_naci_alumno',
						type : 'string'
					}, {
						name : 'direccion_alumno',
						type : 'string'

					}, {
						name : 'celular_alumno',
						type : 'string'
					}, {
						name : 'correo_alumno',
						type : 'string'

					}, {
						name : 'cedula_alumno',
						type : 'string'
					}, {
						name : 'id_instructor',
						type : 'int'
					}, {
						name : 'nombre_instructor',
						type : 'string'
					},
					{
						name : 'iva_curso',
						type : 'float'
					}

			]

		});