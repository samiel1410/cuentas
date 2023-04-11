Ext.define('Legion.model.Canton', {
    extend : 'Ext.data.Model',
    idProperty : 'id',
    fields : [{
                name : 'id',
                type : 'int',
                defaultValue : 0
            }, {
                name : 'canton',
                type : 'string'
            }, 
            {
                name : 'id_provincia',
                type : 'int'
            }, 

    ]

});