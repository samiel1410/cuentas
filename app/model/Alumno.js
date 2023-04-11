Ext.define('Legion.model.Alumno', {
			extend : 'Ext.data.Model',
			idProperty : 'id_alumno',
			fields : [{
						name : 'id_alumno',
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
						name : 'telefono_alumno',
						type : 'string'
					}, {
						name : 'celular_alumno',
						type : 'string'
					}, {
						name : 'instruccion_alumno',
						type : 'string'
					}, {
						name : 'ciudad_alumno',
						type : 'string'

					}, {
						name : 'estado_alumno',
						type : 'int'
					}, {
						name : 'correo_alumno',
						type : 'string'

					}, {
						name : 'cedula_alumno',
						type : 'string'
					}, {
						name : 'tipo_sangre_alumno',
						type : 'string'
					}
					, {
						name : 'nombre_representante_alumno',
						type : 'string'
					}
					, {
						name : 'numero_representante_alumno',
						type : 'string'
					}
					, {
						name : 'talla_uniforme_alumno',
						type : 'int'
					}
					, {
						name : 'numero_calzado_alumno',
						type : 'int'
					}
					, {
						name : 'id_fksucursal_alumno',
						type : 'int'
					}
					, {
						name : 'id_fkusuario_alumno',
						type : 'int'
					}
					, {
						name : 'created_at',
						type : 'string'
					},
					{
						name : 'id_fkprovincia_alumno',
						type : 'int'
					}
					
					

			]

		});