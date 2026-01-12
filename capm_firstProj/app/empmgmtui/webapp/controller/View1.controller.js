sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/m/MessageBox"
], (Controller, Filter, MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.empmgmtui.controller.View1", {
        onInit() {
            this.oModel = this.getOwnerComponent().getModel();
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
        getDialog: function () {
            if (!this._createEmpFrag) {
                this._createEmpFrag = sap.ui.xmlfragment(this.getView().getId(), "com.demo.empmgmtui.view.fragments.CreateNewEmp", this);
                this.getView().addDependent(this._createEmpFrag);
            }
            return this._createEmpFrag;
        },
        onCreateEmpOpen: function () {
            var tableBinding = this.byId("EmpTab").getBinding("items");
            var oBindingContext = tableBinding.create(); //give a new binding context (memory)
            this.oBindingContext = oBindingContext;
            oBindingContext.created().then(function () {
                MessageBox.success(this.oBindingContext.getObject().ID + " Employee created successfully.");
                this.getDialog().close();
            }.bind(this), function (error) {
                MessageBox.error(error);
            });
            this.getDialog().setBindingContext(oBindingContext);
            this.getDialog().open();
        },
        onPressSave: function () {
            this.oModel.submitBatch("EmpGrp"); //UpdateGroupId from manifest.json file
            //To show message on update
            // if (this.edit) {
            //     this.oModel.submitBatch("EmpGrp").then(function () {
            //         MessageBox.success("Employee updated successfully.");
            //     }, function (err) {
            //         MessageBox.error(error);
            //     });
            // }
        },
        onPressCancel: function () {
            this.getDialog().close();
        },
        onEditEmpOpen: function () {
            var oBindingContext = this.byId("EmpTab").getSelectedItem().getBindingContext();
            this.getDialog().setBindingContext(oBindingContext);
            this.getDialog().open();
        },
        onDeleteEmp: function () {
            var oBindingContext = this.byId("EmpTab").getSelectedItem().getBindingContext();
            var oPromise = oBindingContext.delete("EmpGrp");
            this.oModel.submitBatch("EmpGrp");
            oPromise.then(function () {
                MessageBox.success("Employee deleted successfully.");
            }, function (err) {
                MessageBox.error(err);
            });
        },
        onAddProject: function () {
            var tableBinding = this.byId("PrjTab").getBinding("items");
            var oBindingContext = tableBinding.create(); //Create a new memory of project table
        },
    });
});