Ext.define('Legion.view.main.List', {
    extend: 'Ext.container.Container',
    alias: 'widget.List',
    xtype: 'mainlist',
    height:500,
    width:650,
    requires: [
        'Legion.store.Personnel',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.view.Table',
        'Ext.form.Panel',
        'Ext.form.field.TextArea',
        'Ext.button.Button'
    ],

    title: 'Personnel Table',



    items : [
        {
          xtype: 'gridpanel',
          id: 'infoPanelId',
          store: {
              type: 'personnel'
          },
          height:250,
          width:650,
          title: 'People Information Table',
          columns: [
              { text: 'Id',  dataIndex: 'id' },
              { text: 'Name', dataIndex: 'name', flex: 1 },
              { text: 'Age', dataIndex: 'age', flex: 1 },


          ],
          listeners: {
              select: 'onItemSelected',
          },
          dockedItems : [

            {
                xtype: 'textareafield',
                id:'infoBioTextId',
                dock: 'bottom',
                anchor: '100%',
                width: 200,
                fieldLabel: 'General Information of Selected Person',


            },

          ],

        },
        {
          xtype: 'form',
          height:250,
          width:650,
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
              {
                  xtype: 'textfield',
                  anchor: '100%',
                  dock: 'bottom',
                  id: 'nameNameId',
                  fieldLabel: 'Name :'
              },
              {
                  xtype: 'textfield',
                  anchor: '100%',
                  dock: 'bottom',
                  id: 'nameAgeId',
                  fieldLabel: 'Age :'
              },
              {
                  xtype: 'textareafield',
                  anchor: '100%',
                  dock: 'bottom',
                  id: 'nameBioId',
                  fieldLabel: 'Bio :'
              },
              {
                  xtype: 'button',
                  itemId:'deleteBttnId',
                  text: 'Delete Person',
                  x:105,
                  listeners:{
                    click :"onDeleteBttnClick"
                  }
              },
              {
                  xtype: 'button',
                  itemId:'refreshBttnId',
                  text: 'Refresh Table',
                  x:200,
                  listeners:{
                    click :"onRefreshBttnClick"
                  }
              },
              {
                  xtype: 'button',
                  itemId:'updateBttnId',
                  text: 'Update Person',
                  x:300,
                  listeners:{
                    click :"onUpdateBttnClick"
                  }
              },
            ]

        },
    ],



});