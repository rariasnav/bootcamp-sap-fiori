sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "project1/utils/HomeHelper",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/Filter",
    "project1/model/formatter",

], (Controller, HomeHelper, FilterOperator, FilterType, Filter, formatter) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {

        formatter: formatter,
        
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            //this.onSearch([]);
        },

        onSupplierTokenUpdate: function(oEvent){
            let aTokens = oEvent.getSource().getTokens();
            let aSupplierIDs = aTokens.map(token => token.getKey());

            let oModel =  this.getOwnerComponent().getModel("LocalDataModel");
            oModel.setProperty("/selectedSuppliers", aSupplierIDs);
        },

        onPress: async function (oEvent) {
            let oFilter = [];
            //let sValue = this.byId("idLabel1").getValue();
            //let sValueCombo = this.byId("comboboxID").getSelectedKey();

            let oTable = this.getView().byId("idProductsTable");
            let oBinding = oTable.getBinding("items");

            let values = this.getOwnerComponent().getModel("LocalDataModel").getData();

            if(values.valueInput){
                oFilter.push(new Filter("ProductName", FilterOperator.Contains, values.valueInput));
            }      
            
            if(values.selectedKey){
                oFilter.push(new Filter("CategoryID", FilterOperator.EQ, values.selectedKey));
            }          

            if (Array.isArray(values.selectedKeyMulti) && values.selectedKeyMulti.length > 0) {
                let aFiltersMulti = values.selectedKeyMulti.map(element => 
                    new Filter("CategoryID", FilterOperator.EQ, element)
                );
            
                oFilter.push(new Filter({
                    filters: aFiltersMulti,
                    and: false,
                }));
            }

            if (Array.isArray(values.selectedSuppliers) && values.selectedSuppliers.length > 0) {
                let aSuppliersFilters = values.selectedSuppliers.map(id => 
                    new Filter("SupplierID", FilterOperator.EQ, id)
                );

                oFilter.push(new Filter({
                    filters: aSuppliersFilters,
                    and: false,
                }));
            }
            
            //En esta parte Se debe leer modelo local donde han almacenado los token
            // if(values.selectedItem){
            //     oFilter.push(new Filter("SupplierID", FilterOperator.EQ, values.selectedItem));
            // }                     
           
            oBinding.filter(oFilter);
            //this.onSearch(oFilter)
        },

        onSearch: async function(oFilter){
            let oDatos = await HomeHelper.getDataProducts([oFilter]);
            await HomeHelper.setProductModel(this, oDatos[0].results);            
        },

        onItemPress: function (oEvent) {
            let oSource = oEvent.getSource();

            let aDatos = oSource.getBindingContext().getObject();

            this.oRouter.navTo("detail", {
                ProductID: aDatos.ProductID
            });

        },

        onSelectionChange: async function (oEvent) {

            // let oFilter = [];
            // let oSource = oEvent.getSource();
            // let oTable = this.getView().byId("idProductsTable")
            // let oBinding = oTable.getBinding("items");

            // if(oSource.getSelectedKey()){
            //     oFilter = new Filter("CategoryID", FilterOperator.EQ, oSource.getSelectedKey());               
            // } 
            // oBinding.filter(oFilter);               

        },       

        onChange: async function (oEvent) {
            // let oFilter = [];
            // let oSource = oEvent.getSource();
            // let oTable = this.getView().byId("idProductsTable");
            // let oBinding = oTable.getBinding("items");

            // if (oSource.getValue()) {
            //     oFilter = new Filter("ProductName", FilterOperator.Contains, oSource.getValue());
            // }

            // oBinding.filter(oFilter);
        }


    });
});