using { empmgmt.db as empDB } from '../db/schema';

service EmpMgmtService {
    entity EmployeeSet as projection on empDB.Employees;
};
