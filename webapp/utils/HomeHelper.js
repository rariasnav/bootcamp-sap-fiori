sap.ui.define([
	"project1/utils/HomeService",
	"sap/ui/model/json/JSONModel",
], function (HomeService, JSONModel) {
	"use strict";

	return {
		init: function (oNorthwindModel) {
			this._oNorthwindModel = oNorthwindModel;


		},

        setInitModelLocalData: function (oComponent) {
            oComponent.setModel(new JSONModel({
                valueInput: '',
                selectedKey: '',
                selectedKeyMulti: [],
                selectedSuppliers: [],
            }), "LocalDataModel");
        },


		getDataProducts: async function(oFilters) {
            //let oFilters = [];
            return HomeService.readProducts(this._oNorthwindModel, oFilters);
        },

        setProductModel: async function (oController, oDatos) {
            let oListModel = oController.getOwnerComponent().getModel('ProductCollection');
            if(!oListModel){
                const oModel  = new JSONModel([]);
                oModel.setSizeLimit(1000000);	
                oController.getOwnerComponent().setModel(oModel, "ProductCollection");  
                oListModel = oController.getOwnerComponent().getModel('ProductCollection');
            }

            oListModel.setData(oDatos);
        },
	};
});