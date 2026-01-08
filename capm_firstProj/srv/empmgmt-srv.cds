using { empmgmt.db as empDB } from '../db/schema';

service EmpMgmtService {
    entity EmployeeSet as projection on empDB.Employees;
    entity ProjectSet as projection on empDB.Projects;
    entity DesigsSet as projection on empDB.Desigs;
    entity SkillsSet as projection on empDB.Skills;
};