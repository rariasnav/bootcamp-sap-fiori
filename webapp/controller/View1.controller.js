sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
        },
        onGreet: function() {
            var oInput = this.getView().byId("nameInput");
            var sName = oInput.getValue().trim();

            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            var sGreeting = oBundle.getText("greetingText", [sName]);

            this.getView().byId("greetingText").setText(sGreeting);
        }
    });
});