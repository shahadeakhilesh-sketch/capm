sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter"
], (Controller, Filter) => {
    "use strict";

    return Controller.extend("com.demo.empmgmtui.controller.View1", {
        onInit() {
        },
        onSearch:function(oEvent){
            var aFilters = [];
            var name = oEvent.getSource().getValue();
            if(name){
                aFilters.push(new Filter("name", "Contains", name));
            }
            this.byId("EmpTab").getBinding("items").filter(aFilters);
        }
    });
});