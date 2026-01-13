namespace empmgmt.db;

using {
    cuid,
    managed
} from '@sap/cds/common';


entity Employees : cuid, managed {
    // key empId       : String;//Removed this for Managed
    name               : String      @mandatory;
    // desig           : String @mandatory;
    // skill           : String @mandatory;
    desig              : Association to Desigs;
    skill              : Association to Skills;
    email              : String      @mandatory;
    salary             : Decimal;
    status             : String      @mandatory;
    statusCriticallity : Integer;
    rating             : Integer;
    photo              : LargeBinary @Core.MediaType: 'image/ipg';
    // projects        : Association to many Projects on projects.empid = empId;//Unmanaged
    projects           : Composition of many Projects
                             on projects.emp = $self; //managed
}

entity Projects : cuid {
    // key empid : String;//Unmanaged
    emp     : Association to Employees; //Managed
    // key prjid: String;//Removed this for Managed
    prjname : String;
    client  : String;
}

entity Desigs {
    key code : String;
        desc : String
}

entity Skills {
    key code : String;
        desc : String;
}
