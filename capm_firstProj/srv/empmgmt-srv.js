const cds = require('@sap/cds')

module.exports = class EmpMgmtService extends cds.ApplicationService {
    init() {
        const { EmployeeSet } = this.entities;

        //## custom on handler for creating record ##//
        // this.on("CREATE", "EmployeeSet", async req=>{
        //     console.log("I am inside create operation.");
        //     console.log(req.data);
        //     var records = await INSERT.into (EmployeeSet) .entries(req.data);
        //     console.log("No of records " + records);
        //     if(records>0){
        //         req.reply(req.data); //reply return, Boolean/Number/Object/Array
        //     } else {
        //         req.reject({
        //             status:400,
        //             code:"Missing Input",
        //             message:"Invalid Input",
        //             target:"Error"
        //         });
        //     }
        // });

        //## custom before handler for creating record ##//
        this.before("CREATE", "EmployeeSet", req => {
            console.log("I am inside create operation.");
            console.log(req.data);
            if (req.data.status === "PARMANENT") {//here i'm adding my logic/code before generic handler getting executed
                req.data.statusCriticallity = 3;//here i'm setting statusCriticallity as 3 and the it gets pushed to backend table
            } else if (req.data.status === "CONTRACT") {
                req.data.statusCriticallity = 1;
            }
        });

        //## custom after handler for creating record ##//
        this.after("READ", "EmployeeSet", function (results) {
            console.log("I am inside create operation.");
            console.log(results);
            for (var i in results) {
                results[i].name = "Mr " + results[i].name;
                results[i].name = "Mr " + results[i].name;
            }
        })

        return super.init()
    }
}