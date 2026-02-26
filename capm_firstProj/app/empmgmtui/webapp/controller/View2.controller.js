sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/m/MessageBox"
], (Controller, Filter, MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.empmgmtui.controller.View2", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatched, this)
        },
        onPatternMatched: function (oEvent) {
            var sEmpId = oEvent.getParameter("arguments").EMPID;
            this.getView().bindElement("/EmployeeSet(" + sEmpId + ")");
        },
        onDownloadPhoto: function () {
            var empId = this.getView().getBindingContext().getObject().ID;
            var sUrl = "/odata/v4/emp-mgmt/EmployeeSet(" + empId + ")/photo";
            sap.m.URLHelper.redirect(sUrl, true);
        },
        onDownloadDocs: function (oEvent) {
            var docId = oEvent.getSource().getParent().getBindingContext().getObject().ID;
            var sUrl = "/odata/v4/emp-mgmt/DocsSet(" + docId + ")/fileContent";
            sap.m.URLHelper.redirect(sUrl, false);
        },
        onMakeParmanent: function(){
            var sEmpId = this.getView().getBindingContext().getObject().ID;
            var oModel = this.getOwnerComponent().getModel();
            var actionBinding = oModel.bindContext("/makeParmanent(...)");
            actionBinding.setParameter("empId", sEmpId);
            actionBinding.setParameter("status", "Parmanent");
            actionBinding.invoke().then(function(){
                MessageBox.success("Updated successfully.");
                oModel.refresh();
            }, function(error){
                MessageBox.error(error);
            });
        },
    });
});