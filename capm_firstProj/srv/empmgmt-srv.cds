using { empmgmt.db as empDB } from '../db/schema';

service EmpMgmtService {
    entity EmployeeSet as projection on empDB.Employees;
    entity ProjectSet as projection on empDB.Projects;
};