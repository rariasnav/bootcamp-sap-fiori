sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller"
], (MessageToast, Controller) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
        },
        onPress: function(oEvent) {
            // var oBundle = this.getView().getModel("i18n").getResourceBundle();
            
            // var sMessage = oBundle.getText("popUpMessage");

            var oView = oEvent.getSource().getParent();

            var oBundle = oView.getModel("i18n").getResourceBundle();

            var oButton = oEvent.getSource();

            var sMessage = oBundle.getText("popUpMessage");

            MessageToast.show(oButton.getId() + ":" + sMessage);
        }
    });
});