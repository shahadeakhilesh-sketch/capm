sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/m/MessageBox"
], (Controller, Filter, MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.empmgmtui.controller.View1", {
        onInit() {
            this.aUploadItems = [];
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
        onCreateEmp: function () {
            var tableBinding = this.byId("EmpTab").getBinding("items");
            var oBindingContext = tableBinding.create(); //give a new binding context (memory)
            this.oBindingContext = oBindingContext;
            oBindingContext.created().then(function () {
                var EmpId = this.oBindingContext.getObject().ID;
                MessageBox.success(EmpId + " Employee created successfully.");
                //START - Here we uploading single photo of an employee
                var fileUploader = this.byId("FileUploader");
                if (fileUploader.getValue()) {
                    fileUploader.setUploadUrl("/odata/v4/emp-mgmt/EmployeeSet(" + EmpId + ")/photo");
                    fileUploader.upload();
                }
                //END - Here we uploading single photo of an employee
                //START - Here we uploading multiple documents of an employee
                    // var docs = this.oBindingContext.getObject().docs;
                    // var files = this.byId("UploadSet").getIncompleteItems();
                    // for (var i in docs) {
                    //     files[i].setUploadUrl("/odata/v4/emp-mgmt/DocsSet(" + docs[i].ID + ")/fileContent");
                    //     this.byId("UploadSet").uploadItem(files[i]);
                    // }
                //END - Here we uploading multiple documents of an employee
                //START - UploadSet with table
                var docs = this.oBindingContext.getObject().docs;
                var aUploader = this.byId("UploadSetwithTable").getUploader();
                for (var i in docs) {
                    this.aUploadItems[i].setUploadState("Ready");
                    this.aUploadItems[i].setUploadUrl("odata/v4/emp-mgmt/DocsSet(" + docs[i].ID + ")/fileContent")
                }
                this.aUploadItems = [];
                //END - UploadSet with table
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
            //         MessageBox.error(err);
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
        onAfterItemAdded: function (oEvent) {
            var docsBinding = this.byId("UploadSet").getBinding("items");
            docsBinding.create({
                "fileName": oEvent.getParameter("item").getFileObject().name,
                "fileType": oEvent.getParameter("item").getFileObject().type
            });
        },
        onSelFiles: function (oEvent) {
            var docsBinding = this.byId("table_uploadSet").getBinding("items");
            docsBinding.create({
                fileName: oEvent.getParameter("item").getFileObject().name,
                fileType: oEvent.getParameter("item").getFileObject().type
            });
            this.aUploadItems.push(oEvent.getParameter("item"));
        }
    });
});