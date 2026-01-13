sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
], (Controller, Filter) => {
    "use strict";

    return Controller.extend("com.demo.empmgmtui.controller.View2", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatched, this)
        },
        onPatternMatched: function (oEvent) {
            var sEmpId = oEvent.getParameter("arguments").EMPID;
            this.getView().bindElement("/EmployeeSet(" + sEmpId + ")");
        },
        onDownload: function () {
            var empId = this.getView().getBindingContext().getObject().ID;
            var sUrl = "/odata/v4/emp-mgmt/EmployeeSet(" + empId + ")/photo";
            sap.m.URLHelper.redirect(sUrl, true);
        },
    });
});