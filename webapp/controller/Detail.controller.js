sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "project1/utils/HomeHelper",
], (Controller, HomeHelper) => {
    "use strict";

    return Controller.extend("project1.controller.Detail", {
        onInit() {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },    
            
        _onObjectMatched: function (oEvent){
            let sProductID = oEvent.getParameter("arguments").ProductID;

            this.getView().bindElement({
                path: "/Products(" + sProductID + ")",
                parameters: {
                    expand: "Order_Details"
                }
            });
        },
    });
});