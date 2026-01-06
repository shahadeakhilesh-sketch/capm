namespace empmgmt.db;
using { cuid } from '@sap/cds/common';


entity Employees: cuid {
    // key empId: String;//Removed this for Managed
    name: String @mandatory;
    design: String @mandatory;
    skill: String @mandatory;
    email: String @mandatory;
    salary: Decimal;
    status: String @mandatory;
    statusCriticallity: Integer;
    rating: Integer;
    // projects: Association to many Projects on projects.empid = empId;//Unmanaged
    projects: Composition of many Projects on projects.emp = $self;//managed
}
entity Projects: cuid {
    // key empid: String;//Unmanaged
    emp: Association to Employees;//Managed
    // key prjid: String;//Removed this for Managed
    prjname: String;
    client: String;
}