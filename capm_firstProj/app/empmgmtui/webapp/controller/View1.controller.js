sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/m/MessageBox"
], (Controller, Filter, MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.empmgmtui.controller.View1", {
        onInit() {
        },
        onSearch: function (oEvent) {
            var aFilters = [];
            var name = oEvent.getSource().getValue();
            if (name) {
                aFilters.push(new Filter("name", "Contains", name));
            }
            this.byId("EmpTab").getBinding("items").filter(aFilters);
        },
        onPressRow: function (oEvent) {
            var sEmpId = oEvent.getSource().getBindingContext().getObject().ID;
            this.getOwnerComponent().getRouter().navTo("RouteView2", {
                EMPID: sEmpId
            });
        },
        onCreateEmpOpen: function () {
            var tableBinding = this.byId("EmpTab").getBinding("items");
            var oBindingContext = tableBinding.create(); //give a new binding context (memory)
            this.oBindingContext = oBindingContext;
            this.oBindingContext.created().then(function () {
                MessageBox.success(this.oBindingContext.getObject().ID);
                this._createEmpFrag.close();
            }.bind(this), function (error) {
                MessageBox.error(error);
            });
            if (!this._createEmpFrag) {
                this._createEmpFrag = sap.ui.xmlfragment(this.getView().getId(), "com.demo.empmgmtui.view.fragments.CreateNewEmp", this);
                this.getView().addDependent(this._createEmpFrag);
            }
            this._createEmpFrag.setBindingContext(oBindingContext);
            this._createEmpFrag.open();
        },
        onPressSave: function () {
            var oModel = this.getOwnerComponent().getModel();
            oModel.submitBatch("EmpGrp"); //UpdateGroupId from manifest.json file
        },
        onPressCancel: function () {
            this._createEmpFrag.close();
        }
    });
});