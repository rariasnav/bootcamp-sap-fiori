sap.ui.define([
    "sap/ui/core/UIComponent",
    "project1/model/models",
    "project1/utils/HomeHelper",
], (UIComponent, models, HomeHelper) => {
    "use strict";

    return UIComponent.extend("project1.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            this.setInitModel();
        },

        setInitModel: function () {
            HomeHelper.init(this.getModel());
            HomeHelper.setInitModelLocalData(this);
        }
    });
});