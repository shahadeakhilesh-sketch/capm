namespace empmgmt.db;

entity Employees {
    key empId: String;
    name: String @mandatory;
    design: String @mandatory;
    skill: String @mandatory;
    email: String @mandatory;
    salary: Decimal;
    status: String @mandatory;
    statusCriticallity: Integer;
    rating: Integer;
}