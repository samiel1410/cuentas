Ext.define('Legion.view.inscripcion.HistorialCertificados', {
	extend: 'Ext.window.Window',
	alias: 'widget.window_historial',
	itemId: 'window_historial',
	title: 'Historial de Certificados',
    
	
	modal : true,

	items: [{

		xtype: 'grid',
        width:700,
		height : 100,
		autoScroll: true,
		selType: 'rowmodel',
		selModel: {
			mode: 'SINGLE'
		},
		viewConfig: {
			stripeRows: true
		},
		store: 'HistorialCertificados',
		
		autoLoad: true,

		columns: [{
			text: "Id",

			dataIndex: 'id_certificado',
			menuDisabled: true,
			hidden: true

		}, {
			text: "Codigo Inscripcion",
			dataIndex: 'id_fkinscripcion_certificado',
			menuDisabled: true,
            hidden:true

		}, {
			text: "Descargadas",
			dataIndex: 'descargadas_certificado',
			menuDisabled: true

		},
        
        {
			text: "Fecha de Descarga",
			dataIndex: 'fecha_descargada',
			menuDisabled: true,
            flex:1
			

		},{
			text: "Subidas",

			dataIndex: 'subidas_certificado',

			menuDisabled: true

		},
		

		{
			text: "Fechas de Subida",
			dataIndex: 'fecha_subida',
			menuDisabled: true,
            flex:1
		
		}, 
        
        {
			text: "U.Subio",

			dataIndex: 'nombre_subida',
			menuDisabled: true,
            flex:2
			

		},

		{
			text: "U.Descargo",

			dataIndex: 'nombre_descargada',
			menuDisabled: true,
            flex:2

		}, 
		



		]
	

	}]



});